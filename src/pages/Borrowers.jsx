import { BanIcon, HandCoins, RefreshCcw, Search, SearchX, WifiOff,CircleX } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import BurnuserModel from './BurnuserModel'
import Reactivateborrowermodel from './ReactivateBorrower'
import { useTranslation } from 'react-i18next'
import api from '../api'
import NetworkError from './NetworkError'
import SkeletonCellLoader from './SkeletonCellLoader'



function Borrowers() {
  const [ismodelopen,setismodelopen]=useState(false)
  const [isreativateopened,setisreactivateopened]=useState(false)
  const [messagekey,setmessageKey]=useState(null)
  const [Loading,setLoading]=useState(null);
  const [errorsize,seterrorsize]=useState(null);
  const [clients,setclients]=useState([])
  const [search,setSearchTerm]=useState("")
  const [networkError,setnetworkError]=useState(false);

const {t}= useTranslation()


const FetchBorrowers= async()=>{
  setLoading(true)
  setnetworkError(false)
   try{
     const res= await api.get('/clients');
     setclients(res.data);

   }catch(err){
         if(!err.response){
          setnetworkError(true)
          seterrors(err.message)
         }
        setmessageKey(err.response?.data?.messagekey);
        seterrorsize(err.response?.data?.size)
   }
   finally{
    setLoading(false)
   }
}

  const filterborrowers=clients.filter((client)=>{
   return (
    client?.client_name.toLowerCase().includes(search.toLowerCase())||
    client?.national_id.toLowerCase().includes(search.toLowerCase())||
    client?.phone.toLowerCase().includes(search.toLowerCase())
   )
  })||[]


useEffect(()=>{
FetchBorrowers();

},[])

const HandleRetry=()=>{
  FetchBorrowers();
}
  
  
  const openburnuser= (e)=>{e.preventDefault();setismodelopen(true)}
  const closemodel=()=>setismodelopen(false)
  const openreactivatemodel= ()=>setisreactivateopened(true)
  const closereactivate= ()=>setisreactivateopened(false)
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-white rounded-sm  sticky top-20  flex flex-col
       sm:flex-row justify-between p-5 items-center gap-4 mb-6'>
        <div className='flex gap-3 items-center'>
          <span className='bg-blue-400 text-white p-2.5 rounded-full shadow-sm shadow-blue-100'>
            <HandCoins size={22} />
          </span>
          <div>
            <h2 className='text-xl font-extrabold text-gray-800 tracking-wide uppercase'>{t('b.title')}</h2>
            <p className='text-xs font-bold text-gray-600 mt-0.5'>{t('b.subtitle')}</p>
          </div>
        </div>

        <div className='relative w-full sm:w-72'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={16} />
          <input 
            type='text' 
            onChange={(e)=>setSearchTerm(e.target.value)}
            disabled={Loading||messagekey||networkError}
            placeholder={`${t('b.search_placeholder')}`} 
            className='border w-full pl-9 pr-4 py-2 text-sm rounded-md border-gray-200
             bg-gray-50/50 outline-none transition-all duration-200 disabled:cursor-not-allowed
              focus:border-blue-500 focus:bg-white
              focus:ring-4 focus:ring-blue-500/10'
          />
        </div>
      </div>

      <div className={`w-full  rounded-md  p-3
        border border-gray-100 overflow-hidden`}>
        {networkError ? 
        <NetworkError HandleRetry={HandleRetry}/>:
        messagekey&&errorsize===0? 
         <div className='flex flex-col justify-center items-center bg-white px-6 pt-7 pb-10 border border-gray-100'>
            <span className='flex justify-center flex-col items-center'>
              <nav className='bg-blue-400 w-fit p-5 text-white rounded-full'>
              <HandCoins/>
               
              </nav>
              <h2 className='text-gray-800 text-[20px] font-bold first-letter:uppercase p-2'>{t(messagekey)}</h2>
            </span>
            <p className='text-[15px]'>{t('errors.borrowers_not_found_desc')}</p>
         </div>
        :messagekey&&errorsize!==0 ? 
         <div className='flex flex-col  h-70 justify-center  '>
                    <div className='bg-red-50 p-5 border border-red-500 rounded-sm'>

                 <span className=''><CircleX size={50} 
                 className='text-red-500'/></span>
                 <h2 className='text-xl font-bold text-red-600'>{t('errors.errorTitle')}</h2>
                    <p className='text-red-500 font-semibold py-1 uppercase italic'>{t(messagekey)}</p>
                    <p className='text-gray-800 text-[15px] italic'>{t('errors.error_desc')} </p>
                     <div className='flex justify-end'>
                     <button onClick={HandleRetry} className=' bg-green-600 px-7 rounded-sm shadow outline-none py-1.5 text-white italic cursor-pointer'>
                        {t('errors.retry')}
                     </button>
                     </div>
                    </div>

                 </div>
         
        
        :!Loading&&filterborrowers.length===0 ?

        <div className='p-5 flex justify-center flex-col items-center '>
            <SearchX size={60} className='text-gray-800 flex items-center' />

          <span className='flex  flex-col  items-center'>
            <h2 className='font-semibold text-xl text-gray-800'>{t('search_result.NoResult_found')}</h2>
             <h2 className='text-[15px] italic'>{t('search_result.Nomatches')}  </h2>
          </span>
          </div>:         
        <div className='overflow-auto m-1 p-3'>
          <table className='w-full border-collapse text-left text-sm text-gray-600'>
            <thead>
              <tr className='bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                <th className='py-4 px-5 w-16 text-center'>{t('tb.no')}</th>
                <th className='py-4 px-4 whitespace-nowrap'>{t('tb.bnid')}</th>
                <th className='py-4 px-4 whitespace-nowrap'>{t('tb.names')}</th>
                <th className='py-4 px-4 whitespace-nowrap'>{t('tb.branch_name')}</th>
                <th className='py-4 px-4 whitespace-nowrap'>{t('tb.phone_no')}</th>
                       <th className='py-4 px-4 whitespace-nowrap'>{t('tb.location')}</th>
                <th className='py-4 px-5 text-center'>{t('tb.actions')}</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>

              {Loading||networkError? 
              Array.from({length:5}).map((_,idx)=>{
                 return <tr key={idx}>
                  <td className='p-2'><SkeletonCellLoader/></td>
                  <td className='p-2'><SkeletonCellLoader/></td>
                  <td className='p-2'><SkeletonCellLoader/></td>
                  <td className='p-2'><SkeletonCellLoader/></td>
                  <td className='p-2'><SkeletonCellLoader/></td>
                  <td className='p-2'><SkeletonCellLoader/></td>
                  <td className='p-2'><SkeletonCellLoader/></td>
                 </tr>
              })
              :filterborrowers.map((b, index) => (
                <tr key={index} className='hover:bg-gray-50/70 cursor-pointer transition-colors duration-150 group'>
                  <td className='py-3.5 px-5 text-center font-medium text-gray-700 group-hover:text-gray-700'>
                    {index + 1}
                  </td>
                 
                  <td className='py-3.5 px-4 font-sans text-[14px] text-gray-800 whitespace-nowrap'>
                    {b.national_id}
                  </td>
                  <td className='py-3.5 px-4 text-[14px] capitalize text-gray-900 whitespace-nowrap '>
                    {b.client_name}
                  </td>
                  <td className='py-3.5 px-4 font-semibold  text-gray-800 capitalize whitespace-nowrap'>
                    {b.branch_name}
                  </td>
                  <td className='py-3.5 px-4 font-sans text-[14px] text-gray-800 whitespace-nowrap'>
                    {b.phone}
                  </td>
                   <td className='py-3.5 px-4 font-sans text-[14px] first-letter:uppercase text-gray-800 whitespace-nowrap'>
                    {b.location}
                  </td>
                  <td className='py-3.5 px-5'>
                    <div className='flex items-center justify-center gap-2'>
                      <button 
                        onClick={openburnuser}
                        title={`${t('btn.suspend')}`} 
                        className='p-1.5 rounded-md text-gray-700 hover:text-red-600 cursor-pointer hover:bg-red-50 transition-all duration-150'
                      >
                        <BanIcon size={16}  />
                      </button>
                      <button  onClick={openreactivatemodel}
                        title={`${t('btn.reactivate')}`} 
                        className='p-1.5 rounded-md text-gray-700 hover:text-green-600 cursor-pointer hover:bg-emerald-50 transition-all duration-150'
                      >
                        <RefreshCcw size={16} />
                      </button>
                    </div>
                  </td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          }

      </div>
      

        {ismodelopen &&<BurnuserModel onClose={closemodel}/>}
        {isreativateopened &&<Reactivateborrowermodel onClose={closereactivate}/>}
        

    </div>
  )
}

export default Borrowers