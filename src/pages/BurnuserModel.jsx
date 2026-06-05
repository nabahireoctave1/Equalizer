import { AlertTriangle, X } from 'lucide-react'
import React from 'react'

function BurnuserModel({onClose, onConfirm }) {

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>
      
      <div className='relative w-full max-w-md transform overflow-hidden rounded-md bg-white p-4 shadow-2xl transition-all border border-gray-100'>
      

        <div className='flex flex-col items-center text-center mt-2'>
          
          <div className='flex h-15 w-15 items-center justify-center rounded-full bg-red-50
           text-red-600 animate-bounce mb-2'>
            <AlertTriangle size={35} />
          </div>
          
          <h3 className='text-2xl font-extrabold text-gray-800'>
            Burn Borrower
          </h3>
          <p className='text-sm text-gray-800 mt-2 max-w-xs'>
            Are you absolutely sure you want to burn this borrower from the company
          </p>
        </div>
         
        <div className='mt-6 flex flex-col-reverse sm:flex-row sm:justify-between gap-2'>
          <button 
            onClick={onClose}
            className='w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors'
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className='w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:cursor-pointer focus:outline-none transition-colors shadow-sm'
          >
            confirm
          </button>
        </div>

      </div>
    </div>
  )
}

export default BurnuserModel