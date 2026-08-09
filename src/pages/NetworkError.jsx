import { WifiOff } from 'lucide-react'
import React from 'react'

function NetworkError({HandleRetry}) {
  return (
    <div className='bg-red-50 p-4 border border-red-500 rounded-sm'>
          <span>
            <WifiOff size={40} className='text-red-500'/>
              <h2 className='text-2xl text-red-500'>Network error</h2>
          </span>
          <p className='text-[12px] uppercase italic'>Unable to connect to the server</p>
          <p className='text-[15px] italic'>Please check your internet connection and try again</p>
          
          <div className='flex justify-end'>
            <button onClick={HandleRetry} className='bg-green-600 shadow rounded-sm
            hover:cursor-pointer outline-none p-1.5 px-7 text-[15px]
              text-white italic'>Retry</button>
          </div>
         </div>
  )
}

export default NetworkError