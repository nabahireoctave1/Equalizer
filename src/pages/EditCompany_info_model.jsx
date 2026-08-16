import React, { useEffect, useState } from 'react';
import { Building2, X, ShieldAlert, Calendar, MapPin, User, Hash,Plus, Space, LoaderCircle } from 'lucide-react';
import api from '../api';
import HandleTranslatedErromodel from './HandleTranslatedErrormodel';
function EditCompany_info_model({ onclose }) {
 

  const [formdata,setformData]=useState({
    companyName:"",
    companyAdmin:"",
    companyLocation:""
  })

  const [errors,setErrors]=useState({})
  const [Message,setmessage]=useState(null)

  const [ismodelopen,setismodelopen]=useState(null);
  const [success,setsuccess]=useState(null);
  const closemodel=()=>{setismodelopen(false)}
  const [loading,setLoading]=useState(null);
  const [staticCMPinfo,setstaticCMPinfo]=useState({
       status:null,
    create_at:null,
    companyId:null
  });


  const HandleChanges= (e)=>{
    const {name,value}=e.target;

    setformData((prev)=>({
        ...prev,
      [name]:value

      })
    )

    setErrors((prev)=>({...prev,[name]:''}))
  }



  const HandleSaveChanges= async()=>{
    setLoading(true)
    try{
      setErrors({});

      const res=await api.put('/change-company-info',formdata);
      if(res?.data.success===true){
      setmessage(res.data.messagekey)
      setismodelopen(true)
      setsuccess(res.data.success)
      
      }


    }
    catch(err){

      const data= err.response?.data
      if(data?.Errors){
        setErrors(data.Errors)
        return
      }
      setmessage(err.response?.data?.messagekey);
      setsuccess(data?.success);
      setismodelopen(true);

    } finally{
      setLoading(false)
    }
}

const formatDate = (date) => {
  if(!date) return null
  return date
    .split('T')[0]
    .split('-')
    .reverse()
    .join('-');
};

const FetchCurrentCompanyInfo= async()=>{

  const res= await api.get('/Get-comp-information');
  const data=res?.data[0];

  setformData({
    companyName:data.company_name,
    companyAdmin:data.admin_name,
    companyLocation:data.location,
     })

     setstaticCMPinfo({
      status:data.status,
      create_at:data.created_at,
      companyId:data.company_id
     })
  



}


useEffect(()=>{
FetchCurrentCompanyInfo();
},[])


  
const Inputborderswitcher=(field)=>`${errors[field] ?'bg-red-50 border-red-400' :'bg-gray-50 border-gray-200'} 
w-full px-3 py-2 text-sm rounded-md border  focus:bg-white focus:ring-2 
focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all `
  return (
    <div 
      onClick={onclose} 
      className='fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto'
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className='bg-white border-none rounded-sm shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in duration-200 my-auto'
      >
        <div className='relative px-6 py-4 border-b border-blue-400 bg-blue-300 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-1.5 bg-blue-500 rounded-full'>
              <Building2 size={20} className='text-white' />
            </div>
            <h1 className='text-sm font-bold text-blue-950 uppercase tracking-tight'>Edit Company Information</h1>
          </div>
          
          <button 
            onClick={onclose}
            className="p-1 rounded-full bg-blue-500 cursor-pointer text-white hover:bg-blue-400/50 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className='flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100'>
          
         

          <div className='flex-1 p-6 bg-white space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>
              <div>
                <label className='flex items-center gap-1.5 text-[11px] font-bold text-gray-700 uppercase mb-1' htmlFor="company-name">
                  <User size={12} /> Company Name
                </label>
                <input 
                  name='companyName'
                  onChange={HandleChanges}
                  type="text" 
                  placeholder='NovaComp'
                  value={formdata.companyName}
                  className={Inputborderswitcher('companyName')}
                />
                <span className='text-red-500 text-[13px]'>{errors.companyName}</span>
              </div>

              <div>
                <label className='flex items-center gap-1.5 text-[11px] font-bold text-gray-700 uppercase mb-1' htmlFor="location">
                  <MapPin size={12} /> Location
                </label>
                <input 
                  name='companyLocation'
                  onChange={HandleChanges}
                  type="text" 
                  value={formdata.companyLocation}
                  placeholder='Hoima'
                  className={Inputborderswitcher('companyLocation')} 
                />
                <span className='text-red-500 text-[13px]'>{errors.companyLocation}</span>

              </div>

              <div>
                <label className='flex items-center gap-1.5 text-[11px] font-bold text-gray-700 uppercase mb-1' htmlFor="admin-rep">
                  <ShieldAlert size={12} /> Admin Representative
                </label>
                <input 
                  name='companyAdmin'
                  onChange={HandleChanges}
                  type="text" 
                  placeholder='Sam Bennet'
                  value={formdata.companyAdmin}
                  className={Inputborderswitcher('companyAdmin')}
                   />
                <span className='text-red-500 text-[13px]'>{errors.companyAdmin}</span>

              </div>

              <div>
                <label className='flex items-center gap-1.5 tracking-wider text-[11px] font-bold text-gray-700 uppercase mb-1' htmlFor="reg-num">
                CMP identity
                </label>
                <input 
                  id="reg-num"
                  type="text" 
                  readOnly
                  className='w-full px-3 py-2 text-sm rounded-md border border-gray-100 bg-gray-100 text-gray-500 cursor-not-allowed outline-none' 
                  defaultValue={staticCMPinfo.companyId} 
                />
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between p-3 bg-gray-100 rounded-xl'>
              <div className='flex items-center gap-4 justify-start pl-1'>
                <div>
                  <span className='text-[9px] font-bold text-gray-500 uppercase block'>Status</span>
                  <div className={`flex items-center gap-1.5 ${staticCMPinfo.status== 'activated'?'text-gray-800':'text-red-500'} font-bold text-[10px]
                   uppercase tracking-wider mt-0.5 `}>
                    <span className='w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse'></span>
                    {staticCMPinfo.status}
                  </div>
                </div>
                <div className='h-8 w-1 bg-gray-200'></div>
                <div>
                  <span className='text-[9px] font-bold text-gray-500 uppercase block'>Joined</span>
                  <p className='text-[13px] font-semibold  text-gray-700 mt-0.5'>{formatDate(staticCMPinfo.create_at)}</p>
                </div>
              </div>

              <div className='flex gap-2 justify-end'>
                <button 
                  type="button"
                  onClick={onclose}
                  className='flex-1 sm:flex-none px-4 py-2.5 cursor-pointer text-gray-600 font-bold rounded-md hover:bg-gray-200 transition-all text-[10px] uppercase'
                >
                  Cancel
                </button>
                <button  onClick={HandleSaveChanges}
                  type="submit"
                  className='flex-1 sm:flex-none px-5 py-2.5 cursor-pointer bg-blue-400 outline-none
                   text-white font-bold rounded-sm hover:bg-blue-500 shadow-sm transition-all text-[10px] uppercase tracking-wide whitespace-nowrap'
                >
                 {loading ? <span className='flex gap-2 items-center'>
                  <LoaderCircle size={18} className='animate-spin' /> 
                  <p>saving...</p></span> :'Save Changes'} 
                </button>
              </div>
            </div>

          </div>
          {ismodelopen &&<HandleTranslatedErromodel issuccess={success}
           messagekey={Message} onClose={closemodel}/>}
        </div>
      </div>
    </div>
  );
}

export default EditCompany_info_model;