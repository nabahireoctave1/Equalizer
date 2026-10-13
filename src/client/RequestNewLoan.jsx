import React, { useState } from 'react'
import api from '../api';
import { LoaderCircle } from 'lucide-react';

function RequestNewLoan() {

  const [formData,setFormData]=useState({
    clientID:null,
    Loanamount:null,
    guarantor:null,
    guarantorContact:null,
    guarantorAddress:null,
    })

    const [Error,setErrror]=useState({});
    const [Loading,setLoading]=useState(null);


    const HandleChanges= (e)=>{
    const {name,value}=e.target;
    setFormData((prev)=>({...prev,[name]:value}))
    setErrror((prev)=>({...prev,[name]:''}));

    }

    const HandleRequestNow= async(e)=>{
      e.preventDefault();
      setLoading(true)
      try{

         const res=await api.post('/newLoan-Request',formData);
         console.log(res.data)

      }
      catch(err){
        const data= err.response?.data;
        if(data?.error){
          setErrror(data.error);
          return
        }

      } finally{
        setLoading(false);
      }
    }


  const Inputstyle= (field)=>`${Error[field] ? 'bg-red-50 border-red-500 focus:ring-1 focus:ring-red-400'
    :'focus:ring-2 focus:ring-blue-400 bg-gray-50 border-gray-200 '} 
  border w-full p-2 rounded-sm text-gray-800 text-[15px]  outline-none
          `

  return (
    <div className='flex items-center justify-center m-3'>
      <div className='w-4/5  shadow-xl rounded-md border px-4   bg-white border-gray-200 shadow-gray-200'>
            <div className='pt-4  border-b border-gray-100 pb-8'>
            <h2 className='text-2xl uppercase text-gray-800 font-extrabold'>Loan Request Portal </h2>
            <p className='first-letter:uppercase text-[15px] text-gray-800 capitalize'>
              fill information required to procced your new loan application </p>
            </div>
            
        <div className='w-full px-6 py-2 ' >
               <div>
        <form action="" onSubmit={HandleRequestNow}>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
          <div>
            <div>
                   <label htmlFor="" className='text-gray-700 font-semibold  text-[13px] uppercase '>Borrower ID</label><br></br>
                 <input type="text" placeholder='8002432' name='clientID' onChange={HandleChanges} className={Inputstyle('clientID')}/><br></br>
                  <span className='text-[14px] text-red-500'>{Error.clientID}</span>
            </div>
        <div>
         <label htmlFor="" className='text-gray-700 font-semibold  text-[13px] uppercase'>Loan</label><br></br>
         <input type="text" placeholder='1000000' name='Loanamount'  onChange={HandleChanges} className={Inputstyle('Loanamount')}/><br></br>
           <span className='text-[14px] text-red-500'>{Error.Loanamount}</span>
             
        </div>
     
          </div>

          <div>
             <div>

             </div>
             <div>
          <label htmlFor="" className='text-gray-700 font-semibold  text-[13px] uppercase '>Guarantor</label><br></br>
         <input type="text" placeholder='Kampire joy' name='guarantor' onChange={HandleChanges} className={Inputstyle('guarantor')}/><br></br>
         <span className='text-[14px] text-red-500'>{Error.guarantor}</span>
             </div>
        
        <div>
            <label htmlFor="" className='text-gray-700 font-semibold  text-[13px] uppercase '>guarantor contacts</label><br></br>
         <input type="text" placeholder='26783465688' className={Inputstyle('guarantorContact')} name="guarantorContact" onChange={HandleChanges}/><br></br>
         <span className='text-[14px] text-red-500'>{Error.guarantorContact}</span>
          

        </div>
       
          </div>
          </div>

            <div>
                <label htmlFor="" className='text-gray-700 font-semibold text-[13px] uppercase '>guarantor address</label><br></br>
         <input type="text" placeholder='Kampala' className={Inputstyle('guarantorAddress')} onChange={HandleChanges} name="guarantorAddress" /><br></br>
           <span className='text-[14px] text-red-500'>{Error.guarantorAddress}</span>

            </div>
       
           <div className='flex justify-end pt-4 pb-2 '>
          <button className='bg-blue-500  px-4 rounded-sm p-2
           text-white text-[15px] cursor-pointer
          outline-none  capitalize hover:bg-blue-400'>{Loading ? 
          <span className='flex gap-1 items-center'><LoaderCircle size={18} className='animate-spin'/><p>Requesting...</p></span>:'request now'}</button>

           </div>
         </form>
       </div>


        </div>

      </div>


    </div>
  )
}

export default RequestNewLoan