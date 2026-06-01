import React, { Activity, useState } from 'react'
import logo from '../assets/image.jpeg'
import { 
  BellDot, Users, BarChart3, ChevronDown, LayoutDashboardIcon, 
  CreditCard, Receipt,Settings, HandCoins, Banknote, ActivityIcon,HelpCircle,BadgeDollarSign,
  MessageCircle, AlertTriangle, WalletCards, AwardIcon, TrendingUp, MoreHorizontal,PlusCircle,
  ChevronLeftIcon,ChevronRightIcon, Menu, X,
  ReceiptTextIcon,
  MessageSquare,
  ShieldAlert,
  LogOut
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import Borrowers from './Borrowers'
import AdReport from './AdReport'
import AdminSetting from './adminsetting'
import BranchLoan from './BranchLoan'
import Cashiers from './Cashiers'
import Repayments from './Repayments'
import Billing from './Billing'
import Sms from './Sms'
import ReportedBorrowers from './ReportedBorrowers'
import About from './About'
import Adprofile from './Adprofile'


function AdDashboard() {
  const [currentPages, setCurrentPage] = useState('about')
  const [activeTab, setActiveTab] = useState('loans') 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false) 

  const chartData =[
    {Date:'may 01', loaned: 4200000, Collected: 1500000, overdue: 800000 },
    {Date:'may 02', loaned: 5200000, Collected: 2500000, overdue: 900000 },
    {Date:'may 03', loaned: 6000000,Collected: 3000000, overdue: 950000 },
    {Date:'may 04', loaned: 6800000,Collected: 3800000, overdue: 5000000 },
    {Date:'may 05', loaned: 7800000,Collected: 4200000, overdue: 1000000 },
    {Date:'may 07', loaned: 8200000,Collected: 4800000, overdue: 1200000 },
    {Date:'may 08', loaned: 8500000,Collected: 5500000, overdue: 1150000 },
  ]

  const recentLoans = [
    { id: 1, name: 'John Sengabo', amount: '100,000 UGX', cashier: 'Eric Muhire', date: 'May 20, 2025', due: 'Jun 20, 2025', status: 'Pending' },
    { id: 2, name: 'Alice Nyiransabimana', amount: '250,000 UGX', cashier: 'Claudine Uwase', date: 'May 20, 2025', due: 'Jun 20, 2025', status: 'Pending' },
    { id: 3, name: 'Marie Mukamana', amount: '150,000 UGX', cashier: 'Eric Muhire', date: 'May 19, 2025', due: 'Jun 19, 2025', status: 'Overdue' },
  ]

  return (
    <div className='min-h-screen bg-gray-50 flex font-sans antialiased text-gray-900 relative'>

      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className={`w-64 bg-white h-screen fixed top-0 left-0 z-50 flex flex-col overflow-auto justify-between text-gray-700 shadow-sm transition-transform duration-300 transform 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div>
          <div className='p-6 flex gap-3 items-center h-20 border-b border-slate-100 justify-between md:justify-start'>
            <div className='flex gap-3 items-center'>
              <img src={logo} className='w-12 h-12' alt="" />
              <div className='flex flex-col'>
                <span className='text-blue-400 font-black text-2xl uppercase tracking-wide leading-none'>Equalizer</span>
              </div>
            </div>
            <button className='md:hidden p-1 text-gray-400 hover:text-gray-600' onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className='p-4 space-y-1'>
            {[
              { id: 'Dashboard', label: 'Dashboard', icon: <LayoutDashboardIcon size={18} /> },
              { id: 'borrowers', label: 'Borrowers', icon: <HandCoins size={18} /> },
              { id: 'loans', label: 'Loans', icon: <Banknote size={18} /> },
              { id: 'repayment', label: 'Repayments', icon: <CreditCard size={18} /> },
              { id: 'cashiers', label: 'Cashiers', icon: <BadgeDollarSign size={18} /> },
              { id: 'reports', label: 'Reports', icon: <BarChart3 size={18} /> },
              { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
              { id: 'Billing', label: 'Billing', icon: <ReceiptTextIcon size={18} /> },
              { id: 'message', label: 'Messages', icon: <MessageSquare size={18} /> },
              { id: 'Reported', label: 'Borrowers Flag', icon: <ShieldAlert size={18} /> },

            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setIsSidebarOpen(false); 
                }} 
                className={`w-full flex gap-2 px-4 py-2 text-sm text-gray-600 rounded-md cursor-pointer 
                  items-center transition-all 
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
            <button className='flex justify-center text-sm w-40 gap-1 hover:cursor-pointer bg-red-400 mx-3  py-2  rounded-sm text-white'>
              <span><LogOut size={18}/></span>Logout</button>
          </div>
        </div>

        <div className='p-2 m-1 border border-gray-100 rounded-xl text-center hidden md:block'>
          <div className='h-fit w-fit p-2 bg-blue-600/10 text-blue-400 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-inner'>
            <HelpCircle size={20} />
          </div>
          <h3 className='text-gray-700 font-semibold text-sm'>Need Help?</h3>
          <p className='text-xs text-slate-500  px-2 leading-relaxed'>Contact our support team </p>
          <button className='w-full flex justify-center items-center gap-2 text-xs font-semibold text-white
           bg-blue-400 py-2.5 px-4 rounded-sm transition-colors cursor-pointer'>
            <MessageCircle size={14}/> Contact Support
          </button>
        </div>
      </div>

      <div className='flex-1 ml-0 md:ml-64 flex flex-col min-h-screen w-full min-w-0 relative'>
        
        <div className='w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 h-20 px-4 sm:px-8 flex justify-between items-center sticky top-0 z-40 shadow-sm shadow-gray-100/40'>
          
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className='p-2 -ml-2 text-gray-600 hover:text-gray-900 focus:outline-none md:hidden transition-colors'
          >
            <Menu size={24} />
          </button>
          
          <div className='flex items-center gap-4 ml-auto'>
            <button className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl relative transition-all cursor-pointer'>
              <BellDot size={20}/>
              <span className='absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white'></span>
            </button>
            <div className='h-6 w-px bg-gray-200'></div>
            
            <div className='relative flex items-center gap-3 pl-2 cursor-pointer group'>
              <div className='w-9 h-9 rounded-full bg-slate-200 overflow-hidden ring-2 ring-gray-100'>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256" alt="Profile" className="w-full h-full object-cover"/>
              </div>
              <div className='flex flex-col text-left leading-tight hidden sm:flex'>
                <span className='text-sm font-semibold text-gray-800'>Admin</span>
                <span className='text-[11px] text-gray-400 font-medium'>Company Admin</span>
              </div>
              <ChevronDown size={14} className='text-gray-400 transition-transform  group-hover:translate-y-0.5' />
              <select onChange={(e)=>setCurrentPage(e.target.value)} className='absolute cursor-pointer inset-0 opacity-0 w-full h-full cursor-pointer z-30 text-sm'>
                <option value="profile">Profile </option>
                <option value="about" className='uppercase text-xs'>About Equalizer </option>
              </select>
            </div>
          </div>
        </div>

        {currentPages === 'Dashboard' && (
          <div className='p-4 sm:p-8 flex-1 space-y-6 w-full mx-auto min-w-0'>
            
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
              <div>
                <h1 className='text-xl sm:text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2'>Welcome back, Admin</h1>
                <p className='text-xs text-gray-500 mt-0.5'>Here's what's happening with your company today.</p>
              </div>
              <div className='bg-white border border-gray-200 px-4 py-2 rounded-md 
              text-xs text-gray-600 flex items-center gap-2 shadow-sm shadow-gray-100/50 cursor-pointer self-stretch sm:self-auto justify-between sm:justify-start'>
                <span>May 20, 2025</span>
                <ChevronDown size={14} />
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
              <div className='p-5 bg-white border border-gray-100 rounded-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-all'>
                <div className='flex gap-4 items-start'>
                  <span className='p-3 rounded-xl bg-blue-50 text-blue-600'><WalletCards size={22}/></span>
                  <div>
                    <h2 className='text-xs font-bold text-gray-700 capitalize'>Outstanding Balance</h2>
                    <p className='text-lg font-bold text-gray-800 mt-1'>9,500,000 UGX</p>
                    <p className='text-[12px] text-gray-400 font-medium mt-1'>Remain amount borrowed</p> 
                  </div>
                </div>
                <div className='flex items-center gap-2 pt-3 border-t border-gray-50 mt-3'>
                  <span className='inline-flex items-center text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md'> 8.2%</span>
                  <span className='text-[11px] text-gray-400 font-medium'>Percentage rate</span>
                </div>
              </div>

              <div className='p-5 bg-white border border-gray-100 rounded-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-all'>
                <div className='flex gap-4 items-start'>
                  <span className='p-3 rounded-xl bg-green-50 text-green-600'><HandCoins size={22}/></span>
                  <div>
                    <h2 className='text-xs font-bold text-gray-700 capitalize '>Collected Today</h2>
                    <p className='text-lg font-bold text-gray-800 mt-1'>650,000 UGX</p> 
                    <p className='text-[12px] text-gray-400 font-medium mt-1'>Total collections today</p> 
                  </div>
                </div>
                <div className='flex items-center gap-2 pt-3 border-t border-gray-50 mt-3'>
                  <span className='inline-flex items-center text-[11px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md'>
                     12.5%</span>
                  <span className='text-[11px] text-gray-400 font-medium first-letter:uppercase'>percentage rate</span>
                </div>
              </div>

              <div className='p-5 bg-white border border-gray-100 rounded-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-all'>
                <div className='flex gap-4 items-start'>
                  <span className='p-3 rounded-xl bg-yellow-100 text-yellow-400'><Banknote size={22}/></span>
                  <div>
                    <h2 className='text-xs font-bold text-gray-700 capitalize'>Pending Loans</h2>
                    <p className='text-lg font-bold text-gray-800 mt-1'>245</p> 
                    <p className='text-[11px] text-gray-400 font-medium mt-1'> Current Running loans</p> 
                  </div>
                </div>
                <div className='flex items-center gap-2 pt-3 border-t border-gray-50 mt-3'>
                  <span className='inline-flex items-center text-[11px] font-bold text-white bg-yellow-500 px-2 py-0.5 rounded-md'> 5.4%</span>
                  <span className='text-[11px] text-gray-400 font-medium'>Percentage rate</span>
                </div>
              </div>

              <div className='p-5 bg-white border border-gray-100 rounded-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-all'>
                <div className='flex gap-4 items-start'>
                  <span className='p-3 rounded-xl bg-rose-50 text-rose-600'><AlertTriangle size={22}/></span>
                  <div>
                    <h2 className='text-xs font-bold text-gray-700 capitalize'>Overdue Loans</h2>
                    <p className='text-lg font-bold text-gray-800 mt-1'>32</p> 
                    <p className='text-[11px] text-gray-400 font-medium mt-1'>Loans past due date</p> 
                  </div>
                </div>
                <div className='flex items-center gap-2 pt-3 border-t border-gray-50 mt-3'>
                  <span className='inline-flex items-center text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md'> 3.1%</span>
                  <span className='text-[11px] text-gray-400 font-medium'>Percentage rate</span>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 items-start'>
              
              <div className='lg:col-span-2 bg-white overflow-x-auto border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col justify-between h-90'>
                <div className='flex justify-between items-center mb-6'>
                  <div>
                    <h3 className='text-lg sm:text-xl font-black text-gray-800 uppercase'>Currency Tracking</h3>
                    <div className='flex flex-wrap gap-4 text-xs font-semibold mt-2'>
                      <div className='flex items-center gap-1.5'>
                        <span className='w-2.5 h-2.5 bg-blue-500 rounded-full inline-block'></span><span className='text-gray-400'>Loaned</span></div>
                      <div className='flex items-center gap-1.5'><span className='w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block'></span>
                      <span className='text-gray-400'>Collected</span></div>
                      <div className='flex items-center gap-1.5'><span className='w-2.5 h-2.5 bg-rose-500 rounded-full inline-block'></span>
                      <span className='text-gray-400'>Overdue</span></div>
                    </div>
                  </div>
                </div>

                <div className='flex-1 w-full text-xs min-h-20'>
                  <ResponsiveContainer width='100%' height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey="Date"/>
                      <YAxis tickFormatter={(value)=>{
                        if(value>=1000000){ return value/1000000 + "M" }
                        if(value >=1000){ return value / 1000+ "K" }
                        return value
                      }}/>
                      <Tooltip/>
                      <Bar dataKey="loaned" fill='#3b82f6' radius={[3,3,0,0]}/>
                      <Bar dataKey="Collected" fill='#22c55e' radius={[3,3,0,0]}/>
                      <Bar dataKey="overdue" fill='#ef4444' radius={[3,3,0,0]}/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 w-full'>
                
                <div className='bg-white shadow border border-gray-100 rounded-lg p-4 flex flex-col justify-between'>
                  <div className='flex justify-between items-center'>
                    <h3 className='text-xs font-bold text-gray-800 capitalize flex items-center gap-1.5'><AwardIcon size={20} className='text-blue-500'/> Top Cashier Today</h3>
                    <span className='bg-green-50 text-green-600 font-bold text-[10px] capitalize px-2 py-0.5 rounded-full '>Top Performer</span>
                  </div>
                  <div className='flex items-center gap-4 py-2 mt-2'>
                    <div className='w-12 h-12 bg-gray-100 rounded-full overflow-hidden '>
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" alt="Cashier" className="w-full h-full object-cover"/>
                    </div>
                    <div className='leading-normal flex-1 min-w-0'>
                      <h4 className='text-sm font-bold text-gray-800 truncate'>Eric Muhire</h4>
                      <p className='text-xs text-gray-700 font-medium mt-0.5 truncate'>
                        <span className='text-gray-700 font-bold'>24</span> Loans Issued 
                        <span className='text-gray-300 mx-1'>•</span> 480,000 UGX</p>
                    </div>
                  </div>
                </div>

                <div className='bg-white border border-gray-100 rounded-lg p-4 shadow-sm flex flex-col justify-between'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3.5'>
                      <div className='w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center '>
                        <PlusCircle size={18} /></div>
                      <div>
                        <h4 className='text-xs font-bold text-gray-800 first-letter:uppercase'>Loans added today</h4>
                        <p className='text-xl font-bold text-gray-800 mt-0.5'>27</p>
                        <p className='text-[11px] text-gray-700 font-medium mt-0.5'>Loans issued by cashiers</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='bg-white border border-gray-100 rounded-lg p-4 shadow-sm flex items-center gap-5'>
                  <div className='w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold shadow-md relative '>
                    <div className='w-11 h-11 bg-white rounded-full flex items-center justify-center text-gray-800 font-bold text-xs'>100%</div>
                  </div>
                  <div className='leading-tight'>
                    <h4 className='text-xs font-bold text-gray-800'>Repayment Rate</h4>
                    <p className='text-xs text-green-500 font-semibold mt-0.5 flex items-center gap-1'>Repayment % progress</p>
                  </div>
                </div>

              </div>
            </div>

            <div className='bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden'>
              <div className='p-4 sm:p-6 border-b border-gray-50 flex flex-col gap-4'>
                <h3 className='text-base font-extrabold text-gray-700 flex items-center gap-2'> 
                  <ActivityIcon size={30} className='border border-gray-100 bg-gray-100 p-1 rounded-sm text-gray-400'/>
                  Recent Activity
                </h3>

                <div className='flex flex-wrap gap-2 pt-2'>
                  {[
                    { id: 'loans', label: 'Recent Loans' },
                    { id: 'repayments', label: 'Repayments' },
                    { id: 'overdue', label: 'Overdue ' }
                  ].map((tab) => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                        activeTab === tab.id 
                          ? 'bg-blue-500 text-white shadow-sm' 
                          : 'text-gray-400 hover:text-gray-600 bg-gray-50'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab==='loans' &&(
                <div className='overflow-x-auto w-full'>
                  <table className='w-full text-left border-collapse '>
                    <thead>
                      <tr className='border-b border-gray-100 text-xs font-extrabold text-gray-700 capitalize bg-gray-50/50'>
                        <th className='py-4 px-6 font-semibold whitespace-nowrap'>Borrower</th>
                        <th className='py-4 px-6 font-semibold whitespace-nowrap'>Cash</th>
                        <th className='py-4 px-6 font-semibold whitespace-nowrap'>Cashier</th>
                        <th className='py-4 px-6 font-semibold whitespace-nowrap'>Date</th>
                        <th className='py-4 px-6 font-semibold whitespace-nowrap'>Due Date</th>
                        <th className='py-4 px-6 text-center'>Status</th>
                        <th className='py-4 px-6 text-center'></th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50 text-sm font-medium text-gray-700'>
                      {recentLoans.map((row) => (
                        <tr key={row.id} className='hover:bg-gray-50/50 transition-colors'>
                          <td className='py-4 px-6 flex items-center gap-3'>
                            <div className='w-8 h-8 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold flex items-center justify-center uppercase '>
                              {row.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className='font-semibold text-xs text-gray-700 whitespace-nowrap'>{row.name}</span>
                          </td>
                          <td className='py-4 px-6 text-xs font-extrabold text-gray-800 whitespace-nowrap'>{row.amount}</td>
                          <td className='py-4 px-6 text-xs font-extrabold text-gray-700 whitespace-nowrap '>{row.cashier}</td>
                          <td className='py-4 px-6 text-gray-800 text-xs font-semibold whitespace-nowrap'>{row.date}</td>
                          <td className='py-4 px-6 text-gray-800 text-xs font-semibold whitespace-nowrap'>{row.due}</td>
                          <td className='py-4 px-6 text-center'>
                            <span className={`inline-block px-3 py-1 text-[11px] font-bold rounded-full ${
                              row.status === 'Pending' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-rose-50 text-rose-600'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {activeTab==='repayments'&&(
                <div className='overflow-x-auto w-full'>
                  <table className='w-full text-left border-collapse '>
                    <thead>
                      <tr className='border-b border-gray-100 text-xs font-extrabold text-gray-700 capitalize bg-gray-50/50'>
                        <th className='py-4 px-6 font-semibold whitespace-nowrap'>Payer</th>
                        <th className='py-4 px-6 font-semibold whitespace-nowrap'>Cash</th>
                        <th className='py-4 px-6 font-semibold whitespace-nowrap'>Cashier</th>
                        <th className='py-4 px-6 font-semibold whitespace-nowrap'>Date</th>
                        <th className='py-4 px-6 text-center whitespace-nowrap'>Status</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50 text-sm font-medium text-gray-700'>
                      {recentLoans.map((row) => (
                        <tr key={row.id} className='hover:bg-gray-50/50 transition-colors'>
                          <td className='py-4 px-6 flex items-center gap-3'>
                            <div className='w-8 h-8 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold flex items-center justify-center uppercase '>
                              {row.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className='font-semibold text-xs text-gray-700 whitespace-nowrap'>{row.name}</span>
                          </td>
                          <td className='py-4 px-6 text-xs font-extrabold text-gray-800 whitespace-nowrap'>{row.amount}</td>
                          <td className='py-4 px-6 text-xs font-extrabold text-gray-700 whitespace-nowrap '>{row.cashier}</td>
                          <td className='py-4 px-6 text-gray-800 text-xs font-semibold whitespace-nowrap'>{row.due}</td>
                          <td className='py-4 px-6 text-center'>
                            <span className={`inline-block px-3 py-1 text-[11px] whitespace-nowrap font-bold rounded-full ${
                              row.status === 'Pending' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-rose-50 text-rose-600'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab==='overdue'&&(
                <div className='overflow-x-auto w-full'>
                  <table className='w-full text-left border-collapse'>
                    <thead>
                      <tr className='border-b border-gray-100 text-xs font-extrabold text-gray-700 capitalize bg-gray-50/50'>
                        <th className='py-4 px-6 font-semibold whitespace-nowrap'>Borrower</th>
                        <th className='py-4 px-6 font-semibold whitespace-nowrap'>Cash</th>
                        <th className='py-4 px-6 font-semibold whitespace-nowrap'>Cashier</th>
                        <th className='py-4 px-6 font-semibold whitespace-nowrap'>penalities</th>
                        <th className='py-4 px-6 font-semibold whitespace-nowrap'>Date</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-50 text-sm font-medium text-gray-700'>
                      {recentLoans.map((row) => (
                        <tr key={row.id} className='hover:bg-gray-50/50 transition-colors'>
                          <td className='py-4 px-6 flex items-center gap-3'>
                            <div className='w-8 h-8 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold flex items-center justify-center uppercase'>
                              {row.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className='font-semibold text-xs text-gray-700 whitespace-nowrap'>{row.name}</span>
                          </td>
                          <td className='py-4 px-6 text-xs font-extrabold text-gray-800 whitespace-nowrap'>{row.amount}</td>
                          <td className='py-4 px-6 text-xs font-extrabold text-gray-700  whitespace-nowrap'>{row.cashier}</td>
                          <td className='py-4 px-6 text-gray-800 text-xs font-extrabold whitespace-nowrap'>20000 UGX</td>
                          <td className='py-4 px-6 text-gray-800 text-xs font-semibold whitespace-nowrap'>{row.due}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className='flex justify-between p-4'>
                <span className='border hover:bg-gray-100 cursor-pointer p-1 rounded-md text-gray-500 border-gray-100'><ChevronLeftIcon/></span>
                <span className='border hover:bg-gray-100 cursor-pointer p-1 rounded-md text-gray-500 border-gray-100'><ChevronRightIcon/></span>
              </div>
            </div>

          </div>
        )}

        {currentPages==='borrowers'&&( <Borrowers/> )}
        {currentPages==='reports'&&( <AdReport/> )}
        {currentPages==='settings'&&( <AdminSetting/> )}
        {currentPages==='loans'&&( <BranchLoan/> )}
        {currentPages==='cashiers'&&( <Cashiers/> )}
        {currentPages==='repayment'&&( <Repayments/> )}
        {currentPages ==='Billing'&&(
          <Billing/>
        )}
        {currentPages==='message'&&<Sms/>}
        {currentPages==='Reported'&&<ReportedBorrowers/>}
        {currentPages==='about'&&<About/>}
        {currentPages==='profile'&&<Adprofile/>}

      </div>
    </div>
  )
}

export default AdDashboard;