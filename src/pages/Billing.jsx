import {
  BitcoinIcon,
  CircleCheck,
  CreditCard,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Wallet,CircleX,
  WifiOff
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from '../api'

function Billing() {
  const [billingInfo,setbillingInfo]=useState([]);
  const [Error,setError]=useState(null)
  const [timeleft,setTimeleft]= useState({})
  const [networkError,setnetworkError]=useState(false)
const [loading,setloading]=useState(true);
const FindBillingInfo= async()=>{
    setloading(true)

   try{
    const res= await api.get('/billingInfo');
    setbillingInfo(res.data)

   }
   catch(err){
    if(!err.response){
      setnetworkError(true);
    }
        setError(err.response?.data?.message)
   }finally{
    setloading(false)
   }
}

useEffect(()=>{
 FindBillingInfo()
},[])

const calculateTimeLeft= (expireAt)=>{
  if(!expireAt){return null}


  const difference = new Date(expireAt).getTime() - Date.now();
 
   if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true,};
    }

    return {days: Math.floor(difference / (1000 * 60 * 60 * 24) ),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };

}


useEffect(()=>{
  if(!billingInfo.length||!billingInfo[0]?.expire_at){ return}
  const Timer=setInterval(()=>{
   setTimeleft(
    calculateTimeLeft(billingInfo[0]?.expire_at)
   )
  },1000)
 return ()=> clearInterval(Timer)
},[billingInfo]);




  const {t}=useTranslation()
  return (
    <div>    
        {loading ?
         <div className="border bg-white flex justify-between p-4 rounded-xs border-gray-300 m-2 ">
          <div className="space-y-2">
             <div className="flex bg-gray-200 py-3 h-2 w-80 animate-pulse rounded-xs"></div>
             <div className="flex bg-gray-200 py-3 h-2 w-50 animate-pulse rounded-xs"></div>

        </div>
        <div className="flex gap-2">
         {[1,2,3,4].map((i)=>{
          return <div key={i} >
          <div className="border py-3.5 px-7 rounded-xs border-gray-100 bg-gray-100 animate-pulse "></div>
          </div>
         })}
        </div>
          
        </div>:networkError ?
         <div className="bg-red-50 border border-red-500 p-4 rounded-sm">
       <span><WifiOff size={40} className="text-red-500"/></span>
       <h2 className="text-2xl text-red-500">Network error</h2>
        <p className="text-[15px]">Unable to connect to the server</p>
        <p className="text-[15px]  italic">network error occured please check your internet connection and refresh page</p>
    
       </div>:Error ?
        <div className="flex gap-1 p-3 bg-red-50 border border-red-300">
          <span ><CircleX size={45} className="text-red-600"/></span>
          <div className="">
             <h2 className="text-2xl text-red-500">Error Occurred</h2>
            <p className="text-[15px] italic">{Error}</p>

          </div>
        
       </div>
      :<div className={`${timeleft.expired===true ?'bg-red-50 border-red-400 ':'bg-[#F4FBF6] border-green-400'}
       animate-bounce-once border outline-none  p-3  
      sm:flex-row space-y-2 md:flex items-center justify-between`}>
        <div className="flex justify-center md:justify-start">

          <div>
          <h2 className={`${timeleft.expired===true? "text-red-600":"text-gray-800"} text-[20px] font-extrabold  uppercase`}>{timeleft.expired===true ? 'Subscription expired':'Company subscription'}</h2>
         <p className={`${timeleft.expired===true? "text-red-600":" text-green-600"} 
         text-[15px] italic`}>{timeleft.expired===true ? 'Your subscription was expired activation required !':"Your company subscription is active now"}</p>
            </div>
        </div>
        <div>
           <h2 className="text-center md:text-start  pb-2 font-bold text-sm text-gray-800 uppercase">Count Down </h2>
        
        <div className="flex justify-center  md:justify-center lg:justify-between gap-1 md:gap-2">
          
        <span className={`${timeleft.expired ? "border-red-500":"border-gray-200"} border py-2 px-4 h-fit   rounded-xs text-sm text-gray-800`}>{timeleft.days ? timeleft.days +' Days':0 +' Days' }</span>
        <span className={`${timeleft.expired ? "border-red-500":"border-gray-200"} border py-2 px-4 h-fit   rounded-xs text-sm text-gray-800`}>{timeleft.hours? timeleft.hours+ ' Hours':0+` Hours`}</span>
        <span className={` ${timeleft.expired===true ?'border-red-500' :"border-gray-200"} border py-2 px-4 h-fit   rounded-xs text-sm text-gray-800`}>{timeleft.minutes? timeleft.minutes+' Min':0 +``+' Min'}</span>
        <span className={`${timeleft.expired ? "border-red-500":"border-gray-200"} border py-2 px-4 h-fit   rounded-xs text-sm text-gray-800`}>{timeleft.seconds? timeleft.seconds+' Sec':0+``+' Sec'}</span>

        </div>
        </div>
        </div>
        }
    <div className="p-4 lg:p-6 shadow-sm h-full min-h-screen m-2 rounded-md bg-white">

     
      <div className="pb-5 border-b border-gray-100">
        <h2 className="font-extrabold text-2xl lg:text-3xl text-gray-800">
          {t('billing.title')}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
         {t('billing.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-6">
        <div className="lg:col-span-1 space-y-4">
            <div className="border border-gray-200 rounded-2xl p-5 bg-gradient-to-b from-gray-50 to-white">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <span className="bg-blue-100 text-blue-700 p-3 rounded-xl">
                <ReceiptText size={25} />
              </span>

              <div>
                <h2 className="font-extrabold text-lg text-gray-800">
                  {t('billing.billing_summary')}
                </h2>

                <p className="text-sm text-gray-500">
                 {t('billing.payment_information')}
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-5">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">{t('billing.service')}</span>

                <span className="font-semibold text-gray-700 text-sm text-right">
                  {t('billing.company_activation')}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <span className="text-gray-500 text-sm">
                  {t('billing.description')}
                </span>

                <span className="font-medium text-gray-700 text-sm text-right max-w-[180px]">
                  {t('billing.activation_description')}
                </span>
              </div>

              <div className="flex items-center   justify-between">
                <span className="text-gray-500  font-bold text-xs">
                {t('billing.monthly_activation_fee')}
                </span>

                <span className="font-extrabold text-xl text-gray-800">
                  100,000 UGX
                </span>
              </div>

              <div className="border-t border-dashed pt-4 flex items-center justify-between">
                <span className="font-extrabold text-gray-700">
                  {t('billing.total')}
                </span>

                <span className="font-extrabold text-2xl text-blue-700">
                  100,000 UGX
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-5 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <ReceiptText size={120} />
            </div>

            <div className="relative z-10">
              <span className="bg-white/20 p-3 rounded-xl w-fit block">
                <ShieldCheck />
              </span>

              <h2 className="font-extrabold text-xl mt-4">
              {t('billing.instant_receipt')}
              </h2>

              <p className="text-sm text-blue-100 mt-1 leading-6">
                {t('billing.receipt_description')}
              </p>

              <button className="mt-5 bg-white text-blue-700 font-bold px-4 py-3 rounded-xl text-sm hover:scale-[1.02] transition-all duration-200 cursor-pointer">
              {t('billing.get_receipt')}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 border border-gray-200 rounded-2xl p-5 h-fit bg-gradient-to-b from-gray-50 to-white">
          <div className="flex items-center gap-3 pb-5 border-b border-gray-100">
            <span className="bg-blue-100 text-blue-700 p-3 rounded-xl">
              <CreditCard />
            </span>

            <div>
              <h2 className="font-extrabold text-2xl text-gray-800">
                {t('billing.payment_methods')}
              </h2>

              <p className="text-sm text-gray-500">
                {t('billing.choose_payment_method')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6 ">
            <div className="border border-blue-100 bg-white rounded-2xl p-5 hover:shadow-md transition-all duration-300">
              <div className="flex gap-3">
                <span className="bg-blue-100 text-blue-700 p-3 rounded-full h-fit">
                  <BitcoinIcon />
                </span>

                <div>
                  <h2 className="font-bold text-xl text-gray-800">
                    {t('billing.pay_with_crypto')}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    {t('billing.crypto_description')}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mt-5">
                <p className="flex items-center gap-2 text-xs text-gray-600">
                  <CircleCheck size={18} className="text-blue-500" />
                 {t('billing.currency_usdt')}
                </p>

                <p className="flex items-center gap-2 text-xs text-gray-600">
                  <CircleCheck size={18} className="text-blue-500" />
                 {t('billing.network_bsc')}
                </p>

                <p className="flex items-center gap-2 text-xs text-gray-600">
                  <CircleCheck size={18} className="text-blue-500" />
                  {t('billing.instant_verification')}
                </p>

                <p className="flex items-center gap-2 text-xs text-gray-600">
                  <CircleCheck size={18} className="text-blue-500" />
                {t('billing.fast_secure_transaction')}
                </p>
              </div>

              <button className="w-full mt-6 bg-blue-400  cursor-pointer text-white py-3 rounded-md text-sm font-semibold transition-all duration-200">
                {t('billing.pay_now')}
              </button>
            </div>

            <div className="border border-green-100 bg-white rounded-2xl p-5 hover:shadow-md transition-all duration-300">
              <div className="flex gap-3">
                <span className="bg-blue-100 text-blue-700 p-3 rounded-full h-fit">
                  <Wallet />
                </span>

                <div>
                  <h2 className="font-bold text-xl text-gray-800">
                  {t('billing.other_method')}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                   {t('billing.other_method_description')}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mt-5">
                <p className="flex items-center gap-2 text-xs text-gray-600">
                  <CircleCheck size={18} className="text-blue-500" />
                  {t('billing.mtn_momo')}
                </p>

                <p className="flex items-center gap-2 text-xs text-gray-600">
                  <CircleCheck size={18} className="text-blue-500" />
                  {t('billing.airtel_money')}
                </p>

                <p className="flex items-center gap-2 text-xs text-gray-600">
                  <CircleCheck size={18} className="text-blue-500" />
                  {t('billing.visa_card')}
                </p>
                 <p className="flex items-center gap-2 text-xs text-gray-600">
                  <CircleCheck size={18} className="text-blue-500" />
                  {t('billing.bank_transfer')}
                </p>
              </div>

              <button className="w-full text-sm mt-6 cursor-pointer bg-blue-400  text-white py-3 rounded-md font-semibold transition-all duration-200">
                {t('billing.pay_now')}
              </button>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-100">
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200/60 flex flex-col gap-4">
              <div className="space-y-2">
                <h2 className="text-xl capitalize font-extrabold text-gray-800">
                  {t('billing.permanent_activation')}
                </h2>
                <p className="text-sm text-gray-600 first-letter:uppercase bg-white border
                 p-3 border-gray-100 rounded-md">
                  {t('billing.permanent_activation_description')}
                </p>
              </div>
              
              <div className="  flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-[12px] font-bold text-gray-700 uppercase tracking-wider">
                   {t('billing.permanent_activation_fees')}
                  </h3>
                  <h2 className="text-2xl font-black text-blue-900 mt-0.5">
                    1000,000 UGX
                  </h2>
                </div>
                
                <button className="w-full sm:w-auto bg-blue-400
                 text-white font-semibold text-sm px-8 py-2.5 rounded-md cursor-pointer
               whitespace-nowrap">
                  {t('billing.pay_now')}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </div>

  );
}

export default Billing;