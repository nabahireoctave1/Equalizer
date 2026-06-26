import { CircleCheckBig,  XCircle } from 'lucide-react'
import React from 'react'

function HandleErrormodel({ success, message, onClose }) {
  return (
    <div className='fixed inset-0 z-100 flex items-center justify-center bg-black/60'>
      
      <div className='w-sm  bg-gray-50 py-8 px-7 pb-6 shadow-2xl animate-in zoom-in duration-300'>
        
        <div className='flex flex-col items-center text-center'>

          <div className='mb-3 animate-bounce'>
            {success ? (
              <CircleCheckBig size={60} className='text-green-500' />
            ) : (
              <XCircle size={60} className='text-red-500/90' />
            )}
          </div>

          <h2
            className={`text-2xl font-extrabold tracking-wider mb-2 ${
              success ? 'text-green-600' : 'text-red-500/90'
            }`}
          >
            {success ? 'successfully' : 'Error'}
          </h2>

          <p className='text-gray-800 uppercase text-xs mb-6 first-letter:uppercase'>
            {message}
          </p>

          <button
            onClick={onClose}
            className={`w-full rounded-md cursor-pointer py-3 text-sm text-white transition 
           ${success? 'bg-green-500':'bg-red-500'} `}
          >
            Continue
          </button>

        </div>
      </div>
    </div>
  )
}

export default HandleErrormodel