import React, { useState } from 'react'
import { 
  SearchIcon, 
  Plus, 
  UserX, 
  Lock, 
  User2Icon,
  RefreshCw, 
  Edit3, 
  Trash2,
  Building2,
  ChevronLeft,
  ChevronRight,
  Map,
  MapPin,Loader
} from 'lucide-react'
import Agent_Portal from './Agent_Portal';
import api from '../api';
import { useEffect } from 'react';

function Agents() {

  const [agentportalopen,setisopen]=useState(false)
  const [loading,setloading]=useState(true);
  const [error,seterror]=useState(null)
  const [data,setdata]= useState([]);
  
  const openmodel= ()=>setisopen(true)
  const closemodel=()=>setisopen(false)


  const [pages,setpages]=useState(1);
  const userperpage=5;
  const start= (pages-1)*userperpage;
  const end= start+userperpage;
  const totalpage= Math.ceil(data.length)/userperpage
  const paginateddata= data.slice(start,end);


  const handlenext=()=>{
    if(pages<totalpage){
     setpages(pages+1)
    }
  }

   const HandlePrevious=()=>{
    if(pages> 1){
     setpages(pages-1)
    }
  }
  
  const LogAgent= async()=>{
     try{
      setloading(true);
      const res=await api.get('/agent-info');
      setdata(res.data);

     }
     catch(err){
      seterror(err.response?.data?.message||err.message);
     } finally{
      setloading(false)
     }

  }


  useEffect(()=>{
    
    LogAgent();


  },[])

  


  
  return (
       <div className='w-full min-h-screen bg-gray-50 font-sans'>
      <div className='w-full bg-white border-b border-gray-200 px-6 py-4'>
        <div className='flex items-center justify-between w-full gap-8'>
          
          <div className='flex items-center gap-2 min-w-fit'>
            <div className='bg-blue-600 p-2 rounded-lg'>
              <User2Icon className='text-white' size={24} />
            </div>
            <h1 className='uppercase font-black text-xl text-gray-800 tracking-tighter hidden md:block'>
              Agents control center
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

          <button onClick={openmodel} className='bg-blue-400 hover:bg-blue-500 cursor-pointer text-white px-5 py-2.5 rounded-md text-sm font-semibold flex items-center gap-2 transition-all shadow-md min-w-fit active:scale-95'>
            <Plus size={18}/> <span className='hidden sm:inline'>agent</span>
          </button>
        </div>
      </div>

      <div className='p-6 w-full'>
        <div className='flex items-center justify-center'>
           {
        loading ? <span className='flex gap-2 pb-4'><Loader className='animate-spin'/>Loading...</span> :
        <p className='text-[13px] text-red-500 capitalize'>{error}</p>
      }
        </div>
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full'>
          <div className='overflow-x-auto w-full'>
            <table className='w-full text-left border-collapse'>
              <thead>
                <tr className='bg-gray-100 text-gray-700 uppercase text-[12px] font-bold tracking-widest border-b border-gray-200'>
                  <th className='px-6 py-4 w-20 whitespace-nowrap'>agent Permit ID</th> 
                  <th className='px-6 py-4 whitespace-nowrap'>agent name</th>
                  <th className='px-6 py-4 whitespace-nowrap'>phone</th>

                  <th className='px-6 py-4 whitespace-nowrap'>Location</th>
                  <th className='px-6 py-4 text-center'>Status</th>
                  <th className='px-6 py-4 text-center'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100 text-sm'>
                {paginateddata.map((agent,index) => (
                  <tr key={index} className='hover:bg-blue-50/50 transition-colors'>
                    <td className='px-6 py-4 font-sans font-bold text-gray-800'>
                      {agent.permision_id}
                    </td>

                    <td className='px-6 py-4'>
                      <div className='flex flex-col'>
                        <span className='font-bold text-gray-900 whitespace-nowrap'>{agent.name}</span>
                        <span className='text-[12px] text-gray-600 whitespace-nowrap'>{agent.email}</span>
                      </div>
                    </td>
                      <td className='px-6 py-4  text-gray-900'>
                      {agent.phone}
                    </td>


                    <td className='px-6 py-4 font-medium text-gray-700'>
                      <div className='flex items-center gap-2 whitespace-nowrap'>
                        <MapPin size={14} className='text-gray-400' />
                        {agent.location}
                      </div>
                    </td>

                   

                   

                    <td className='px-6 py-4 text-center'>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        agent.status == 'active' ? 'bg-green-100 text-green-700' : 
                        agent.status === 'suspended' ? 'bg-orange-100 text-orange-700' : 
                        'bg-red-400 text-white'
                      }`}>
                        {agent.status}
                      </span>
                    </td>

                    <td className='px-6 py-4'>
                      <div className='flex items-center justify-center gap-1'>
                        
                        <button title="Reactivate" className=' cursor-pointer p-2 hover:bg-green-100 text-green-600 rounded-lg transition-colors'>
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
          
          <div className='bg-white p-4 border-t border-gray-100 flex flex-col
           sm:flex-row justify-end  gap-4'>
          
            
            <div className='flex items-center gap-1'>
              <button onClick={HandlePrevious} disabled={pages===1} className='p-2 border cursor-pointer border-gray-300 rounded-lg
               hover:bg-gray-50 text-gray-400 transition-colors disabled:opacity-50'>
                <ChevronLeft size={18} />
              </button>
              
             
              <button onClick={handlenext} disabled={pages===totalpage}  className='p-2  cursor-pointer border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors'>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {agentportalopen &&<Agent_Portal onClose={closemodel}/>}
    </div>
  )
}

export default Agents