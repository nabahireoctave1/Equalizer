import { History, LoaderCircle, Search } from 'lucide-react'
import React, { useState } from 'react'
import api from '../api';

function TrackLoan() {

  const [FormData,setFormData]=useState({
   borrowername:null
  });
  const [Loading,setLaoding]=useState(null);
  const [Error,setError]=useState({});
 
 const HandleChange= (e)=>{
  const{name,value}=e.target;
  setFormData((prev)=>({...prev,[name]:value}));
  setError((prev)=>({...prev,[name]:''}))
 }
    
const HandleCheck= async()=>{
  setError({});
  setLaoding(true)
  try{
   const res= await api.post(`/Loan-History?search=${encodeURIComponent(FormData.borrowername)}`);
   console.log(res)
  }

  catch(err){
   const data= err.response?.data;
   if(data?.error){
    setError(data.error)
    return
   }
  }
  finally{
    setLaoding(false)
  }
}

const Inputstyle= (field)=>`${Error[field] ? 'bg-red-50 border-red-500 rounded-sm focus:ring-1 focus:ring-red-400':'focus:ring-1 focus:ring-blue-400 border-gray-200'} 
w-full p-1.5 text-[15px] text-gray-800 border rounded-xs outline-none
           `
 
  return (
    <div>
        <div className='px-4'>
            <div className='flex gap-2  mb-4'>  
                   <span>
                <History className='text-blue-500'/>
            </span>
           <h2 className='capitalize text-[15px] text-gray-800'>Get Previous Loan history</h2>

            </div>
         
          <div>
          
        

          <label htmlFor="" className='text-[13px] font-semibold text-gray-800 uppercase'>Borrower name</label><br></br>
          <div className='flex items-center gap-2'>
          <input type="text"
          name='borrowername'           
          placeholder='Kampire joy'
          onChange={HandleChange}
          className={Inputstyle('borrowername')}/>
           <button  
            onClick={HandleCheck}
           className='bg-blue-400 outline-none focus:bg-blue-500 rounded-sm cursor-pointer 
            px-6 py-2 text-[14px] text-white'>{Loading  ? <LoaderCircle size={18} className='animate-spin'/>
            :<span className='flex items-center justify-center gap-1'> <Search size={18}/><p>search</p></span>}</button>
          </div>
          <span className='text-[14px] text-red-500' >{Error.borrowername}</span>

          
          </div>

        </div>
        
        
        </div>
  )
}

export default TrackLoan