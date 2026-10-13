import { ChevronDown, ClipboardList, FilePlus2, Languages, LogIn, LogInIcon, SearchCheck } from 'lucide-react'
import React, { useState } from 'react'

import Login from './Login'
import RequestNewLoan from '../client/RequestNewLoan';
import TrackLoan from '../client/TrackLoan';
import Myrequest from '../client/Myrequest';

export default function StartUP() {
    
    const [currentPage,setCurrentPage]=useState('Login');

    const PageSwitcher= (page)=>{
        switch(page){
         case'Login': return <Login/>
         case'RequestLoan':return <RequestNewLoan/>
         case'trackLoan': return <TrackLoan/>
         case'myRequest': return <Myrequest/>
        }
    }

  return (
    <div>
        
    <div className='bg-blue-400 sticky top-0 z-50'>
        <div className='flex justify-between bg-blue-200/50 w-full py-6 items-center px-4 mb-4'>
        <div>
            <h2 className='uppercase font-extrabold text-3xl text-white'>Equalizer</h2>
        </div>

        <div className='flex gap-2 items-center'>
            <div className='flex gap-2'>
             
                <div className='border-r px-2 border-blue-200/50'>
            <nav onClick={()=>{setCurrentPage('RequestLoan')}} className=' text-white capitalize p-2 flex gap-1 text-[14px] font-semibold items-center cursor-pointer'>
            <span><FilePlus2 size={16}/></span>
           <button >Request  Loan</button> </nav>
            </div>
            <div className='border-r px-2 border-blue-200/50'>
            <nav onClick={()=>setCurrentPage('trackLoan')} className=' text-white capitalize p-2 flex gap-1 text-[14px] font-semibold items-center cursor-pointer'>
                <span><SearchCheck size={16}/></span>
            <button>Track loan</button>
            </nav>
            
            </div>
            <div className='border-r px-2 border-blue-200/50'>
            <nav onClick={()=>setCurrentPage('myRequest')} className=' text-white capitalize  p-2 flex gap-1 text-[14px] font-semibold items-center cursor-pointer'>
            <span><ClipboardList size={16}/></span>
            
            my requests</nav>
             
            </div>
                  <div className='border-r px-2 border-blue-200/50'>
            <nav onClick={()=>setCurrentPage('Login')} className=' text-white capitalize p-2 flex gap-1 text-[14px] font-semibold items-center cursor-pointer'>
            <span><LogInIcon size={16}/></span>
           <button >Login</button> </nav>
            </div>
            </div>
            <div> 
              <div className='relative inline-flex items-center text-gray-700 text-[14px]'>
                <Languages size={20} className='text-white cursor-pointer'/>
                  <div className='relative flex  items-center '>
                      <select name="" id="" className=' uppercase outline-none cursor-pointer'>
                        <option value="">English</option>
                        <option value="">French</option>
                        <option value="">Luganda</option>
                        <option value="">Runyankore</option>
                    </select>
                </div>

                    </div>
                
            </div>
        </div>
        </div>
    </div> 
     <div>
        {PageSwitcher(currentPage)}
     </div>


    </div>

  )
}
