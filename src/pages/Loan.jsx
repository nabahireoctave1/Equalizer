import React, { useState } from 'react';
import { Search, Activity } from 'lucide-react';

const COMPANIES_DATA = [
  {
    id: "akea-01",
    name: "MUSANZE AKEA SERVICES",
    totalLoan: "300,000",
    unpaidLoan: "3,000",
    loans: [
      { id: "0001234", name: "Ishimwe Precious", companyId: "akea-0012309", amount: "2000000", status: "Paid", total: "2200000", fee: "20%" },
      { id: "0001235", name: "John Doe", companyId: "akea-0012310", amount: "5000000 ", status: "Unpaid", total: "5500000", fee: "10%" },
    ]
  },
  {
    id: "alpha-02",
    name: "Alpha Credits Ltd",
    totalLoan: "150,000",
    unpaidLoan: "12,000",
    loans: [
      { id: "000987", name: "Alice Keza", companyId: "alpha-882", amount: "10000000", status: "Unpaid", total: "11200000", fee: "15%" },
    ]
  }
];

function Loan() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = COMPANIES_DATA.map(company => ({
    ...company,
    loans: company.loans.filter(loan => 
      loan.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(company => company.loans.length > 0);

  return (
    <div className='w-full min-h-screen bg-gray-50 pb-10 overflow-y-auto'>
      <div className='sticky top-0 z-20 gap-5 md:gap-0 flex justify-between items-center w-full p-4 bg-white border-b border-gray-300 shadow-sm'>
        <div className='flex gap-2 items-center'>
          <div className='bg-blue-600 p-1.5 rounded-md'>
            <Activity className='text-white' size={20}/>
          </div>
          <span className='font-extrabold text-lg text-gray-700 uppercase tracking-tight flex'><p>Loan</p><p className='hidden md:block'>Management</p> </span>
        </div>

        <div className='relative w-full md:w-72'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={16} />
          <input 
            type="text" 
            placeholder="Search client name..."
            className='w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 text-sm focus:ring-2 focus:ring-blue-400 outline-none transition-all'
            onChange={(e) => setSearchTerm(e.target.value)}
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className='bg-gray-100 p-4 border-b border-gray-100 flex justify-between items-center'>  
        <h2 className='text-md font-bold text-gray-700 uppercase whitespace-nowrap'>{company.name}</h2>
        <p className='text-md font-bold text-blue-900 uppercase whitespace-nowrap'>{company.id}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left ">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-[10px] font-bold">
              <th className="p-4 border-b border-gray-200 white">Client ID</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Client Name</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Company ID</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Amount</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Status</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Total Pay</th>
              <th className="p-4 border-b border-gray-200 whitespace-nowrap">Monthly Fees</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 ">
            {company.loans.map((loan, index) => (
              <tr key={index} className="hover:bg-gray-100 cursor-pointer transition-colors border-b border-gray-100 last:border-0">
                <td className="p-4">{loan.id}</td>
                <td className="p-4 font-semibold text-gray-700 whitespace-nowrap">{loan.name}</td>
                <td className="p-4 text-gray-500 whitespace-nowrap">{loan.companyId}</td>
                <td className="p-4 font-medium whitespace-nowrap">{loan.amount}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[11px] font-bold uppercase ${
                    loan.status === 'Paid' ? 'bg-blue-500 text-white' : 'bg-orange-600/50 text-white'
                  }`}>
                    {loan.status}
                  </span>
                </td>
                <td className="p-4 font-bold whitespace-nowrap">{loan.total}</td>
                <td className="p-4 whitespace-nowrap text-xs font-bold">{loan.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <div>
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Total Loaned</p>
          <p className="text-lg font-black text-blue-700">{company.totalLoan} UGX</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Total Unpaid</p>
          <p className="text-lg font-black text-red-600">{company.unpaidLoan} UGX</p>
        </div>
      </div>
    </div>
  );
};

export default Loan;