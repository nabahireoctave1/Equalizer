import React, { useState } from 'react';
import { Building2, ShieldCheck, Search } from 'lucide-react';

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([
    {
      id: "akea6476453010",
      name: "Musanze AKEA Services",
      manager: "Precious",
      phone: "078345565",
      totalLoan: 500000,
      lastPayment: "25,000",
      activeDate: "12/01/2024",
      status: "Active",
      progress: 75,
    },
    {
      id: "akea8827364512",
      name: "Rubavu Branch Office",
      manager: "Claude",
      phone: "0788123456",
      totalLoan: 300000,
      lastPayment: "10,000",
      activeDate: "05/02/2024",
      status: "Suspended",
      progress: 40,
    },
    {
      id: "akea1122334455",
      name: "Kigali Central Hub",
      manager: "Divine",
      phone: "0791122334",
      totalLoan: 1200000,
      lastPayment: "150,000",
      activeDate: "20/12/2023",
      status: "Active",
      progress: 90,
    },
    {
      id: "akea9988776655",
      name: "Gisenyi Water Front",
      manager: "Jean Paul",
      phone: "0780001112",
      totalLoan: 450000,
      lastPayment: "5,000",
      activeDate: "15/03/2024",
      status: "Active",
      progress: 15,
    },
    {
      id: "akea5544332211",
      name: "Huye Academic Plaza",
      manager: "Marie",
      phone: "0725554443",
      totalLoan: 850000,
      lastPayment: "40,000",
      activeDate: "01/11/2023",
      status: "Active",
      progress: 60,
    },
    {
      id: "akea0011223344",
      name: "Nyagatare Livestock Hub",
      manager: "Moses",
      phone: "0787778889",
      totalLoan: 2100000,
      lastPayment: "200,000",
      activeDate: "10/01/2024",
      status: "Suspended",
      progress: 30,
    },
  ]);

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='w-full h-screen bg-gray-50 flex flex-col font-sans overflow-hidden'>
      
      <div className='bg-white border-b border-gray-200 p-4 shrink-0'>
        <div className='max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4'>
          
          <div className='flex items-center gap-2'>
            <div className='p-2 bg-blue-500 rounded-lg text-white'>
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
              placeholder="Search office or ID..."
              className='w-full pl-10 pr-4 py-3 bg-gray-100 rounded-md border border-gray-200 text-xs font-bold focus:ring-1 focus:ring-blue-400 outline-none transition-all'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto p-4'>
        <div className='max-w-5xl mx-auto flex flex-col gap-4 pb-10'>
          {filteredCompanies.map((company) => (
            <div key={company.id} className='bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden hover:border-blue-200 transition-colors'>
              
              <div className='flex justify-between items-center p-3 border-b border-gray-100/50 bg-gray-50/50'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-blue-50 rounded-lg text-blue-500'>
                    <Building2 size={18} />
                  </div>
                  <div>
                    <div className='flex items-center gap-1.5'>
                      <h2 className='text-sm font-black text-gray-800'>{company.name}</h2>
                    </div>
                    <p className='text-[12px] text-blue-400 font-mono font-bold'>{company.id}</p>
                  </div>
                </div>
                
                <div className='flex items-center gap-2'>
                  <div className='bg-blue-400 w-8 h-8 flex items-center justify-center text-white text-xs font-bold rounded-full shadow-sm'>
                    {company.manager.substring(0, 2).toUpperCase()}
                  </div>
                  <div className='text-left'>
                    <h1 className='text-[12px] font-bold text-gray-700'>{company.manager}</h1>
                    <p className='text-[12px] text-gray-500'>{company.phone}</p>
                  </div>
                </div>
              </div>

              <div className='p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center'>
                
                <div className='flex flex-col items-center justify-center border-r border-gray-100'>
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-100" strokeWidth="4"></circle>
                      <circle 
                        cx="18" cy="18" r="16" fill="none" 
                        className="stroke-current text-orange-500"
                        strokeWidth="4" 
                        strokeDasharray={`${company.progress}, 100`} 
                        strokeLinecap="round"
                        transform="rotate(-90 18 18)"
                      ></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-gray-700">{company.progress}%</span>
                    </div>
                  </div>
                  <p className='text-[9px] font-bold text-gray-400 mt-1 uppercase'>Repayment</p>
                </div>

                <div className='md:col-span-2 flex justify-between px-4 '>
                  <div className='flex flex-col gap-2'>
                    <div>
                      <p className='text-[10px] text-gray-700 uppercase font-semibold'>Total Loan</p>
                      <p className='text-xs font-bold text-gray-800'>{company.totalLoan.toLocaleString()} UGX</p>
                    </div>
                    <div>
                      <p className='text-[10px] text-gray-700 uppercase font-semibold'>Last Payment</p>
                      <p className='text-xs font-bold text-green-600'>{company.lastPayment} UGX</p>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <div>
                      <p className='text-[10px] text-gray-700 uppercase font-semibold'>Activated Date</p>
                      <p className='text-xs text-gray-600'>{company.activeDate}</p>
                    </div>
                    <div>
                      <p className='text-[10px] text-gray-700 uppercase font-semibold'>Status</p>
                      <div className='flex items-center gap-1.5'>
                        <div className={`w-1.5 h-1.5 rounded-full ${company.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className={`text-[10px] font-bold ${company.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
                          {company.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                 
                <button 
                  className={`w-full hidden md:block max-w-140px py-2.5 rounded-md cursor-pointer text-[10px] font-black transition-all shadow-sm border uppercase tracking-wider ${
                    company.status === 'Active' 
                    ? 'border-red-100 text-red-500 bg-red-50' 
                    : 'bg-blue-400 text-white hover:bg-blue-500 border-blue-400'
                  }`}
                >
                  {company.status === 'Active' ? 'Suspend' : 'Reactivate'}
                </button>
               
              </div>
              <div className='p-2'>
              <button 
                className={`w-full block md:hidden py-2.5 rounded-full cursor-pointer text-[10px] font-black transition-all shadow-sm border uppercase tracking-wider ${
                  company.status === 'Active' 
                  ? 'border-red-100 text-red-500 bg-red-50' 
                  : 'bg-blue-400 text-white hover:bg-blue-500 border-blue-400'
                }`}
              >
                {company.status === 'Active' ? 'Suspend' : 'Reactivate'}
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;