import { LoaderCircle, Space, XIcon } from 'lucide-react'
import React, { useState } from 'react'
import api from '../api';

function NewBorrowerModel({Onclose}) {
  const [formData,setFormData]=useState({
  name:null,
  ninid:null,
  phone:null,
  client_address:null,
  client_B_type:null,
  client_B_location:null,
  client_B_Name:null

  })

  const [errors,setErrors]=useState({});
  const [Loading,setLoading]=useState(null);
  

  const HandleChanges= (e)=>{
    const {name,value}=e.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))

    setErrors((prev)=>({
      ...prev,
      [name]:''
    }))
  
   }

     const HandlesaveBorrowerinfo= async()=>{
      
      setErrors({});
      setLoading(true)
       try{
        const res= await api.post('/saveBorrower-info',formData);
          //  console.log(res);
       }

       catch(err){
              const data= err.response?.data;
              if(data?.error){
                setErrors(data.error);
                return
              }

       }finally{
        setLoading(false);
       }
    }

    console.log(errors)

  const InpuStyle= (field)=>`${errors[field] ?'bg-red-50 border-red-400 focus:ring-red-500 ' :'bg-gray-50/50 border-gray-200  focus:ring-blue-400'} 
   border  w-full p-2 rounded-sm placeholder:text-gray-400 text-[15px] text-gray-800 focus:ring-1
   transition  outline-none` 

  return (
    <div className='fixed inset-0 z-50   justify-center  flex bg-black/90 overflow-auto'>
   
   <div className='bg-white max-w-4xl w-full  mt-10 h-fit rounded-md'>
    <div className='bg-blue-400 p-6 rounded-t-md'> 
      <span className='flex justify-end'><button className='text-white cursor-pointer' onClick={Onclose}>
        <XIcon size={18}/></button></span>
       <span>
    <h2 className='text-3xl text-white uppercase text-center font-extrabold'>Borrower Registration Portal</h2>       </span>


    </div>
    
    <div className='px-6 py-6'>
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 space-y-2'>
          <div className='space-y-3'>
           <div>
            <h2 className="text-gray-700 text-sm font-medium  capitalize mb-1">Borrower Name</h2>
           <input type="text" name='name' onChange={HandleChanges} placeholder='John Doe' className={InpuStyle('name')} />
            <span className='text-[14px] text-red-500'>{errors.name}</span>
           </div>

             <div>
              <h2 className="text-gray-700 text-sm font-medium  capitalize mb-1">NIN ID</h2>
               <input type="text" name='ninid' onChange={HandleChanges} placeholder='1200680057694073' className={InpuStyle('ninid')} />
            <span className='text-[14px] text-red-500'>{errors.ninid}</span>
                 
            </div>
             
              <div>
              <h2 className='text-gray-700 text-sm font-medium capitalize mb-1'>Phone</h2>
              <input type="text" name='phone' onChange={HandleChanges} placeholder='7877364534'  className={InpuStyle('phone')}/>
            <span className='text-[14px] text-red-500'>{errors.phone}</span>
               
            </div>

            </div>
          
          <div className='space-y-3'>
        <div>
          <h2 className="text-gray-700 text-sm font-medium  capitalize mb-1">Client Address</h2>
          <input type="text" name='client_address' onChange={HandleChanges} placeholder='Hoima' className={InpuStyle('client_address')} />
            <span className='text-[14px] text-red-500'>{errors.client_address}</span>
          
        </div>
        <div>
          <h2 className="text-gray-700 text-sm font-medium  capitalize mb-1">Client bussiness Type</h2>
          <select name='client_B_type' onChange={HandleChanges}  className={InpuStyle('client_B_type')} id="">
            <option value="Limited liabilities">Limited Liabilities</option>
            <option value="sole properiator ship">Sole Properiator Ship</option>
          </select>
            <span className='text-[14px] text-red-500'>{errors.client_B_type}</span>

        </div>
        <div>
          <h2 className="text-gray-700 text-sm font-medium  capitalize mb-1">
            bussiness Name
          </h2>
          <input type="text" name='client_B_Name' onChange={HandleChanges} placeholder='Coffeeshop' className={InpuStyle('client_B_Name')} />
            <span className='text-[14px] text-red-500'>{errors.client_B_Name}</span>
          
        </div>


          </div>


      </div>
      <div>
      <h2 className="text-gray-700 text-sm font-medium  capitalize mb-1">client  bussiness Location</h2> 
      <input type="text" name='client_B_location' onChange={HandleChanges} placeholder='Kampala' className={InpuStyle('client_B_location')} />
            <span className='text-[14px] text-red-500'>{errors.client_B_location}</span>
      
      </div>

       <div className='flex justify-end gap-2 mt-4 '>
           <button onClick={Onclose} className='capitalize bg-gray-200 px-5 py-2 
           rounded-sm border-none outline-none  text-gray-800 text-[15px] cursor-pointer'>
          cancel
      </button>
      <button onClick={HandlesaveBorrowerinfo} className='capitalize bg-blue-400 px-5 py-2 
      rounded-sm border-none outline-none  text-white text-[15px] cursor-pointer'>
        {Loading ? <span className='flex gap-1 items-center justify-center'>
          <LoaderCircle size={18} className='animate-spin'/>
          <p>registering...</p>
        </span>:'register'}
      </button>
       </div>
     

      </div>

      

   </div>

    </div>
  )
}

export default NewBorrowerModel