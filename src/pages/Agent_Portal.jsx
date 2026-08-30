import React, { useEffect, useState } from 'react'
import { User, PhoneCall, MailIcon, MapIcon,
   Building2, ShieldCheck, Briefcase,X,  Phone, Hand, LoaderCircle } from 'lucide-react';
import api from '../api';

import HandleFormError from './HandleFormError';

function Agent_Portal({onClose}) {
 
  const [loading,setloading]=useState(false)
  const [error,setError]=useState({});
    const [message,setmessage]=useState(null)
    const [success,setsuccess]=useState(null)
  
    const [ismodelopen,setismodelopen]=useState(false);
  
  const [formdata,setFormdata]=useState({
    names:'',
    phone:'',
    email:'',
    location:''
  })


const HandleChange=(e)=>{
  const {name,value}=e.target;
setFormdata((prev)=>({
  ...prev,
  [name]:value
}))

setError((prev)=>({
  ...prev,
  [name]:''
}))


}


const Handlesave= async()=>{
  setError({});
  setloading(true)
  try{
  const response= await api.post('/add-agent-data',formdata)
   setsuccess(response?.data.success)
   setmessage(response?.data.message)
   setismodelopen(true)
   
  }
  catch(err){
   const data=err.response?.data;
   if(data?.errors){setError(data.errors) 
    return
   }
   setmessage(data?.message||err.message)
   
   setismodelopen(true)


  }
  finally{
    setloading(false)
  }
}

useEffect(()=>{
  if(ismodelopen){

 let timer= setTimeout(() => {
  setismodelopen(false);
 }, 4000); 
 return ()=>clearTimeout(timer)
  }

},[ismodelopen])

const InputErrorBorderSwitcher=(field)=>`
${error[field]? 'border border-red-300 focus:ring-1 focus:ring-red-400':'bg-gray-50 border border-gray-100 focus:ring-1 focus:ring-blue-100 '}
`;

  return (
    <div>

      
    <div className='fixed inset-0 z-50 flex  items-center justify-center bg-black/85 backdrop-blur-sm p-4 focus:border-blue-300 '>
 
        <div className='w-full md:w-4/5 mt-20 bg-white shadow-sm p-4 rounded-sm '>
        <div className='flex justify-between items-center m-4 border-b border-gray-200 '>
             <h2 className="text-3xl font-extrabold p-2 uppercase text-gray-800 ">Agent portal</h2>
             <button onClick={onClose} className='text-red-500 cursor-pointer bg-red-50 w-fit 
              rounded-full h-fit p-1'>
                <X />
             </button>

        </div>
                {ismodelopen && <HandleFormError success={success} message={message}  />}

                  <div className="w-full  px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><User size={14}/> Agent Names</label>
                    <input type="text" name='names' placeholder="Full Name"
                    onChange={HandleChange}
                     className={`${InputErrorBorderSwitcher('names')} w-full p-2 text-sm bg-gray-50 border
                      border-gray-100 rounded-sm 
                       outline-none transition-all placeholder:text-gray-400`} />
                       <span className='text-[13px] text-red-500'>{error.names}</span>
                  </div>

                  <div className="w-full  px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><PhoneCall size={14}/> Phone</label>
                    <input type="tel" name='phone' placeholder="89887..."
                    onChange={HandleChange}
                     className={`${InputErrorBorderSwitcher('phone')} w-full p-2 text-sm rounded-sm  outline-none transition-all` }/>
                       <span className='text-[13px] text-red-500'>{error.phone}</span>
                  
                  </div>

                  <div className="w-full  px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><MailIcon size={14}/> Email</label>
                    <input type="email" placeholder="agent@akea.com"
                    name='email'
                    onChange={HandleChange}
                    className={`${InputErrorBorderSwitcher('email')}w-full p-2 text-sm  
                      rounded-sm  outline-none transition-all`} />
                       <span className='text-[13px] text-red-500'>{error.email}</span>

                  </div>

                  <div className="w-full  px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><MapIcon size={14}/> Location</label>
                    <input type="text"
                    name='location'
                    onChange={HandleChange}
                    placeholder="City/District" className={`${InputErrorBorderSwitcher('location')}
                    w-full p-2 text-sm  
                    rounded-sm outline-none transition-all`} />
                       <span className='text-[13px] text-red-500'>{error.location}</span>

                  </div>
                  <div className='flex justify-end  '>

                <button onClick={Handlesave}
                 disabled={loading} className={`${loading ? 'bg-blue-400 cursor-not-allowed':
                  ' bg-blue-500 cursor-pointer'} p-2 px-5 rounded-sm
                 text-white text-sm `}>
                  {loading ?<span className='flex items-center gap-2'><LoaderCircle className='
                 animate-spin'/> saving...</span> :"Add"}</button>

                  </div>

                 
                </div>


    </div>

    </div>

  )
}

export default Agent_Portal