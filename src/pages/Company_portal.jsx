
import React, { useEffect, useState } from 'react';
import photo from '../assets/image.Jpeg';
import HandleErrormodel from './HandleErrormodel'
import {
  User,
  PhoneCall,
  MailIcon,
  MapIcon,
  ShieldCheck,
  Briefcase,
  Loader
} from 'lucide-react';
import api from '../api';

function Company_portal() {

  const [isopened, setisopened] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(null);
  const [message, setmessage] = useState(null);
  const [burnermessageopen, setisburnermessageopen] = useState(null);
  const closemodel=()=>setisburnermessageopen(false)

  const [formData, setFormData] = useState({
    companyNames: "",
    companyLocation: "",
    adminNames: "",
    adminNid: "",
    adminPhone: "",
    adminEmail: "",
    permissionId: "",
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  const HandleSubmit = async (e) => {

    e.preventDefault();

    setErrors({});

    try {

      setloading(true);

      const response =await api.post('/register-company',formData );

      setsuccess( response.data.success);

      setmessage( response.data.message);

      setisburnermessageopen(true);



    }

    catch (err) {

     const data = err.response?.data;
   
    if (data?.errors) {setErrors(data.errors);

     return;
      }

      setmessage( data?.message);
setisburnermessageopen(true);

    }

    finally {

      setloading(false);

    }

  };


  useEffect(()=>{
    if(burnermessageopen&&success===true){
            const timeout=setTimeout(() => {
        setisburnermessageopen(false);
        window.location.reload()
      }, 6000);

      return()=> clearTimeout(timeout)
    }

  },[burnermessageopen])


  const inputClass = (field) => `
    w-full p-2 text-sm bg-gray-50 border rounded-md outline-none transition-all duration-200
    ${errors[field]  ? 'border-red-300 border-1' : 'border-gray-200'} focus:shadow-blue-400 focus:shadow-xs
    focus:border-blue-400 focus:ring-1 focus:ring-blue-300
  `;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <header className="sticky top-0 z-50 flex justify-between items-center
       bg-blue-300 px-2 md:px-6 py-4 shadow-md gap-7">

        <div className="flex items-center gap-1 md:gap-3 ">

          <img
            src={photo}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            alt="Logo"
          />

          <h2 className="text-white font-extrabold text-xl md:text-2xl tracking-tight uppercase">
            Equalizer
          </h2>

        </div>

        <div className="flex gap-2 bg-blue-200 p-1 rounded-full border border-blue-300">

          <button
            type="button"
            onClick={() => setisopened(false)}
            className="px-5 py-1.5 rounded-full cursor-pointer text-sm font-semibold bg-white text-blue-400 shadow-md"
          >
            Company
          </button>

        </div>

      </header>

      <main className="flex items-center justify-center p-3">

        <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">

          <div className="bg-gray-50 p-6 border-b border-gray-200 text-center">

            <h3 className="text-xl font-black text-gray-800 uppercase flex items-center justify-center gap-3">
              Company Registration Portal
            </h3>

          </div>

          <form className="p-8" onSubmit={HandleSubmit}>

            <div className="flex flex-wrap -mx-3">

              <div className="w-full md:w-1/2 px-3 mb-4">

                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1">
                  <Briefcase size={14}/>
                  Company Names
                </label>

                <input
                  type="text"
                  name="companyNames"
                  value={formData.companyNames}
                  onChange={handleChange}
                  placeholder="Company"
                  className={inputClass("companyNames")}
                />

                {
                  errors.companyNames &&
                  <p className="text-red-500 text-xs mt-1">
                    {errors.companyNames}
                  </p>
                }

              </div>

              <div className="w-full md:w-1/2 px-3 mb-4">

                <label className="flex items-center gap-2 text-xs text-gray-700 font-bold uppercase mb-1 ml-1">
                  <MapIcon size={14}/>
                  Company Location
                </label>

                <input
                  type="text"
                  name="companyLocation"
                  value={formData.companyLocation}
                  onChange={handleChange}
                  placeholder="Head Office"
                  className={inputClass("companyLocation")}
                />

                {
                  errors.companyLocation &&
                  <p className="text-red-500 text-xs mt-1">
                    {errors.companyLocation}
                  </p>
                }

              </div>

              <div className="w-full md:w-1/2 px-3 mb-4">

                <label className="flex items-center gap-2 text-xs text-gray-700 font-bold uppercase mb-1 ml-1">
                  <User size={14}/>
                  Admin Names
                </label>

                <input
                  type="text"
                  name="adminNames"
                  value={formData.adminNames}
                  onChange={handleChange}
                  placeholder="Full Names"
                  className={inputClass("adminNames")}
                />

                {
                  errors.adminNames &&
                  <p className="text-red-500 text-xs mt-1">
                    {errors.adminNames}
                  </p>
                }

              </div>

              <div className="w-full md:w-1/2 px-3 mb-4">

                <label className="flex items-center gap-2 text-xs text-gray-700 font-bold uppercase mb-1 ml-1">
                  <ShieldCheck size={14}/>
                  Admin NID
                </label>

                <input
                  type="text"
                  name="adminNid"
                  value={formData.adminNid}
                  onChange={handleChange}
                  placeholder="National ID"
                  className={inputClass("adminNid")}
                />

                {
                  errors.adminNid &&
                  <p className="text-red-500 text-xs mt-1">
                    {errors.adminNid}
                  </p>
                }

              </div>

              <div className="w-full md:w-1/2 px-3 mb-4">

                <label className="flex items-center gap-2 text-xs text-gray-700 font-bold uppercase mb-1 ml-1">
                  <PhoneCall size={14}/>
                  admin Phone
                </label>

                <input
                  type="text"
                  name="adminPhone"
                  value={formData.adminPhone}
                  onChange={handleChange}
                  placeholder="Phone no"
                  className={inputClass("adminPhone")}
                />

                {
                  errors.adminPhone &&
                  <p className="text-red-500 text-xs mt-1">
                    {errors.adminPhone}
                  </p>
                }

              </div>

              <div className="w-full md:w-1/2 px-3 mb-4">

                <label className="flex items-center gap-2 text-xs text-gray-700 font-bold uppercase mb-1 ml-1">
                  <MailIcon size={14}/>
                  admin email
                </label>

                <input
                  type="text"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  placeholder="Email"
                  className={inputClass("adminEmail")}
                />

                {
                  errors.adminEmail &&
                  <p className="text-red-500 text-xs mt-1">
                    {errors.adminEmail}
                  </p>
                }

              </div>

              <div className="w-full px-3 mb-4">

                <label className="flex items-center gap-2 text-xs text-gray-700 font-bold uppercase mb-1 ml-1">
                  <ShieldCheck size={14}/>
                  Permission ID
                </label>

                <input
                  type="text"
                  name="permissionId"
                  value={formData.permissionId}
                  onChange={handleChange}
                  placeholder="Verification ID"
                  className={inputClass("permissionId")}
                />

                {
                  errors.permissionId &&
                  <p className="text-red-500 text-xs mt-1">
                    {errors.permissionId}
                  </p>
                }

              </div>

            </div>
            <div className='flex md:justify-center lg:justify-end '>

            <button
              className=" w-full md:w-full  lg:w-fit px-6 bg-blue-300 text-white font-semibold py-2 rounded-sm flex items-center justify-center shadow-sm shadow-blue-50 transition-all duration-300 uppercase tracking-wide cursor-pointer mt-6"
            >

              {
                loading
                  ?
                  <span className="flex items-center gap-1">
                    <Loader className="animate-spin"/>
                    Registering...
                  </span>
                  :
                  "Submit information"
              }

            </button>
            </div>



          </form>

        </div>

      </main>

      {
        burnermessageopen &&
        <HandleErrormodel
          success={success}
          message={message}
          onClose={closemodel}
        />
      }

    </div>
  );
}

export default Company_portal;

