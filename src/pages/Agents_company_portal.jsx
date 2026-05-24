import React, { useState } from 'react';
import photo from '../assets/image.Jpeg';
import { User, PhoneCall, MailIcon, MapIcon, Building2, ShieldCheck, Briefcase } from 'lucide-react';

function Agents_company_portal() {
  const [isopened, setisopened] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="sticky top-0 z-50 flex justify-between items-center bg-blue-300 px-2 md:px-6 py-4 shadow-md gap-7">
        <div className="flex items-center gap-1 md:gap-3 ">
          <img src={photo} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" alt="Logo" />
          <h2 className="text-white font-extrabold text-xl md:text-2xl tracking-tight uppercase">Equalizer</h2>
        </div>
        
        <div className="flex gap-2  bg-blue-200 p-1 rounded-full border border-blue-300">
          <button 
            type="button"
            onClick={() => setisopened(true)} 
            className={`px-5 py-1.5 rounded-full cursor-pointer transition-all duration-300 text-sm font-semibold
                ${isopened ? 'bg-white text-blue-400 shadow-md' : 'text-blue-900 hover:bg-blue-100'}`}
          >
            Agents
          </button>
          <button 
            type="button"
            onClick={() => setisopened(false)} 
            className={`px-5 py-1.5 rounded-full cursor-pointer transition-all duration-300 text-sm font-semibold 
                ${!isopened ? 'bg-white text-blue-400 shadow-md' : 'text-blue-900 hover:bg-blue-100'}`}
          >
            Company
          </button>
        </div>
      </header>

      <main className=" flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl 
        overflow-hidden border border-gray-100">
          
          <div className="bg-gray-50 p-6 border-b border-gray-200 text-center">
            <h3 className="text-xl font-black text-gray-800 uppercase flex items-center justify-center gap-3">
              {isopened ? 'Agent Registration Portal' : 'Company Registration Portal'}
            </h3>
          </div>

          <form className="p-8" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-wrap -mx-3">
              {isopened ? (
                <>
                  <div className="w-full md:w-1/2 px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><User size={14}/> Agent Names</label>
                    <input type="text" placeholder="Full Name" className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all placeholder:text-gray-400" />
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><PhoneCall size={14}/> Phone</label>
                    <input type="tel" placeholder="+26..." className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all" />
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><MailIcon size={14}/> Email</label>
                    <input type="email" placeholder="agent@akea.com" className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all" />
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><MapIcon size={14}/> Location</label>
                    <input type="text" placeholder="City/District" className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all" />
                  </div>

                  <div className="w-full px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><ShieldCheck size={14}/> Permission ID</label>
                    <input type="text" placeholder="Verification ID" className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all" />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full md:w-1/2 px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><Briefcase size={14}/> Company Names</label>
                    <input type="text" placeholder="Entity Name" className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all" />
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><MapIcon size={14}/> Company Location</label>
                    <input type="text" placeholder="Head Office" className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all" />
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><User size={14}/> Admin Names</label>
                    <input type="text" placeholder="Primary Contact" className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all" />
                  </div>

                  <div className="w-full md:w-1/2 px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><ShieldCheck size={14}/> Admin NID</label>
                    <input type="text" placeholder="National ID" className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all" />
                  </div>

                   <div className="w-full md:w-1/2 px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><PhoneCall size={14}/> admin Phone</label>
                    <input type="text" placeholder="Phone no" className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all" />
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><MailIcon size={14}/>admin email</label>
                    <input type="text" placeholder="Email" className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all" />
                  </div>

                  <div className="w-full px-3 mb-4">
                    <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase mb-1 ml-1"><ShieldCheck size={14}/> Permission ID</label>
                    <input type="text" placeholder="Verification ID" className="w-full p-2 text-sm bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all" />
                  </div>
                </>
              )}
            </div>

            <button className="w-full  bg-blue-300  text-white
             font-bold py-2 rounded-lg shadow-sm shadow-blue-50 transition-all duration-300 uppercase 
             tracking-wide cursor-pointer mt-6  border-blue-400 active:border-b-0 active:translate-y-1">
              Submit Registration
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Agents_company_portal;