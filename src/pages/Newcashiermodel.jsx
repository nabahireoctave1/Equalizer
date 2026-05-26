import { GemIcon, GitBranchIcon, Mail, MapPin, Phone, User2, XIcon } from 'lucide-react'
import React from 'react'

function Newcashiermodel({onClose}) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'>

      <div className='w-full max-w-2xl bg-white shadow-md rounded-md  overflow-hidden transform transition-all 
      animate-in fade-in zoom-in-95 duration-200'>
        
        <div className='flex justify-between items-center bg-blue-300 px-6 py-4 text-white'>
          <h1 className='text-lg font-extrabold  uppercase '>Add New Cashier</h1>
          <button onClick={onClose} className='bg-blue-500 cursor-pointer p-1.5 rounded-full transition-colors duration-150'>
            <XIcon className='w-5 h-5' />
          </button>
        </div>

        <form action="" method="post" className='p-6 space-y-6'>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>
            
            <div className='space-y-4'>
              <div>
                <label className='flex gap-2 text-xs font-medium text-gray-600 uppercase tracking-wider mb-1.5 items-center' htmlFor="fullname">
                  <User2 className='w-4 h-4 text-blue-500' /> Full Name
                </label>
                <input id="fullname" type="text" placeholder="John Doe" className="w-full p-2.5 border
                 border-gray-200 rounded-md focus:shadow-sm shadow-blue-200 outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent text-sm transition-all" />
              </div>

              <div>
                <label className='flex gap-2 text-xs font-medium text-gray-600 uppercase tracking-wider mb-1.5 items-center' htmlFor="email">
                  <Mail className='w-4 h-4 text-blue-500' /> Email Address
                </label>
                <input id="email" type="email" placeholder="cashier@company.com" className="w-full p-2.5 
                border border-gray-200 rounded-md focus:shadow-sm shadow-blue-200 outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent text-sm transition-all" />
              </div>

              <div>
                <label className='flex gap-2 text-xs font-medium text-gray-600 uppercase tracking-wider mb-1.5 items-center' htmlFor="phone">
                  <Phone className='w-4 h-4 text-blue-500' /> Phone Number
                </label>
                <input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="w-full p-2.5 
                border border-gray-200 rounded-md focus:shadow-sm shadow-blue-200 outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent text-sm transition-all" />
              </div>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='flex gap-2 text-xs font-medium text-gray-600 uppercase tracking-wider mb-1.5 items-center' htmlFor="location">
                  <MapPin className='w-4 h-4 text-blue-500' /> Location
                </label>
                <input id="location" type="text" placeholder=" Nyagatare" className="w-full p-2.5
                 border border-gray-200 rounded-md focus:shadow-sm shadow-blue-200 outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent text-sm transition-all" />
              </div>

              <div>
                <label className='flex gap-2 text-xs font-medium text-gray-600 uppercase tracking-wider mb-1.5 items-center'>
                  Gender
                </label>
                <div className='flex gap-6 p-2.5 bg-gray-50 border border-gray-100 rounded-lg h-5 items-center'>
                  <label className='flex items-center gap-2 text-sm text-gray-700 cursor-pointer'>
                    <input type="radio" name="gender" value="male" className="w-4 h-4 text-blue-600
                     border-gray-300 focus:ring-blue-500" />
                    Male
                  </label>
                  <label className='flex items-center gap-2 text-sm text-gray-700 cursor-pointer'>
                    <input type="radio" name="gender" 
                    value="female" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-400" />
                    Female
                  </label>
                </div>
              </div>

              <div>
                <label className='flex gap-2 text-xs font-medium text-gray-600 uppercase tracking-wider mb-1.5 items-center' htmlFor="branch">
                  <GitBranchIcon className='w-4 h-4 text-blue-500' /> Branch Location
                </label>
                <input id="branch" type="text" placeholder="Rubavu Tech" className="w-full p-2.5
                 border border-gray-200 rounded-md focus:shadow-sm shadow-blue-200 outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent text-sm transition-all" />
              </div>
            </div>

          </div>

          <div className='flex justify-end gap-3 pt-4 border-t border-gray-100'>
            <button type="button" className='px-4 py-2 text-sm  cursor-pointer font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors'>
              Cancel
            </button>
            <button type="submit" className='px-4 py-2 text-sm font-medium text-white cursor-pointer bg-blue-400 rounded-md  shadow-md shadow-blue-200 transition-colors'>
              add
            </button>
          </div>

        </form>
      </div>

    </div>
  )
}

export default Newcashiermodel