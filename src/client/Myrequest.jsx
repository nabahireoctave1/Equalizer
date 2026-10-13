import { ClipboardList } from 'lucide-react';
import React, { useState } from 'react'

function Myrequest() {
  const [Error,setError]=useState({});

  const Inputstyle= (field)=>`${Error[field] ? 'bg-red-50 border-red-500 rounded-sm focus:ring-1 focus:ring-red-400'
    :'focus:ring-2 focus:ring-blue-400 border-gray-200'} 
w-full p-1.5 text-[15px] text-gray-800 border rounded-xs outline-none
           `

  return (
    <div className='m-3 mt-8'>
      <div className='flex items-center gap-1 mb-1'>
        <span className='bg-blue-400 p-2 rounded-sm text-white'>
          <ClipboardList size={30}/>
        </span>
        <span>
           <h2 className='text-2xl uppercase font-extrabold text-gray-800'>My request</h2>
      <p className='text-[15px] capitalize text-gray-800'>Here you can review your submitted requests</p>
        </span>
    
       
      </div>

      <div>
        <form >
                 <label htmlFor="" className='text-[13px] font-semibold uppercase text-gray-800 tracking-wide'>Phone No<sup>-</sup></label><br></br>

             <div className='flex gap-2'>        
            <input type="text" placeholder='78756909874'  className={Inputstyle('Phoneno')} name="" id="" />
            <button className='bg-blue-500 px-5 rounded-sm text-white text-[15px] cursor-pointer '>Get</button>

            </div>

 
        </form>
      </div>
      
      
      </div>
  )
}

export default Myrequest