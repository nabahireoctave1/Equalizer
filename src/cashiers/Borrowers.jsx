 import { ChevronLeft, ChevronRight, HandCoins, Pencil, Search, Trash, UserPlus } from 'lucide-react'
import React from 'react'
 
 export default function Borrowers() {
   return (
     <div className='bg-gray-50'>

        <div className=' flex flex-col lg:flex-row justify-between border-b border-gray-200 bg-white
         top-0 sticky items-center z-20 rounded-xs p-4 space-y-1'>
            <div className='flex items-center gap-1'>
                <span className='bg-blue-400 p-2 rounded-full text-white'>
                <HandCoins size={40}/>
                  
                </span>
                 <span>
                <h2 className='text-blue-600 font-bold uppercase text-2xl'>Borrowers managent panel</h2>
                 <p className='italic text-gray-800'>use this panel to manage and modify your client record efficiently</p>
            </span>
            </div>

            <div  className='relative w-md'>
            <span  className='absolute top-2.5 px-2 text-gray-700'>
                <Search size={18}/>
                </span>  
                <input type="text" className='pl-8 py-2 text-[15px] pr-2 first-letter:uppercase w-full
                 border-gray-200 border bg-gray-50 outline-none rounded-sm placeholder:capitalize focus:ring-1
                 focus:border-blue-400
                  text-gray-800 ' placeholder='search' />   
            </div>
           

        </div>
        
         <div className='flex  justify-between items-center  border-b mb-3 border-gray-200  p-3  bg-gray-100'>
            <h2 className='font-extrabold uppercase text-2xl text-gray-800'>borrowers detail</h2>
            <button className='flex  items-center gap-1 capitalize
             text-white bg-blue-500 py-1.5 px-4 cursor-pointer
              rounded-xs text-[15px] font-semibold'>
                <UserPlus size={18}/>
                new client</button>
                

         </div>

          <div className='bg-white  border border-gray-100 m-1 rounded-sm overflow-y-auto'>
            <div className='overflow-x-auto'>
             <table>
              <thead>
               <tr className=' bg-gray-100'>
                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2  whitespace-nowrap '>No</th>
                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2 whitespace-nowrap  '>borrower names</th>
                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2  whitespace-nowrap '>client id</th>

                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2  whitespace-nowrap '>nin id</th>
                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2  whitespace-nowrap '>phone</th>
                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2  whitespace-nowrap '>client address</th>
                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2 whitespace-nowrap  '>bussiness type</th>
                <th className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2  whitespace-nowrap '>bussiness location</th>
                <th colSpan={2} className='px-4 text-[14px] font-semibold uppercase text-gray-800 py-2  whitespace-nowrap '>Action</th>
                
               </tr>

              </thead>

              <tbody>
                {Array.from({length:6}).map((data,idx)=>(
                    <tr key={idx}>
                        <td className='px-4 text-[15px]  uppercase text-gray-800 py-2 border-b border-gray-200'>{idx+1}</td>
                         <td className='px-4 text-[15px] font-semibold   text-gray-800 py-2 border-b border-gray-200'>kampire joy</td>
                         <td className='px-4 text-[15px]   text-gray-800 py-3  border-b border-gray-200'>900037</td>
                         <td className='px-4 text-[15px]   text-gray-800 py-3  border-b border-gray-200'>900037890097847567</td>
                         <td className='px-4 text-[15px]   text-gray-800 py-3  border-b border-gray-200'>0798724567</td>
                         <td className='px-4 text-[15px]   text-gray-800 py-3  border-b border-gray-200'>Kampala</td>
                         <td className='px-4 text-[15px]   text-gray-800 py-3  border-b border-gray-200'>Coffee shop</td>
                         <td className='px-4 text-[15px]   text-gray-800 py-3  border-b border-gray-200'>Hoima</td>
                         <td className='px-4 text-[15px]   text-gray-800 py-3  border-b border-gray-200 p-2'>
                            <button className='flex  items-center gap-1 text-[14px] outline-none
                             bg-blue-500 px-4 cursor-pointer
                             rounded-sm text-white py-1.5'>
                            <Pencil size={14}/>
                                Change
                            </button>
                            </td>
                         <td className='px-4   text-gray-800 py-3 
                          border-b border-gray-200 '>
                            <button className='flex  items-center text-[14px] cursor-pointer outline-none
                             gap-1 bg-red-500 px-2 py-1 rounded-sm text-white'>
                              <Trash size={14}/>
                            Delete
                            </button>
                           
                            </td>


                    </tr>
                ))}
              </tbody>

             </table>


            </div>


             <div className='bg-gray-100 p-3 flex justify-between items-center'>
                <button className='text-gray-800 outline-none hover:bg-blue-500 hover:text-white transition-all bg-gray-300 px-1.5  rounded-xs cursor-pointer'><ChevronLeft size={30}/></button> 
                <button className='text-gray-800 outline-none hover:bg-blue-500 hover:text-white transition-all bg-gray-300 px-1.5  rounded-xs cursor-pointer'><ChevronRight size={30}/></button> 

        </div>

        </div>
       

      
        </div>
   )
 }
 