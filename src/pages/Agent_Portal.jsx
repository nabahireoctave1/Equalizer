import React from 'react'
import { User, PhoneCall, MailIcon, MapIcon, Building2, ShieldCheck, Briefcase,X } from 'lucide-react';

function Agent_Portal({onClose}) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>

        <div className='w-1/2 mt-20 bg-white shadow-lg p-4 rounded-md '>
        <div className='flex justify-between m-4 border-b border-gray-200 '>
             <h2 className="text-2xl font-extrabold p-2 uppercase text-gray-800 ">Agent portal</h2>
             <button onClick={onClose} className='text-red-500 cursor-pointer'>
                <X />
             </button>

        </div>
                  <div className="w-full  px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><User size={14}/> Agent Names</label>
                    <input type="text" placeholder="Full Name" className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all placeholder:text-gray-400" />
                  </div>

                  <div className="w-full  px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><PhoneCall size={14}/> Phone</label>
                    <input type="tel" placeholder="+26..." className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all" />
                  </div>

                  <div className="w-full  px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><MailIcon size={14}/> Email</label>
                    <input type="email" placeholder="agent@akea.com" className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all" />
                  </div>

                  <div className="w-full  px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><MapIcon size={14}/> Location</label>
                    <input type="text" placeholder="City/District" className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all" />
                  </div>

                 
                </div>
    </div>
  )
}

export default Agent_Portal