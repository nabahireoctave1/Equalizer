import React, { useEffect, useState } from 'react';
import { Building2, ShieldCheck, Search, ChevronLeft, ChevronRight, CircleX, SearchX } from 'lucide-react';
import api from '../api'
import NetworkError from './NetworkError';
const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
 
  const [networkError,setnetworkError]=useState(null)
  const [error,seterror]=useState(null);
  const [Loading,setLoading]=useState(true)
  const [errorsize,seterrorsize]=useState(null);
  const [errorTitle,setErrortitle]=useState(null);
  const FetchCurrentCompany= async()=>{
    setnetworkError(null);
    setLoading(true);
    seterror(null);
    setErrortitle(null);
    seterrorsize(null);
    try{
    const res=await api.get('/current-company');
     const data= res?.data;
     setCompanies(data)
    
    }
    catch(err){
        if(!err.response){
        setnetworkError(true);
      }
     seterror(err.response?.data?.message);
      seterrorsize(err.response?.data.size);
      setErrortitle(err.response?.data.title)
    }finally{
      setLoading(false)
    }
  }


  useEffect(()=>{
    FetchCurrentCompany();
  },[])

  const filteredCompanies = companies.filter((Cmp)=>{
    return (
     Cmp.company_name?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
  });

  const [page,setpages]=useState(1)
  const companyPerpage=2;
  const start= (page-1)*companyPerpage
  const end= start+companyPerpage
  const totalPages= Math.ceil(filteredCompanies?.length/companyPerpage)

  const perginatedCMP = filteredCompanies?.slice(start,end)

  const formatAmount= (amount)=>{
       if(amount > 1000){
        return amount/1000 +'K';
       }

       if(amount >=1000000){
        return 1 /1000000 + 'M';
       }

       return amount

  }
 


  const HandleNext= ()=>{
    if(page<totalPages){
      setpages(page+1);
    }
  }


  const HandlePrevious=()=>{
    if(page>1){
      setpages(page-1);
    }
  }


  const HandleRetry= ()=>{
    FetchCurrentCompany();
  }



  
function CompanyLoader() {
  return (
  
    <div className='bg-white  rounded-sm border border-gray-200 p-3
              hover:border-blue-100 transition-colors'>
              
              <div className='flex flex-col sm:flex-row justify-between
               items-center p-2 border-b border-gray-100/50 bg-gray-50/50'>
                <div className='flex items-center gap-3'>
                  <div className='p-5 rounded-full animate-pulse bg-gray-200'></div> 

                  <div>
                    <div className='flex  items-center gap-1.5'>
                       <div className='p-2 bg-gray-200 w-40 animate-pulse rounded-full'></div>
            
                    </div>
                      <div className='p-2 bg-gray-200 m-2 w-25 rounded-full animate-pulse'></div>
                
                  </div>
                </div>
                
                <div className='flex items-center gap-2'>
                  <div className='p-5 rounded-full animate-pulse bg-gray-200'></div>
                  
                 
                  <div className='text-left'>
                   <div className='p-2 bg-gray-200 w-35 m-1 rounded-full animate-pulse'></div>
                    <div className='p-2 bg-gray-200 w-35 m-1 rounded-full animate-pulse'></div>
                   
                  </div>
                </div>
              </div>

              <div className='p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center'>
                <div className='flex flex-col items-center justify-center border-r border-gray-100'>
                 <div className='w-20 border-2 flex bg-gray-100  border-gray-100 animate-pulse 
                  h-20 rounded-full'></div>
                 <div className='p-2 bg-gray-200 m-1.5 rounded-full animate-pulse w-25'></div>
                
                  <div>
                     <div className='w-35 rounded-full animate-pulse bg-gray-200 p-2'></div>
                  
                  </div>
                </div>

                

                <div className='md:col-span-2 flex justify-between px-4 '>
                  <div className='flex flex-col gap-2'>
                    <div>
                    
                        <div className='p-2 w-35  bg-gray-200 m-2 rounded-full animate-pulse'></div>
                        <div className='p-2 w-35  bg-gray-200 m-2 rounded-full animate-pulse'></div>

                      </div>          
                    <div>
                          <div>
                          <div className='p-2 w-35  bg-gray-200 m-2 rounded-full animate-pulse'></div>
                        <div className='p-2 w-35  bg-gray-200 m-2 rounded-full animate-pulse'></div>
                      </div>
                      
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div>
                       <div className='p-2 w-35  bg-gray-200 m-2 rounded-full animate-pulse'></div>
                      <div className='p-2 w-35  bg-gray-200 m-2 rounded-full animate-pulse'></div>
                      </div>
                      
                    
                    <div>
                       <div className='p-2 w-35  bg-gray-200 m-2 rounded-full animate-pulse'></div>
                        <div className='p-2 w-35  bg-gray-200 m-2 rounded-full animate-pulse'></div>
              
                       </div>
                  </div>
                </div>

                 <button  className='py-5  hidden md:block  bg-gray-200 max-w-45 px-2 rounded-md animate-pulse'></button>
                
               
               
              </div>
             
            </div>
  )
}


  return (
    <div className='w-full bg-gray-50 flex flex-col font-sans '>
      
      <div className='sticky  top-0 z-50 bg-white border-b border-gray-200 p-4 '>
        <div className='max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3'>
          
          <div className='flex items-center gap-2'>
            <div className='p-2 bg-blue-500 rounded-full text-white'>
              <Building2 size={20} />
            </div>
            <h2 className='font-extrabold text-sm uppercase tracking-wider text-gray-700'>
              Companies
            </h2>
          </div>

          <div className='relative w-full md:w-72'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={16} />
            <input 
              type="text" 
              disabled={networkError||Loading||error}
              placeholder="Search by Company name..."
              className='w-full pl-10 pr-4 py-3 bg-gray-100 rounded-md border
               border-gray-200 text-[13px]  focus:ring-1 disabled:cursor-not-allowed
                focus:ring-blue-400 outline-none transition-all'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
     
        
       {networkError ?
       <div className='m-2'>
        <NetworkError HandleRetry={HandleRetry}/>
        </div>:
        
       error&&errorsize===0 ? 
       <div className='flex items-center flex-col justify-center h-80 '>
        <span className='bg-blue-400 p-3 rounded-full text-white'>
          <Building2 size={30}/>  
        </span>
        <h2 className='text-gray-800 text-2xl font-bold'>{errorTitle}</h2>
        <p className='text-[15px] text-slate-800'>{error}</p>
           <button className='bg-blue-400 rounded-sm px-6 py-2 text-[15px]
            text-white m-2 cursor-pointer font-semibold capitalize'>Add New</button>
       </div>
    
       : error&&errorsize===1 ?
       <div className='bg-red-50 p-5 rounded-sm m-2 border-red-500 border mt-6'>
        <span>
          <CircleX size={45} className='text-red-500'/>
        </span>
        <h2 className='text-red-500 text-2xl'>{errorTitle}</h2>
        <p className='text-[15px] italic text-slate-800'>{error}</p>
        <p className='text-[15px] italic text-gray-800'>Due to server Error occurs system can`t return any company information try again</p>
        <div className='flex justify-end mt-2'>
        <button onClick={HandleRetry} className='capitalize bg-green-600 
        text-white  italic px-6 py-1.5 rounded-sm cursor-pointer'>retry</button>
          
        </div>
       </div>:
       !Loading&&filteredCompanies.length===0 &&
       <div className='justify-center flex items-center flex-col p-12 h-80'>
           <SearchX size={50} className='text-gray-800'/>
           <p className='text-2xl font-bold text-gray-800'> No result found</p>
           <p className='text-[15px] italic text-gray-800'>We can`t find match search Please check your spelling or try different keyward</p>
       </div>
      
       
      }

      <div className='flex-1 overflow-y-auto p-4'>
        <div className='max-w-7xl mx-auto flex flex-col gap-4 pb-10'>
          {Loading||networkError ? Array.from({length:2}).map((_,idx)=>(
             <div>
              <CompanyLoader/>
             </div>
            
          )):perginatedCMP.map((company) => {
           const repaymentProgress= company.total_loans!==0 && company.total_repayments!==0 ? 
            Math.min(company?.total_repayments/company.total_loans*100,100):0
            return <div key={company.id} className='bg-white  rounded-sm border border-gray-200 p-3
             overflow-hidden hover:border-blue-100 transition-colors'>
              
              <div className='flex flex-col sm:flex-row justify-between items-center p-3 border-b border-gray-100/50 bg-gray-50/50'>
                <div className='flex items-center gap-3'>
                    <div className='p-2 bg-blue-50 rounded-full text-blue-500'>
                      <Building2 size={25} />
                  </div>
                
                  <div>
                    <div className='flex   items-center gap-1.5'>
                      <h2 className='text-xl font-extrabold text-gray-800 uppercase'>{company.company_name}</h2>
                    </div>
                    <p className='text-[13px] tracking-wide text-gray-800 font-bold'>{company.company_id}</p>
                  </div>
                </div>
                
                <div className='flex items-center gap-2'>
                   <div className='bg-blue-400 w-8 h-8 flex  items-center justify-center text-white text-xs font-bold rounded-full shadow-sm'>
                    {company?.admin_name?.split(' ').map((w)=>w[0].toUpperCase())}
                  </div>
                 
                  <div className='text-left'>
                    <h1 className='text-[14px] capitalize font-bold text-gray-800'>{company.admin_name}</h1>

                    <p className='text-[14px] text-gray-500'>{company.phone}</p>

                  </div>
                </div>
              </div>

              <div className='p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center'>
                <div className='flex flex-col items-center justify-center border-r border-gray-100'>

                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" 
                      className="stroke-current text-gray-100" strokeWidth="4"></circle>
                      <circle 
                        cx="18" cy="18" r="16" fill="none" 
                        className="stroke-current text-green-500"
                        strokeWidth="4" 
                        strokeDasharray={`${repaymentProgress},100`} 
                        strokeLinecap="round"
                        transform="rotate(-90 18 18)"
                      ></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[12px] font-bold text-gray-800">{repaymentProgress}%</span>
                    </div>
                  </div>

                  <p className='text-[12px] font-bold text-gray-700 mt-1 uppercase'>Repayment</p>
                  <div>
                     <p className='font-semibold text-gray-900 text-[18px]'>
                    {company.total_repayments.toFixed(2)} / {formatAmount(company.total_loans.toFixed(2))}</p>
                  
                  </div>
                </div>

                

                <div className='md:col-span-2 flex justify-between px-4 '>
                  <div className='flex flex-col gap-2'>
                      <div>
                       <p className='text-[11px] text-gray-800 uppercase'>Total amount Loaned</p>
                      <p className='text-[18px] font-semibold tracking-wide text-gray-900'>
                        {formatAmount(company.total_loans.toFixed(2))?? 0} </p>
                      </div>
                    <div>
                      <p className='text-[11px] text-gray-800 uppercase'>activation Payment</p>
                      <p className='text-[18px] font-semibold text-gray-900 tracking-wide'>
                        {formatAmount(company.activation_payment?? 0)}</p>
                      
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                      
                      <div>
                        <p className='text-[11px] text-gray-800 uppercase'>Activated Date</p>
                      <p className='text-[15px] text-gray-800 font-semibold first-letter:uppercase'>
                        {company.activation_date?? ''}</p>
                      </div>                  
                    <div>
                    
                       <div>
                        <p className='text-[12px] text-gray-800 uppercase'>Status</p>
                         <div className='flex items-center gap-1.5'>
                        <div className={`w-1.5 h-1.5 rounded-full ${company.status === 'Active' ? 
                          'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className={`text-[10px] font-bold ${company.status === 'Active' ?
                           'text-green-500' : 'text-red-500'}`}>
                           {company.status.toUpperCase()}
                        </span>
                      </div>
                       </div>
                      
                    </div>
                  </div>
                </div>
                  <button 
                  className={`w-full hidden md:block 
                    max-w-45  px-2 py-2 rounded-md cursor-pointer
                     text-[15px] font-semibold transition-all 
                     shadow-sm border capitalize ${
                    company.status === 'Active' 
                    ? 'border-red-500 text-white  bg-red-500' 
                    :'bg-blue-400 text-white hover:bg-blue-500 border-blue-400'
                  }`}
                >
                  {company.status === 'Active' ? 'Suspend' : 'Reactivate'}
                </button>
               
               
              </div>
              <div className='p-2'>
              <button 
                className={`w-full block md:hidden py-2.5
                   rounded-full cursor-pointer text-[12px]
                    font-black transition-all shadow-sm border
                     border-none outline-none
                     uppercase tracking-wider ${
                  company.status?.toLowerCase() === 'active' 
                  ? 'border-red-100 text-red-500 bg-red-50' 
                  :company.status?.toLowerCase()==='suspended' ? 
                  'bg-blue-400 text-white hover:bg-blue-500 border-blue-400'
                :'bg-gray-100'}`}
              >
                {company.status === 'Active' ? 'Suspend' : 'Reactivate'}
              </button>
              </div>
            </div>
})}
        </div>
        <div className={`${networkError||perginatedCMP.length!==companyPerpage||Loading ? 'hidden':'' } w-full flex items-center justify-between gap-1 `}>
          <button
           disabled={page===1||networkError||Loading}
          onClick={HandlePrevious} className='p-1 bg-gray-200 rounded-sm text-gray-700 border-none outline-none cursor-pointer disabled:cursor-not-allowed'><ChevronLeft/></button>
          <button 
          disabled={page===totalPages||networkError||Loading}
          onClick={HandleNext} className='p-1 bg-gray-200 rounded-sm text-gray-700 border-none outline-none cursor-pointer disabled:cursor-not-allowed'><ChevronRight/></button>
        </div>

      </div>
       
    </div>
  );
};

export default Companies;