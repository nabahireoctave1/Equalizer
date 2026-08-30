import React, { useEffect, useState } from 'react'
import { GitBranchIcon, Mail, MapPin, Phone, User2, XIcon } from 'lucide-react'
import { useTranslation } from "react-i18next"
import api from '../api'
import HandleTranslatedErrormodel from './HandleTranslatedErrormodel'

function EditCashier({ onClose,cashierId }) {
  const { t } = useTranslation()


const [formdata,setformdata]=useState({
  names:"",
  email:"",
  phoneno:"",
  location:"",
  branch:"",
  cashierId:cashierId
})

const [errors,setErrors]=useState({});
const [loading,setLoading]=useState(null)
const [messageKey,setmessageKey]=useState(null);
const [Success,setsuccess]=useState(null);
const [ismodelopen,setismodelopen]=useState(null);
const closemodel= ()=>{setismodelopen(false)}
const [Branch,setBranch]=useState([])
const  [BranchLoaing,setBranchLoader]=useState(false);


const HandleChanges= (e)=>{
  const {name,value}=e.target;
  setformdata((prev)=>({
    ...prev,
    [name]:value
  }))

  setErrors((prev)=>({...prev,[name]:''}))

}


const Handlesave=async(e)=>{
  e.preventDefault();
  setLoading(true);
  setErrors({});
  try{

  let res=await api.put('/change-cashier-info',formdata)
    setsuccess(res.data.success);
  if(res?.data.success===true){
    setmessageKey(res.data.messagekey)
    setismodelopen(true)
  }


  }
  catch(err){
   const data=err.response?.data;
   if(data?.Errors){setErrors(data.Errors)
    return
   }
   setmessageKey(data.messagekey);
   setismodelopen(true);


  }
}

const FetchCurrentcashierinfo = async () => {
  try {
    const res = await api.get(`/current-cashier-info/${cashierId}`);
    const data = res.data;


    setformdata({
      names: data.cashier_name ?? "",
      phoneno: data.cashier_contact ?? "",
      location: data.cashier_location ?? "",
      email: data.cashier_email ?? "",
      branch: data.branch_id ?? "",
      cashierId: cashierId
    });

  } catch (err) {
    console.log('API Error',err);
  }
};


const FetchCompanyCurrentBranch= async()=>{
  setBranchLoader(true);
  try{
   const res= await api.get('/current-branch');
   setBranch(res.data);
 
  } 
  catch(err){
    console.log('API Error',err)
  } finally{
    setBranchLoader(false);
  }
}

useEffect(()=>{
FetchCurrentcashierinfo()
FetchCompanyCurrentBranch();


},[])







const inputBorderswitcher= (field)=>`

${errors[field] ?'bg-red-100 border-red-500 focus:ring-red-500' 
  :' border-gray-200 focus:ring-blue-500'} w-full p-2 border text-sm
  rounded-md outline-none focus:ring-1 
   transition-all

`


  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'>

      <div className='w-full max-w-2xl bg-white shadow-md rounded-md overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200'>

        <div className='flex justify-between items-center bg-blue-300 px-6 py-4 text-white'>
          <h1 className='text-lg font-extrabold uppercase'>
            {t("nc.editCashier")}
          </h1>

          <button onClick={onClose} className='bg-blue-500 cursor-pointer p-1.5 rounded-full'>
            <XIcon className='w-5 h-5' />
          </button>
        </div>

        <form onSubmit={Handlesave} className='p-6 space-y-6'>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>

            <div className='space-y-4'>

              <div>
                <label className='flex gap-2 text-xs font-medium text-gray-600 uppercase mb-1.5 items-center'>
                  <User2 className='w-4 h-4 text-blue-500' />
                  {t("nc.fullName")}
                </label>
                <input
                  type="text"
                  name='names'
                  value={formdata?.names}
                  onChange={HandleChanges}
                  placeholder={t("nc.fullNamePlaceholder")}
                  className={inputBorderswitcher('names')}
                />
                <span className="text-[13px] text-red-500">{t(errors.names)}</span>
              </div>

              <div>
                <label className='flex gap-2 text-xs font-medium text-gray-600 uppercase mb-1.5 items-center'>
                  <Mail className='w-4 h-4 text-blue-500' />
                  {t("nc.email")}
                </label>
                <input
                  type="email"
                  name='email'
                  onChange={HandleChanges}
                  value={formdata?.email}
                  placeholder={t("nc.emailPlaceholder")}
                  className={inputBorderswitcher('email')}

                />

              </div>

             

            </div>

            <div className='space-y-4'>

              <div>
                <label className='flex gap-2 text-xs font-medium text-gray-600 uppercase mb-1.5 items-center'>
                  <MapPin className='w-4 h-4 text-blue-500' />
                  {t("nc.location")}
                </label>
                <input
                  type="text"
                  name="location"
                  value={formdata?.location}
                  onChange={HandleChanges}
                  placeholder={t("nc.locationPlaceholder")}
                  className={inputBorderswitcher('location')}
                />
                <span className="text-[13px] text-red-500">{t(errors.location)}</span>

              </div>

             

              <div>
                <label className='flex gap-2 text-xs font-medium text-gray-600 uppercase mb-1.5 items-center'>
                  <GitBranchIcon className='w-4 h-4 text-blue-500' />
                  {t("nc.branch")}
                </label>
                <select
                  name='branch'
                  onChange={HandleChanges}
                  placeholder={t("nc.branchPlaceholder")}
                  className={`${inputBorderswitcher('branch')} capitalize`}
                >
                {Branch.map((b,idx)=>(
                  <option key={idx} value={b.branch_id}>{b.branch_name}</option>
                ))}


                  
                </select>
                <span className="text-[13px] text-red-500">{t(errors.branch)}</span>

              </div>

            </div>
            

          </div>
           <div>
                <label className='flex gap-2 text-xs font-medium text-gray-600 uppercase mb-1.5 items-center'>
                  <Phone className='w-4 h-4 text-blue-500' />
                  {t("nc.phone")}
                </label>
                <input
                  type="tel"
                  name='phoneno'
                  value={formdata?.phoneno}
                  onChange={HandleChanges}
                  placeholder={t("nc.phonePlaceholder")}
                  className={inputBorderswitcher('phoneno')}
                />
                <span className="text-[13px] text-red-500">{t(errors.phoneno)}</span>

              </div>

          <div className='flex justify-end gap-3 pt-4  border-gray-100'>

            <button onClick={onClose} type="button" className='px-4 py-2 text-sm bg-gray-100 rounded-md'>
              {t("nc.cancel")}
            </button>

            <button type="submit" className='px-4 py-2 text-sm text-white outline-none cursor-pointer bg-blue-400 rounded-md'>
              {t("nc.save")}
            </button>

          </div>

        </form>
      {ismodelopen &&<HandleTranslatedErrormodel issuccess={Success} messagekey={messageKey}  onClose={closemodel}/>}


      </div>
    </div>
  )
}

export default EditCashier