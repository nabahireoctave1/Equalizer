import React from 'react'
import { 
   User, TriangleAlert, 
  ArrowLeftRight, ArrowDownLeft, Percent, BarChart3, 
  Clock, SheetIcon, Printer, FileText, Calendar, BadgeAlert,
  ArrowBigUp,
  ArrowBigDown,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'
import photo from '../assets/photo.png'

function AdReport() {
  const details = [
    { metric: "Loans Issued", today: "650000", week: "2,450000 ", month: "12450000 ", year: "125000000 ", icon: <ArrowBigUp className="text-blue-500" size={16}/>, bg: "bg-blue-50" },
    { metric: "Repayments", today: "630000 ", week: "2120000", month: "7,650,000 ", year: "78500,000 ", icon: <ArrowBigDown className="text-emerald-500" size={16}/>, bg: "bg-emerald-50" },
    { metric: "Penalties", today: "250000 ", week: "8500000 ", month: "250,000 ", year: "2850000 ", icon: <BadgeAlert className="text-purple-500" size={16}/>, bg: "bg-purple-50" },
    { metric: "Overdue Amount", today: "1850000 ", week: "1850000 ", month: "1,850,000 ", year: "12450000",icon: <TriangleAlert className="text-rose-500" size={16}/>, bg: "bg-rose-50" },
  ]

   
  const topCashiers = [
    { id: 1, name: "Rubavu service ", amount: "2450000 UGX" },
    { id: 2, name: "Musanze akea", amount: "1850000 UGX " },
    { id: 3, name: "nyagatare live stock hub", amount: "1120000 UGX" },
    
  ]

  const recentTransactions = [
    { type: "Loan Issued", user: "John Claude", details: "300000 UGX", date: "May 20, 2026", time: "10:30 AM", icon: <ArrowBigUp size={14}/>, color: "text-blue-600 bg-blue-50" },
    { type: "Payment Received", user: "Aline Mukamana", details: "50,000 UGX", date: "May 20, 2026", time: "10:15 AM", icon: <ArrowBigDown size={14}/>, color: "text-emerald-600 bg-emerald-50" },
    { type: "Penalty Added", user: "Jean Bosco", details: "5,000 UGX", date: "May 20, 2026", time: "09:45 AM", icon: <TriangleAlert size={14}/>, color: "text-rose-500 bg-rose-50" },
  ]

  return (
    <div className='p-3   '>
         <div className='bg-white p-6 rounded-md space-y-4'>
            <div className='border-b pb-4 border-gray-50'>
          <h1 className='text-xl font-extrabold text-gray-900 uppercase'>Company Report Overview</h1>
            
            </div>
      
      <div className='p-4   space-y-4'>
        <div>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-2 lg:flex items-center gap-3'>
          <div>
            <span className='block text-[11px] font-bold text-gray-600 uppercase mb-1'>Date</span>
            <div className='relative flex items-center'>
              <Calendar size={14} className='absolute left-3 text-gray-400' />
              <select  className='pl-7 pr-4 py-1.5 border border-gray-200 rounded-md text-xs font-semibold
               text-gray-700 bg-gray-50/50 outline-none w-full sm:w-52'>
                <option value="">02-03-2026</option>
                <option value="">06-01-2026</option>
                <option value="">06-01-2026</option>
               </select>
            </div>
          </div>
          <div>
            <span className='block text-[11px] font-bold text-gray-600 uppercase mb-1'>Report Type</span>
            <select className='px-3 py-1.5 border border-gray-200 rounded-md text-xs font-semibold text-gray-700 bg-white outline-none w-full sm:w-40 cursor-pointer'>
              <option>All Reports</option>
              <option>Branch Report</option>
            </select>
          </div>
          <div>
            <span className='block text-[11px] font-bold text-gray-600 uppercase mb-1'>branch</span>
            <select className='px-3 py-1.5 border border-gray-200 rounded-md text-xs font-semibold text-gray-700 bg-white outline-none w-full sm:w-40 cursor-pointer'>
              <option>Kigali Tech</option>
              <option>Rubavu Limited</option>
            </select>
          </div>
          <div className='sm:col-span-2 lg:col-span-1'>
            <span className='block text-[11px] font-bold text-gray-600 uppercase mb-1'>Export</span>
            <div className='flex gap-1.5'>
              <button className='flex items-center gap-1.5 px-3 py-1.5 border border-rose-100 text-rose-500 bg-rose-50/40 hover:bg-rose-50 text-xs font-bold rounded-sm cursor-pointer transition-all'><FileText size={13}/>PDF</button>
              <button className='flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 bg-gray-50 hover:bg-gray-100 text-xs font-bold rounded-sm  cursor-pointer transition-all'><Printer size={13}/>Print</button>
            </div>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='bg-white p-4 rounded-md border border-gray-100  flex items-center gap-3'>
          <div className='p-2.5 bg-blue-50 text-blue-500 rounded-full'><ArrowBigUp size={18}/></div>
          <div>
            <p className='text-[11px] font-bold text-gray-700 uppercase'>Total Loans</p>
            <h3 className='text-[17px] font-extrabold text-gray-700 mt-0.5'>12450000 UGX</h3>
          </div>
        </div>
        
       
        <div className='bg-white p-4 rounded-md border border-gray-100  flex items-center gap-3'>
          <div className='p-2.5 bg-green-50 text-green-600 rounded-full'><ArrowBigDown size={18}/></div>
          <div>
            <p className='text-[11px] font-bold text-gray-700 uppercase '>Total Repayments</p>
            <h3 className='text-[17px] font-extrabold text-gray-800 mt-0.5'>7650000 UGX</h3>
          </div>
        </div>
        <div className='bg-white p-4 rounded-md border border-gray-100  flex items-center gap-3'>
          <div className='p-2.5 bg-violet-50 text-violet-500 rounded-full'><User size={18}/></div>
          <div>
            <p className='text-[11px] font-bold text-gray-700 uppercase'>Total Borrowers</p>
            <h3 className='text-[17px] font-extrabold text-gray-900 mt-0.5'>1320</h3>
          </div>
        </div>
        <div className='bg-white p-4 rounded-md border border-gray-100  flex items-center gap-3'>
          <div className='p-2.5 bg-red-100 text-red-500 rounded-full'><TriangleAlert size={18}/></div>
          <div>
            <p className='text-[11px] font-bold text-gray-700 uppercase '>Overdue Amount</p>
            <h3 className='text-[17px] font-extrabold text-gray-800 mt-0.5'>1850000 UGX</h3>
          </div>
        </div>
      </div>

     

      <div className='bg-white border border-gray-100 rounded-xl  overflow-hidden'>
        <div className='p-4 border-b border-gray-50 bg-gray-50/40'>
          <h2 className='text-xs font-bold text-gray-700 uppercase'>Detailed Summary</h2>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-slate-50/70 border-b border-gray-100 text-[10px] font-bold uppercase tracking-wide text-gray-700'>
                <th className='p-3.5 pl-5'>Metric</th>
                <th className='p-3.5'>Today</th>
                <th className='p-3.5'>This Week</th>
                <th className='p-3.5'>This Month</th>
                <th className='p-3.5'>This Year</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100 text-xs font-medium text-gray-700'>
              {details.map((d, index) => (
                <tr key={index} className='hover:bg-slate-50/40 transition-colors'>
                  <td className='p-3.5 whitespace-nowrap  pl-5 flex items-center gap-2.5 font-semibold text-gray-900'>
                    <span className={`p-1.5  rounded-lg   ${d.bg}`}>{d.icon}</span>
                    {d.metric}
                  </td>
                  <td className='p-3.5 whitespace-nowrap '>
                    <div>{d.today} UGX</div>
                  </td>
                  <td className='p-3.5 whitespace-nowrap '>
                    <div>{d.week} UGX</div>
                  </td>
                  <td className='p-3.5 whitespace-nowrap '>
                    <div>{d.month} UGX</div>
                  </td>
                  <td className='p-3.5 whitespace-nowrap '>
                    <div>{d.year} UGX</div>
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        
        <div className='bg-white border border-gray-100 rounded-xl p-5  space-y-4'>
          <div className='flex justify-between items-center border-b border-gray-50 pb-2'>
            <h2 className='text-xs font-bold text-gray-800 uppercase tracking-wider'>Top Branch by Collections</h2>
            <button className='flex'>
                <span className='p-1 bg-gray-50 cursor-pointer m-1 rounded-md border border-gray-100'><ChevronLeft/></span>
                <span className='p-1 bg-gray-50 cursor-pointer m-1 rounded-md border border-gray-100'><ChevronRight/></span>
            </button>
          </div>
          <div className='divide-y divide-gray-50'>
            {topCashiers.map((cashier) => (
              <div key={cashier.id} className='flex justify-between items-center py-2.5 first:pt-0 last:pb-0'>
                <div className='flex items-center gap-3'>
                  <span className='font-bold text-xs text-gray-400 w-4'>{cashier.id}</span>
                  <img src={photo} className='w-7 h-7 rounded-full object-cover ring-2 ring-gray-100' alt={cashier.name} />
                  <p className='font-bold text-[12px] capitalize text-gray-800'>{cashier.name}</p>
                </div>
                <span className='font-bold text-xs text-gray-800  px-2.5'>{cashier.amount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='bg-white border border-gray-100 rounded-xl p-5  space-y-4'>
          <div className='flex justify-between items-center border-b border-gray-50 pb-2'>
            <h2 className='text-xs font-bold text-gray-700 uppercase tracking-wider'>Recent Transactions</h2>
            <button className=' flex  text-gray-600'>
                <span className='p-1 bg-gray-50 cursor-pointer m-1 rounded-md border border-gray-100'><ChevronLeft/></span>
                <span className='p-1 bg-gray-50 cursor-pointer m-1 rounded-md border border-gray-100'><ChevronRight/></span>
            </button>
          </div>
          <div className='divide-y divide-gray-50'>
            {recentTransactions.map((tx, idx) => (
              <div key={idx} className='flex justify-between items-center py-2.5 first:pt-0 last:pb-0'>
                <div className='flex items-center gap-3'>
                  <div className={`p-1.5 rounded-lg ${tx.color}`}>
                    {tx.icon}
                  </div>
                  <div>
                    <p className='font-bold  text-[12px] text-gray-900'>{tx.type}</p>
                    <p className='text-[12px] text-gray-700 font-medium mt-0.5'>{tx.user} • <span className='text-gray-900 font-semibold'>{tx.details}</span></p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='text-[12px] font-bold text-gray-800'>{tx.date}</p>
                  <p className='text-[11px] text-gray-700 font-bold mt-0.5'>{tx.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
</div>
    </div>
  )
}

export default AdReport