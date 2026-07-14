import React, { useEffect, useState } from 'react';
import { ToggleRight, ToggleLeft, Lock, Unlock, Bell, CreditCard, AlertTriangle, Save, CheckCircle2, Award, Loader } from 'lucide-react';
import api from '../api';
import socket from '../socket';
import HandleErrormodel from './HandleErrormodel'

function Setting() {
  const [isAutoNotifOpen, setAutoNotif] = useState(true);
  
  const [lockagent, setLockagent] = useState(false);
  const [lockNotif, setLockNotif] = useState(false);
  const [lockPenalties, setLockPenalties] = useState(false);
  const [loading,setlaoding]=useState(false)
  const [manualynotify,setmanualynotif]=useState(null)
  const [ismodelopen,setismodelopen]= useState(false)
    const [message,setmessage]=useState(null)
    const [success,setsuccess]=useState(null)
    const closemodel= ()=>setismodelopen(false)
    const [companyadmin,setcompanyadmin]=useState([]);
    const [selectCompany,setselectedCompany]=useState('')
    
  const [settingdata,setsettingData]= useState({
    reminder:'',
    overdue:'' ,
    interest:'',
    graceperiod:'',
    lockafter:'',
    agentreward:''

    
    
   
  })

  const [errors,setErrors]=useState({})



  const FetchCurrentSetting= async()=>{
    try{
      const response= await api.get('/current-setting');
      setsuccess(response.data.success)
      const current= response.data
      setsettingData({
        reminder:current.reminder,
        overdue:current.overdue,
        interest:current.interest_percentage_ration,
        graceperiod:current.grace_period,
        lockafter:current.lock_after_days,
        agentreward:current.agent_amount


      })


    }
    catch(err){
      const data= err.response?.data.message
      setmessage(data)
      setismodelopen(true);
    }
  }


  const GetcompanyAdmin= async()=>{
    const res=await api.get('/company-admin');
    setcompanyadmin(res.data);
    
if (!selectCompany && res.data.length > 0) {
    setselectedCompany(res.data[0].company_id);
  }
    }
    
  

   useEffect(()=>{
    FetchCurrentSetting();
    GetcompanyAdmin()
   },[])



  const handesendtoall= ()=>{
    socket.emit('send-notification-to-all',manualynotify)
  }
  
let HandleSendTo = () => {
  socket.emit("send-to-company", {companyid: selectCompany ,notification:manualynotify} );
};
     


  const handleChange= (e)=>{
    const {name,value}= e.target;
    setsettingData((prev)=>({
      ...prev,
      [name]:value
    }))

    setErrors((prev)=>({...prev,[name]:''}))
  }


  const handlesaveall= async()=>{
    setErrors({});
    setlaoding(true)
   try{
    const res= await api.post('/save-setting',settingdata)
    if(res.data.success===true){
      setsuccess(res.data.success)
      setmessage(res.data.message)
      setismodelopen(true)
    }




   }
   catch(err){
    const data= err.response?.data||e.message
    if(data.errors){setErrors(data.errors)  
      return
    }
    setmessage(data?.message)
    setismodelopen(true)

   }
   finally{
    setlaoding(false)
   }

  }





  const inputErrorborderSwitcher=(filed)=>`${
    errors[filed] ? 'border  border-red-400  outline-none focus:ring-1  focus:ring-red-500':''
  }`
  const cardStyle = "bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6 transition-all duration-300";
  const labelStyle = "block text-sm font-bold text-gray-800 mb-4 capitalize tracking-wider";
  const inputStyle = `  w-full p-3 bg-gray-50   rounded-md focus:ring-1 focus:ring-blue-300 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed`;
  
  const selectableBox = (isActive, isDisabled) => `
    flex items-center justify-between text-sm p-4 rounded-md border-1 transition-all 
    ${isActive ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-100 bg-gray-50 text-gray-400'}
    ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-200'}
  `;

  return (
    <div className="min-h-screen bg-[#F9FAFB] w-full overflow-auto py-12 px-2 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">{isAutoNotifOpen ?'System Settings':"Manualy notification"}</h2>
            <p className="text-gray-500 mt-2 font-semibold">{isAutoNotifOpen ? 'Manage application settings.' :<span className='capitalize text-[13px]'>you can send manualy notification to your client </span>}</p>
          </div>
          <button 
          onClick={handlesaveall}
          disabled={isAutoNotifOpen===false||loading}
          
          className={`${isAutoNotifOpen  ?' bg-blue-500 shadow-md shadow-blue-200  cursor-pointer':'bg-gray-300 border cursor-not-allowed  border-gray-300' }
          flex items-center text-sm gap-2  text-white px-6 py-2
           rounded-sm font-semibold transition-all  active:scale-95`}>
            {loading ?  <span  className='flex gap-1 items-center'><Loader className='animate-spin'/> saving... </span>:<span className='flex gap-1 items-center'><Save size={20} />save</span>}
          </button>
        </div>


        <div className={`${cardStyle} ${lockNotif ? 'bg-gray-50 opacity-75' : ''}`}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3 text-blue-600">
              <div className="p-2 bg-purple-50 rounded-lg"><Bell size={24}/></div>
              <h3 className="text-xl font-bold text-gray-800">Notification settings</h3>
            </div>
            <button onClick={() => setLockNotif(!lockNotif)} className="text-gray-400 hover:text-purple-600">
              {lockNotif ? <Lock size={22} className="text-red-500" /> : <Unlock size={22} />}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-6 border border-gray-100">
            <div>
              <span className="font-bold text-gray-700">Automation Mode</span>
              <p className="text-sm text-gray-500">switch & hide Auto mode</p>
            </div>
            <button 
              disabled={lockNotif}
              onClick={() => setAutoNotif(!isAutoNotifOpen)}
              className="disabled:opacity-30 transition-transform active:scale-90"
            >
              {isAutoNotifOpen ? <ToggleRight size={35} className="text-blue-400" /> : <ToggleLeft size={35} className="text-gray-300" />}
            </button>
          </div>

          <div className="space-y-4">
            {isAutoNotifOpen ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>Reminder Message</label>
                  <textarea onChange={handleChange} disabled={lockNotif} 
                   name='reminder' className={`${inputErrorborderSwitcher('reminder')} 
                   ${inputStyle} h-32 resize-none text-sm`} value={settingdata.reminder}
                    placeholder="Reminder message..."></textarea>
                    <span className='text-[13px] text-red-400'>{errors.reminder}</span>

                </div>
                <div>
                  <label className={labelStyle}>Overdue Message</label>
                  <textarea onChange={handleChange} disabled={lockNotif}  value={settingdata.overdue}
                  name='overdue'
                   className={` ${inputErrorborderSwitcher('overdue')} ${inputStyle} h-32 resize-none text-sm`}
                    placeholder="Overdue message..."></textarea>
                    <span className='text-[13px] text-red-400'>{errors.overdue}</span>
                </div>
              </div>
            ) : (
              <div>
                <label className={labelStyle}>Manual Message</label>
                <textarea   
                onChange={(e)=>setmanualynotif(e.target.value)}
                disabled={lockNotif} className={` ${inputStyle} h-32 text-sm resize-none`} placeholder="Write message..."></textarea>

                <div className='flex justify-between text-sm py-2 px-4'>
                  <button onClick={handesendtoall} className='uppercase bg-blue-500 p-y-2 px-4
                   text-white rounded-sm text-xs cursor-pointer'>send to all users</button>
                  <div className='flex  gap-1 '>
                  <button
                   onClick={HandleSendTo}
                  className='uppercase bg-blue-500 py-2 px-4 
                     text-white rounded-sm text-xs cursor-pointer' >send to specific </button>
                  <select onChange={(e)=>{setselectedCompany(e.target.value)}} className='cursor-pointer capitalize outline-none border-gray-100 border rounded-xs  text-gray-600'>
                      {companyadmin.map((cpa,index)=>{
                       return(
                          <option key={index} value={cpa.company_id}>{cpa.admin_name}({cpa.company_name})</option>)

                      })}
                  </select>

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={`${cardStyle} ${lockPenalties ? 'bg-gray-50 opacity-75' :''} `}>
          <div className="flex justify-between items-center mb-6 text-orange-600">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg"><AlertTriangle size={24}/></div>
              <h3 className="text-xl font-bold text-gray-800">Penalties & Account Locking</h3>
            </div>
            <button onClick={() => setLockPenalties(!lockPenalties)} className="text-gray-400 hover:text-orange-600">
              {lockPenalties ? <Lock size={22} className="text-red-500" /> : <Unlock size={22} />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelStyle}>Interest % Ratio</label>
              <input onChange={handleChange} disabled={lockPenalties} value={settingdata.interest} name='interest' type="number" className={`
                ${inputErrorborderSwitcher('interest')} ${inputStyle} text-sm`} placeholder='5%'/>
                <span className='text-[13px] text-red-400'>{errors.interest}</span>
            </div>
            <div>
              <label className={labelStyle}>Grace Days</label>
              <input onChange={handleChange} disabled={lockPenalties} name='graceperiod'
               type="text" className={`${inputErrorborderSwitcher('graceperiod')} 
               ${inputStyle} text-sm`} value={settingdata.graceperiod} placeholder='7 days' />
               <span className='text-[13px] text-red-400'>{errors.graceperiod}</span>
            </div>
            <div>
              <label className={labelStyle}>Lock After (Days)</label>
              <input onChange={handleChange} disabled={lockPenalties} name='lockafter' type="text" 
              className={`${inputErrorborderSwitcher('lockafter')}
              ${inputStyle} text-sm`} value={settingdata.lockafter} placeholder="1 days" />
              <span className='text-[13px] text-red-400'>{errors.lockafter}</span>
            </div>
          </div>
        </div>

         <div className={`${cardStyle}  ${lockagent ? 'bg-gray-50 opacity-75 cursor-not-allowed': ''}`}>
          <div className="flex justify-between items-center mb-6 text-white">
            <div className="flex items-center gap-3 ">
              <div className="p-2 bg-blue-400 rounded-full"><Award size={24}/></div>
              <h3 className="text-xl font-bold text-gray-800 uppercase">set agent reward</h3>
              
            </div>
            <button onClick={() => setLockagent(!lockagent)} className="text-gray-400 hover:text-orange-600">
              {lockagent ? <Lock size={22} className="text-red-500" /> : <Unlock size={22} />}
            </button>
           
          </div>
          <div>
              <label className={labelStyle}>Reward</label>
               
              
              <input onChange={handleChange}  type="text" name='agentreward'
              disabled={lockagent}
              value={settingdata.agentreward}
               className={`${inputErrorborderSwitcher('agentreward')}${inputStyle} text-sm`} placeholder='5%'/>
               <span className='text-[13px] text-red-400'>{errors.agentreward}</span>
            </div>
         
        </div>

      </div>
      
      {ismodelopen&&<HandleErrormodel onClose={closemodel} success={success} message={message}/>}
    </div>
  );
}

export default Setting;