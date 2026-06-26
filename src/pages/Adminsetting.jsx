import { ActivityIcon, Bell, BellDot, CircleCheck, SaveIcon,Edit2, PlusCircle, Settings, ToggleLeft, ToggleRight, Save, CreditCard, Clock, BarChart3, Languages, AlertCircle, MonitorCog } from 'lucide-react'
import React, { useState } from 'react'
import EditCompany_info_model from './EditCompany_info_model'
import { useTranslation } from 'react-i18next'

function AdminSetting() {
    const [isForceLogoutOpen, setForceLogoutOpen] = useState(false)
    const [isAutoNotifOpen, setIsAutoNotifOpen] = useState(true)
    const [isofficechargeopen,setisofficechargeopen]=useState(true)
    
    let [iscompanyinfoopened,setiscompanyinfoopen]=useState(false)
    
    let opencompanyinfomodel= (e)=>{e.preventDefault();setiscompanyinfoopen(true)}
    let closecompanyinfomodel= ()=>setiscompanyinfoopen(false)
    const {t}=useTranslation()

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
                            {t('ads.manage_company_activity')}
                        </h2>
                       
                    </div>

                    <div className='grid md:grid-cols-2 gap-6'>
                        <div className='space-y-4'>
                            <div className={`flex justify-between items-center p-3 rounded-lg border border-gray-100 ${isForceLogoutOpen ? '':'bg-gray-50 border-gray-100 border'}`} >
                                <p className='text-sm font-bold flex items-center gap-2 text-gray-600'>
                                    <CircleCheck size={18} className="text-blue-300" />{t('ads.force_logout')}
                                </p>
                                <button onClick={() => setForceLogoutOpen(!isForceLogoutOpen)} className="transition-transform active:scale-90">
                                    {isForceLogoutOpen ? <ToggleRight size={iconSize} className="text-red-400 cursor-pointer" /> : <ToggleLeft size={iconSize} className="text-gray-400 cursor-pointer" />}
                                </button>
                            </div>
                            <div className='p-3 rounded-lg border border-gray-100'>
                                <p className='text-sm font-bold flex items-center gap-2 text-gray-600'>
                                    <CircleCheck size={18} className="text-blue-300" />
                                     {t('ads.disable_loans_application')}
                                </p>
                                <button  className=' px-3 py-1 w-45 mt-2 text-white rounded-md 
                                font-semibold mx-6  bg-red-400 cursor-pointer'>{t('ads.disable')}</button>
                            </div>
                        </div>

                        <div className='border-2 border-gray-50  p-4 rounded-xl flex justify-between items-center '>
                            <div>
                                <span className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>{t('ads.company_entity')}</span>
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
                            <MonitorCog className='text-blue-400'/> {t('ads.workspace_configuration')}
                        </h2>
                        <div className='space-y-1 pb-2'>
                            <h2 className='font-bold uppercase text-xs'>{t('ads.report_generation_time')}</h2>
                            <input type='text' value={'6:08 PM'} name="" id="" className='w-full border border-gray-100 rounded-md outline-none focus:ring-1 focus:ring-blue-300 text-sm text-gray-700 p-2'/>
                        
                        </div>
                        <div className='space-y-1 py-2 '>
                            <h2 className='font-bold uppercase text-xs'>{t('ads.enable_notification')}</h2>
                            <div className='flex justify-between'>
                            <h2 className='text-sm py-2 capitalize'>{t('ads.enable_incoming_notifications')}</h2>
                               <button className='cursor-pointer   text-blue-400 rounded-full '>
                                <ToggleLeft/>
                               </button>
                               </div>
                        </div>
                        <div className='space-y-1 py-6'>
                            <h2 className='font-bold uppercase text-xs'>{t('ads.add_branch')}</h2>
                               <button className='bg-blue-400 w-30 flex gap-2 text-sm cursor-pointer text-white rounded-md p-2'>
                                <PlusCircle size={17}/> {t('ads.branch')}
                               </button>
                        </div>
                    </div>

                    <div className={cardStyle}>
                        <h2 className='flex items-center gap-3 font-extrabold text-gray-700 mb-6'>
                            <Clock size={iconSize} className="text-blue-400" /> {t('ads.terms_penalties')}
                        </h2>
                        <div className='space-y-4'>
                           <div>
                                <label className='text-[12px] font-semibold text-gray-700 uppercase block mb-1.5'>{t('ads.office_name')}</label>
                                <select className={inputStyle} >
                                  <option value="">Musanze akea office</option>
                                  <option value="">Rubavu akea office</option>
                                  <option value="">Kigali tech </option>
                                </select>
                            </div>
                            <div>
                                <label className='text-[12px] font-semibold text-gray-700 uppercase block mb-1.5'>{t('ads.default_interest_rate')}</label>
                                <input type="text" placeholder="0.00" className={inputStyle} />
                            </div>
                            <div>
                                <label className='text-[10px] font-black text-gray-700 uppercase block mb-1.5'>{t('ads.grace_period')}</label>
                                <input type="text" placeholder="5" className={inputStyle} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cardStyle}>
                    <div className='flex justify-between items-center mb-6'>
                        <h2 className={sectionHeading}>
                            <BellDot size={iconSize} className="text-blue-400" /> {t('ads.notifications')}
                        </h2>
                        <select className='bg-white border
                         border-gray-200 text-gray-700 text-xs font-bold p-2 px-4 rounded-full
                          outline-none cursor-pointer hover:border-blue-300 transition-colors'>
                            <option>SMS</option>
                            <option>WhatsApp </option>
                        </select>
                    </div>

                    <div className='flex justify-between items-center p-4 border border-gray-100 rounded-xl mb-6 bg-gray-50/50'>
                        <h3 className='flex items-center gap-2 font-black text-gray-700'>
                            <Bell size={22} className="text-blue-400" />{t('ads.auto_notify')}
                        </h3>
                        <button onClick={() => setIsAutoNotifOpen(!isAutoNotifOpen)}>
                            {isAutoNotifOpen ? <ToggleRight size={30} className="text-blue-400" /> 
                            : <ToggleLeft size={30} className="text-gray-300" />}
                        </button>
                    </div>

                    <div className='grid md:grid-cols-2 gap-4'>
                        {isAutoNotifOpen ? (
                            <>
                                <div>
                                    <label className='text-[10px] font-black text-gray-700 uppercase block mb-1.5'>{t('ads.reminder_message')}</label>
                                    <textarea className={`${inputStyle} h-28 resize-none p-3`} placeholder={t('ads.reminder_message')}></textarea>
                                </div>
                                <div>
                                    <label className='text-[10px] font-black text-gray-700 uppercase block mb-1.5'>{t('ads.overdue_message')}</label>
                                    <textarea className={`${inputStyle} h-28 resize-none p-3`} placeholder={t('ads.overdue_message')}></textarea>
                                </div>
                            </>
                        ) : (
                            <div className='col-span-2'>
                                <label className='text-[10px] font-black text-gray-700 uppercase block mb-1.5'>{t('ads.manual_notify')}</label>
                                <textarea className={`${inputStyle} h-28 resize-none p-3`} placeholder={`${t('ads.enter_text')}`}></textarea>
                                 <div className='flex justify-between  mt-2 '>

                                 <button className='bg-blue-400 py-2  rounded-sm text-sm
                                  text-white  px-4 first-letter:uppercase'>{t('ads.send_all')}</button>
                                 <div className='flex gap-2 text-sm'>

                                 <button className='bg-blue-400 py-2 gap- rounded-sm text-sm text-white  px-4 first-letter:uppercase'>
                                     {t('ads.specific_user')}
                                    </button>
                                 <select name="" className='border border-gray-200 px-2 rounded-sm focus:ring-1 focus:ring-gray-300' id="">
                                     <option value="">james</option>
                                     <option value="">Keza jes</option>
                                     <option value="">john</option>
                                    </select>
                                 </div>

                                 </div>
                                  

                            </div>
                        )}
                    </div>
                </div>


                <div className={`${cardStyle} mt-4 border border-gray-200 rounded-2xl p-5 bg-white shadow-sm`}>
  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
    <div>
      <h2 className="font-black uppercase tracking-tight text-gray-800 ">
        {t('ads.set_office_charge')}
      </h2>
      <p className="text-xs text-gray-500">
        {t('ads.configure_office_charge_ranges')}
      </p>
    </div>

    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-500">{t('ads.off')}</span>

      <button
        onClick={() => setisofficechargeopen(!isofficechargeopen)}
        className={`transition-all cursor-pointer ${
          isofficechargeopen
            ? "text-blue-400"
            : "text-gray-400"
        }`}
      >
        {isofficechargeopen ? (
          <ToggleRight size={28} />
        ) : (
          <ToggleLeft size={28} />
        )}
      </button>

      <span className="text-lg font-medium text-blue-500">{t('ads.on')}</span>
    </div>
  </div>

  {isofficechargeopen ? (
    <div>
    <div className="mt-5 space-y-4 grid grid-cols-1 gap-3  md:grid-cols-2">
      <div>
        <label className="block text-[13px] text-gray-700 mb-2">
          {t('ads.startup_cash')}
        </label>
        <input
          type="text"
          placeholder="1000"
          className="w-full h-12 px-4 rounded-sm border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

      <div>
        <label className="block text-[13px] font-medium text-gray-700 mb-2">
          {t('ads.ending_cash')}
        </label>
        <input
          type="number"
          placeholder="10000"
          className="w-full h-12 px-4 rounded-sm border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

    </div>
    
      <div className="flex justify-between gap-3 pt-3">
        

        <button
          className="px-4 py-2 rounded-sm text-sm cursor-pointer bg-blue-400 text-white "
        >
          {t('ads.save_changes')}
        </button>
        <button
          className="px-5 py-2 rounded-md border text-sm  cursor-pointer border-gray-300 text-gray-700 bg-gray-100"
        >
           {t('ads.new')}
        </button>
      </div>
    </div>
  ) : (
    <div className="mt-5 bg-gray-50  border-gray-300 rounded-sm p-6 text-center">
      <p className="text-sm text-red-400">
        {t('ads.office_charge_disabled')}
      </p>
    </div>
  )}
</div>
                <div className={`${cardStyle} flex 
                flex-col sm:flex-row items-center justify-between bg-white `}>
                      
                         <div>
                            <p className='font-black uppercase tracking-tight text-gray-800 flex gap-2'>
                                <BarChart3 className='text-blue-500'/>{t('ads.audit_generation_period')}</p>
                            <p className='text-xs text-gray-700 font-bold tracking-wide'>{t('ads.manage_system_report_frequency')}</p>
                        </div>

                        
                         <select  className='bg-white  w-full md:w-40
                           text-gray-700 border border-gray-300  p-2  text-xs m-2 rounded-full  
                           outline-none cursor-pointer'>
                        <option>{t('ads.daily')}</option>
                        <option>{t('ads.weekly')}</option>
                        <option>{t('ads.monthly')}</option>
                    </select>
                    </div>

               
                     <div className='flex justify-end p-4'>
                    <button className='bg-blue-400 py-2 px-8 text-white cursor-pointer text-sm 
                     flex  gap-2 rounded-md'><SaveIcon size={20}/>{t('ads.save_all')}</button>
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