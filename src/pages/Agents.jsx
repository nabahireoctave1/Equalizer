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
  Map,XCircle,
  MapPin,Loader,SearchX
} from 'lucide-react'
import Agent_Portal from './Agent_Portal';
import api from '../api';
import { useEffect } from 'react';
import SkeletonCellLoader from './SkeletonCellLoader';
import NetworkError from './NetworkError';

function Agents() {

  const [agentportalopen,setisopen]=useState(false)
  const [loading,setloading]=useState(true);
  const [error,seterror]=useState(null)
  const [title,settitle]=useState(null);
  const [size,setsize]=useState(null);
  const [data,setdata]= useState([]);
  const [searchTerm,setSearchValue]=useState('');
  const [networkError,setnetworkError]=useState(null);
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
      setsize(null);
      settitle(null);
      const res=await api.get('/agent-info');
      setdata(res.data);

     }
     catch(err){
      if(!err.response){
        setnetworkError(true)
      }
      seterror(err.response?.data?.message||err.message);
      setsize(err.response?.data?.size);
      settitle(err.response?.data.title)

     } finally{
      setloading(false)
     }

  }


  const Handleretry= ()=>{
    LogAgent();
  }

  useEffect(()=>{
    
    LogAgent();


  },[])

  const filteredAgent= paginateddata.filter((ag)=>{
   const search= searchTerm.toLowerCase();

   return (
    ag.name?.toLowerCase().includes(search)||
    String(ag.permision_id ?? "").includes(search)
   )
  })
  


  
  return (
       <div className='w-full  bg-gray-50 font-sans'>
      <div className='w-full bg-white border-b border-gray-200 px-6 py-4'>
        <div className='flex items-center justify-between w-full gap-8'>
          
          <div className='flex items-center gap-2 min-w-fit'>
            <div className='bg-blue-400 p-2 rounded-full'>
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
              disabled={error||loading}
               onChange={(e)=>setSearchValue(e.target.value)}
              placeholder='Search by ID, name, or company...'
              className='block w-full pl-10 pr-3 py-2.5
               border border-gray-300 rounded-md bg-gray-50 focus:ring-1 disabled:cursor-not-allowed
                focus:ring-blue-500 focus:bg-white transition-all outline-none text-sm'
            />
          </div>

          <button onClick={openmodel} className='bg-blue-400 capitalize
           hover:bg-blue-500 cursor-pointer text-white px-5 outline-none
            py-2.5 rounded-md text-sm font-semibold flex items-center 
            gap-2 transition-all shadow-md min-w-fit active:scale-95'>
            <Plus size={18}/> <span className='hidden sm:inline'>agent</span>
          </button>
        </div>
      </div>
      {networkError &&
       <div className='p-2'>
        <NetworkError/>
       </div>
      }

     {error && size===0  ?
     
     <div className='flex flex-col justify-center items-center h-80 p-10 md:p-5 lg:p-2 '>
      <span className='bg-blue-400 p-4 rounded-full text-white'><User2Icon size={30}/></span>
      <h2 className='text-2xl first-letter:uppercase text-gray-800'>{title}</h2>
      <p className='text-[15px] text-gray-800'>{error}</p>
      <button  onClick={openmodel} className='p-2 px-6 text-[15px] m-3
       capitalize text-white bg-blue-400 rounded-sm outline-none cursor-pointer'>Add new </button>
     </div>
     :
     
    error && size===1 ?
       <div className='bg-red-50 border border-red-500 mx-2 mt-5 p-4 rounded-md'>
      <span>
        <XCircle size={45} className='text-red-500'/>
      </span>
      <h2 className='text-2xl pt-1 text-red-500'>{title}</h2>
       <p className='text-[15px] italic'>{error}</p>
       <p className='text-gray-800 text-[15px] italic' >Due to server error system can`t return any agent information  try again</p>
       <div className='flex justify-end p-2'>
        <button onClick={Handleretry}  className='cursor-pointer capitalize text-[15px] italic
         text-white  bg-green-600 rounded-sm outline-none
        py-1.5 px-6'>retry</button>
       </div>
    </div>
    :filteredAgent.length===0  ? 
        <div className=' flex flex-col items-center justify-center h-60'>
        <span>
          <SearchX size={50} className='text-gray-800'/>
          
        </span>
        <h2 className='text-[18px] uppercase font-extrabold text-gray-800'>No result found</h2>
        <p className='text-gray-800 italic'>We can`t find match search Please check your spelling or try different keyward </p>

      </div>
    :

          <div className='p-6 w-full overflow-auto'>
        <div className='flex items-center justify-center'>
         
        </div>
        <div className='bg-white rounded-md  border border-gray-200 overflow-hidden w-full'>
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
                {loading||networkError ?Array.from({length:7}).map((_,idx)=>(
                  <tr key={idx}>
                    <td className='p-2'><SkeletonCellLoader/></td>
                    <td className='p-2'><SkeletonCellLoader/></td>
                    <td className='p-2'><SkeletonCellLoader/></td>
                    <td className='p-2'><SkeletonCellLoader/></td>
                    <td className='p-2'><SkeletonCellLoader/></td>
                    <td className='p-2'><SkeletonCellLoader/></td>

                  </tr>
                )) :filteredAgent.map((agent,index) => (
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
          
          <div className={`${loading||networkError||filteredAgent.length<=userperpage ? 'hidden':''} bg-white p-5 border-t border-gray-100 flex flex-col
           sm:flex-row justify-end  gap-4`}>
          
            
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
     }  


      {agentportalopen &&<Agent_Portal onClose={closemodel}/>}
    </div>
  )
}

export default Agents