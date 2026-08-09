import React, { useState } from 'react';
import { Building2, X, ShieldAlert, Calendar, MapPin, User, Hash,Plus } from 'lucide-react';
import api from '../api';

function EditCompany_info_model({ onclose }) {
 

  const [formdata,setformData]=useState({
    companyName:"",
    companyAdmin:"",
    companyLocation:""
  })



  const HandleChanges= (e)=>{
    const {name,value}=e.target;

    setformData({
      ...formdata,
      [name]:value
    })
  }

  console.log(formdata)


  const HandleSaveChanges= async()=>{
    try{

      const res=await api.put('/change-company-info',formdata);
      console.log(res);



    }
    catch(err){

    }
}

  return (
    <div 
      onClick={onclose} 
      className='fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto'
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className='bg-white border-none rounded-sm shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200 my-auto'
      >
        <div className='relative px-6 py-4 border-b border-blue-400 bg-blue-300 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-1.5 bg-blue-500 rounded-full'>
              <Building2 size={20} className='text-white' />
            </div>
            <h1 className='text-sm font-bold text-blue-950 uppercase tracking-tight'>Edit Company Information</h1>
          </div>
          
          <button 
            onClick={onclose}
            className="p-1 rounded-full bg-blue-500 cursor-pointer text-white hover:bg-blue-400/50 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className='flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100'>
          
         

          <div className='flex-1 p-6 bg-white space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>
              <div>
                <label className='flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase mb-1' htmlFor="company-name">
                  <User size={12} /> Company Name
                </label>
                <input 
                  name='companyName'
                  onChange={HandleChanges}
                  type="text" 
                  className='w-full px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all' 
                />
              </div>

              <div>
                <label className='flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase mb-1' htmlFor="location">
                  <MapPin size={12} /> Location
                </label>
                <input 
                  name='companyLocation'
                  onChange={HandleChanges}
                  type="text" 
                  className='w-full px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all' 
                />
              </div>

              <div>
                <label className='flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase mb-1' htmlFor="admin-rep">
                  <ShieldAlert size={12} /> Admin Representative
                </label>
                <input 
                  name='companyAdmin'
                  onChange={HandleChanges}
                  type="text" 
                  className='w-full px-3 py-1.5 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all' 
                />
              </div>

              <div>
                <label className='flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase mb-1' htmlFor="reg-num">
                  Registration Number
                </label>
                <input 
                  id="reg-num"
                  type="text" 
                  readOnly
                  className='w-full px-3 py-1.5 text-sm rounded-lg border border-gray-100 bg-gray-100 text-gray-500 cursor-not-allowed outline-none' 
                  defaultValue='0987565345' 
                />
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between p-3 bg-gray-100 rounded-xl'>
              <div className='flex items-center gap-4 justify-start pl-1'>
                <div>
                  <span className='text-[9px] font-bold text-gray-500 uppercase block'>Status</span>
                  <div className='flex items-center gap-1.5 text-red-600 font-bold text-[10px] uppercase tracking-wider mt-0.5'>
                    <span className='w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse'></span>
                    Suspended
                  </div>
                </div>
                <div className='h-8 w-1 bg-gray-200'></div>
                <div>
                  <span className='text-[9px] font-bold text-gray-500 uppercase block'>Joined</span>
                  <p className='text-[11px] font-bold text-gray-700 mt-0.5'>Jan 14, 2026</p>
                </div>
              </div>

              <div className='flex gap-2 justify-end'>
                <button 
                  type="button"
                  onClick={onclose}
                  className='flex-1 sm:flex-none px-4 py-2.5 cursor-pointer text-gray-600 font-bold rounded-md hover:bg-gray-200 transition-all text-[10px] uppercase'
                >
                  Cancel
                </button>
                <button  onClick={HandleSaveChanges}
                  type="submit"
                  className='flex-1 sm:flex-none px-5 py-2.5 cursor-pointer bg-blue-400 outline-none
                   text-white font-bold rounded-sm hover:bg-blue-500 shadow-sm transition-all text-[10px] uppercase tracking-wide whitespace-nowrap'
                >
                  Save Changes
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCompany_info_model;