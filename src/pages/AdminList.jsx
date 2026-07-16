import React, { useEffect, useState } from 'react'
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
  ChevronRight,
  List,
  Loader
} from 'lucide-react'
import api from '../api'

function AdminList() {
const [adminList,setList]=useState([])
const [error,setError]=useState(null);
const [Loading,setLoading]=useState(false)

const [listpage,setlistpage]=useState(1);
const adminPerpage=6;
const totalpage=Math.ceil(adminList.length/adminPerpage);
const currentpage=1;
const start=(listpage-1)*adminPerpage;
const end= start+adminPerpage;
const paginatedList=adminList.slice(start,end);


const HandleNext= ()=>{
  if(currentpage<totalpage){
    setlistpage(currentpage+1);
  }
}

const HandlePrevious= ()=>{
  console.log(currentpage)
  if(listpage >1){
    setlistpage(listpage-1)
  }
}

const FetchAdminList= async()=>{
  setLoading(true)
  try{ 


    const res=await api.get('admin-list')
    setList(res.data);


  }
  catch(err){
    setError(err.response?.data?.message||err.message);
  } finally{
    setLoading(false)
  }

}






useEffect(()=>{
  FetchAdminList();
},[])



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

          <div className='relative flex-1 max-w-xs'>
            <span className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <SearchIcon className='h-5 w-5 text-gray-400' />
            </span>
            <input 
              type='text' 
              placeholder='Search by ID, name, or company...'
              className='block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md bg-gray-50 focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all outline-none text-sm'
            />
          </div>

         
        </div>
      </div>

      <div className='p-6 w-full'>
        <div className='flex items-center justify-center'>
           {
        Loading ? <span className='flex gap-2 pb-4'><Loader className='animate-spin'/>Loading...</span> :
        <p className='text-[13px] text-red-500 capitalize'>{error}</p>
      }
        </div>
      
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full'>
          <div className='overflow-x-auto w-full'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-gray-100 text-gray-800 uppercase text-[12px] font-bold tracking-widest border-b border-gray-200'>
                    <th className='px-6 py-4 w-20 whitespace-nowrap'>gen ID</th> 
                  <th className='px-6 py-4 w-20 whitespace-nowrap'> admin NID</th> 
                    
                 
                  <th className='px-6 py-4 whitespace-nowrap'>Admin Name</th>
                  <th className='px-6 py-4 whitespace-nowrap'>Company Name</th>
                  <th className='px-6 py-4 whitespace-nowrap'>Company ID</th>
                  <th className='px-6 py-4'>Role</th>
                  <th className='px-6 py-4 whitespace-nowrap'>location</th>

                  <th className='px-6 py-4 text-center'>Status</th>
                  <th className='px-6 py-4 text-center'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100 text-sm'>
                {paginatedList.map((admin) => (
                  <tr key={admin.admin_sys_Id} className='hover:bg-blue-50/50 transition-colors'>
                     <td className='px-6 py-4 text-xs  font-bold text-black'>
                      {admin.admin_sys_Id}
                    </td>
                    <td className='px-6 py-4 text-xs  font-bold text-gray-700'>
                      {admin.admin_id}
                    </td>

                    <td className='px-6 py-4'>
                      <div className='flex flex-col'>
                        <span className='font-bold text-gray-900 whitespace-nowrap'>{admin.admin_name}</span>
                        <span className='text-[12px] text-gray-600 whitespace-nowrap'>{admin.email}</span>
                      </div>
                    </td>

                    <td className='px-6 py-4 font-medium text-gray-700'>
                      <div className='flex items-center gap-2 whitespace-nowrap'>
                        <Building2 size={14} className='text-gray-400' />
                        {admin.company_name}
                      </div>
                    </td>

                    <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='text-xs  font-bold text-black  px-2 py-1 '>
                        {admin.company_id}
                      </span>
                    </td>

                    <td className='px-6 py-4'>
                      <span className='text-xs font-bold text-gray-700'>{admin.role}</span>
                    </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                      <span className='text-sm   text-gray-700  px-2 py-1 '>
                        {admin.location}
                      </span>
                    </td>

                    <td className='px-6 py-4 text-center'>
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        admin.status === 'Activated' ? 'bg-blue-400 text-white' : 
                        admin.status === 'suspend' ? 'bg-red-500 text-white' : 
                        'bg-red-400 text-white'
                      }`}>
                        {admin.status}
                      </span>
                    </td>

                    <td className='px-6 py-4'>
                      <div className='flex items-center justify-center gap-1'>
                        
                        <button title="Reactivate" className=' cursor-pointer p-2 hover:bg-gray-100 text-blue-900 rounded-lg transition-colors'>
                          <RefreshCw size={16} />
                        </button>
                        <button title="Suspend" className=' cursor-pointer p-2 hover:bg-yellow-100 text-yellow-600 rounded-lg transition-colors'>
                          <UserX size={16} />
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
              Showing <span className='text-gray-800'>{currentpage}</span> to 
              <span className='text-gray-800'>{totalpage}</span> of 
              <span className='text-gray-800'> {adminList.length}</span> results
            </div>
            
            <div className='flex items-center gap-1'>
              <button onClick={HandlePrevious}
              disabled={listpage===1}
              className='p-2 border cursor-pointer border-gray-300
               rounded-lg hover:bg-gray-50 text-gray-600 transition-colors'>
                <ChevronLeft size={18} />
              </button>
              
              <button onClick={HandleNext}
              disabled={listpage===totalpage}
              className='p-2 border cursor-pointer border-gray-300
               rounded-lg hover:bg-gray-50 text-gray-600 transition-colors'>
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