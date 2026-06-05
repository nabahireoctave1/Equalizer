import React, { useState } from 'react'

import logo from '../assets/image.jpeg'
import { LoaderIcon } from 'lucide-react'

export default function Login() {
    const [loading,setlaoding]=useState(false)
    const handleLogin= async (e)=>{
        e.preventDefault();
         try {
            setlaoding(true)
         }  
         catch(e){
          
         } finally{
            setlaoding(false)
         }

    }
  return (
    <div className='flex justify-center  items-center h-screen bg-blue-50/20'>
       <div className='  pt-2 pb-7 px-7 w-sm rounded-md m-4 '>     
         <div className=' flex flex-col justify-center items-center'>
      <img src={logo}  className='w-30 h-30 object-cover' alt="" srcset="" />
        <h2 className='text-3xl text-blue-500 font-extrabold uppercase'>Equalizer</h2> 
         <h2 className='font-bold text-2xl'>Login</h2>
      </div>

      <div>
        <form action="" onSubmit={handleLogin}>
            <label className=' text-gray-800 text-sm font-semibold ' htmlFor="username">Username</label> <br></br>
            <input type="text" name="" id="" className=' p-2.5 w-full border border-gray-200 rounded-md text-sm  focus:ring-1 outline-none focus:ring-blue-300' /> <br></br>
            <label className=' text-gray-800 text-sm font-semibold ' htmlFor="password">Password</label> <br></br>
            <input type="password" name="" id=""  className=' p-2.5 w-full border border-gray-200 rounded-md  text-sm focus:ring-1 outline-none focus:ring-blue-300'/> <br></br>
            <button  className='bg-blue-400 mt-4 flex justify-center items-center w-full p-3 rounded-md text-white text-sm font-semibold hover:cursor-pointer'>
              {loading ? <span className='flex gap-2 '><LoaderIcon size={20} className='animate-spin'/> Loggin in...</span>:'Login'}</button>
        </form>
      </div>
      </div>


    </div>
  )
}
