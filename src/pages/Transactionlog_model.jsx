import React from 'react';
import { XIcon } from 'lucide-react';

function Transactionlog_model({
  onClose,
  title = 'Transaction Details',
  transactionId = 'TRX000123445',
  amount = '30,000',
  currency = 'UGX',
  status = 'Done',
  userName = 'Ishimwe Precious',
  date = '02-01-2026'
}) {
  

  const statusStyles = {
    Done: 'bg-blue-400 text-white border-blue-200', 
    Pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Failed: 'bg-red-100 text-red-700 border-red-200',
  };


  return (
    <div 
      className='fixed inset-0 z-50 flex justify-center items-center font-sans bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300'
      onClick={onClose} 
    >
      
      <div 
        className='bg-white w-full max-w-md rounded-sm animate-bounce-once overflow-hidden shadow-2xl border-none transform transition-all'
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
            <h1 className='text-xl font-bold text-gray-800'>{title}</h1>
            <span className={`px-4 py-1 rounded-full text-[10px] uppercase font-bold border shadow-sm ${statusStyles[status] || statusStyles.Done}`}>
              {status}
            </span>
          </div>

          <hr className='mb-6 border-gray-100' />

          <div className='flex justify-between items-start gap-4'>
            <div className='space-y-4 flex-1'>
              <div>
                <p className='text-[12px]  text-gray-800 font-bold mb-1'>Customer name</p>
                <p className='text-xs font-semibold  text-gray-800'>{userName}</p>
              </div>

              <div>
                <p className='text-[12px]  text-gray-800 font-bold mb-1'>Paid amount</p>
                <p className='text-sm font-black text-gray-800'>
                  {amount} <span >{currency}</span>
                </p>
              </div>
            </div>

            <div className='space-y-4 flex-1 text-right'>
              <div>
                <p className='text-[12px]  text-gray-800 font-bold mb-1'>Transaction id</p>
                <p className='text-[12px]  text-gray-800'>
                  {transactionId}
                </p>
              </div>

              <div>
                <p className='text-[12px]  text-gray-800 font-bold mb-1'>Transaction date</p>
                <p className='text-sm font-mono  text-gray-800'>{date}</p>
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}

export default Transactionlog_model;