import { Camera } from 'lucide-react'
import React, { useState } from 'react'

function EditprofileModel() {
    const [img, setimg] = useState(null);
  
    const handleimgChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setimg(URL.createObjectURL(file));
      }
    };

    
  return (
    <div className='flex justify-center  bg-black/60 items-center h-screen'>
        <div className='w-2/5 shadow-lg rounded-md px-6 py-4 bg-white h-fit '>
            <div className=''>
             <h2>Edit Profile</h2>
               </div>
            <div>

               <form >
                 <div className='relative flex justify-center'>
                <div className='border border-gray-100 w-fit h-fit rounded-full mb-6'>
                <img src={img? 
                    img:''}
                    className={`w-23  h-23 ${img ? '':'bg-gray-200 shadow'}  rounded-full object-cover`}  alt="" />
                    
                     <label className="absolute bottom-1 left-15   bg-blue-600 p-2  rounded-full text-white cursor-pointer">
                     <Camera size={16} />
                 <input type="file" onChange={handleimgChange}  className="hidden" />
                 </label>

                 </div>

                </div>
                 <label htmlFor="fullname" className='text-sm capitalize font-semibold'>Names</label><br></br>
                 <input type="text" name="" id="" className='p-2 w-full rounded-sm border border-gray-100  text-sm focus:ring-1 outline-none focus:ring-blue-400 text-gray-800'/><br></br>
                  <label htmlFor="email" className='text-sm capitalize font-semibold'>Email</label><br></br>
                 <input type="text" name="" id="" className='p-2 w-full rounded-sm border border-gray-100  text-sm focus:ring-1 outline-none focus:ring-blue-400 text-gray-800'/><br></br>
                  <label htmlFor="location" className='text-sm capitalize font-semibold'>Location</label><br></br>
                 <input type="text" name="" id="" className='p-2 w-full rounded-sm border border-gray-100  text-sm focus:ring-1 outline-none focus:ring-blue-400 text-gray-800'/><br></br>
                  <label htmlFor="phone" className='text-sm capitalize font-semibold'>phone No</label><br></br>
                 <input type="text" name="" id="" className='p-2 w-full rounded-sm border border-gray-100  text-sm focus:ring-1 outline-none focus:ring-blue-400 text-gray-800'/><br></br>
                  <label htmlFor="company" className='text-sm capitalize font-semibold'>company</label><br></br>
                 <input type="text" name="" id="" className='p-2 w-full rounded-sm border border-gray-100  text-sm focus:ring-1 outline-none focus:ring-blue-400 text-gray-800'/><br></br>
                  <div className='flex gap-2 justify-end'>
                 <button className='bg-blue-500 mt-3 p-3 w-30 rounded-sm text-white text-sm'>Cancel</button>

                 <button className='bg-blue-500 mt-3 p-3 w-30 rounded-sm text-white text-sm'>Edit</button>
                   
                  </div>
               
               
                
                
                </form>  
              


            </div>


        </div>
        
        </div>
  )
}

export default EditprofileModel