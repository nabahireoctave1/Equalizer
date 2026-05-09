import React, { useState } from 'react'
import { 
  SearchIcon, 
  Plus, 
  UserX, 
  Lock, 
  RefreshCw, 
  Edit3, 
  Trash2,
  Building2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

function AdminList() {
  const admins = [
    { id: "1700201", name: "Jean Paul", email: "jp@akea.com", company: "Akea Kigali", companyId: "AK-001", role: "Manager", status: "Activated" },
    { id: "1500202", name: "Marie Claire", email: "mc@akea.com", company: "Akea Musanze", companyId: "AK-005", role: "Manager", status: "Locked" },
    { id: "1900203", name: "David Keza", email: "d.keza@akea.com", company: "Akea Rubavu", companyId: "AK-009", role: "Manager", status: "Suspended" },
    { id: "1600204", name: "Alice Uwase", email: "a.uwase@akea.com", company: "Akea Huye", companyId: "AK-012", role: "Editor", status: "Activated" },
    { id: "1400205", name: "Eric Sano", email: "e.sano@akea.com", company: "Akea Bugesera", companyId: "AK-015", role: "Admin", status: "Activated" },
  ];

  return (
    <div className='w-full min-h-screen bg-gray-50 font-sans'>
      <div className='w-full bg-white border-b border-gray-200 px-6 py-4'>
        <div className='flex items-center justify-between w-full gap-8 '>
          
          <div className='flex items-center gap-2 min-w-fit'>
            <div className='bg-blue-600 p-2 rounded-lg'>
              <ShieldCheck className='text-white' size={24} />
            </div>
            <h1 className='uppercase font-black text-xl text-gray-800 tracking-tighter hidden md:block'>
              Admin Panel
            </h1>
          </div>

          <div className='relative flex-1 max-w-2xl'>
            <span className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <SearchIcon className='h-5 w-5 text-gray-400' />
            </span>
            <input 
              type='text' 
              placeholder='Search by ID, name, or company...'
              className='block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all outline-none text-sm'
            />
          </div>

          <button className='bg-blue-400 hover:bg-blue-500 cursor-pointer text-white px-5 py-2.5 rounded-md text-sm font-semibold flex items-center gap-2 transition-all shadow-md min-w-fit active:scale-95'>
            <Plus size={18}/> <span className='hidden sm:inline'> admin</span>
          </button>
        </div>
      </div>

      <div className='p-6 w-full'>
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full'>
          <div className='overflow-x-auto w-full'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-gray-100 text-gray-800 uppercase text-[12px] font-bold tracking-widest border-b border-gray-200'>
                  <th className='px-6 py-4 w-20 whitespace-nowrap'> admin ID</th> 
                  <th className='px-6 py-4 whitespace-nowrap'>Admin Name</th>
                  <th className='px-6 py-4 whitespace-nowrap'>Company Name</th>
                  <th className='px-6 py-4 whitespace-nowrap'>Company ID</th>
                  <th className='px-6 py-4'>Role</th>
                  <th className='px-6 py-4 text-center'>Status</th>
                  <th className='px-6 py-4 text-center'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100 text-sm'>
                {admins.map((admin) => (
                  <tr key={admin.id} className='hover:bg-blue-50/50 transition-colors'>
                    <td className='px-6 py-4 font-mono font-bold text-gray-700'>
                      {admin.id}
                    </td>

                    <td className='px-6 py-4'>
                      <div className='flex flex-col'>
                        <span className='font-bold text-gray-900 whitespace-nowrap'>{admin.name}</span>
                        <span className='text-[12px] text-gray-600 whitespace-nowrap'>{admin.email}</span>
                      </div>
                    </td>

                    <td className='px-6 py-4 font-medium text-gray-700'>
                      <div className='flex items-center gap-2 whitespace-nowrap'>
                        <Building2 size={14} className='text-gray-400' />
                        {admin.company}
                      </div>
                    </td>

                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='text-xs font-mono font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded'>
                        {admin.companyId}
                      </span>
                    </td>

                    <td className='px-6 py-4'>
                      <span className='text-xs font-semibold text-gray-500'>{admin.role}</span>
                    </td>

                    {/* Status */}
                    <td className='px-6 py-4 text-center'>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        admin.status === 'Activated' ? 'bg-blue-400 text-white' : 
                        admin.status === 'Locked' ? 'bg-orange-100 text-orange-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {admin.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className='px-6 py-4'>
                      <div className='flex items-center justify-center gap-1'>
                        
                        <button title="Reactivate" className=' cursor-pointer p-2 hover:bg-gray-100 text-blue-900 rounded-lg transition-colors'>
                          <RefreshCw size={16} />
                        </button>
                        <button title="Suspend" className=' cursor-pointer p-2 hover:bg-yellow-100 text-yellow-600 rounded-lg transition-colors'>
                          <UserX size={16} />
                        </button>
                        <button title="Lock Account" className=' cursor-pointer p-2 hover:bg-orange-100 text-orange-600 rounded-lg transition-colors'>
                          <Lock size={16} />
                        </button>
                        <div className=' w-1 h-4 bg-gray-200 mx-1'></div>
                        <button title="Remove" className=' cursor-pointer p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors'>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className='bg-white p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4'>
            <div className='text-xs text-gray-500 font-medium'>
              Showing <span className='text-gray-800'>1</span> to <span className='text-gray-800'>5</span> of <span className='text-gray-800'>24</span> results
            </div>
            
            <div className='flex items-center gap-1'>
              <button className='p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-400 transition-colors disabled:opacity-50' disabled>
                <ChevronLeft size={18} />
              </button>
              
              <button className='w-9 h-9 flex items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-bold'>1</button>
              <button className='w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors'>2</button>
              <button className='w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors'>3</button>
              
              <button className='p-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors'>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminList