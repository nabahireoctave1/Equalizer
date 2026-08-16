import { CircleCheckBig,  XCircle } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

function HandleTranslatedErromodel({ issuccess, messagekey, onClose }) {

    const {t}=useTranslation();
  return (
    <div className='fixed inset-0 z-100 flex items-center justify-center bg-black/60'>
      
      <div className='w-sm rounded-sm  bg-gray-50 py-8 px-7 pb-6 shadow-2xl animate-in zoom-in duration-300'>
        
        <div className='flex flex-col items-center text-center'>

          <div className='mb-3 animate-bounce'>
            {issuccess ? (
              <CircleCheckBig size={60} className='text-green-500' />
            ) : (
              <XCircle size={60} className='text-red-500/90' />
            )}
          </div>

          <h2
            className={`text-2xl font-extrabold tracking-wider mb-2 ${
              issuccess ? 'text-green-600' : 'text-red-500/90'
            }`}
          >
            {issuccess ? 'Successfully' : 'Error'}
          </h2>

          <p className='text-gray-800  text-[15px] mb-6 first-letter:uppercase'>
            {t(messagekey)}
          </p>

          <button
            onClick={onClose}
            className={`w-full outline-none rounded-md cursor-pointer py-3 text-sm text-white transition 
           ${issuccess ? 'bg-green-500':'bg-red-500'} `}
          >
            Continue
          </button>

        </div>
      </div>
    </div>
  )
}

export default HandleTranslatedErromodel