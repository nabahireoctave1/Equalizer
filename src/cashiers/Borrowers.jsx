 import { ChevronLeft, ChevronRight, HandCoins, Pencil, Search, SearchX, Trash, UserPlus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import api from '../api';
import NewBorrowerModel from './NewBorrowerModel';
import SkeletonCellLoader from '../pages/SkeletonCellLoader';
import NetworkError from '../pages/NetworkError';
 
 export default function Borrowers() {
 
   const [Borrowers,setBorrowers]=useState([]);
   const [networkError,setNetworkError]=useState(false)
   const [messagekey,setmessageKey]=useState(null);
   const [errorSize,setErrorSize]=useState(null);
   const [Loading,setLoading]=useState(null);
   const [SeachTerm,setSearchTerm]=useState("");
   const [Debouncesearch,setDebounceSearch]=useState(null);
   const [openRegisternewBorrower,setopenRegisterNewBorrower ]=useState(null);
      const [currentPage,setCurrentPage]=useState(1);
   const [totalPage,setTotalPage]=useState(0);
 
   const ClientPerPage=20;

   
    
   const Next= ()=>{
    if(currentPage<totalPage) setCurrentPage(currentPage+1);

   }

   const Previous= ()=>{
    if(currentPage>1) setCurrentPage(currentPage-1);
   }


  
   
   const HandleFetchCurrentBorrowers=async()=>{
    setLoading(true);
    setmessageKey(null);
    setErrorSize(null);
    setNetworkError(null);
        try{
           const res= await api.get(`/fetchBorrowers?limit=${ClientPerPage}&page=${currentPage}&search=${encodeURIComponent(Debouncesearch)}`);
          if(res?.data){setBorrowers(res.data.borrowersInfo)};
          setTotalPage(res.data?.totalpage)

  }
  catch(err){
    if(!err.response) {setNetworkError(true)}
    setmessageKey(err.response.data.messagekey);
    setErrorSize(err.res.data?.size)
    
  }finally{
    setLoading(false);
  }

   }


   


   useEffect(()=>{


    HandleFetchCurrentBorrowers()

   },[currentPage,Debouncesearch])

   useEffect(()=>{    
    const timer= setTimeout(() => {
        setDebounceSearch(SeachTerm);
    }, 1000);

    return ()=>clearTimeout(timer);


   },[SeachTerm])




   const OpenAddNewBorrowerModel=()=>{
    setopenRegisterNewBorrower(true);
   }

   const closeModal= ()=>{
    setopenRegisterNewBorrower(false)
   }

   const Retry= ()=>{
    HandleFetchCurrentBorrowers();
   }

   return (
     <div className='bg-gray-50'>

        <div className=' flex flex-col space-y-3 border-b border-gray-200 bg-white
         top-0 sticky  z-20 rounded-xs p-4 space-y-1'>
            <div className='flex items-center gap-1 flex-col sm:flex-row'>
                <span className='bg-blue-400 p-2 rounded-full text-white'>
                <HandCoins size={40}/>
                  
                </span>
                 <span>
                <h2 className='text-blue-600 font-bold uppercase text-2xl'>Borrowers managent panel</h2>
                 <p className='italic text-gray-800'>use this panel to manage and modify your client record efficiently</p>
            </span>
            </div>

            <div  className='relative w-full'>
            <span  className='absolute top-2.5 px-2 text-gray-700'>
                <Search size={20}/>
                </span>  
                <input 
                 onChange={(e)=>setSearchTerm(e.target.value)}
                type="text" className='pl-8 py-2 text-[15px] pr-2  w-full
                 border-gray-200 border bg-gray-50 outline-none rounded-sm
                  placeholder:text-gray-400 focus:ring-2
                 focus:ring-blue-400
                  text-gray-800 ' placeholder='Search by Name, Client Id , Phone' />   
            </div>
           

        </div>
        
         <div className='flex flex-col  sm:flex-row justify-between space-y-2  items-center  border-b mb-3 border-gray-200  p-3  bg-gray-100'>
            <h2 className='font-extrabold uppercase text-2xl text-gray-800'>borrowers detail</h2>
            <button  onClick={OpenAddNewBorrowerModel} className='flex  items-center gap-1 capitalize
             text-white bg-blue-500 py-2 px-4 cursor-pointer
              rounded-sm text-[15px] font-semibold'>
                <UserPlus size={18}/>
                new borrower</button>
                

         </div>

         
      {networkError && 
       <div className='fixed inset-0 z-50  flex items-center justify-center bg-black/30'>
        <NetworkError HandleRetry={Retry}/>
       </div>
      }      

     
          <div className='bg-white  border border-gray-100 m-1 rounded-sm overflow-y-auto'>
            <div className='overflow-x-auto'>
             <table>
              <thead>
               <tr className=' bg-gray-100'>
                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2  whitespace-nowrap '>No</th>
                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2 whitespace-nowrap  '>borrower names</th>
                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2  whitespace-nowrap '>borrower id</th>

                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2  whitespace-nowrap '>nin id</th>
                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2  whitespace-nowrap '>phone</th>
                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2  whitespace-nowrap '>borrower address</th>
                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2 whitespace-nowrap  '>bussiness type</th>
                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2 whitespace-nowrap  '>bussiness Name</th>
                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2  whitespace-nowrap '>bussiness location</th>
                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2  whitespace-nowrap '>Action</th>
                
               </tr>

              </thead>

              <tbody>
                {Loading||networkError ?  Array.from({length:5}).map((_,idx)=>(
                  <tr>
                    <td className='p-3'><SkeletonCellLoader/></td>
                    <td className='p-3'><SkeletonCellLoader/></td>
                    <td className='p-3'><SkeletonCellLoader/></td>
                    <td className='p-3'><SkeletonCellLoader/></td>
                    <td className='p-3'><SkeletonCellLoader/></td>
                    <td className='p-3'><SkeletonCellLoader/></td>
                    <td className='p-3'><SkeletonCellLoader/></td>
                    <td className='p-3'><SkeletonCellLoader/></td>
                    <td className='p-3'><SkeletonCellLoader/></td>
                    <td className='p-3'><SkeletonCellLoader/></td>
                  </tr>
                )) : Borrowers.map((data,idx)=>(
                    <tr key={idx}>
                        <td className='px-4 text-[15px]  uppercase text-gray-800 py-2 border-b border-gray-200'>{(currentPage-1)+idx+1}</td>
                         <td className='px-4 text-[15px] font-semibold   text-gray-800 py-2 border-b border-gray-200 capitalize whitespace-nowrap'>{data.client_name}</td>
                         <td className='px-4 text-[15px]   text-gray-800 py-3  border-b border-gray-200 whitespace-nowrap'>{data.client_id}</td>
                         <td className='px-4 text-[15px]   text-gray-800 py-3  border-b border-gray-200 whitespace-nowrap'>{data.national_id}</td>
                         <td className='px-4 text-[15px]   text-gray-800 py-3  border-b border-gray-200 whitespace-nowrap'>{data.phone}</td>
                         <td className='px-4 text-[15px]   text-gray-800 py-3  border-b border-gray-200 whitespace-nowrap'>{data.client_address}</td>
                         <td className='px-4 text-[15px]   text-gray-800 py-3  border-b border-gray-200 whitespace-nowrap capitalize'>{data.bussiness_type}</td>
                         <td className='px-4 text-[15px]   text-gray-800 py-3  border-b border-gray-200 whitespace-nowrap capitalize'>{data.client_bussinessName}</td>
                         <td className='px-4 text-[15px]   text-gray-800 py-3  border-b border-gray-200 capitalize whitespace-nowrap'>{data.bussiness_location}</td>
                         <td className='px-4 text-[15px]   text-gray-800 py-3  border-b border-gray-200 p-2'>
                            <button className='flex  items-center gap-1 text-[14px] outline-none
                             bg-blue-500 px-4 cursor-pointer
                             rounded-sm text-white py-1.5'>
                            <Pencil size={14}/>
                                Change
                            </button>
                            </td>
                         <td className='px-4   text-gray-800 py-3 
                          border-b border-gray-200 '>
                          
                           
                            </td>


                    </tr>
                ))}
              </tbody>

             </table>


            </div>


             <div className='bg-gray-100 py-4 px-3 flex justify-between items-center'>
                <button
                 disabled={currentPage===1}
                onClick={Previous} className='text-gray-800 outline-none hover:bg-gray-200 border
                 border-gray-300 transition-all  px-2  py-1 rounded-sm cursor-pointer
                  disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-30
                 '><ChevronLeft size={25}/></button> 
                <button
                 disabled={currentPage===totalPage}
                onClick={Next} className='text-gray-800 outline-none hover:bg-gray-200 
        
                border border-gray-300 transition-all  px-2  py-1 rounded-sm cursor-pointer
                disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-30'><ChevronRight size={25}/></button> 

        </div>
        </div>
         
         

      {openRegisternewBorrower && (
        <NewBorrowerModel Onclose={closeModal}/>
      )}   


       

      
        </div>
   )
 }
 