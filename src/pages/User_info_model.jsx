import React from 'react'
import { Phone, XIcon } from 'lucide-react';
export default function User_info_model({onClose,title='admin information',
  status='active',userid='0xx109998345',phonnumber='07897645476',adminname='Nabahire octave',create_at='02-01-2026'}) {
 

  const statusStyles = {
    active: 'bg-green-100 text-green-700 border-green-200', 
    locked: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    suspended: 'bg-red-100 text-red-700 border-red-200',
  };


  return (
    <div 
      className='fixed inset-0 z-50 flex justify-center items-center font-sans bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300'
    >
      
      <div 
        className='bg-white w-full max-w-md rounded-2xl animate-bounce-once overflow-hidden shadow-2xl border-none transform transition-all'
        onClick={(e) => e.stopPropagation()} 
      >
        
        <div className='flex justify-between items-center bg-blue-400/80 p-4 border-b border-blue-100'>
          <h2 className='font-bold text-2xl text-white tracking-wide'>Equalizer</h2>
          <button
            onClick={onClose}
            className='bg-blue-700/50 p-1.5 rounded-full transition-colors text-white cursor-pointer'
            aria-label="Close"
          >
            <XIcon size={18}/>
          </button>
        </div>
       
        <div className='p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h1 className='text-xl font-black text-gray-800 uppercase '>{title}</h1>
            <span className={`px-4 py-1 rounded-full text-[10px] uppercase font-bold border shadow-sm ${statusStyles[status] || statusStyles.Done}`}>
              {status}
            </span>
          </div>

          <hr className='mb-6 border-gray-100' />

          <div className='flex justify-between items-start gap-4 mb-2'>
            <div className='space-y-4 flex-1'>
              <div>
                <p className='text-[12px]  text-gray-800 font-bold mb-1 uppercase'>admin names</p>
                <p className='text-xs font-semibold  text-gray-800'>{adminname}</p>
              </div>

              <div>
                <p className='text-[12px]  text-gray-800 font-bold mb-1 uppercase'>Created at</p>
                <p className='text-xs font-black text-gray-800'>
                 { create_at}
                </p>
              </div>
            </div>

            <div className='space-y-4 '>
              <div>
                <p className='text-[12px]  text-gray-800 font-bold mb-1 uppercase'>admin id</p>
                <p className='text-[13px]  text-gray-800'>
                  {userid}
                </p>
              </div>

              <div>
                <p className='text-[12px]  text-gray-800 font-bold mb-1 uppercase'>Phone number</p>
                <p className='text-sm font-mono  text-gray-800'>{phonnumber}</p>
              </div>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
}

