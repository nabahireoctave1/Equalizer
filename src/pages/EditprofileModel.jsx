import { LoaderCircle, Plus, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from '../api'
import HandleTranslatedErrormodel from './HandleTranslatedErrormodel'

function EditProfileModal({names,phone,email,nid,  onClose }) {
  const { t } = useTranslation();

  const [profile_photo,setProfilePhoto]= useState(null)
  const [preview,setPreview]=useState(null)
  const [loading,setloading]=useState(null)
  const [messageKey,setmessageKey]= useState(null)
  const [modelopen,setopenmodel]=useState(null)
  const [success,setsuccess]=useState(null)
  const [error,seterrors]=useState({});

  const closeModel= ()=>{
    setopenmodel(false);
  }


  const [formdata,setformData]=useState({
     names:names,
     email:email,
     phone:phone,
     nid:nid,
  })


   const HandleInputs= (e)=>{
    const {name,value}= e.target;
    setformData((prev)=>({...prev,
      [name]:value
    })) 

    seterrors((prev)=>({...prev,[name]:""}))

   }


 


  const HandlePhotoCahnge= (e)=>{
    const file= e.target.files[0];
    if(!file) return
   setProfilePhoto(file)
   setPreview(URL.createObjectURL(file))
  }

 const Handlesave=async()=>{
    setloading(true)
    setsuccess(null)
    const data= new FormData();
   Object.entries(formdata).forEach(([key, value]) => {
  data.append(key, value);
});
   
if(profile_photo){
  data.append('profile_photo',profile_photo)
}

    try{
      const res= await api.post('/update-profile',data,{
        headers:{  
          "Content-Type": "multipart/form-data"
         }
      })


        setmessageKey(res.data.messagekey)
        setopenmodel(true)
        setsuccess(res.data.success)

    }
    catch(err){
      if(err.response?.data?.errors){
         seterrors(err.response?.data?.errors);
         return
      }
     setmessageKey(err.response?.data?.messagekey)
     setopenmodel(true)
     setsuccess(err.response?.data.success);
    } finally{
      setloading(false)
    }
 }


 const InputBorderwitcher =(field)=>`${error[field] ? 
  'bg-red-50 border-red-400 focus:ring-1 focus:ring-red-400':' border-gray-200 focus:ring-1 focus:ring-blue-500'}`

  return (
    <div className="fixed inset-0 z-50 flex  justify-center items-center bg-slate-900/60 backdrop-blur-sm p-3">
      <div className="w-full max-w-xl max-h-fit  bg-white rounded-md border border-slate-100 overflow-hidden 
      transform transition-all animate-in fade-in zoom-in-95 duration-200">

        <div className="px-6 py-2 border-b border-slate-50">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">
              {t("adp.editProfile")}
            </h2>

            <p className="text-xs text-slate-500 uppercase mt-0.5">
              {t("adp.updateInfo")}
            </p>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-5">

          <div className="flex justify-center">
            <div className="relative group">
              <div className="w-30 h-30 rounded-full ring-2 ring-slate-100 overflow-hidden bg-slate-50 flex items-center justify-center shadow-inner transition group-hover:ring-blue-100">
                {profile_photo ? (
                  <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-slate-400" />
                )}
              </div>

              <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-md transition-all duration-200 hover:scale-105 flex items-center justify-center">
                <Plus size={14} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={HandlePhotoCahnge}
                  className="hidden"
                />
              </label>
            </div>
          </div>


            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                {t("adp.fullName")}
              </label>
              <input
                type="text"
                name="names"
                onChange={HandleInputs}
                value={formdata.names}
                placeholder="Kemirembe Joyce"
                className={`${InputBorderwitcher('names')} w-full px-3.5 py-2.5 rounded-md border  text-sm
                 placeholder-slate-400 focus:outline-none text-slate-800 transition`}
              />
              <span className="text-[14px] text-red-500">{t(error.names)}</span>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                {t("adp.phone")}
              </label>
              <input
                type="tel"
                name="phone"
                value={formdata.phone}
                onChange={HandleInputs}
                placeholder="2677638465"
                className={`${InputBorderwitcher('phone')} w-full px-3.5 py-2.5 rounded-md border focus:outline-none
                  text-sm placeholder-slate-400 text-slate-800 transition`}
              />
              <span className="text-[14px] text-red-500">{t(error.phone)}</span>
            </div>

             <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                {t("admin national id")}
              </label>
              <input
                type="text"
                name="nid"
                value={formdata.nid}
                placeholder="112006788764534"
                onChange={HandleInputs}
                className={`${InputBorderwitcher('nid')} w-full px-3.5 py-2.5 rounded-md border  text-sm placeholder-slate-400 focus:outline-none text-slate-800 transition`}
              />
              <span className="text-[14px] text-red-500">{t(error.nid)}</span>
            </div>
            
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                {t("adp.email")}
              </label>
              <input
                type="email"
                name="email"
                value={formdata.email}
                onChange={HandleInputs}
                placeholder="Joyce0013@gmail.com"
                className={`${ InputBorderwitcher('email')} w-full px-3.5 py-2.5 rounded-md border  text-sm placeholder-slate-400 focus:outline-none text-slate-800 transition`}
              />
            </div>
          

           


          <div className="flex items-center justify-end gap-3  border-t border-slate-100">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 cursor-pointer rounded-sm bg-gray-200 text-sm font-medium text-slate-600 hover:text-slate-800 transition"
            >
              {t("adp.cancel")}
            </button>

            <button onClick={Handlesave}
              type="submit"
              className="px-5 py-2.5 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-sm font-medium shadow-sm shadow-blue-500/10 transition"
            > 
             {loading ? <spa className="flex items-center justify-center gap-1.5"> <LoaderCircle size={20} className="animate-spin"/> {t('adp.saving') }</spa>:t("adp.save")}
            </button>

          </div>

        </form>
      </div>
      {modelopen && <HandleTranslatedErrormodel issuccess={success} messagekey={messageKey} onClose={closeModel}  />}
    </div>
  );
}

export default EditProfileModal;