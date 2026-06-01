import { ChevronDown, ChevronLeft, ChevronRight, CircleCheck, Download, Funnel } from 'lucide-react'
import React, { useState } from 'react'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

function Repayments() {

    const data = [
        {date:"may 01,2026", paid:50000000},
        {date:"may 02,2026", paid:70000000},
        {date:"may 03,2026", paid:20000000},
        {date:"may 04,2026", paid:40000000},
        {date:"may 05,2026", paid:9000000},
        {date:"may 06,2026", paid:4000000},
        {date:"may 07,2026", paid:0},
        {date:"may 08,2026", paid:70000000},
    ]

   let payer=[
        {names:"nabahire octave",loanid:"EQ234345",amount:"3000000",cashier:"steve lorent", date:"31-06-2025",status:'done'},
        {names:"nziza Dan",loanid:"EQ454345",amount:"6000000",cashier:"precious ishimwe", date:"31-06-2025",status:'done'},
        {names:"Ganza Emma",loanid:"EQ904345",amount:"7000000",cashier:"bugingo blaise", date:"02-06-2026",status:'done'},
        {names:"Cyusa Emma",loanid:"EQ474345",amount:"2000000",cashier:"nyandwi james", date:"03-06-2026",status:'done'},
        {names:"Keza Kemirembe Dyana",loanid:"EQ9734345",amount:"4000000",cashier:"Joel smith", date:"05-06-2026",status:'done'},
    ]
    
    const [selectedDate, setSelectedDate] = useState('');

    const uniqueDates = [...new Set(payer.map(p => p.date))];

    const filteredPayers = payer.filter(p => {
        return selectedDate === '' || p.date === selectedDate;
    });

    return (
        <div className='p-2 md:p-4'>
            <div className='flex flex-col md:flex-row   gap-4 justify-between items-start md:items-center border-b pb-3 py-2 px-4 border-gray-200'>
                <div className='flex items-center gap-2'>
                    <span className='bg-blue-400 p-2 rounded-md text-white shrink-0'><CircleCheck size={30}/></span>
                    <div>
                        <h2 className='text-xl md:text-2xl font-extrabold text-gray-800'>Review Loan PayBack</h2>
                        <span className='text-sm capitalize block text-gray-500'>Monitor all loan repayments</span>
                    </div>
                </div>
                <div className='flex flex-wrap items-center gap-2 w-full md:w-auto'>
                    <span className='capitalize p-2 px-4 rounded-md text-sm cursor-pointer border border-gray-200 bg-white whitespace-nowrap'>
                        {selectedDate ? selectedDate : "31,2025"}
                    </span>

                    <span className='relative flex capitalize gap-2 p-2 px-4 rounded-md text-xs cursor-pointer border border-gray-200 bg-white items-center whitespace-nowrap'>
                        <Funnel size={16}/>
                        <p>{selectedDate ? selectedDate : "filter"}</p>
                        <ChevronDown size={16}/> 

                        <select 
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer font-medium'
                        >
                            <option value="">All</option>
                            {uniqueDates.map((date, idx) => (
                                <option key={idx} value={date}>{date}</option>
                            ))}
                        </select>
                    </span>

                    <span className='flex capitalize gap-2 p-2 px-4 rounded-md text-sm cursor-pointer border border-gray-200 bg-white items-center whitespace-nowrap'><Download size={16}/> Export</span>
                </div>
            </div>
             <div className="mt-6 bg-white shadow rounded-md overflow-hidden">
                <h2 className='p-4 font-extrabold text-gray-800 text-xl capitalize'>Repayments details</h2>
                <div className="overflow-x-auto w-full">
                    <table className="w-full border-collapse whitespace-nowrap">
                        <thead>
                          <tr className="bg-gray-50 text-left text-gray-800 uppercase text-[11px] border-b border-gray-200">
                            <th className="p-3">No</th>
                            <th className="p-3">payer Names</th>
                            <th className="p-3">Loan id</th>
                            <th className="p-3">amount</th>
                            <th className="p-3">Cahier</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">status</th>
                          </tr>
                        </thead>

                        <tbody>
                          {filteredPayers.map((p,idx)=>{
                            return <tr key={idx} className="border-t border-gray-100 cursor-pointer hover:bg-gray-50 transition">
                             <td className="p-3 text-gray-700 text-sm">
                              { idx + 1 }
                            </td>
                            <td className="p-3 text-gray-700 text-[13px] capitalize">
                              {p.names}
                            </td>
                            <td className="p-3 text-gray-700 text-sm">
                                {p.loanid}
                            </td>
                            <td className="p-3 text-gray-800 font-semibold text-[13px]">
                                {p.amount} UGX
                            </td>
                             <td className="p-3 text-gray-700 text-sm capitalize">
                                {p.cashier}
                            </td>
                             <td className="p-3 text-gray-700 text-[13px]">
                                {p.date}
                            </td>
                            <td className="p-3">
                              <span className={` ${p.status === 'done' ? 'bg-blue-400 text-white ' : ''} capitalize text-gray-500 px-3 py-1 rounded-full text-xs font-medium`}>
                                {p.status}
                              </span>
                            </td>
                          </tr>
                          })}
                        </tbody>
                    </table>
                </div>
                <div className='flex items-center justify-between px-4 py-3 border-t border-gray-100'>
                    <span className='bg-gray-200 p-1 rounded-sm text-gray-800 cursor-pointer'><ChevronLeft size={20}/></span>
                    <span className='bg-gray-200 p-1 rounded-sm text-gray-800 cursor-pointer'><ChevronRight size={20}/></span>
                </div>
            </div>

            <div className='shadow p-4 my-4 bg-white rounded-md' >
                <div className='pb-4 md:mx-4'>
                    <h2 className='capitalize font-extrabold text-xl md:text-2xl text-gray-800 pb-2'>Repayments trends</h2>
                    <div className='flex gap-2 items-center'>
                        <div className='p-2 h-fit w-fit rounded-full bg-blue-400 '></div>
                        <p className='text-sm capitalize font-semibold text-gray-600'> repaid currency</p>
                    </div>
                </div>
                <div className='h-64 md:h-80 w-full text-xs capitalize'>
                    <ResponsiveContainer width={'100%'} height={'100%'}>
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray={'3,3'}/>
                            <XAxis dataKey="date"/>
                            <YAxis tickFormatter={(v)=>{
                                if(v>=1000000) {return v/1000000 +'M'}
                                if(v>=1000){return v/1000 +"K"}
                                return v
                            }}/>
                            <Tooltip/>
                            <Area type="monotone" dataKey="paid"
                              stroke='#22c55e'
                              fill='#3b82f6'
                              strokeWidth={2}
                              dot={{r:3}}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

           
        </div>
    )
}

export default Repayments