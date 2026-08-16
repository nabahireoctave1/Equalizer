import React, { useState,useEffect } from "react";
import {jwtDecode} from 'jwt-decode'
import {
  Calendar,
  CircleX,
  Edit2,
  Mail,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import EditProfileModal from "./EditprofileModel";
import NetworkError from './NetworkError'
import api from "../api";

function Adprofile() {

  const decoded= jwtDecode(localStorage.getItem('token'))
  const { t } = useTranslation();
  const [isopened, setisopened] = useState(false);
  const [messagekey,setmessageKey]=useState(null)
  const [profileData,setProfileData]=useState({});
  const [networkError,setNetworkError]=useState(null)




  const openedit = () => setisopened(true);
  const closeedit = () => setisopened(false);



   const FetchProfileInformation= async()=>{
    setNetworkError(null);
    setmessageKey(null);
    try{
      
      const res= await api.get('/profile-information');
       if(res?.data){
        setProfileData(res.data[0])
       }

    }
    catch(err){
      if(!err.response){
        setNetworkError(true)
      }
     setmessageKey(err.response?.data?.messagekey)
    }
 }


 const HandleRetry= ()=>{
  FetchProfileInformation();
 }
 

 useEffect(()=>{
   FetchProfileInformation();
 },[])
 
  const formatDate= (date)=>{
     if(!date) return null;
         return date.split('T')[0]
     .split('-').reverse().join('-')

  }


  return (
    <div>   
        {messagekey ?
    <div className="flex flex-col p-5 m-2 bg-red-50 border-red-500 border rounded-sm mt-5  "> 
      <span>
        <CircleX size={45} className="text-red-500 mb-3"/>
      </span>
        
       <h1 className="text-2xl text-red-500">{t('errors.errorTitle')}</h1>
       <h2 className="text-[15px] italic">{t('errors.profile_server_error')}{t(messagekey)}</h2>
       <p className="text-[15px] italic">{t('errors.error_desc')}</p>
        </div>:
        
          
          networkError && <div className=" m-3">
            <NetworkError HandleRetry={HandleRetry}/>
          </div>
        }
          
    <div className="min-h-screen bg-gray-100 p-6">
     

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col items-center text-center">
          {profileData.profile_photo ?
              <img
    src={profileData?.profile_photo &&  `http://localhost:3000/uploads/profile/${profileData.profile_photo}`}
    alt="profile"
    className="w-24 h-24 rounded-full object-cover"
/>:
        
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg ring-4 ring-indigo-100">
  <h2 className="text-white font-extrabold text-2xl tracking-wide">
    {decoded.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()}
  </h2>
</div>

    
          }
     

          <h2 className="mt-4 text-2xl font-bold text-gray-800">{profileData.names}</h2>

          <p className="text-blue-600 font-medium uppercase text-sm">
            {t("prl.adminRole")}
          </p>

          <span className={`${profileData.status==='active' 
            ? 'bg-green-600':"bg-red-500"} mt-3 first-letter:uppercase  text-white px-7 py-1  rounded-full text-[15px]`}>
            {profileData.status}
          </span>

          <div className="w-full mt-6 space-y-4 text-sm text-left">

            <div className="border-t border-b border-gray-100 py-3">
              <p className="text-gray-800 font-extrabold mb-1">{t("prl.adminId")}</p>
              <p className="uppercase text-[15px] text-gray-800 tracking-tight">
                {profileData.admin_id}
              </p>
            </div>

            <div>
              <h2 className="text-gray-800 font-extrabold mb-1">
                {t("prl.memberSince")}
              </h2>

              <div className="flex items-center text-[15px] gap-2 text-gray-700">
                <Calendar size={16} />
                <p>{formatDate(profileData.created_at)}</p>
              </div>
            </div>

          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-blue-700">
              {t("prl.personalInfo")}
            </h2>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between pb-2">
                <span>{t("prl.fullName")}</span>
                <span className="font-semibold">{profileData.names}</span>
              </div>

              <div className="flex justify-between pb-2">
                <span>{t("prl.role")}</span>
                 {profileData?.role === 'subadmin' &&
                <span className="font-semibold">{t("prl.adminRole")}</span>
                }
              </div>

              <div className="flex justify-between pb-2">
                <span>{t("prl.company")}</span>
                <span className="font-semibold">{profileData?.company_name}</span>
              </div>

              <div className="flex justify-between">
                <span>{t("prl.loc")}</span>
                <span className="font-semibold">{profileData?.location}</span>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex gap-3">
              <ShieldCheck className="text-blue-600 shrink-0" />

              <div className="w-full space-y-3">
                <h3 className="font-extrabold text-gray-800">
                  {t("prl.accountDetails")}
                </h3>

                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {t("prl.createdAt")}
                  </span>
                  <span className="text-[15px]">{formatDate(profileData?.created_at)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={14} /> {t("prl.sts")}
                  </span>

                  <span className={`${profileData?.company_status ==='activated' ? "bg-green-700" :"bg-red-500"}  p-1 uppercase
                   px-3 text-[12px] text-white rounded-full`}>
                    {profileData?.company_status}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex gap-3">
              <PhoneCall className="text-blue-600 shrink-0" />

              <div className="w-full space-y-3">
                <h3 className="font-extrabold text-gray-800">
                  {t("prl.contactInfo")}
                </h3>

                <div className="space-y-2 text-sm">

                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <Mail size={14} /> {t("prl.email")}
                    </span>
                    <p>{profileData?.email}</p>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <PhoneCall size={14} /> {t("prl.phone")}
                    </span>
                    <p>{profileData?.phone}</p>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-lg font-semibold mb-2 capitalize">
          {t("prl.adminRoleTitle")}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {t("prl.adminRoleDesc")}
        </p>
      </div>

      <div className="justify-end flex items-center">
        <button
          onClick={openedit}
          className="p-2 bg-blue-400 flex gap-2 cursor-pointer items-center text-sm mt-4 text-white rounded-md px-7"
        >
          <Edit2 size={20} />
          {t("editProfile")}
        </button>
      </div>

      {isopened && <EditProfileModal onClose={closeedit} />}
    </div>

    </div>

  );
}

export default Adprofile;