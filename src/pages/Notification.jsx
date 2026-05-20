import { Bell, BellDot, CircleCheck, XIcon } from 'lucide-react'
import React, { useState } from 'react'

function Notification({onClose,title='service activation',message="Payment completed wait for sytem confirmation!! "}) {
    const [isreaded,setisreaded]=useState(true)
  return (
    <div className='flex justify-center  md:justify-end'>
        <div  className=' py-6 px-3 m-4  border border-gray-200 animate-bounce-once w-full md:max-w-[350px]  rounded-xl fixed z-40 bg-gray-100 '>
            <div className='flex  justify-end '>
                <button><XIcon className='w-5 cursor-pointer h-5' onClick={onClose}/></button>
            </div>
            <h1 className='flex p-2 text-lg font-black items-center gap-3 text-gray-700'>
                <BellDot className='animate-pulse cursor-pointer'/>Notification </h1>
            <div className='flex items-center  justify-between pb-4 px-4 pt-2 rounded-xl bg-gray-50  '>

           <div>

            <h1 className='text-xs font-bold first-letter:uppercase py-2 '>
                {isreaded ? <span className='flex gap-2 items-center'><CircleCheck 
                size={18} className='text-blue-400'/>Notification readed</span> :'New notification'}</h1>
            <p className='text-xs  flex gap-3'><Bell size={20}/>{message}</p>
            </div>
            <div  >
             {isreaded ? <div className='p-2 bg-green-500 rounded-full cursor-pointer'></div>
             :<div className='p-2 bg-red-500 cursor-pointer  rounded-full'></div>}
                
             </div>
             </div>
             
            
        </div>
    </div>
  )
}

export default Notification