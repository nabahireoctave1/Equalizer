import React, { useEffect, useState } from 'react'
import { Search, Activity, XCircle, WifiOff, SearchX, Banknote } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import api from '../api'
import NetworkError from './NetworkError';
import SkeletonCellLoader from './SkeletonCellLoader';

function BranchLoan() {



  const [loading,setLoading]=useState(null);
  const [branchLoans,setBranchLoans]=useState([]);
  const [messagekey,setmessageKey]=useState(null);
  const  [errorsize,setErrorsize]=useState(null);
  const [networkError,setnetworkError]=useState(false)

  const FetchLoans= async()=>{
    setLoading(true);
    setnetworkError(false);
    try{
       
      const res= await api.get('/current-loans');
    setBranchLoans(res.data)
    

   }
    catch(err){
      if(!err.response){
        setnetworkError(true)
      }
      setmessageKey (err.response?.data?.messagekey||err.message)
      setErrorsize(err.response?.data?.size)
     
    }finally{
      setLoading(false);
    }
  }


  useEffect(()=>{
  FetchLoans();
  },[])


  const HandleRetry= ()=>{
    FetchLoans();
  }

   
  const [searchTerm, setSearchTerm] = useState("");

const filteredLoans = branchLoans
  .map((branch) => ({
    ...branch,
    loans: branch.loans.filter((loan) =>
      loan.client_names
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ),
  }))
  .filter((branch) => branch.loans.length > 0);



  
    
  const {t}=useTranslation();

  

  return (
    <div className='w-full min-h-screen  bg-gray-50 pb-10 '>
      <div className='sticky top-20 px-4 py-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 
      items-start sm:items-center rounded-sm justify-between mb-2 bg-white'>
        <div className='flex gap-2 items-center'>
         <span className='bg-blue-400 p-1 rounded-2xl text-white'><Banknote size={25}/></span>
         <h2 className='font-extrabold text-2xl text-gray-700'>{t('loan.title')}</h2>
         </div>
         <div className='relative w-full sm:w-72'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={16} />
          
          <input 
            type='text' 
            onChange={(e)=>setSearchTerm(e.target.value)}
            disabled={networkError||messagekey||loading}
            placeholder={`${t('loan.search_placeholder')}`} 
            className='border w-full pl-9 pr-4 py-2 text-sm rounded-md border-gray-200
            disabled:cursor-not-allowed
             bg-gray-50/50 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white
              focus:ring-4 focus:ring-blue-500/10'
          />
         </div>
      </div>
      

      <div className="p-4 space-y-8">
        
        
        {loading?
         <div className='bg-white w-full overflow-auto shadow-xs border border-gray-100 rounded-xs py-3 px-4'>
         <div className='flex justify-between'> 
              <h2 className='rounded-xs  bg-gray-200 animate-pulse p-3 px-15'></h2>
              <h2 className='rounded-xs  bg-gray-200 animate-pulse p-3 px-15'></h2>

            </div>
          <table>
            
            <thead>
                 <tr className="text-gray-700 uppercase text-[11px] font-bold border-b border-gray-200">  
              <th className="p-4 whitespace-nowrap">{t('loan.table.client_id')}</th>
              <th className="p-4 whitespace-nowrap">{t('loan.table.client_name')}</th>
              <th className="p-4 whitespace-nowrap">{t('loan.table.amount_given')}</th>
              <th className="p-4 whitespace-nowrap">{t('loan.table.status')}</th>
              <th className="p-4 whitespace-nowrap">{t('loan.table.total_pay')}</th>
              <th className="p-4 whitespace-nowrap">{t('loan.table.fees')}</th>
              <th className="p-4 whitespace-nowrap">{t('loan.table.guarantor_name')}</th>
              <th className="p-4 whitespace-nowrap">{t('loan.table.guarantor_contacts')}</th>
              <th className="p-4 whitespace-nowrap">{t('loan.table.guarantor_address')}</th>
              <th className="p-4 whitespace-nowrap">{t('loan.table.payment_frequency')}</th>
              <th className="p-4 whitespace-nowrap">{t('loan.table.security')}</th>
              <th className="p-4 whitespace-nowrap">{t('loan.table.approved_by')}</th>
              </tr>

            </thead>
            <tbody>
              {Array.from({length:4}).map((_,idx)=>(
          <tr key={idx}>
            <td className='p-3'><SkeletonCellLoader/></td>
            <td className='p-3'><SkeletonCellLoader/></td>
            <td className='p-3'><SkeletonCellLoader/></td>
            <td className='p-3'><SkeletonCellLoader/></td>
            <td className='p-3'><SkeletonCellLoader/></td>
            <td className='p-3'><SkeletonCellLoader/></td>
            <td className='p-3'><SkeletonCellLoader/></td>
            <td className='p-3'><SkeletonCellLoader/></td>
            <td className='p-3'><SkeletonCellLoader/></td>
            <td className='p-3'><SkeletonCellLoader/></td>
            <td className='p-3'><SkeletonCellLoader/></td>
            <td className='p-3'><SkeletonCellLoader/></td>

          </tr>
        ))}

            </tbody>

          </table>

         </div>

         :networkError ?
         <NetworkError HandleRetry={HandleRetry}/>
          :messagekey&&errorsize===0 ?

         <div className='flex flex-col justify-center items-center border p-6 border-gray-200 rounded-md bg-white'>
          <span>
            <nav className='bg-blue-400  rounded-full text-white p-3 w-fit '>
            <Banknote  size={60}/>
            
            </nav>
           <h2 className='text-[20px] text-gray-800 font-bold first-letter:uppercase'>
            {t('errors.loans_error_title')}</h2>
           
          </span>
          <p className='text-[15px]'>{t(messagekey)}</p>
         </div>
          :messagekey&&errorsize===1? 
         <div className='bg-red-50 border border-red-500 p-3 rounded-sm'>
          <span>
            <XCircle size={50} className='text-red-500'/>
              <h2 className='text-2xl text-red-500'>{t('errors.errorTitle')}</h2>

          </span>
          <p className='text-[15px]'>{t(messagekey)}</p>
          <p className='text-[15px] italic'>{t('errors.error_desc')}</p>
            <div className='flex justify-end'>
              <button onClick={HandleRetry} className='p-1.5 text-white shadow 
              rounded-sm bg-green-600 px-7  cursor-pointer italic'>{t('errors.retry')}</button>
            </div>

         </div>:
         filteredLoans.length===0 
         ?
         <div className='bg-white p-6 border border-gray-100 rounded-sm'>
          <span className='flex items-center flex-col'>
                        <SearchX size={60} className='text-gray-800'/>
            <h2 className='text-xl text-gray-800 font-semibold'>{t('search_result.NoResult_found')}</h2>
             <h2 className='text-[15px] italic'>{t('search_result.Nomatches')}</h2>
          </span>
         </div>
          :filteredLoans.map((branch) => (
          <CompaniesLoanTable key={branch.branchId} branch={branch}
          
          /> 
        ))}
      </div>
    </div>
  );
}

const CompaniesLoanTable = ({ branch}) => {
  return (
    <div className="bg-white rounded-md border border-gray-200 overflow-hidden">
      <div className='bg-white p-5 border-b border-gray-100 flex flex-wrap
       gap-2 justify-between  items-center'>  
        <h2 className='text-sm md:text-md font-extrabold text-gray-800 uppercase text-wrap max-w-xs 
        sm:max-w-none'>{branch.branchName}</h2>
        <p className='text-sm md:text-md font-bold text-gray-800 uppercase whitespace-nowrap'>{branch.branchId}</p>
      </div>


      <div className="overflow-x-auto w-full">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="text-gray-700 uppercase text-[11px] font-bold border-b border-gray-200">
              <th className="p-4">{t('loan.table.client_id')}</th>
              <th className="p-4">{t('loan.table.client_name')}</th>
              <th className="p-4">{t('loan.table.amount_given')}</th>
              <th className="p-4">{t('loan.table.status')}</th>
              <th className="p-4">{t('loan.table.total_pay')}</th>
              <th className="p-4">{t('loan.table.fees')}</th>
              <th className="p-4">{t('loan.table.guarantor_name')}</th>
              <th className="p-4">{t('loan.table.guarantor_contacts')}</th>
              <th className="p-4">{t('loan.table.guarantor_address')}</th>
              <th className="p-4">{t('loan.table.payment_frequency')}</th>
              <th className="p-4">{t('loan.table.security')}</th>
              <th className="p-4">{t('loan.table.approved_by')}</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800 ">
            {branch.loans.map((loan, index) => (
              <tr key={index} className="cursor-pointer transition-colors border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                <td className="p-4">{loan.clientId}</td>
                <td className="p-4 font-semibold text-[13px] text-gray-700 capitalize">{loan.client_names}</td>
                <td className="p-4 font-bold text-[14px] tracking-wide">{loan.amount_given} </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-xs text-[11px] font-bold uppercase ${
                    loan.status === 'paid' ? 'bg-blue-500 text-white' : 'bg-red-600 text-white'
                  }`}>

                {t(`loan.status.${loan.status.toLowerCase()}`)}
                  </span>
                </td>
                <td className="p-4 font-bold tracking-wide text-[14px]">{loan.totalpay}</td>
                <td className="p-4 text-xs font-bold">{loan.fees+' %'}</td>
                <td className="p-4 font-semibold text-[13px] text-gray-700 capitalize">{loan.guarantorname}</td>
                <td className="p-4 font-semibold text-[13px] text-gray-700">{loan.guarantorcontacts}</td>
                <td className="p-4 font-semibold text-[13px] text-gray-700 capitalize">
                  {loan.guarantoraddress}</td>
                <td className="p-4 font-semibold text-[13px] text-gray-700 capitalize">{loan.payment_frequency}</td>
                <td className="p-4 font-semibold text-[13px] text-gray-700 capitalize">{loan.security}</td>
                <td className="p-4 font-semibold text-[13px] text-gray-700 capitalize">{loan.approved_by}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-200 flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex justify-between items-center sm:block">
          <p className="text-[10px] text-gray-700 uppercase font-bold tracking-wider">{t('loan.summary.total_loaned')}</p>
          <p className="text-base md:text-lg font-bold text-gray-800">{branch.total_loaned} UGX</p>
        </div>
        <div className="flex justify-between items-center sm:block border-t border-b sm:border-0 py-2 sm:py-0 border-gray-100">
          <p className="text-[10px] text-gray-700 uppercase font-bold tracking-wider">{t('loan.summary.total_loans')}</p>
          <p className="text-sm md:text-md font-bold text-gray-800 flex items-center gap-2">{branch.loanscount} 
            <span className='text-[13px] font-semibold capitalize text-gray-500'>{t('loan.summary.loans')}</span></p>
        </div>
        <div className="flex justify-between items-center sm:block">
          <p className="text-[10px] text-gray-700 uppercase font-bold tracking-wider">
            {t('loan.summary.total_unpaid')}</p>
          <p className="text-base md:text-lg font-bold text-red-400">{branch.totalunpaid} UGX</p>
        </div>
      </div>
    </div>
  );
}

export default BranchLoan;