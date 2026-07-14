
import { Eye, EyeOff, Loader, ShieldCheck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import api from '../api'
import { useParams } from 'react-router-dom'
import HandleFormError from './HandleFormError.jsX'
function SetPassword() {

  const [error, setErrors] = useState({})

  const [showPassword, setShowPassword] = useState(false)

  const [showConfirm, setShowConfirm] = useState(false)
  const [loading,setlaoding]=useState(false)
  const [openmodel,setopenmodel]=useState(null)
  const closemodel=()=>setopenmodel(false)
  const [message,setmessage]=useState(null)
  const [success,setsuccess]=useState(null)

  const {tkn}=useParams()

  const [formData,setFormData]=useState({
    password:"",
    confirmpassword:"",
    tkn
  })


  const handleChange= (e)=>{
    const {name,value}=e.target;
    setFormData((prev)=>({ ...prev,[name]:value }))

    setErrors((prev)=>({...prev,[name]:''}))
  }


  const HandleSubmit=async()=>{

    setlaoding(true)
    setErrors({})

    try{
      const res=await api.post('/Password-setting',formData)
      setsuccess(res.data.success)
      setmessage(res.data.message)
      setopenmodel(true)

    }
    catch(err){
      const data=err.response?.data
      if(data?.errors) {setErrors(data.errors)
         return
        }
      setmessage(data?.message)
      setopenmodel(true)

        
    }finally{
  setlaoding(false)
  }
  }

  useEffect(()=>{
    if(openmodel){
    const timeout=  setTimeout(() => {
      setopenmodel(false);

    }, 8000)

      return ()=>clearTimeout(timeout)
    }
  },[openmodel])


  const InputErrorBorderSwitcher = (field) =>
    `${
      error[field]
        ? 'bg-red-50 border border-red-400 focus:ring-1 focus:ring-red-500'
        : 'border border-gray-200 focus:ring-1 focus:ring-blue-400'
    }`

  return (
    <div className='  bg-gray-100/20 w-screen h-screen'>
      <div className='w-full bg-white'>
        <div className='w-full  shadow-md font-semibold'>

      {openmodel &&<HandleFormError  success={success} message={message}/>}
        </div>



      </div>

    <div className='flex justify-center pt-10'>

      <div className='w-md h-fit rounded-lg p-6'>

        <div className='flex flex-col items-center'>

          <h2 className='uppercase font-extrabold text-3xl text-blue-500 px-2 py-2 pb-4'>
            Equalizer
          </h2>

          <span>
            <ShieldCheck
              size={80}
              className='text-green-600'
            />
          </span>

          <h2 className='text-2xl font-extrabold text-gray-800'>
            Password
          </h2>

          <p className='text-gray-600 text-[13px] capitalize'>
            Enter password here
          </p>

        </div>

        <label
          htmlFor="password"
          className='font-semibold text-[14px] capitalize tracking-tigter text-gray-800'
        >
          Password
        </label>
       <div className='flex flex-col'>

        <div className='relative  '>

          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Password'
            onChange={handleChange}
            className={`w-full text-sm text-gray-800 ${InputErrorBorderSwitcher(
              'password'
            )} rounded-md py-2.5 px-4 pr-12 outline-none`}
          />
             

          <span
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer'
            onClick={() => setShowPassword(!showPassword)}
          >
            {
              showPassword
                ? <EyeOff size={16} />
                : <Eye size={16} />
            }
          </span>
          </div>
          <span className='text-xs text-red-500'>
              {error.password}</span>

        </div>
     

        <label
          htmlFor="password"
          className='font-semibold text-[14px] capitalize tracking-tigter text-gray-800'
        >
          confirm Password
        </label>

        <div className='flex flex-col'>


        <div className='relative  '>

          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder='Confirm'
            name='confirmpassword'
            onChange={handleChange}
            className={`w-full text-sm text-gray-800 ${InputErrorBorderSwitcher(
              'confirmpassword'
            )} rounded-md py-2.5 px-4 pr-12 outline-none`}
          />

          <span
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer'
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {
              showConfirm
                ? <EyeOff size={16} />
                : <Eye size={16} />
            }
          </span>
         

        </div>
         <span className='text-xs text-red-500'>
              {error.confirmpassword}</span>
        </div>


        <button onClick={HandleSubmit} disabled={loading}
          className='w-full bg-blue-400 mt-2 flex items-center justify-center  font-semibold text-sm cursor-pointer text-white py-3 rounded-sm'
        >
          {loading ? <span className='flex gap-1'><Loader size={20} className='animate-spin'/>saving....</span>:' Save Password'}
         
        </button>

      </div>

    </div>

    </div>
  )
}

export default SetPassword

