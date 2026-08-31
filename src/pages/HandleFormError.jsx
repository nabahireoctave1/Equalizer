import {CircleCheckBig, XCircle } from 'lucide-react'
import React from 'react'

function HandleFormError({success,message}) {
  return (
    <div className='flex justify-center z-50 items-center border-b animate-bounce-once p-4 border-gray-100 pb-4'>
    <div className='flex items-center flex-col'>
        <div className='mb-3 animate-bounce '>
            {success ? (
              <CircleCheckBig size={60} className='text-green-500' />
            ) : (
              <XCircle size={60} className='text-red-500/90' />
            )}
          </div>

<div>
    <h2 className={`${success ? 'text-gray-800 italic':'text-red-400 italic'} text-[15px]`}>{message}</h2>
</div>
          
    </div>

    </div>
  )
}

export default HandleFormError