import React, { useEffect, useState } from 'react';
import { Search,  XCircle, SearchX, Banknote } from 'lucide-react';
import api from '../api';
import SkeletonCellLoader from './SkeletonCellLoader';
import NetworkError from './NetworkError';




function Loan() {
const [CompanyData,setCompanyData]=useState([])

  const [searchTerm, setSearchTerm] = useState("");
  const [loading,setloading]=useState(null);
  const [networkError,setnetworkError]=useState(null);
  const [error,setError]=useState(null);
  const [ErrorSize,setErrorSize]=useState(null);
  const [ErrorTitle,setErrortitle]= useState(null)

const filteredData = CompanyData.filter((company) => {
  const search = searchTerm.toLowerCase();

  const companyMatch = company.company_name
    ?.toLowerCase()
    .includes(search);

  const clientMatch = company.loans?.some((loan) =>
    loan.client_name?.toLowerCase().includes(search)
  );

  return companyMatch || clientMatch;
});





  const FetchCurrentLoans= async()=>{
    setloading(true);
    setnetworkError(null);
    setError(null);
    setErrorSize(null);
    setErrortitle(null)
     try{
      const res= await api.get('/company-Loans');
      setCompanyData(res.data);
      

     }
     catch(err){
      if(!err.response){
        setnetworkError(true);
      }
      const errdata= err.response?.data;
      setError(errdata?.message);
      setErrorSize(errdata?.size);
      setErrortitle(errdata.title)

     }finally{
      setloading(false)
     }
  }


  useEffect(()=>{
   
  FetchCurrentLoans();

  },[])



  const HandleRetry=()=>{
    FetchCurrentLoans();
  }

    const Formatdate= (date)=>{
    if(!date) return null;
    return date.split('T')[0].split('-').reverse().join('-')

  }

  const FormatAmount=(amount)=>{
    if(!amount) return null;

    if(amount>=1000){
      return amount/1000 + "K"
    }

    if(amount >=1000000){
      return amount/1000000 +'M'
    }
    
    return amount;

  }
  return (
    <div className='w-full  bg-gray-50 pb-10 overflow-y-auto'>
      <div className='gap-5 md:gap-0 flex flex-col sm:flex-row justify-between
       items-center w-full p-4 bg-white border-b border-gray-100'>
        <div className='flex gap-2 items-center'>
          <div className='bg-blue-400 p-1.5 rounded-full'>
            <Banknote className='text-white' size={20}/>
          </div>
          <span className='font-extrabold text-lg text-gray-700 uppercase tracking-tight flex'>Loan Management </span>
        </div>

        <div className='relative w-full md:w-72'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={16} />
          <input 
            type="text" 
            disabled={networkError||loading ||error}
            placeholder="Search client name..."
            className='w-full pl-10 pr-4 py-2 rounded-md 
            disabled:cursor-not-allowed
            border border-gray-200 text-sm focus:ring-2 
            focus:ring-blue-400 outline-none transition-all'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {
       networkError &&
    <div className='m-2'>
      <NetworkError HandleRetry={HandleRetry}/>
    </div>
}

    {
     error&&ErrorSize===0 ?
      <div className=' w-full h-80 p-12 md:p-6   border-gray-100 
      border justify-center items-center flex  flex-col'>
      <span className='bg-blue-400 p-3 rounded-full'>
        <Banknote size={30} className='text-white'/>
      </span>
      <h2 className='text-2xl text-gray-800 font-semibold'>{ErrorTitle}</h2>
      <p className='text-[15px]'>{error}</p>

    </div>:error&&ErrorSize===1 &&
    <div className='bg-red-50 border border-red-500 mx-2 mt-5 p-4 rounded-md'>
      <span>
        <XCircle size={45} className='text-red-500'/>
      </span>
      <h2 className='text-2xl pt-1 text-red-500'>{ErrorTitle}</h2>
       <p className='text-[15px] italic'>{error}</p>
       <p className='text-gray-800 text-[15px] italic' >Due to server error system cant cant return any company loans please retry</p>
       <div className='flex justify-end p-2'>
        <button onClick={HandleRetry} className='cursor-pointer capitalize text-[15px] italic
         text-white  bg-green-600 rounded-sm
        py-1.5 px-6'>retry</button>
       </div>
    </div>
    
     


   
    }
    <div className='p-2 space-y-3 m-1'>
     {loading||networkError ?
        <div>
           <div className='flex justify-between m-2'>
          
            <div className='p-3 bg-gray-200 w-30 rounded-sm animate-pulse'></div>
            <div className='p-3 bg-gray-200 w-30 rounded-sm animate-pulse'></div>
            </div>
          <div className='overflow-auto'>
            <table>
         <tr className="bg-gray-50 text-gray-700 uppercase text-[12px] font-bold">
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Loan Id</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Client ID</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Client national Id</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Client Name</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Amount</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Status</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Total Pay</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Fees</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Closing date</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">guarantor name</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">guarantor contacts</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">guarantor address</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">unpaid window</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Colateral</th>
            </tr>
            
              {Array.from({length:6}).map((_,idx)=>(
              <tr key={idx}>
               <td className='p-2'><SkeletonCellLoader/></td>
               <td className='p-2'><SkeletonCellLoader/></td>
               <td className='p-2'><SkeletonCellLoader/></td>
               <td className='p-2'><SkeletonCellLoader/></td>
               <td className='p-2'><SkeletonCellLoader/></td>
               <td className='p-2'><SkeletonCellLoader/></td>
               <td className='p-2'><SkeletonCellLoader/></td>
               <td className='p-2'><SkeletonCellLoader/></td>
               <td className='p-2'><SkeletonCellLoader/></td>
               <td className='p-2'><SkeletonCellLoader/></td>
               <td className='p-2'><SkeletonCellLoader/></td>
               <td className='p-2'><SkeletonCellLoader/></td>
               <td className='p-2'><SkeletonCellLoader/></td> 
               <td className='p-2'><SkeletonCellLoader/></td> 
               </tr>
              ))}
          </table>
</div>

            <div  className='flex justify-between pt-4'>
            <div>
              <div className='p-2 bg-gray-200 w-35 m-2 animate-pulse rounded-sm'></div>
              <div className='p-2 bg-gray-200 w-35 m-2 animate-pulse rounded-sm'></div>
            </div>

            <div>
              <div className='p-2 bg-gray-200 w-35 m-2 animate-pulse rounded-sm'></div>
              <div className='p-2 bg-gray-200 w-35 m-2 animate-pulse rounded-sm'></div>
            </div>

            </div>
          </div>
        :filteredData.map((company) => {
          return <div>
            <CompaniesLoanTable key={company.id} company={company} Formatdate={Formatdate}
              FormatAmount={FormatAmount} loading={loading}/>
            </div>
})}
</div>
 {!loading||ErrorSize==0&&filteredData.length===0 && 
    <div className='flex justify-center p-12 m-2 flex-col items-center w-full h-70'>
    <span>
      <SearchX size={45}  className='text-gray-800'/>
    </span>
       <h2 className='font-extrabold text-[18px] text-gray-800  uppercase'>No result found</h2>
       <p className='text-[15px] italic text-gray-800'>We can`t find match search Please check your spelling or try different keyward </p>

    </div>
}
      </div>
  );
}

const CompaniesLoanTable = ({ company,Formatdate,FormatAmount,loading}) => {
  return (
    <div className="bg-white rounded-md  border border-gray-200 overflow-hidden">
      <div className='bg-gray-100 p-4 border-b border-gray-100 flex justify-between items-center'>  
        <h2 className='text-2xl font-bold text-gray-800 uppercase whitespace-nowrap'>{company.company_name}</h2>
        <p className='text-lg font-bold text-gray-800 uppercase whitespace-nowrap'>{company.companyId}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left ">
          <thead>
            <tr className="bg-gray-50 text-gray-700 uppercase text-[12px] font-bold">
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Loan Id</th>

              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Client ID</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Client national Id</th>

              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Client Name</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Amount</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Status</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Total Pay</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Fees</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Closing date</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">guarantor name</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">guarantor contacts</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">guarantor address</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">unpaid window</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Colateral</th>

            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 ">
            {company.loans.map((loan, index) => (
              <tr key={index} className="hover:bg-gray-100 cursor-pointer transition-colors border-b border-gray-100 last:border-0">
                <td className="p-4 font-bold text-[15px] text-gray-800">{loan.loanId}</td>
               
                <td className="p-4 font-semibold text-[15px] text-gray-800">{loan.clientId}</td>
                <td className="p-4 font-semibold  text-gray-800 whitespace-nowrap text-[15px] capitalize">{loan.client_name}</td>
                <td className="p-4 font-semibold text-gray-800 whitespace-nowrap text-[15px]">{loan.client_nationalId}</td>

                <td className="p-4 font-semibold whitespace-nowrap uppercase text-[18px] text-gray-800">{FormatAmount(Number(loan.receive_amount).toFixed(2))}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-sm text-[11px] font-bold uppercase ${
                    loan.status === 'Paid' ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {loan.status}
                  </span>
                </td>
                <td className="p-4 font-semibold text-gray-800 text-[18px] whitespace-nowrap uppercase">{FormatAmount(Number(loan.totalpay).toFixed(2))} </td>
                <td className="p-4 whitespace-nowrap text-gray-800 text-[15px] font-semibold">{loan.fees}%</td>
                <td className="p-4 whitespace-nowrap text-gray-800 text-[15px] font-semibold">{Formatdate(loan.closing_date)}</td>
                <td className="p-4 font-semibold  text-gray-800 whitespace-nowrap text-[15px]  capitalize">{loan.guarantor_name}</td>
                <td className="p-4 font-semibold text-gray-800 whitespace-nowrap text-[15px]">{loan.guarantor_contacts}</td>
                <td className="p-4 font-semibold text-gray-800 whitespace-nowrap text-[15px]">{loan.guarantor_address}</td>
                <td className="p-4 font-semibold  text-red-500 whitespace-nowrap text-[15px]">{loan.unpaidDay} days</td>
                <td className="p-4 font-semibold text-gray-800 whitespace-nowrap text-[15px] capitalize">{loan.security}</td>
                
                

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <div>
          {loading ?
           <div>
            <div className='bg-gray-200 p-2 m-1 w-30 rounded-sm animate-pulse'></div>
           <div className='bg-gray-200 p-2 m-1 w-30 rounded-sm animate-pulse'></div>
           </div>:
           <div>
                <p className="text-[11px] text-gray-800 uppercase font-bold tracking-wider">Total Loaned</p>
          <p className="text-[18px] font-semibold text-gray-800">{FormatAmount(Number(company.totalLoaned).toFixed(2))}</p>
           </div>
          }
     
        </div>
        <div className="text-right">
         
                <p className="text-[11px] text-gray-800 uppercase font-bold tracking-wider">Total Unpaid</p>
          <p className="text-[18px] font-semibold  text-red-600">{FormatAmount(Number(company.totalUnpaid).toFixed(2))} </p>

      
        </div>
      </div>
    </div>
  );
};

export default Loan;