import { BadgeDollarSign, Ban, Edit, Loader, Pencil, PlusCircle,
   PlusIcon, RefreshCcw, Search, Trash, UserPlus, CircleAlert,Minus,
   SearchX,
   CircleX,
   WifiOff,
   XIcon} from "lucide-react";
import React, { useEffect, useState } from "react";
import Newcashiermodel from "./Newcashiermodel";
import EditCashier from "./EditCashier";
import Burn_cashier from "./Burn_cashier";
import Reactivatecashiermodel from "./Reactivatecashiermodel";
import { useTranslation } from "react-i18next";
import api from "../api";
import NetworkError from "./NetworkError";
import SkeletonCellLoader from './SkeletonCellLoader'


function Cashiers() {
 
  const [searchterm,setsearchterm]=useState('')
  const [error,seterrors]=useState(null);
  const [cashier,setcashier]=useState([]);
  const [errorlength,seterrorlength]=useState(null)
  const [networkError,setnetworkError]=useState(false);
  const [deletionsuccess,setdeletionsuccess]=useState(null);
  const [messagekey,setmessageKey]=useState(null);
  const [ismodelopen,setismodelopen]=useState(false);
  const closemodel=()=>setismodelopen(false)
  const [Loader,setLoader]=useState({
    pageLoading:true,
    susploading:false,
    reactloading:false
  })
  


  const GetCurrentCashiers= async()=>{
    setnetworkError(false);

    setLoader({
      pageLoading:true,
      susploading:false,
      reactloading:false
    })
    try{
    let res= await api.get('/company-cashier');
    setcashier(res.data);
    setmessageKey(res.data?.messagekey)

    }
    catch(err){
      if(!err.response){
        setnetworkError(true)
      }
    setmessageKey(err.response?.data?.messagekey);
    seterrorlength(err.response?.data?.size)
    }finally{

      setLoader({
        pageLoading:false,
        reactloading:false,
        susploading:false
      })
    }
  }

  useEffect(()=>{
   GetCurrentCashiers()
  },[])


  const HandleDeletecashier= async(cashierId)=>{
    try{
       const res= await api.delete(`/delete-cashier/${cashierId}`);
       setdeletionsuccess(res.data.success)
       if(res.data.success===true){
        setmessageKey(res.data.messagekey);
        setismodelopen(true);
        setTimeout(() => {
          setismodelopen(false)
        }, 4000);
       }
    }
   
    catch(err){
    const data= err.response?.data
    setmessageKey(data.messagekey);
    setdeletionsuccess(data.success);
    setismodelopen(true)
   setTimeout(() => {
     setismodelopen(false);
   }, 4000);
    }
  }


  const filtereddata= cashier.filter((fd)=>{
    const term=searchterm.toLocaleLowerCase()||""
    return(
   fd.cashier_name?.toLocaleLowerCase().includes(term)||
   fd.cashier_email?.toLocaleLowerCase().includes(term)
   )
  })||[]

  

   const Handleretry=async ()=>{
    GetCurrentCashiers()
   }

  const {t}=useTranslation()


  const [isnewCashierModelopen,setisnewcashierModelopen]=useState(false)
  const [iseditmodelopen,setopeneditmodel]=useState(false)
  const [isburncashieropen,setisburncashieropen]=useState(false)
  const [reactivate,setreactivate]=useState(false)
  const opencashiermodel=(e)=>{e.preventDefault();setisnewcashierModelopen(true)}
  const closecashiermodel=()=>setisnewcashierModelopen(false)
   let [selectedCashierId,setselectedcashierId]=useState(null);
   const [cashierIDTobesuspnd,setcashierTobesuspnd]=useState(null);
   const [cashierIDTobeactivated,setcashierIdtobeactivated]=useState(null)
  const openedit=(cashierId)=>{setopeneditmodel(true),setselectedcashierId(cashierId)}
   let oncloseEdit= ()=>setopeneditmodel(false)
   const openBurncashier= (e,cashierId)=>{e.preventDefault();setisburncashieropen(true),setcashierTobesuspnd(cashierId)}
   let closeBurncashier= ()=>setisburncashieropen(false)
   const openreactivate= (e,cashierId)=>{ e.preventDefault(); setreactivate(true),setcashierIdtobeactivated(cashierId)}
   const closereactivate=()=>setreactivate(false)
      const [opensuspendMessagemodel,setsuspendmessagemodelopen]=useState(false);
   const [openreactivateMessagemodel,setreactivatemessagemodel]=useState(false)
   const [success,setsuccess]=useState(null)

const SuspendOnconfirm= async()=>{ 
  let cashierId=cashierIDTobesuspnd;

  setLoader({
    susploading:true,
    reactloading:false,
    pageLoading:false
  })
  try{

    let res=await api.put(`/suspend-cashier/${cashierId}`);
     setmessageKey(res?.data?.messagekey)
     setsuspendmessagemodelopen(true);
     setsuccess(res?.data?.success)
     setTimeout(() => {
       setsuspendmessagemodelopen(false);
     }, 4000);

   
  }
catch(err){ 
  setmessageKey(err.response?.data?.messagekey);
  setsuspendmessagemodelopen(true);
  setsuccess(err?.response?.data?.success);
  setTimeout(() => {
    setsuspendmessagemodelopen(false)
  }, 4000);

}finally{
  setLoader({
    reactloading:false,
    susploading:false,
    pageLoading:false

  })
}
}


const ReactivateOnconfirm =async()=>{
  const CashierId=cashierIDTobeactivated;
  setLoader({
    reactloading:true,
    susploading:false,
    pageLoading:false
  })
  try{
   
    const res= await api.put(`/reactivate-cashier/${CashierId}`);
     setsuccess(res?.data.success)
     setmessageKey(res?.data.messagekey);
     setreactivatemessagemodel(true)
     setTimeout(() => {
      setreactivatemessagemodel(false)
     }, 4000);
  }
  catch(err){
    setmessageKey(err.response?.data?.messagekey)
    setsuccess(err.response?.data?.success)
   setreactivatemessagemodel(true)
   setTimeout(() => {
    setreactivatemessagemodel(false)
   }, 4000);
  }finally{
    setLoader({
      pageLoading:false,
      susploading:false,
      reactloading:false
    })
  }

}



  const statusbadge=(status)=>{
      switch(status){
        case 'active' :return 'bg-blue-500 text-white'; 
        case 'suspended': return 'bg-red-500 text-white';
        default:return 'bg-gray-100 text-gray-700'
      }
  }


   function DeleteToast({success,message,Onclose}) {
     
    return (

    <div className={`w-100 shadow-lg  ${success ? 'bg-white border-green-600':'bg-red-50 border-red-500'}   animate-bounce-once
    border p rounded-md px-2 py-5 top-2 right-6  z-100 fixed flex flex-col justify-end`}>
    <div className="flex gap-1 ">
      <span>
        {success ? <div className="p-3 rounded-full bg-green-500"></div>:
        <div className="p-3 rounded-full bg-red-500"></div>}
      </span>
      <span>
         <h2 className={`font-bold text-[14px] uppercase ${success ? 'text-green-600':'text-red-600'} `}>
          {success ? t('c.cashier_deleted'):t('c.delete_failed')}</h2>
      <p className={`text-[15px] ${success ? '':'italic'}`}>{t(messagekey)}</p>
      </span>
    
    </div>
    <button onClick={closemodel} className="flex justify-end"> 
      <XIcon size={18}  className="text-red-500 cursor-pointer"/>
      </button>

    </div>

    )

    
  }

 

  return (
    <div className={`${error ? '':'sm:p-4 md:p-6'} p-2   bg-gray-100  min-h-screen`}>
         
          {ismodelopen&&
          <DeleteToast success={deletionsuccess}/>
          }
          
          
          <div className={`bg-white rounded-md border border-gray-200 p-3 sm:p-5`}>
         
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="bg-blue-400 text-white p-2 rounded-full shrink-0">
              <BadgeDollarSign size={22} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {t('c.cashier')}
              </h2>
              <p className="text-sm text-gray-500">
                {t('c.manageCashiers')}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-72 md:w-80">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                onChange={(e)=>setsearchterm(e.target.value)}
                disabled={Loader.pageLoading||error||networkError}
                placeholder={t('c.searchCashier')}
                className={`w-full  border border-gray-200 rounded-md py-2 
                ${Loader.pageLoading||messagekey||networkError?'cursor-not-allowed bg-gray-200 border-2':'cursor-pointer'}
                text-sm pl-10 pr-4 outline-none focus:ring-1 focus:ring-blue-400
                 focus:border-transparent transition`}
              />
            </div>

            <button onClick={opencashiermodel} className="flex justify-start gap-2 bg-blue-400 text-white px-9 py-2
             rounded-md text-sm cursor-pointer  w-fit  sm:w-auto whitespace-nowrap">
              <PlusCircle size={18} />
              <span>{t('c.cashier')}</span>
            </button>
          </div>
        </div>

        <div className={` ${filtereddata.length===0 ? ' border-t':''} mt-6 overflow-x-auto  border-gray-50 w-full`}>
           
           
             {messagekey&&errorlength===0?
             <div className="flex item items-center min-h-65 justify-center  flex-col ">
            <div className="bg-blue-400 p-5 flex items-center rounded-full">
              <UserPlus size={50} className="text-white"/>
            </div>
            <h2 className="text-xl font-bold text-gray-800 ">{t(messagekey)}</h2>
            <p className="text-[15px] p-2 text-center">{t('errors.cashiers_not_found_desc')}</p>
            <button onClick={opencashiermodel} className="flex gap-1 items-center text-sm bg-blue-400 p-2
             rounded-sm text-white px-5"><PlusIcon size={20}/>{t('c.cashier')}</button>
          </div> 
          :messagekey&&errorlength===1 ?<div>
             <div className=" bg-red-50 border p-3 border-red-500
           rounded-sm   py-3">
          <div><CircleX size={50} className="text-red-500"/></div>
          <h2 className="text-2xl font-bold text-red-500">{t('errors.errorTitle')}</h2>
           <p className="text-[15px]">{t(messagekey)}</p>
           <p className="text-[14px] pb-4 italic">{t('errors.error_desc')} </p>
          
          <div className="flex justify-end">

           <button onClick={Handleretry} className="bg-green-500 shadow px-8  py-1.5 
           rounded-sm text-sm text-white cursor-pointer">{t('errors.retry')}</button>
          </div>

          </div> 

          </div>:
          
          networkError ? 
            <NetworkError HandleRetry={Handleretry}/>
          :!Loader.pageLoading&&filtereddata.length==0?
            <div className="p-8 flex flex-col items-center justify-center text-[15px] text-gray-800" >
                 <SearchX size={60} className="text-gray-800"/>
            <h2 className='text-xl text-gray-800 font-semibold'>{t('search_result.NoResult_found')}</h2>

                <h2 className="italic">{t('search_result.Nomatches')}</h2>
              </div>
          
          :<table className="w-full border-collapse  whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 uppercase text-[11px] border-b border-gray-200">
                <th className="p-3">{t('c.no')}</th>
                <th className="p-3">{t('c.names')}</th>
                <th className="p-3">{t('c.email')}</th>
                <th className="p-3">{t('c.phone')}</th>
                <th className="p-3">{t('c.branch')}</th>
                <th className="p-3">{t('nc.location')}</th>

                <th className="p-3">{t('c.status')}</th>

                <th className="p-3">{t('c.manage')}</th>

              </tr>
            </thead>

            <tbody>
              
             
                 { Loader.pageLoading ? Array.from({length:5}).map((_,idx)=>{
                 return <tr key={idx}>
                     <td className="p-3"><SkeletonCellLoader/></td>
                     <td className="p-3"><SkeletonCellLoader/></td>
                     <td className="p-3"><SkeletonCellLoader/></td>
                     <td className="p-3"><SkeletonCellLoader/></td>
                     <td className="p-3"><SkeletonCellLoader/></td>
                     <td className="p-3"><SkeletonCellLoader/></td>
                     <td className="p-3"><SkeletonCellLoader/></td>
                     <td className="p-3"><SkeletonCellLoader/></td>

                  </tr>
                   }):filtereddata.map((c,idx)=>{
                return <tr key={idx} className="border-t border-gray-100 cursor-pointer hover:bg-gray-50 transition">
                 <td className="p-3 text-gray-700 text-sm">
                  {idx+1}
                </td>
                <td className="p-3 text-gray-700 text-sm capitalize">
                  {c.cashier_name}
                </td>
                <td className="p-3 text-gray-500 text-sm">
                  {c.cashier_email ? c.cashier_email:<Minus/>}
                </td>
                <td className="p-3 text-gray-500 text-sm">
                  {c.cashier_contact}
                </td>
                 <td className="p-3 text-gray-500 text-sm">
                  {c.branch_name}
                </td>
                   <td className="p-3 text-gray-500 text-sm">
                  {c.cashier_location}
                </td>
                  
                <td className="p-3">
                  <span className={`${statusbadge(c.status)} text-white px-3 py-1
                   rounded-full text-xs font-medium`}>
                  {t(`c.${c.status?.toLowerCase()}`)}
                  </span>
                </td>
             
                 <td className="p-3 flex items-center gap-2 text-gray-500 text-sm">
                   <button onClick={()=>openedit(c.cashier_id)} title={t('c.edit')} className="p-1 rounded-md cursor-pointer"><Pencil size={18} className=" hover:text-blue-400"/></button>
                   <button onClick={()=>HandleDeletecashier(c.cashier_id)} title={t('c.remove')} 
                   className="p-1 bg-red-50 rounded-md cursor-pointer"><Trash size={18} className="text-red-400"/></button>
                   <button
                   disabled={c.status?.toLocaleLowerCase()==='suspended'}
                   onClick={(e,cashierId)=>openBurncashier(e,c.cashier_id)}
                    title={c.status?.toLocaleLowerCase()==='suspended' ? t('c.already_suspended'):t('c.burn')} className="cursor-pointer disabled:cursor-not-allowed">
                      <Ban size={18} className=" hover:text-red-400 "/></button>
                   <button 
                   disabled={c.status?.toLocaleLowerCase()==='active'}
                   onClick={(e,cashierId)=>openreactivate(e,c.cashier_id)}
                    title={c.status?.toLocaleLowerCase()==='active' ? t('c.already_activated'):t('c.reactivate')}
                     className="cursor-pointer disabled:cursor-not-allowed"> 
                    <RefreshCcw size={18} className="hover:text-green-500"/></button>
                </td>
              </tr>
              })}
            </tbody>
          </table>
                 }
             
              </div>

         
      </div>
         
         

       {isnewCashierModelopen &&
            <Newcashiermodel  onClose={closecashiermodel}/>
          }
          {iseditmodelopen && <EditCashier cashierId={selectedCashierId} onClose={oncloseEdit} />}
          {isburncashieropen && <Burn_cashier success={success} messagekey={messagekey} modelopen={opensuspendMessagemodel} loading={Loader.susploading} onConfirm={SuspendOnconfirm}  onClose={closeBurncashier}/>}
          {reactivate && <Reactivatecashiermodel success={success} modelopen={openreactivateMessagemodel} messagekey={messagekey} loading={Loader.reactloading} onConfirm={ReactivateOnconfirm} onClose={closereactivate}/>}
    </div>
  );
}

export default Cashiers;