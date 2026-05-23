import React, { useState } from 'react'
import { Search, Activity } from 'lucide-react';

function BranchLoan() {
    const COMPANIES_DATA = [
  {
    id: "akea-01",
    name: "MUSANZE AKEA SERVICES",
    totalLoan: "300000",
    unpaidLoan: "700000",
    loans: [
      { id: "123456676888", name: "Ishimwe Precious", companyId: "akea-0012309", amount: "2000000", status: "Paid", total: "2200000", fee: "20%" },
      { id: "676654343234", name: "John Doe",  amount: "5000000 ", status: "Unpaid", total: "5500000", fee: "10%" },
    ]
  },
  {
    id: "alpha-02",
    name: "Alpha Credits Ltd",
    totalLoan: "150000",
    unpaidLoan: "12000",
    loans: [
      { id: "19902343554", name: "Alice Keza",  amount: "10000000", status: "Unpaid", total: "11200000", fee: "15%" },
    ]
  }
];
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = COMPANIES_DATA.map(company => ({
    ...company,
    loans: company.loans.filter(loan => 
      loan.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(company => company.loans.length > 0);

  return (
    <div className='w-full min-h-screen bg-gray-50 pb-10 overflow-y-auto'>
      <div className='px-4 py-5 border-b border-gray-100  items-center   flex  rounded-md justify-between  m-4 bg-white '>
        <div className='flex gap-2 items-center'>
         <span className='bg-blue-400 p-1 rounded-2xl text-white'><Activity size={25}></Activity></span>
         <h2 className='font-extrabold text-2xl text-gray-700'>Branch Loans</h2>
         </div>
         <div className='relative w-full sm:w-72'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={16} />
          
          <input 
            type='text' 
            onChange={(e)=>setSearchTerm(e.target.value)}
            placeholder='search' 
            className='border w-full pl-9 pr-4 py-2 text-sm rounded-md border-gray-200
             bg-gray-50/50 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white
              focus:ring-4 focus:ring-blue-500/10'
          />
         </div>
      </div>
     

      <div className="p-4 space-y-8">
        {filteredData.map((company) => (
          <CompaniesLoanTable key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}

const CompaniesLoanTable = ({ company }) => {
  return (
    <div className="bg-white rounded-md  border border-gray-200 overflow-hidden">
      <div className='bg-white p-4 border-b border-gray-100 flex justify-between items-center'>  
        <h2 className='text-md font-extrabold text-gray-800 uppercase whitespace-nowrap'>{company.name}</h2>
        <p className='text-md font-bold text-gray-800 uppercase whitespace-nowrap'>{company.id}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left ">
          <thead>
            <tr className=" text-gray-600 uppercase text-[10px] font-bold">
              <th className="p-4 border-b border-gray-200 white">Client ID</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Client Name</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Amount</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Status</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Total Pay</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Fees</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800 ">
            {company.loans.map((loan, index) => (
              <tr key={index} className=" cursor-pointer transition-colors border-b border-gray-100 last:border-0">
                <td className="p-4">{loan.id}</td>
                <td className="p-4 font-semibold text-[13px] text-gray-700 whitespace-nowrap">{loan.name}</td>
                <td className="p-4 font-bold text-[13px] whitespace-nowrap">{loan.amount} UGX</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[11px] font-bold uppercase ${
                    loan.status === 'Paid' ? 'bg-blue-500 text-white' : 'bg-red-400 text-white'
                  }`}>
                    {loan.status}
                  </span>
                </td>
                <td className="p-4 font-bold text-[13px] whitespace-nowrap">{loan.total} UGX</td>
                <td className="p-4 whitespace-nowrap text-xs font-bold">{loan.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-200 flex justify-between items-center">
        <div>
          <p className="text-[10px] text-gray-700 uppercase font-bold tracking-wider">Total Loaned</p>
          <p className="text-lg font-black text-gray-800">{company.totalLoan} UGX</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-700 uppercase font-bold tracking-wider">Total Loans</p>
          <p className="text-md font-black text-gray-800">{30} <span className='text-sm text-gray-700'>Loans</span></p>
        </div>
        <div className="">
          <p className="text-[10px] text-gray-700 uppercase font-bold tracking-wider">Total Unpaid</p>
          <p className="text-lg font-black text-red-400">{company.unpaidLoan} UGX</p>
        </div>
      </div>
    </div>
  );
}

export default BranchLoan