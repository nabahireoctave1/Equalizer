import React from 'react'

function Agent_Portal() {
  return (
    <div>

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
    </div>
  )
}

export default Agent_Portal