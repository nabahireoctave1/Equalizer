import React, { useEffect, useState } from "react";
import {
  Wallet,
  MessageSquareMore,
  CreditCard,
  Activity,
  Network,
  Inbox,
  MessageSquareOff,
  TriangleAlert,
  WifiOff,
  CircleX,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import api from "../api";
import NetworkError from "./NetworkError";
import Loader1 from "./Loader1";

function Sms() {

 const [smsinfo,setsmsinfo]=useState({
  remainSMS:null,
  TotalsmsPurchased:null,
  DailyUsage:null,

 })
 const [smslg,setsmslg]= useState([])
 const [Loading,setLoading]=useState(true)

 const [Purchasesmsformdata,setpurchasesmsformdata]=useState({
  smsPackage:"",
  PaymentNumber:""
 })

 const [smsErrors,setError]=useState({});
 

 const HandleChange= (e)=>{
   const {name,value}=e.target;
    
   setpurchasesmsformdata({
    ...Purchasesmsformdata,
    [name]:value
   })

   setError((prev)=>({...prev,[name]:''}))

  
 }

 const [errors,seterrors]=useState({
  smsError:null,
  transError:null,
  NetworkError:false
 });


 const FetchsmsLog = async ()=>{
  setLoading(true);
   try{
    seterrors({smsError:null,transError:null,NetworkError:false});

    const [sms,trans]= await Promise.all([
  api.get('/smsinfo'),
api.get('/sms-transaction-log'),
    ])

  const smsData = sms?.data?.smsdata?.[0];


    if(sms){


      setsmsinfo({

         remainSMS: smsData.remaining_sms,
        TotalsmsPurchased: smsData.total_purchase,
        DailyUsage: smsData.total_used

    })}
    if(trans){setsmslg(trans?.data)}

   }
   catch(err){
    if(!err.response){
      seterrors({
        smsError:null,
        transError:null,
        NetworkError:true})
    }
    else{
      seterrors({
        smsError:err.response?.data?.message||null,
        transError:err.response?.data?.messagekey|| null,
        NetworkError:false
      
      })
    }
    
   }finally{
    setLoading(false)
   }

 }


 const HandleRetry= ()=>{
  FetchsmsLog();
 }



 
 
 useEffect(()=>{
   
   FetchsmsLog();
 },[])



const HandleSubmit= async(e)=>{
  e.preventDefault();
  setError({});
  
  try{ 
  const res=await api.post('purchase-sms',Purchasesmsformdata);


  }
  catch(err){
    const data= err.response?.data;
    if(data?.Errors){setError(data.Errors)
      return
    }

  }


}




const smsUsedProgress =
  smsinfo.TotalsmsPurchased > 0
    ? Math.min(
        (smsinfo.DailyUsage / smsinfo.TotalsmsPurchased) * 100,
        100
      )
    : 0;
    const smsPercentageProgress= smsUsedProgress.toFixed(2);






  const formatDate= (date)=>{
     if(!date) return null;
         return date.split('T')[0]
     .split('-').reverse().join('-')

  }
  const {t}=useTranslation()


  const  SkeletonCellLoader= ()=>{

    return (
      <div className="w-full">
        <div className="bg-gray-200 p-2  rounded-xs w-full animate-pulse"></div>
      </div>
    )
  }


  const Smsinputborderswitcher= (field)=>`
  
  ${smsErrors[field] ? 'bg-red-50 border-red-500':'bg-gray-50 border-gray-200'} w-full  border 
   rounded-md px-4 py-3 text-sm outline-none focus:border-blue-400`

  return (
    <div className="min-h-screen">
      <div className="bg-white py-4 ">
          <div>
          
            <h1 className="text-2xl px-4 uppercase font-black text-gray-800">
            {t('sms.title')}
            </h1>

           
          </div>

         
      </div>
     {errors.NetworkError ?
      <NetworkError HandleRetry={HandleRetry}/>
     :Loading ? 
     <Loader1/>
     
     :smsinfo&&smsinfo?.remainSMS===0||smsinfo?.remainSMS===null?
       
      <div className="flex items-center  gap-2 px-4 py-4 bg-red-50 border-red-500 border rounded-sm m-2">
        <span>
          <MessageSquareOff strokeWidth={1.7} size={40} className="text-red-500"/>
        </span>

        <div>

        <h2 className="text-rose-500 text-xl font-bold">{t('errors.no_sms_credits')}</h2>

        <p className="text-red-500 text-[15px] italic">{t('errors.no_sms_credits_message')}</p>
        </div>

      </div>:smsinfo?.remainSMS<=120&&smsinfo.remainSMS>0 ? 
      <div className="border p-3 rounded-md m-2 border-red-500 bg-red-50">
        <span>
          <TriangleAlert size={45} className="text-red-500"/>
        </span>
        <div>
          <h2 className="text-xl font-bold text-red-500">{t('errors.low_sms_credits')}</h2>
          <p className="text-red-500 text-[15px] italic"> {t('errors.low_sms_credits_desc')} 
          </p>
          <p className="text-slate-600 text-[15px] italic">{t('errors.low_sms_credits_warning')} </p>


        </div>
      </div>

      :''

     }


      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-md  border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="uppercase text-gray-700 text-sm font-bold tracking-wider">
                    {t('sms.current_sms')}
                  </p>

                  {Loading||errors.NetworkError ? 
                  <div className="p-3 bg-gray-200 rounded-xs animate-pulse"></div>
                  
                  :<h2 className="text-2xl pb-2 font-black text-gray-800 mt-3">
                    {smsinfo.remainSMS ? smsinfo.remainSMS:0} SMS
                  </h2>
                 
                 }
                  

                  <p className="text-gray-700 text-xs mt-1 uppercase">
                    {t('sms.available_sms_remaining')}
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-[#f8faff] border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-800 text-[14px]">
                      {t('sms.total_purchased')}
                      </p>

                      {Loading||errors.NetworkError ?
                  <div className="p-3 bg-gray-200 rounded-xs animate-pulse"></div>
                  :
                        <h3 className="text-xl font-black text-gray-800 mt-1">
                        {smsinfo.TotalsmsPurchased? smsinfo.TotalsmsPurchased:0} SMS
                      </h3>
                      
                      }

                    

                      <p className="text-[11px] text-gray-700 uppercase mt-1">
                        {t('sms.sms_package_usage')}
                      </p>
                    </div>

                    <div className="bg-blue-400 p-2.5 rounded-md">
                      <MessageSquareMore
                        className="text-white"
                        size={18}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[14px] text-gray-700">
                        {t('sms.usage')}
                      </span>

                      <span className="text-[12px] font-bold text-gray-700">
                        {Loading||errors.NetworkError ? <div className="py-2.5 bg-gray-200 rounded-xs px-4 animate-pulse "></div>:
                        <span>{smsPercentageProgress}% </span>
                        }
                      </span>
                    </div>

                    <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                      <div style={{width:`${smsPercentageProgress}%`}} 
                      className={`h-full bg-blue-300 rounded-full`}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f8faff] border border-gray-100 rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-800 text-sm">
                        {t('sms.daily_usage')}
                      </p>                     
                      {Loading||errors.NetworkError ?<div className="p-3 bg-gray-200 animate-pulse rounded-xs"></div> :

                        <h3 className="text-xl font-black text-gray-800 mt-1">
                        {smsinfo.DailyUsage ? smsinfo.DailyUsage :0} SMS
                      </h3>
                      }
                     
                    

                      <p className="text-[11px] text-gray-700 uppercase mt-1">
                        {t('sms.today_message_used')}
                      </p>
                    </div>

                    <div className="bg-blue-400 p-2.5 rounded-md">
                      <Activity
                        className="text-white"
                        size={18}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] text-gray-700">
                        {t('sms.daily_usage')}
                      </span>

                      <span className="text-[12px] font-bold text-gray-700">
                        {Loading||errors.NetworkError ? <div className="bg-gray-200 py-2.5 px-4 animate-pulse">

                        </div>:<span>
                        {smsPercentageProgress}%

                          </span>}
                      </span>
                    </div>

                    <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
                      <div style={{width:`${smsPercentageProgress}%`}} className={`h-full bg-blue-300 
                        rounded-full`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-md  border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className=" p-3 rounded-2xl">
                  <CreditCard
                    size={35}
                  />
                </div>

                <div>
                  <h2 className="font-black text-xl text-gray-800">
                  {t('sms.purchase_sms') }
                  </h2>

                  <p className="text-gray-500 text-xs">
                    {t('sms.enter_payment_details')}
                  </p>
                </div>
              </div>

              <form onSubmit={HandleSubmit} className="space-y-4" >
                <div>
                  <label className="text-[13px] font-semibold text-gray-700 block mb-2">
                    {t('sms.sms_package')}
                  </label>

                  <input
                    type="text"
                    name="smsPackage"
                    onChange={HandleChange}
                    placeholder={t('sms.enter_sms_amount')}
                    className={`${Smsinputborderswitcher('smsPackage')}`}
                  />
                <span className="text-red-500 text-[13px]">{smsErrors? smsErrors.smsPackage:'' }</span>

                </div>

                <div>
                  <label className="text-[13px] font-semibold text-gray-700 block mb-2">
                    {t('sms.phone_number')}
                  </label>

                  <input
                    type="text"
                    name="PaymentNumber"
                    onChange={HandleChange}
                    placeholder="07XXXXXXXX"
                    className={`${Smsinputborderswitcher('PaymentNumber')}`}
                  />
                <span className="text-red-500 text-[13px]">{smsErrors? smsErrors.PaymentNumber:'' }</span>

                </div>

                <button className="w-full bg-blue-400 outline-none cursor-pointer text-white py-3 rounded-md text-sm font-bold hover:opacity-90 duration-300 shadow-lg">
                {t('sms.purchase')}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-6 p-6 overflow-x-auto">
          <div className="mb-5">
            <h2 className="text-xl font-black text-gray-800">
              {t('sms.transaction_history')}
            </h2>

            <p className="text-xs text-gray-500 mt-1">
             {t('sms.recent_sms_purchase_records')}
            </p>
          </div>
          {errors.transError ? 
          <div className="flex flex-col items-center p-2">
        
        <span className="flex flex-col items-center bg-blue-400 p-3 text-white rounded-full">
          <Inbox size={60} strokeWidth={1.5}/>

        </span>
          <h2 className="font-semibold  text-red-500">{t(errors.transError)}</h2>

        <p className="text-[15px]">{t('errors.sms_not_sms_transaction_found_desc')}</p>

   


          </div>          
          
          :<table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 text-gray-600 text-xs uppercase whitespace-nowrap">
                  {t('sms.t.date')}
                </th>

                <th className="text-left py-3 text-gray-600 text-xs uppercase whitespace-nowrap px-1">
                  {t('sms.t.transaction_id')}
                </th>

                <th className="text-left py-3 text-gray-600 text-xs uppercase whitespace-nowrap">
                  SMS
                </th>

                <th className="text-left py-3 text-gray-600 text-xs uppercase whitespace-nowrap">
                  {t('sms.t.amount')}
                </th>

                

                <th className="text-left py-3 text-gray-600 text-xs uppercase whitespace-nowrap">
                  {t('sms.t.status')}
                </th>
              </tr>
            </thead>

            <tbody>

              
              {Loading||errors.NetworkError ?Array.from({length:5}).map((_,idx)=>(
                <tr key={idx}>

                <td className="py-3 px-2"><SkeletonCellLoader/></td>
                <td className="py-3 px-2"><SkeletonCellLoader/></td>
                <td className="py-3 px-2"><SkeletonCellLoader/></td>
                <td className="py-3 px-2"><SkeletonCellLoader/></td>
                <td className="py-3 px-2"><SkeletonCellLoader/></td>
                </tr>

              )) :smslg?.map((item, index) => (
                
                <tr
                  key={index}
                  className="border-b border-gray-50 hover:bg-gray-50 duration-200"
                >
                  <td className="py-4 text-[14px] text-gray-700 whitespace-nowrap px-2">
                    {formatDate(item.date)}
                  </td>

                  <td className="py-4 text-[14px] uppercase text-gray-800 whitespace-nowrap px-2">
                    {item.sms_id}
                  </td>

                  <td className="py-4 text-[14px] text-gray-700 whitespace-nowrap px-2">
                    {item.sms_purchase_total} SMS
                  </td>

                  <td className="py-4 text-[14px] text-gray-700 whitespace-nowrap px-2">
                    {item.amount}
                  </td>

                

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                        item.status.toLocaleLowerCase() === "success"
                          ? "bg-blue-400 text-white"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {t(`sms.sts.${item.status.toLowerCase()}`)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          }

        </div>
      </div>
    </div>
  );
}

export default Sms;