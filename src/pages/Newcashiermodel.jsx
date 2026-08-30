import {
  GitBranchIcon,
  Mail,
  MapPin,
  Phone,
  User2,
  XIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from '../api'
import HandleTranslatedErrormodel from './HandleTranslatedErrormodel'

function Newcashiermodel({ onClose }) {
  const { t } = useTranslation();

const [errors,setErrors]=useState({});
const [loading,setloading]=useState(null)
    const [officeError,setofficeError]=useState(null);
        const [office,setoffice]=useState([]);
    const [ismodelopen,setismodelopen]=useState(false)
    const closemodel= ()=>{setismodelopen(false)}
    const [messagekey,setmessageKey]=useState(null);
    const [success,setsuccess]=useState(null);
    

  const [formdata,setFormdata]=useState({
    names:'',
    email:'',
    phoneno:'',
    location:'',
    branch:''
  })



  const HandleChange=(e)=>{
    const {name,value}=e.target;
    setFormdata((prev)=>({
      ...prev,
      [name]:value
    }))

    setErrors((prev)=>({...prev,[name]:""}))
  }

  const HandleaddNew=async(e)=>{
    e.preventDefault();
    setloading(true)
    try{

      const res= await api.post('/add-cashier',formdata);
      if(res.data.success===true){
        setismodelopen(true);
        setmessageKey(res.data?.messagekey)
        setsuccess(res.data.success);
      }
    setErrors({});

     
    }
    catch(err){
      const data= err.response?.data;
      if(data?.errors){setErrors(data.errors) 
        return
      }
      setismodelopen(true);
      setmessageKey(err.response?.data?.messagekey);
    }
  }

 
   const ShowCompanyBranch= async()=>{
      try{
       const response= await api.get('/current-branch');
       setoffice(response.data);
if (response.data.length > 0) {
      setofficeId(response.data[0].branch_id);
    }


     
      }
      catch(err){
       setofficeError(err.response?.data?.message)
      }
    }


  useEffect(()=>{
 ShowCompanyBranch();
    },[])


  
    const InputBorderswitcher= (field)=>` ${errors[field] ?
       "bg-red-50 border-red-500 focus:ring-red-400":" border-gray-200" } 
    w-full p-2 border rounded-md focus:ring-1
             outline-none focus:ring-blue-400 text-sm`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

      <div className="w-full max-w-2xl bg-white shadow-md rounded-md overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">

        <div className="flex justify-between items-center bg-blue-300 px-6 py-4 text-white">
          <h1 className="text-lg font-extrabold uppercase">
            {t("nc.title")}
          </h1>

          <button
            onClick={onClose}
            className="bg-blue-500 cursor-pointer p-1.5 rounded-full transition-colors duration-150"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <form className="p-6 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">

            <div className="space-y-4">

              <div>
                <label className="flex gap-2 text-xs font-medium text-gray-600 uppercase
                 tracking-wider mb-1.5 items-center">
                  <User2 className="w-4 h-4 text-blue-500" />
                  {t("nc.fullName")}
                </label>
                <input
                  type="text"
                  name="names"
                  onChange={HandleChange}
                  placeholder={t("nc.fullNamePlaceholder")}
                  className={InputBorderswitcher('names')}
                />
                <span className="text-[13px] text-red-500">{t(errors.names)}</span>

              </div>


              <div>
                <label className="flex gap-2 text-xs font-medium text-gray-600 uppercase 
                tracking-wider mb-1.5 items-center">
                  <Mail className="w-4 h-4 text-blue-500" />
                  {t("nc.email")}
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={HandleChange}
                  placeholder={t("nc.emailPlaceholder")}
                  className={InputBorderswitcher('email')}
                />

              </div>

             

            </div>

            <div className="space-y-4">

              <div>
                <label className="flex gap-2 text-xs font-medium text-gray-600 uppercase tracking-wider mb-1.5 items-center">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  {t("nc.location")}
                </label>
                <input
                  type="text"
                  name="location"
                  onChange={HandleChange}
                  placeholder={t("nc.locationPlaceholder")}
                  className={InputBorderswitcher('location')}
                />
                <span className="text-[13px] text-red-500">{t(errors.location)}</span>

              </div>


              <div>
                <label className="flex gap-2 text-xs font-medium text-gray-600
                 uppercase tracking-wider mb-1.5 items-center">
                  <GitBranchIcon className="w-4 h-4 text-blue-500" />
                  {t("nc.branch")}
                </label>
                <select
                  name='branch'
                  onChange={HandleChange}
                  placeholder={t("nc.branchPlaceholder")}
                  className={`${InputBorderswitcher('branch')} capitalize`}
                >
                  {office?.map((off)=>{
                    return <option key={off.branch_id} value={off.branch_id}>{off.branch_name}</option>
                  })}

                </select>
                <span className="text-[13px] text-red-500">{t(errors.branch)}</span>

              </div>

            </div>

          </div>
          <div>
             <div>
                <label className="flex gap-2 text-xs font-medium text-gray-600
                 uppercase tracking-wider mb-1.5 items-center">
                  <Phone className="w-4 h-4 text-blue-500" />
                  {t("nc.phone")}
                </label>
                <input
                  type="tel"
                  name="phoneno"
                  onChange={HandleChange}
                  placeholder={t("nc.phonePlaceholder")}
                  className={InputBorderswitcher('phoneno')}
                />
                <span className="text-[13px] text-red-500">{t(errors.phoneno)}</span>

              </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              {t("nc.cancel")}
            </button>

            <button onClick={HandleaddNew}
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-md shadow-md"
            >
              {t("nc.add")}
            </button>

          </div>

        </form>
      </div>
      {ismodelopen &&
      <HandleTranslatedErrormodel onClose={closemodel} messagekey={messagekey} issuccess={success}/>

      }
    </div>
  );
}

export default Newcashiermodel;