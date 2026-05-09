import { ActivityIcon, Bell, BellDot, CircleCheck, Edit2, PlusCircle, Settings, ToggleLeft, ToggleRight, Save, CreditCard, Clock, BarChart3 } from 'lucide-react'
import React, { useState } from 'react'
import EditCompany_info_model from './EditCompany_info_model'

function AdminSetting() {
    const [isForceLogoutOpen, setForceLogoutOpen] = useState(false)
    const [isAutoNotifOpen, setIsAutoNotifOpen] = useState(true)
    
    let [iscompanyinfoopened,setiscompanyinfoopen]=useState(false)
    
    let opencompanyinfomodel= (e)=>{e.preventDefault();setiscompanyinfoopen(true)}
    let closecompanyinfomodel= ()=>setiscompanyinfoopen(false)

    const iconSize = 27
    const cardStyle = 'bg-white border border-blue-300 p-6 rounded-xl mb-6 shadow-sm transition-all hover:border-blue-400'
    const inputStyle = 'w-full bg-white border border-gray-200 rounded-sm p-2 text-sm text-gray-700 outline-none focus:border-blue-400 transition-all'
    const sectionHeading = 'flex items-center gap-3 text-lg font-extrabold text-gray-700'

    return (
        <div className='min-h-screen bg-white text-gray-700 pb-12'>
            <div className='sticky top-0 z-50 bg-blue-300 p-4'>
                <div className='flex items-center gap-3'>
                    <Settings size={30} className='animate-spin' />
                    <h1 className='text-2xl font-black  tracking-wide'>Setting Panel</h1>
                </div>
               
            </div>

            <div className='max-w-5xl mx-auto mt-10 px-6'>
                
                <div className={cardStyle}>
                    <div className='flex justify-between items-center mb-6 border-b border-gray-100 pb-4'>
                        <h2 className={sectionHeading}>
                            <ActivityIcon size={iconSize} className="text-blue-400" />
                            Manage Company Activity
                        </h2>
                        <button className='flex items-center gap-1 text-gray-700 border cursor-pointer border-gray-200 px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-blue-50 transition-colors'>
                            <PlusCircle size={18} className='text-blue-800 md:text-gray-700 ' /> <span className='hidden md:block'>Add Office</span>
                        </button>
                    </div>

                    <div className='grid md:grid-cols-2 gap-6'>
                        <div className='space-y-4'>
                            <div className={`flex justify-between items-center p-3 rounded-lg border border-gray-100 ${isForceLogoutOpen ? '':'bg-gray-50 border-gray-100 border'}`} >
                                <p className='text-sm font-bold flex items-center gap-2 text-gray-600'>
                                    <CircleCheck size={18} className="text-blue-300" /> Force Logout & block company access
                                </p>
                                <button onClick={() => setForceLogoutOpen(!isForceLogoutOpen)} className="transition-transform active:scale-90">
                                    {isForceLogoutOpen ? <ToggleRight size={iconSize} className="text-blue-400 cursor-pointer" /> : <ToggleLeft size={iconSize} className="text-gray-400 cursor-pointer" />}
                                </button>
                            </div>
                            <div className='flex justify-between items-center p-3 rounded-lg border border-gray-100'>
                                <p className='text-sm font-bold flex items-center gap-2 text-gray-600'>
                                    <CircleCheck size={18} className="text-blue-300" /> Disable Loans Application
                                </p>
                                <input type="checkbox" className='w-4 h-4  cursor-pointer' />
                            </div>
                        </div>

                        <div className='border-2 border-gray-100  p-4 rounded-xl flex justify-between items-center '>
                            <div>
                                <span className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>Company Entity</span>
                                <p className='text-lg font-black text-gray-800'>Akea Finance</p>
                            </div>
                            <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <Edit2 size={22} onClick={opencompanyinfomodel} className='text-blue-400 cursor-pointer' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='grid md:grid-cols-2 gap-6 mb-6'>
                    <div className={cardStyle}>
                        <h2 className='flex items-center gap-3 font-extrabold text-gray-700 mb-6'>
                            <CreditCard size={iconSize} className="text-blue-400" /> Payment Methods
                        </h2>
                        <div className='space-y-1'>
                            {['Crypto', 'Other payments (Momo , Card , Bank)'].map((m) => (
                                <label key={m} className='flex justify-between items-center p-2.5 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 cursor-pointer transition-all'>
                                    <span className='text-sm font-semibold text-gray-600'>{m}</span>
                                    <input type="checkbox" name="payment" className='w-4 h-4' />
                                </label>
                            ))}
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