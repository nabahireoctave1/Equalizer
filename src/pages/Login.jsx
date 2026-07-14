import React, { useEffect, useState } from 'react'
import logo from '../assets/image.jpeg'
import { LoaderIcon, Eye, EyeOff } from 'lucide-react'
import api from '../api'
import HandleFormError from './HandleFormError.jsx'
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import socket, { connectsocket } from '../socket.js'


export default function Login() {

  const [loading, setlaoding] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setErrors] = useState({})
  const [success,setsuccess]=useState(null)
  const [message,setmessage]= useState(null)
    const [openmodel,setopenmodel]=useState(null)
    const navigate=useNavigate();

  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  })

  const handlechanges = (e) => {
    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    setErrors(prev => ({
      ...prev,
      [name]: ''
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setlaoding(true)
      const res = await api.post('/login', formData)
      if(res.data.success===true){
         localStorage.setItem('token',res.data?.tkn)
         const token= localStorage.getItem('token')
         const {role}= jwtDecode(token)
          connectsocket();


        let  timeout= setTimeout(() => {
            switch(role){
          case 'superadmin' :navigate('/sp-Dashboard');break;
          case 'subadmin' : navigate('/sb-Dashboard');break;
          case 'cashier' :navigate('/Client-managent');break;
          default:navigate('/');





         }
         return ()=> clearTimeout(timeout)

          
         }, 4000);


       

        setsuccess(res.data.success)
      setmessage(res.data.message)
      setopenmodel(true)

      }
      

    } catch (err) {

      const data = err.response?.data

      if (data?.errors) {
        setErrors(data?.errors || err.messsage)
        return
      }
      setmessage(data?.message||err.message)
      setopenmodel(true)
      
    } finally {
      setlaoding(false)
    }
  }

 useEffect(()=>{
    if(openmodel){
    const timeout=  setTimeout(() => {
      setopenmodel(false);

    }, 7000)

      return ()=>clearTimeout(timeout)
    }
  },[openmodel])

  const inputErrordector = (field) =>
    `${error[field]
      ? 'bg-red-50 border-red-400 focus:ring-1 focus:ring-red-400'
      : 'border-gray-200 focus:ring-1 focus:ring-blue-300'
    }`

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-blue-50/20'>
      <div className='w-sm bg-white shadow-lg font-semibold cursor-pointer '>      {
        openmodel &&<HandleFormError success={success} message={message}/>
      }
</div>

      <div className='pt-2 pb-7 px-7 w-sm rounded-md m-4'>

        <div className='flex flex-col justify-center items-center'>
          <img src={logo} className='w-30 h-30 object-cover' alt='EQ' />

          <h2 className='text-3xl text-blue-500 font-extrabold uppercase'>
            Equalizer
          </h2>

          <h2 className='font-bold text-2xl'>
            Login
          </h2>
        </div>

        <form onSubmit={handleLogin}>

          <label className='text-gray-800 text-sm font-semibold'>
            Phone No <sup>-</sup>
          </label>

          <div className='flex flex-col py-2'>
            <input
              type='text'
              placeholder='Phone'
              name='phone'
              onChange={handlechanges}
              className={`${inputErrordector('phone')} p-2.5 w-full border rounded-md text-sm outline-none`}
            />

            <span className='text-xs text-red-500'>
              {error.phone}
            </span>
          </div>

          <label className='text-gray-800 text-sm font-semibold'>
            Password
          </label>

          <div className='flex flex-col relative py-2'>

            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              name='password'
              onChange={handlechanges}
              className={`${inputErrordector('password')} p-2.5 w-full border rounded-md text-sm outline-none pr-10`}
            />

            <span
              className='absolute right-3 top-5 text-gray-500 cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}
            >
              {
                showPassword
                  ? <EyeOff size={18} />
                  : <Eye size={18} />
              }
            </span>

            <span className='text-xs text-red-500'>
              {error.password}
            </span>

          </div>

          <button
          disabled={loading}
          
          className='bg-blue-400 mt-4 flex justify-center items-center w-full p-3 rounded-md text-white text-sm font-semibold hover:cursor-pointer'>

            {
              loading
                ? (
                  <span className='flex gap-2'>
                    <LoaderIcon size={20} className='animate-spin' />
                    Authenticating...
                  </span>
                )
                : 'Login'
            }

          </button>

        </form>

      </div>

    </div>
  )
}