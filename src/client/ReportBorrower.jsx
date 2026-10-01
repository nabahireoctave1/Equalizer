import { MessageSquareWarning, ShieldAlert } from 'lucide-react'
import React from 'react'

export default function ReportBorrower({onClose,onConfirm}) {
  return (
     <div>
        
     <div className='flex items-center gap-1 mb-2'>

        <span className='bg-red-100 p-2 rounded-full text-red-500 '>
            <ShieldAlert size={30}/>
                    </span>
            <span>
                <h2 className='text-2xl text-gray-800'>Report Borrower</h2>
                <p className='text-[15px] '>Once this borrower reported may require admin loan approval</p>

            </span>

     </div>

     <div className='p-3'>
        <span className='flex gap-2 text-gray-800'>
            <MessageSquareWarning size={25} />
          <h2 className='capitalize text-[15px] mb-2'>choose reason</h2>
        </span>
        <select className='border w-full  text-[15px] p-2 cursor-pointer border-gray-200 px-3
         rounded-sm focus:ring-2 focus:ring-blue-400 outline-none '>
            <option value="froud suspecious">Froud suspecious</option>
            <option value="borrowers is defaulters">Defaulters</option>
            <option value="	bad payment behaviors">Bad payment behaviors</option>
        </select>
     </div>
     <div className='flex justify-end gap-2'>
        <button  onClick={onClose}
         className='bg-red-100 rounded-sm px-5 py-1.5 cursor-pointer outline-none capitalize text-[14px]'>Cancel</button>
        <button className='bg-blue-400  rounded-sm px-5 py-1.5 cursor-pointer outline-none capitalize text-[14px]
         text-white hover:bg-blue-500'>report</button>

     </div>
     </div>

  )
}
