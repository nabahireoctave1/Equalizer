import { ActivityIcon, Bell, BellDot, CircleCheck, SaveIcon,Edit2, PlusCircle, Settings, ToggleLeft, ToggleRight, Save, CreditCard, Clock, BarChart3, Languages, AlertCircle, MonitorCog } from 'lucide-react'
import React, { useState } from 'react'
import EditCompany_info_model from './EditCompany_info_model'

function AdminSetting() {
    const [isForceLogoutOpen, setForceLogoutOpen] = useState(false)
    const [isAutoNotifOpen, setIsAutoNotifOpen] = useState(true)
    
    let [iscompanyinfoopened,setiscompanyinfoopen]=useState(false)
    
    let opencompanyinfomodel= (e)=>{e.preventDefault();setiscompanyinfoopen(true)}
    let closecompanyinfomodel= ()=>setiscompanyinfoopen(false)

    const iconSize = 27
    const cardStyle = 'bg-white border border-gray-200 p-6 rounded-lg mb-6  transition-all hover:border-blue-300'
    const inputStyle = 'w-full bg-white border border-gray-200 rounded-sm p-2 text-sm text-gray-700 outline-none focus:border-blue-400 transition-all'
    const sectionHeading = 'flex items-center gap-3 text-lg font-extrabold text-gray-700'

    return (
        <div className='min-h-screen bg-gray-50 text-gray-700 pb-12'>
          
           

            <div className='max-w-5xl mx-auto mt-10 px-6'>
                
                <div className={cardStyle}>
                    <div className='mb-6  '>
                        <h2 className={sectionHeading}>
                            <ActivityIcon size={iconSize} className="text-blue-400" />
                            Manage Company Activity
                        </h2>
                       
                    </div>

                    <div className='grid md:grid-cols-2 gap-6'>
                        <div className='space-y-4'>
                            <div className={`flex justify-between items-center p-3 rounded-lg border border-gray-100 ${isForceLogoutOpen ? '':'bg-gray-50 border-gray-100 border'}`} >
                                <p className='text-sm font-bold flex items-center gap-2 text-gray-600'>
                                    <CircleCheck size={18} className="text-blue-300" /> Force Logout & block company access
                                </p>
                                <button onClick={() => setForceLogoutOpen(!isForceLogoutOpen)} className="transition-transform active:scale-90">
                                    {isForceLogoutOpen ? <ToggleRight size={iconSize} className="text-red-400 cursor-pointer" /> : <ToggleLeft size={iconSize} className="text-gray-400 cursor-pointer" />}
                                </button>
                            </div>
                            <div className='p-3 rounded-lg border border-gray-100'>
                                <p className='text-sm font-bold flex items-center gap-2 text-gray-600'>
                                    <CircleCheck size={18} className="text-blue-300" />
                                     Disable Loans Application
                                </p>
                                <button  className=' px-3 py-1 w-45 mt-2 text-white rounded-md font-semibold mx-6  bg-red-400 cursor-pointer'>Disable</button>
                            </div>
                        </div>

                        <div className='border-2 border-gray-50  p-4 rounded-xl flex justify-between items-center '>
                            <div>
                                <span className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>Company Entity</span>
                                <p className='text-lg font-extrabold text-gray-800 uppercase'>Akea Finance</p>
                            </div>
                            <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <Edit2 size={22} onClick={opencompanyinfomodel} className='text-blue-400 cursor-pointer' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='grid md:grid-cols-2 gap-6 mb-6'>
                    <div className={cardStyle}>
                        <h2 className='flex items-center gap-3 font-extrabold text-gray-700 mb-6 capitalize'>
                            <MonitorCog className='text-blue-400'/> Work space configuration
                        </h2>
                        <div className='space-y-1 pb-2'>
                            <h2 className='font-bold uppercase text-xs'>Report generation time </h2>
                            <input type='text' value={'6:08 PM'} name="" id="" className='w-full border border-gray-100 rounded-md outline-none focus:ring-1 focus:ring-blue-300 text-sm text-gray-700 p-2'/>
                        
                        </div>
                        <div className='space-y-1 py-2'>
                            <h2 className='font-bold uppercase text-xs'>Enable notification </h2>
                               <button className='bg-blue-400 w-30 text-sm cursor-pointer text-white rounded-md p-2'>
                                Enable 
                               </button>
                        </div>
                        <div className='space-y-1 py-6'>
                            <h2 className='font-bold uppercase text-xs'>add Branch </h2>
                               <button className='bg-blue-400 w-30 flex gap-2 text-sm cursor-pointer text-white rounded-md p-2'>
                                <PlusCircle size={17}/> Branch
                               </button>
                        </div>
                    </div>

                    <div className={cardStyle}>
                        <h2 className='flex items-center gap-3 font-extrabold text-gray-700 mb-6'>
                            <Clock size={iconSize} className="text-blue-400" /> Terms & Penalties
                        </h2>
                        <div className='space-y-4'>
                           <div>
                                <label className='text-[10px] font-black text-gray-700 uppercase block mb-1.5'>Office name</label>
                                <select className={inputStyle} >
                                  <option value="">Musanze akea office</option>
                                  <option value="">Rubavu akea office</option>
                                  <option value="">Kigali tech </option>
                                </select>
                            </div>
                            <div>
                                <label className='text-[10px] font-black text-gray-700 uppercase block mb-1.5'>Default Interest Rate %</label>
                                <input type="text" placeholder="0.00" className={inputStyle} />
                            </div>
                            <div>
                                <label className='text-[10px] font-black text-gray-700 uppercase block mb-1.5'>Grace Period (Days)</label>
                                <input type="text" placeholder="5" className={inputStyle} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cardStyle}>
                    <div className='flex justify-between items-center mb-6'>
                        <h2 className={sectionHeading}>
                            <BellDot size={iconSize} className="text-blue-400" /> Notifications
                        </h2>
                        <select className='bg-white border
                         border-gray-200 text-gray-700 text-xs font-bold p-2 px-4 rounded-full
                          outline-none cursor-pointer hover:border-blue-300 transition-colors'>
                            <option>SMS</option>
                            <option>Email</option>
                            <option>WhatsApp </option>
                        </select>
                    </div>

                    <div className='flex justify-between items-center p-4 border border-gray-100 rounded-xl mb-6 bg-gray-50/50'>
                        <h3 className='flex items-center gap-2 font-black text-gray-700'>
                            <Bell size={22} className="text-blue-400" /> Auto-Notify
                        </h3>
                        <button onClick={() => setIsAutoNotifOpen(!isAutoNotifOpen)}>
                            {isAutoNotifOpen ? <ToggleRight size={30} className="text-blue-400" /> : <ToggleLeft size={30} className="text-gray-300" />}
                        </button>
                    </div>

                    <div className='grid md:grid-cols-2 gap-4'>
                        {isAutoNotifOpen ? (
                            <>
                                <div>
                                    <label className='text-[10px] font-black text-gray-700 uppercase block mb-1.5'>Reminder Message</label>
                                    <textarea className={`${inputStyle} h-28 resize-none p-3`} placeholder="Enter text..."></textarea>
                                </div>
                                <div>
                                    <label className='text-[10px] font-black text-gray-700 uppercase block mb-1.5'>Overdue Message</label>
                                    <textarea className={`${inputStyle} h-28 resize-none p-3`} placeholder="Enter text..."></textarea>
                                </div>
                            </>
                        ) : (
                            <div className='col-span-2'>
                                <label className='text-[10px] font-black text-gray-700 uppercase block mb-1.5'>Manualy-Notify</label>
                                <textarea className={`${inputStyle} h-28 resize-none p-3`} placeholder="Message for all users..."></textarea>
                            </div>
                        )}
                    </div>
                </div>

                <div className='border border-blue-300 p-6 rounded-2xl flex items-center justify-between bg-white shadow-sm'>
                      
                                              <div>
                            <p className='font-black uppercase tracking-tight text-gray-800 flex gap-2'><BarChart3 className='text-blue-500'/>Audit Generation Period</p>
                            <p className='text-xs text-gray-700 font-bold tracking-wide'>Manage system report frequency</p>
                        </div>

                        
                         <select  className='bg-white  text-gray-700 border border-gray-100  p-2  text-sm m-2 rounded-full  outline-none cursor-pointer'>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                    </select>
                    </div>
                     <div className='flex justify-end p-4'>
                    <button className='bg-blue-400 py-2 px-8 text-white cursor-pointer text-sm  flex  gap-2 rounded-md'><SaveIcon size={20}/>save all </button>
                </div>
                   
                </div>

               
             {iscompanyinfoopened &&(
                <div className='fixed inset-0 z-50 '>
                   <EditCompany_info_model onclose={closecompanyinfomodel}/> 
                </div>
             )}
        </div>
    )
}

export default AdminSetting;