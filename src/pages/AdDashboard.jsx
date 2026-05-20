import React, { Activity, useState } from 'react'
import logo from '../assets/image.jpeg'
import { 
  BellDot, Users, BarChart3, ChevronDown, LayoutDashboardIcon, Wallet,
  CreditCard, Receipt,Settings, HandCoins, Banknote, ActivityIcon,
  MessageCircle, AlertTriangle, WalletCards, AwardIcon, TrendingUp, MoreHorizontal,PlusCircle,ChevronLeftIcon,ChevronRightIcon
  
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import Borrowers from './Borrowers'

function AdDashboard() {
  const [currentPages, setCurrentPage] = useState('Dashboard')
  const [activeTab, setActiveTab] = useState('loans') 
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
    <div className='min-h-screen bg-gray-50 flex font-sans antialiased text-gray-900'>

      <div className='w-64 bg-white h-screen fixed top-0 left-0 z-10 flex flex-col justify-between text-gray-700 shadow-'>
        <div>
          <div className='p-6 flex gap-3 items-center h-20 border-b border-slate-100'>
            <div className=''><img src={logo} className='w-12 h-12' alt="" /></div>
            <div className='flex flex-col'>
              <span className='text-blue-400 font-black text-2xl uppercase tracking-wide leading-none'>Equalizer</span>
            </div>
          </div>
          
          <div className='p-4 space-y-1'>
            {[
              { id: 'Dashboard', label: 'Dashboard', icon: <LayoutDashboardIcon size={18} /> },
              { id: 'borrowers', label: 'Borrowers', icon: <HandCoins size={18} /> },
              { id: 'loans', label: 'Loans', icon: <Banknote size={18} /> },
              { id: 'repayment', label: 'Repayments', icon: <CreditCard size={18} /> },
              { id: 'cashiers', label: 'Cashiers', icon: <Wallet size={18} /> },
              { id: 'reports', label: 'Reports', icon: <BarChart3 size={18} /> },
              { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setCurrentPage(item.id)} 
                className={`w-full flex gap-3.5 px-4 py-3 text-sm text-gray-600   rounded-md cursor-pointer items-center transition-all 
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className='p-4 m-4 border border-gray-100 rounded-xl text-center'>
          <div className='w-10 h-10 bg-blue-600/10 text-blue-400 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-inner'>
            <WalletCards size={20} />
          </div>
          <h3 className='text-gray-700 font-semibold text-sm'>Need Help?</h3>
          <p className='text-xs text-slate-500 mt-1 mb-4 px-2 leading-relaxed'>Contact our support team for any assistance.</p>
          <button className='w-full flex justify-center items-center gap-2 text-xs font-semibold text-white bg-blue-400  py-2.5 px-4 rounded-lg transition-colors cursor-pointer'>
            <MessageCircle size={14}/> Contact Support
          </button>
        </div>
      </div>

      <div className='flex-1 ml-64 flex flex-col min-h-screen'>
        
        <div className='w-full  bg-white border-b border-gray-100 h-20 px-8 flex justify-end items-center sticky top-0 z-20 shadow-sm shadow-gray-100/40'>
          
          
          <div className='flex items-center gap-4'>
            <button className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl relative transition-all cursor-pointer'>
              <BellDot size={20}/>
              <span className='absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white'></span>
            </button>
            <div className='h-6 w-px bg-gray-200'></div>
            
            <div className='relative flex items-center gap-3 pl-2 cursor-pointer group'>
              <div className='w-9 h-9 rounded-full bg-slate-200 overflow-hidden ring-2 ring-gray-100'>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256" alt="Profile" className="w-full h-full object-cover"/>
              </div>
              <div className=' flex-col text-left leading-tight hidden sm:flex'>
                <span className='text-sm font-semibold text-gray-800'>Admin</span>
                <span className='text-[11px] text-gray-400 font-medium'>Company Admin</span>
              </div>
              <ChevronDown size={14} className='text-gray-400 transition-transform group-hover:translate-y-0.5' />
              <select className='absolute inset-0 opacity-0 w-full h-full cursor-pointer z-30 text-sm'>
                <option value="profile">Profile </option>
                <option value="signout">Log Out</option>
              </select>
            </div>
          </div>
        </div>

        {currentPages === 'Dashboard' && (
          <div className='p-8 flex-1 space-y-6  w-full mx-auto'>
            
            <div className='flex justify-between items-center'>
              <div>
                <h1 className='text-2xl font-bold text-gray-800 tracking-tight flex items-center gap-2'>Welcome back, Admin</h1>
                <p className='text-xs text-gray-500  mt-0.5'>Here's what's happening with your company today.</p>
              </div>
              <div className='bg-white border border-gray-200 px-4 py-2 rounded-md text-xs  text-gray-600 flex items-center gap-2 shadow-sm shadow-gray-100/50 cursor-pointer'>
                <span>May 20, 2025</span>
                <ChevronDown size={14} />
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
              <div className='p-5 bg-white  rounded-lg shadow-sm flex flex-col'>
                <div className='flex gap-4 items-start'>
                  <span className='p-3 rounded-xl bg-blue-50 text-blue-600'><WalletCards size={22}/></span>
                  <div>
                    <h2 className='text-xs font-bold text-gray-700 Capitalize'>Outstanding Balance</h2>
                    <p className='text-lg font-bold text-gray-800 mt-1'>9,500,000 UGX</p>
                    <p className='text-[12px] text-gray-400 font-medium mt-1'>Remain amount borrowed</p> 
                  </div>
                </div>
                <div className='flex items-center gap-2 pt-3 border-t border-gray-50 mt-3'>
                  <span className='inline-flex items-center text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md'> 8.2%</span>
                  <span className='text-[11px] text-gray-400 font-medium'>Percentage rate</span>
                </div>
              </div>

              <div className='p-5 bg-white border border-gray-100 rounded-lg shadow-sm flex flex-col justify-between  hover:shadow-md transition-all'>
                <div className='flex gap-4 items-start'>
                  <span className='p-3 rounded-xl bg-green-50 text-green-600'><HandCoins size={22}/></span>
                  <div>
                    <h2 className='text-xs font-bold text-gray-700 Capitalize '>Collected Today</h2>
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

              <div className='p-5 bg-white border border-gray-100 rounded-lg shadow-sm flex flex-col justify-between '>
                <div className='flex gap-4 items-start'>
                  <span className='p-3 rounded-xl bg-violet-50 text-violet-600'><Banknote size={22}/></span>
                  <div>
                    <h2 className='text-xs font-bold text-gray-700  Capitalize'>Pending Loans</h2>
                    <p className='text-lg font-bold text-gray-800 mt-1'>245</p> 
                    <p className='text-[11px] text-gray-400 font-medium mt-1'> Current Running loans</p> 
                  </div>
                </div>
                <div className='flex items-center gap-2 pt-3 border-t border-gray-50 mt-3'>
                  <span className='inline-flex items-center text-[11px] font-bold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-md'> 5.4%</span>
                  <span className='text-[11px] text-gray-400 font-medium'>Percentage rate</span>
                </div>
              </div>

              <div className='p-5 bg-white border border-gray-100 rounded-lg shadow-sm flex flex-col justify-between'>
                <div className='flex gap-4 items-start'>
                  <span className='p-3 rounded-xl bg-rose-50 text-rose-600'><AlertTriangle size={22}/></span>
                  <div>
                    <h2 className='text-xs font-bold text-gray-700 Capitalize'>Overdue Loans</h2>
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
              
              <div className='lg:col-span-2 bg-white overflow-auto border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between h-[380px] overflow-y-auto'>
                <div className='flex justify-between items-center mb-6'>
                  <div>
                    <h3 className='text-xl font-black text-gray-800 uppercase'>Currency Tracking</h3>
                    <div className='flex gap-4 text-xs font-semibold mt-2'>
                      <div className='flex items-center gap-1.5'>
                        <span className='w-2.5 h-2.5 bg-blue-500 rounded-full inline-block'></span><span className='text-gray-400'>Loaned</span></div>
                      <div className='flex items-center gap-1.5'><span className='w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block'></span>
                      <span className='text-gray-400'>Collected</span></div>
                      <div className='flex items-center gap-1.5'><span className='w-2.5 h-2.5 bg-rose-500 rounded-full inline-block'></span>
                      <span className='text-gray-400'>Overdue</span></div>
                    </div>
                  </div>
                  
                </div>

                <div className='flex-1 w-full text-xs'>
                  <ResponsiveContainer width='100%' height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid  
                       strokeDasharray='3 3'
                      />
                      <XAxis dataKey="Date"/>
                         <YAxis  tickFormatter={(value)=>{
                          if(value>=1000000){
                            return  value/1000000 + "M"
                          }
                          if(value >=1000){
                            return value / 1000+ "K"
                          }
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

              <div className='space-y-2 h-420px flex flex-col justify-between'>
                
                <div className='bg-white shadow rounded-lg p-3  flex-1 flex flex-col justify-between]'>
                  <div className='flex justify-between items-center'>
                    <h3 className='text-xs font-bold text-gray-800 Capitalize flex items-center gap-1.5'><AwardIcon size={20} className='text-blue-500'/> Top Cashier Today</h3>
                    <span className='bg-green-50 text-green-600 font-bold text-[10px] capitalize px-2 py-0.5 rounded-full '>Top Performer</span>
                  </div>
                  <div className='flex items-center gap-4 py-2 mt-2'>
                    <div className='w-12 h-12 bg-gray-100 rounded-full overflow-hidden '>
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150" 
                      alt="Cashier" className="w-full h-full object-cover"/>
                    </div>
                    <div className='leading-normal flex-1'>
                      <h4 className='text-sm font-bold text-gray-800'>Eric Muhire</h4>
                      <p className='text-xs text-gray-700 font-medium mt-0.5'>
                        <span className='text-gray-700 font-bold'>24</span> Loans Issued 
                        <span className='text-gray-300 mx-1'>•</span> 480,000 UGX</p>
                    </div>
                  </div>
                </div>

                <div className='bg-white border border-gray-100 rounded-lg p-5 shadow-sm flex-1 flex flex-col justify-between'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3.5'>
                      <div className='w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center'>
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
                  <div className='w-14 h-14 rounded-full bg-orange-500  flex items-center justify-center text-white text-sm font-bold shadow-md  relative'>
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
              <div className='p-6 border-b border-gray-50   justify-between items-start sm:items-center gap-4'>
                <h3 className='text-base font-extrabold text-gray-700 flex p-2 gap-2'> <ActivityIcon size={30} className='border border-gray-100 bg-gray-100  p-1 rounded-sm text-gray-400'/>Recent Activity</h3>

                <div className='flex gap-2 p-3  border-b border-gray-200/60'>
                  {[
                    { id: 'loans', label: 'Recent Loans' },
                    { id: 'repayments', label: 'Recent Repayments' },
                    { id: 'overdue', label: 'Overdue Borrowers' }
                  ].map((tab) => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-1.5 rounded-sm text-xs font-bold transition-all cursor-pointer ${
                        activeTab === tab.id 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab==='loans' &&(

             
              <div className='overflow-x-auto w-full'>
                <table className='w-full text-left border-collapse'>
                  <thead>
                    <tr className='border-b border-gray-100 text-xs font-extrabold text-gray-700 capitalize bg-gray-50/50'>
                      <th className='py-4 px-6 font-semibold'>Borrower</th>
                      <th className='py-4 px-6 font-semibold'>Currency</th>
                      <th className='py-4 px-6 font-semibold'>Cashier</th>
                      <th className='py-4 px-6 font-semibold'>Date</th>
                      <th className='py-4 px-6 font-semibold'>Due Date</th>
                      <th className='py-4 px-6 font-semibold text-center'>Status</th>
                      <th className='py-4 px-6 text-center'></th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-50 text-sm font-medium text-gray-700'>
                    {recentLoans.map((row) => (
                      <tr key={row.id} className='hover:bg-gray-50/50 transition-colors'>
                        <td className='py-4 px-6 flex items-center gap-3'>
                          <div className='w-8 h-8 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold flex items-center justify-center uppercase'>
                            {row.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className='font-semibold text-xs  text-gray-700'>{row.name}</span>
                        </td>
                        <td className='py-4 px-6 text-xs font-extrabold text-gray-800'>{row.amount}</td>
                        <td className='py-4 px-6 text-xs font-extrabold text-gray-700 '>{row.cashier}</td>
                        <td className='py-4 px-6 text-gray-800 text-xs font-semibold'>{row.date}</td>
                        <td className='py-4 px-6 text-gray-800 text-xs font-semibold'>{row.due}</td>
                        <td className='py-4 px-6 text-center'>
                          <span className={`inline-block px-3 py-1 text-[11px] font-bold rounded-full ${
                            row.status === 'Pending' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-rose-50 text-rose-600'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className='py-4 px-6 text-center text-gray-400 hover:text-gray-600 cursor-pointer'><MoreHorizontal size={16}/></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
               )}
              
              {activeTab==='repayments'&&(
                 <div className='overflow-x-auto w-full'>
                <table className='w-full text-left border-collapse'>
                  <thead>
                    <tr className='border-b border-gray-100 text-xs font-extrabold text-gray-700 capitalize bg-gray-50/50'>
                      <th className='py-4 px-6 font-semibold'>Payer</th>
                      <th className='py-4 px-6 font-semibold'>paid currency</th>
                      <th className='py-4 px-6 font-semibold'>Cashier</th>
                      <th className='py-4 px-6 font-semibold'>Date</th>
                      <th className='py-4 px-6 font-semibold text-center'>Status</th>
                      <th className='py-4 px-6 text-center'></th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-50 text-sm font-medium text-gray-700'>
                    {recentLoans.map((row) => (
                      <tr key={row.id} className='hover:bg-gray-50/50 transition-colors'>
                        <td className='py-4 px-6 flex items-center gap-3'>
                          <div className='w-8 h-8 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold flex items-center justify-center uppercase'>
                            {row.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className='font-semibold text-xs  text-gray-700'>{row.name}</span>
                        </td>
                        <td className='py-4 px-6 text-xs font-extrabold text-gray-800'>{row.amount}</td>
                        <td className='py-4 px-6 text-xs font-extrabold text-gray-700 '>{row.cashier}</td>
                        <td className='py-4 px-6 text-gray-800 text-xs font-semibold'>{row.due}</td>
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

              {activeTab==='overdue'&&(
                 <div className='overflow-x-auto w-full'>
                <table className='w-full text-left border-collapse'>
                  <thead>
                    <tr className='border-b border-gray-100 text-xs font-extrabold text-gray-700 capitalize bg-gray-50/50'>
                      <th className='py-4 px-6 font-semibold'>Payer</th>
                      <th className='py-4 px-6 font-semibold'>paid currency</th>
                      <th className='py-4 px-6 font-semibold'>Cashier</th>
                       <th className='py-4 px-6 font-semibold'>penalities</th>
                      <th className='py-4 px-6 font-semibold'>Date</th>
                      <th className='py-4 px-6 text-center'></th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-50 text-sm font-medium text-gray-700'>
                    {recentLoans.map((row) => (
                      <tr key={row.id} className='hover:bg-gray-50/50 transition-colors'>
                        <td className='py-4 px-6 flex items-center gap-3'>
                          <div className='w-8 h-8 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold flex items-center justify-center uppercase'>
                            {row.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className='font-semibold text-xs  text-gray-700'>{row.name}</span>
                        </td>
                        <td className='py-4 px-6 text-xs font-extrabold text-gray-800'>{row.amount}</td>
                        <td className='py-4 px-6 text-xs font-extrabold text-gray-700 '>{row.cashier}</td>
                        <td className='py-4 px-6 text-gray-800 text-xs font-extrabold'>20000 UGX</td>
                        <td className='py-4 px-6 text-gray-800 text-xs font-semibold'>{row.due}</td>
                        
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


     {currentPages==='borrowers'&&(
      <Borrowers/>
     )}

      </div>

    </div>
  )
}

export default AdDashboard;