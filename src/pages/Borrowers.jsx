import { BanIcon, HandCoins, RefreshCcw, Search } from 'lucide-react'
import React, { useState } from 'react'
import BurnuserModel from './BurnuserModel'
import Reactivateborrowermodel from './ReactivateBorrower'
function Borrowers() {
  const [ismodelopen,setismodelopen]=useState(false)
  const [isreativateopened,setisreactivateopened]=useState(false)
  
  const borrowers = [
    { BNid: 1234567857487475, names: "james willlock", amount: 3000000, branch: 'Kigali tech', phoneno: "263456789678",locaction:"Bunyoro" },
    { BNid: 1234567857487475, names: "Nabahire octave", amount: 3000000, branch:"akea service", phoneno: "263456789678",locaction:"Kampala" },
    {  BNid: 1234567857487475, names: "Mutoniwase M denyse ", amount: 3000000, branch: 'Kigali tech', phoneno: "263456789678",locaction:"Hoima" },
    {  BNid: 1234567857487475, names: "Mugabo Emma", amount: 3000000, branch: 'Rubavu live stock hub', phoneno: "263456789678",locaction:"Hoima" },
    {  BNid: 1234567857487475, names: "cyusa Eddy", amount: 3000000, branch: 'Kigali tech', phoneno: "263456789678",locaction:"Hoima" },
    {  BNid: 1234567857487475, names: "stev alern lorent", amount: 3000000,  branch: 'Kigali tech', phoneno: "263456789678",locaction:"Hoima" },
  ]

  const openburnuser= (e)=>{e.preventDefault();setismodelopen(true)}
  const closemodel=()=>setismodelopen(false)
  const openreactivatemodel= ()=>setisreactivateopened(true)
  const closereactivate= ()=>setisreactivateopened(false)
  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='bg-white rounded-md   flex flex-col sm:flex-row justify-between p-5 items-center gap-4 mb-6'>
        <div className='flex gap-3 items-center'>
          <span className='bg-blue-400 text-white p-2.5 rounded-full shadow-sm shadow-blue-100'>
            <HandCoins size={22} />
          </span>
          <div>
            <h2 className='text-xl font-extrabold text-gray-800 tracking-wide uppercase'>Borrowers</h2>
            <p className='text-xs font-bold text-gray-600 mt-0.5'>Manage all active borrowers</p>
          </div>
        </div>

        <div className='relative w-full sm:w-72'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={16} />
          <input 
            type='text' 
            placeholder='search' 
            className='border w-full pl-9 pr-4 py-2 text-sm rounded-md border-gray-200
             bg-gray-50/50 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white
              focus:ring-4 focus:ring-blue-500/10'
          />
        </div>
      </div>

      <div className='w-full bg-white rounded-md  border border-gray-100 overflow-hidden'>
        <div className='overflow-x-auto m-1'>
          <table className='w-full border-collapse text-left text-sm text-gray-600'>
            <thead>
              <tr className='bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-700 uppercase tracking-wider'>
                <th className='py-4 px-5 w-16 text-center'>No</th>
                <th className='py-4 px-4 whitespace-nowrap'>B N ID</th>
                <th className='py-4 px-4 whitespace-nowrap'>Names</th>
                <th className='py-4 px-4 whitespace-nowrap'>Branch Name</th>
                <th className='py-4 px-4 whitespace-nowrap'>Phone No</th>
                       <th className='py-4 px-4 whitespace-nowrap'>Location</th>
                <th className='py-4 px-5 text-center'>Actions</th>
                <th>maker</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {borrowers.map((b, index) => (
                <tr key={index} className='hover:bg-gray-50/70 cursor-pointer transition-colors duration-150 group'>
                  <td className='py-3.5 px-5 text-center font-medium text-gray-700 group-hover:text-gray-700'>
                    {index + 1}
                  </td>
                 
                  <td className='py-3.5 px-4 font-sans text-[14px] text-gray-800 whitespace-nowrap'>
                    {b.BNid}
                  </td>
                  <td className='py-3.5 px-4 text-[14px] capitalize text-gray-900 whitespace-nowrap '>
                    {b.names}
                  </td>
                  <td className='py-3.5 px-4 font-semibold  text-gray-800 capitalize whitespace-nowrap'>
                    {b.branch}
                  </td>
                  <td className='py-3.5 px-4 font-sans text-[14px] text-gray-800 whitespace-nowrap'>
                    {b.phoneno}
                  </td>
                   <td className='py-3.5 px-4 font-sans text-[14px] first-letter:uppercase text-gray-800 whitespace-nowrap'>
                    {b.locaction}
                  </td>
                  <td className='py-3.5 px-5'>
                    <div className='flex items-center justify-center gap-2'>
                      <button 
                        onClick={openburnuser}
                        title='Suspend Borrower' 
                        className='p-1.5 rounded-md text-gray-700 hover:text-red-600 cursor-pointer hover:bg-red-50 transition-all duration-150'
                      >
                        <BanIcon size={16}  />
                      </button>
                      <button  onClick={openreactivatemodel}
                        title='Reactivate Borrower' 
                        className='p-1.5 rounded-md text-gray-700 hover:text-green-600 cursor-pointer hover:bg-emerald-50 transition-all duration-150'
                      >
                        <RefreshCcw size={16} />
                      </button>
                    </div>
                  </td>
                  <td className='flex items-center justify-end p-4'>
                    <div className='bg-green-600 p-2 w-fit rounded-full'>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

        {ismodelopen &&<BurnuserModel onClose={closemodel}/>}
        {isreativateopened &&<Reactivateborrowermodel onClose={closereactivate}/>}

    </div>
  )
}

export default Borrowers