import { useTranslation } from 'react-i18next';
import { Contact, ImagePlus, LoaderCircle, Plus, Timer, User2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../api';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const {t} = useTranslation();


  const  [selectedImg,setselectedImg]=useState(null);
  const [preview,setpreview]=useState(null);
  const [profilePhoto,setprofilePhoto]=useState(null);
  const [cashiername,setCashiername]=useState(null);
  const [role,setrole]=useState(null);
  const [Loading,setLoading]=useState({
    FetchprofileLoading:null,
    changeProfileLoading:null
  })

  const [Errors,setErrors]=useState({});

  const [formData,setFormData]=useState({
    names:null,
    Contact:null,
    officeLocation:null,
     memberSince:null ,
     updated_at:null,
     email:null,
     location:null,
     company_name:null
  })

  const HandleSelectedImage= (e)=>{
   const file= e.target.files[0];
   if(file){
    setselectedImg(file);
    setpreview(URL.createObjectURL(file))
   }

  }

  const CurrentInformation= async()=>{

    setLoading({
      FetchprofileLoading:true,
      changeProfileLoading:false
      
    })
    try{

    const res=  await api.get('/profileInfo');
    if(res?.data){
      let data= res?.data[0];
       
      setFormData({
        names:data.cashier_name?? '',
        email:data.cashier_email??'',
        Contact:data.cashier_contact??'',
        location:data.cashier_location??'',
        memberSince:data.created_at??'',
        updated_at:data.updated_at??'',
        branch_location:data.location??'',
        company_name:data.company_name??''
      })

      setprofilePhoto(data.profile_photo);
      setCashiername(data.names)
      setrole(data.role)

       
    }


    }
    catch(err){
    

    }finally{
      setLoading({
        FetchprofileLoading:false,
        changeProfileLoading:false
      })
    }
  }


    const formatDate=(date)=>{
   if(!date) return
    return date.split('T')[0].split('-').reverse().join('-')

    }


    
 

 const HandleInputChanges= (e)=>{
   
  const {name,value}=e.target;
  setFormData((prev)=>({
    ...prev,[name]:value
  }))

 }




  useEffect(()=>{
    CurrentInformation();
  },[])
  


 const HandleProfileUpdate= async()=>{

 const data= new FormData();  
  Object.entries(formData).forEach(([key,value])=>{
    if(value!==undefined||value!==null){
    data.append(key,value);
    }

  })


  if(selectedImg){
     data.append('profile_photo',selectedImg);
    
    }
    setErrors({})
    setLoading({
      changeProfileLoading:true,
      FetchprofileLoading:false
    })
    try{

    let res= await api.put('/cashier-profile-update',data,{
      headers:{
        "Content-Type":'multipart/form-data'
      }
    })
    

  }


  catch(err){
    const data= err.response?.data;
    if(data?.error){
      setErrors(data.error);
      return
    }

  } finally{
    setLoading({
      FetchprofileLoading:false,
      changeProfileLoading:false
    })
  }


 }


 const Inputsstyle= (field)=>`
  ${Errors[field] ? 'border-red-500 focus:ring-1 bg-red-50 focus:ring-red-400 outline-none'
     :'border-gray-200 outline-none  focus:ring-2 focus:ring-blue-400 '}
 text-gray-800 p-2.5 border w-full rounded-sm disabled:cursor-not-allowed
 text-[15px] placeholder:text-gray-800  
 disabled:bg-gray-50`

  return (
    <div className="w-full bg-gray-50 ">
      <div className="w-full max-w-full bg-white rounded-md shadow-lg  animate-bounce-once border border-slate-100 overflow-hidden">
            <div className="h-28 bg-linear-to-r from-blue-400 via-blue-300 to-indigo-500 
            relative p-6">
          <div className="text-white text-2xl    font-extrabold uppercase">
            <span>{formData?.company_name}</span>
                  </div>
        </div>

        <div className="px-6 sm:px-8 py-1 relative flex flex-col sm:flex-row items-center sm:items-end
         gap-4 -mt-14 border-b border-slate-100">
          <div>
               <div className={`w-32 h-32 rounded-full flex  items-center
           justify-center overflow-hidden bg-white
             p-1.5 shadow-md border border-slate-100 ring-4 ring-white`}>
         { preview||profilePhoto ?
           <img src={preview ? preview:profilePhoto ? `http://localhost:3000/uploads/profile/${profilePhoto}`:''} alt="profile"/>
           :
         <div>
          <User2 size={40} className='text-gray-800'/>
         </div>
         
          
         }
         
          
          </div>
             <label className={` ${preview||profilePhoto ? 'bg-white rounded-full p-1':''} absolute left-34 top-20`}>
            <input type="file" onChange={HandleSelectedImage} hidden />
            <ImagePlus size={preview ? 30:30 } className='cursor-pointer text-blue-500'/>
            </label>
          </div>
       
         
        
          
          <div className="text-center sm:text-left flex-1 mb-2">

            <h1 className="text-xl font-bold text-slate-800 tracking-tight capitalize">
              {cashiername}
            </h1>
            <p className="text-blue-500 font-semibold text-[15px]">
              {role?.toLowerCase()==='cashier' &&'Cashier officer'}
            </p>
          
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="text-sm font-semibold uppercase text-gray-800 tracking-wider mb-4">
             {t("credentialsAssignment")}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className='space-y-2'>

             <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wide">{t("fullName")}</label><br></br>
                  <input 
                  type="text" 
                    name='names'
                    onChange={HandleInputChanges}
                  defaultValue={formData?.names}
                  className={`${Inputsstyle('names')}`}
                />
                <span className='text-[14px] text-red-500'>{Errors.names}</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wide">{t("phoneNumber")}</label><br></br>
          
                <input 
                  type="tel" 
                  name='Contact'
                  onChange={HandleInputChanges}
                  value={formData?.Contact}
                  className={`${Inputsstyle('Contact')}`}
                />
                <span className='text-[14px] text-red-500'>{Errors.Contact}</span>

            </div>


                 <div className="space-y-1.5 ">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wide">{t("Email")}</label><br></br>
                <input 
                  type='text'
                  name='email'
                  onChange={HandleInputChanges}
                  value={formData?.email}
                  className={`${Inputsstyle('email')}`}
                />
                <span className='text-[14px] text-red-500'>{Errors.email}</span>

            </div>
               </div>
               <div className='space-y-2'>
                    <div className="space-y-1.5 ">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wide">{t("location")}</label><br></br>
                <input 
                  type='text'
                  name='location'
                  onChange={HandleInputChanges}
                  value={formData?.location}
                  className={`${Inputsstyle('location')}`}
                />
                <span className='text-[14px] text-red-500'>{Errors.location}</span>

            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wide">{t("officeLocation")}</label><br></br>
                <input 
                  type="text" 
                  name='branch_location'
                  value={formData?.branch_location}
                  disabled
                  className={`${Inputsstyle('branch_location')}`}
                />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-800 uppercase tracking-wide">{t("Membersince")}</label><br></br>
                <input 
                  type='text'
                  defaultValue={formatDate(formData?.memberSince)}
                  disabled
                  className={`${Inputsstyle('membersince')}`}
                />
            </div>
                
               </div>

          
           

          </div>
       

          <div className={`${!formData.updated_at ? 'justify-end':'justify-between items-center'}
           mt-2 flex flex-col sm:flex-row  gap-4`}>
            {formData.updated_at ? 
            <div className="flex items-center text-[14px] text-gray-800 ">
            <Timer/>
              <span className='text-[12px]'>{t("lastUpdated")}: <strong className="text-gray-700">{formatDate(formData.updated_at)}</strong></span>
            </div>
            :''}
            

            <div className="w-full sm:w-auto flex gap-3">
             <button onClick={HandleProfileUpdate} type="submit"
               className="flex-1 sm:flex-initial px-6 py-2.5 rounded-sm cursor-pointer
                bg-blue-500 hover:bg-blue-600 text-white font-semibold outline-none
                 text-sm shadow-md shadow-blue-600/10 transition-colors">
                {Loading.changeProfileLoading ? <span className='flex items-center gap-1 justify-center '>
                  <LoaderCircle size={18} className='animate-spin'/><p>saving...</p></span>:t("saveChanges")}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;


