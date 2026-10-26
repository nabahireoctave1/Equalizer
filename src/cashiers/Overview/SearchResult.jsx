import { Banknote, CircleCheck,  Coins, User, User2, Wallet2, X } from 'lucide-react'
import React from 'react'

function SearchResult({data,OnClose}) {
  return (
    <div onClick={OnClose}  className='fixed inset-0 z-60 flex justify-center bg-black/60 p-4'>
        <div onClick={(e)=>e.stopPropagation()} className=' bg-white w-full max-w-6xl rounded-sm p-4'>
        <div className='flex justify-end'>
            <button className='bg-gray-200 p-1 rounded-full text-gray-700 cursor-pointer' Onclick={OnClose}><X/></button>
        </div>

        <div>
         <div className='p-2 border mt-6 rounded-sm border-gray-200'>
              <h2>Borrower Profile</h2>

          <div className='flex gap-2'>
            <div className='flex'>
             <span><User2/></span>
             <h2>{data.clientName}</h2>
             </div>
              <div>
 
              </div>

          </div>

         </div>
          
          <div>
            stats
          </div>

          <div> 
            Loan History
          </div>


        </div>
 
         </div>
        
        </div>
  )
}

export default SearchResult