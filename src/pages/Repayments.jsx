import { ChevronDown, ChevronLeft, ChevronRight, CircleAlert, CircleCheck, Download, ChartSpline,
     Funnel, Receipt, Search, 
     SearchX,
     WifiOff,
     CircleX} from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import api from '../api';
import NetworkError from './NetworkError';
import SkeletonCellLoader from './SkeletonCellLoader';

function Repayments() {

    const [Loading,setLoading]=useState(null);  
  const [repayment,setRepayment]=useState([]);
  const [Errorsize,setErrorsize]=useState(null);
  const [messagekey,setmessageKey]=useState(null)
  const [networkError,setnetworkError]=useState(false)

let [Searchterm,setsearchterm]= useState('')  
  const FetchRepaymentInfo= async()=>{
    setLoading(true)
    setnetworkError(false)
    try{
      const res=await api.get('/repayment');
      setRepayment(res.data);
    }
    catch(err){
        if(!err.response){
            setnetworkError(true);
        }
     setmessageKey(err.response?.data?.messagekey)
     setErrorsize(err.response?.data?.size);
    }finally{
        setLoading(false)
    }
  }

  useEffect(()=>{
    FetchRepaymentInfo();
  },[])

    
const formatDate = (date) => {
    if(!date) return '';
    let d=date instanceof Date? date.toISOString():date;
  return d.split('T')[0].split('-').reverse().join('-');
};
    
    const [selectedDate, setSelectedDate] = useState('');

    const uniqueDates = [...new Set(repayment.map(p => formatDate(p.date)))];

    const {t}=useTranslation();

    const filteredPayers = repayment.filter(p => {
        return selectedDate === '' || p.date === selectedDate;
    });


    const LoadingData= [
        {date:"",Paid:700},
        {date:"",Paid:500},
        {date:"",Paid:1000},
        {date:"",Paid:700},
        {date:"",Paid:1500}
    ]

    const chartData= repayment?.reduce((acc,rp)=>{
        const formatteddate=formatDate(rp.date);
        const amount=Number(rp.client_amount);
        const cleanedamount=isNaN(amount)? 0:amount;
        const existingDay=acc.find((item)=>item.date===formatteddate)

        if(existingDay){
            existingDay.Paid+=cleanedamount;
        }
        else{
            acc.push({
                date:formatteddate,
                Paid:cleanedamount
            })
        }
        return acc
    },[])
 
    const graphData= Loading ? LoadingData:chartData

    const filteredrepayment= repayment.filter((rp)=>{
        return (
            rp.client_name?.toLowerCase().includes(Searchterm.toLowerCase())||
            rp.loan_id?.toLowerCase().includes(Searchterm.toLowerCase())
        )
    })||[];


 
  
 const Handleretry= ()=>{
    FetchRepaymentInfo();
 }


   


    return (
        <div className='min-h-screen p-2 md:p-4'>
            <div className={` flex flex-col md:flex-row   gap-4 justify-between items-start md:items-center 
            border-b pb-3 py-2 px-4 border-gray-100`}>
                <div className='flex items-center gap-2'>
                    <span className='bg-blue-400 p-2 rounded-sm text-white shrink-0'><CircleCheck size={30}/></span>
                    <div>
                        <h2 className='text-xl md:text-xl font-extrabold text-gray-800'>{t('rp.title')}</h2>
                        <span className='text-[15px] capitalize block text-gray-700'>{t('rp.subtitle')}</span>
                    </div>
                </div>
                <div className='flex  justify-between items-center gap-2 w-full md:w-auto'>
                
                    <span className={`relative flex capitalize gap-2 p-2 px-4 
                    rounded-sm text-sm cursor-pointer border border-gray-200
                     bg-white items-center whitespace-nowrap`}>
                        <Funnel size={16}/>
                        <p>{selectedDate ? selectedDate : t('rp.filter')}</p>
                        <ChevronDown size={16}/> 

                        <select 
                            value={selectedDate}
                            disabled={Loading||messagekey ||networkError   }
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className='absolute inset-0 w-full h-full disabled:cursor-not-allowed opacity-0 cursor-pointer font-medium'
                        >
                            <option value="">{t('rp.all')}</option>
                            {uniqueDates.map((date, idx) => (
                                <option key={idx} value={date}>{date}</option>
                            ))}
                        </select>
                    </span>

                    <button
                     disabled={Loading || networkError || messagekey}
                    className='flex capitalize gap-2 p-2 px-4 rounded-md text-sm cursor-pointer border
                     border-gray-200 bg-white items-center whitespace-nowrap disabled:cursor-not-allowed'
                     ><Download size={16}/>
                      {t('rp.export')}</button>
                    <div className='relative '>
                   <span className='absolute mt-2 mx-2'>
                    <Search size={20} className='text-gray-500'/></span> 
                    <input type='text'
                    onChange={(e)=>setsearchterm(e.target.value)}
                     placeholder={t('loan.search_placeholder')}
                    disabled={Loading||messagekey||networkError}
                     className='border p-2 px-8 disabled:cursor-not-allowed
                     border-gray-200 text-gray-500 bg-white rounded-sm text-sm
                      focus:ring-1 focus:ring-blue-400 outline-none'></input>
                </div>
                </div>                
            </div>

            {networkError ? 
            <NetworkError HandleRetry={Handleretry}/>
           :<div>
             <div className={`mt-6 bg-white ${messagekey ? 'border border-gray-200':'shadow'}  
             rounded-md min-h-75 overflow-hidden`}>
                {messagekey&&Errorsize===0 ? 
                 <div className='flex flex-col justify-center h-70 w-full p-6  items-center '>
                 <span className='bg-blue-400 p-3 rounded-full'><Receipt size={60} 
                 className='text-white'/></span>
                    <p className='text-gray-800 text-xl font-bold p-2 '>{t(messagekey)}</p>
                    <p className='text-gray-800 text-[15px]'>{t('errors.repayment_not_found_desc')}

                    </p>
                 </div>
                :messagekey&&Errorsize!==0 ?
                 <div className='flex flex-col p-3 h-70 justify-center '>
                    <div className='bg-red-50 p-5 border border-red-500 rounded-sm'>

                 <span className=''><CircleX size={50} 
                 className='text-red-500'/></span>
                 <h2 className='text-xl font-bold text-red-600'>{t('errors.errorTitle')}</h2>
                    <p className='text-red-500 font-semibold py-1 uppercase italic'>{t(messagekey)}</p>
                    <p className='text-gray-800 text-[15px] italic'>{t('errors.error_desc')} </p>
                     <div className='flex justify-end'>
                     <button onClick={Handleretry} className=' bg-green-600 px-7 rounded-sm shadow outline-none py-1.5 text-white italic cursor-pointer'>
                        {t('errors.retry')}
                     </button>
                     </div>
                    </div>

                 </div>
                 :!Loading&&filteredrepayment.length==0 ?
                 <div className='p-2 flex flex-col justify-center items-center h-75'>
                        <SearchX className='text-gray-800' size={60}/>
                         <h2 className='text-xl text-gray-800 font-semibold'>{t('search_result.NoResult_found')}</h2>

                        <p className='text-[15px] text-gray-800'>{t('search_result.Nomatches')}</p>
                 </div> :

                 <div>
                <h2 className='p-4 font-extrabold text-gray-800 text-xl capitalize'>{t('rp.details_title')}</h2>
                <div className="overflow-x-auto w-full">
                    
                    <table className="w-full border-collapse whitespace-nowrap">
                        <thead>
                          <tr className="bg-gray-50 text-left text-gray-800 uppercase text-[11px]
                           border-b border-gray-200">
                            <th className="p-3">{t('rp.table.no')}</th>
                            <th className="p-3">{t('rp.table.payer_names')}</th>
                            <th className="p-3">{t('rp.table.loan_id')}</th>
                            <th className="p-3">{t('rp.table.amount')}</th>
                            <th className="p-3">{t('rp.table.cashier')}</th>
                            <th className="p-3">{t('rp.table.date')}</th>
                            <th className="p-3">{t('rp.table.status')}</th>
                          </tr>
                        </thead>

                        <tbody>
                            
                          {Loading ? Array.from({length:5}).map((_,idx)=>(
                            <tr key={idx}>
                         <td className="p-3"> <SkeletonCellLoader/></td>
                             <td className='p-3'> <SkeletonCellLoader/></td>
                             <td className='p-3'><SkeletonCellLoader/></td>
                             <td className='p-3'><SkeletonCellLoader/></td>
                             <td className='p-3'><SkeletonCellLoader/></td>
                             <td className='p-3'><SkeletonCellLoader/> </td>
                             <td className='p-3'><SkeletonCellLoader/></td>
                                </tr>
                          )
                          ):filteredrepayment.map((p,idx)=>{
                            return <tr key={idx} className="border-t border-gray-100 cursor-pointer hover:bg-gray-50 transition">
                             <td className="p-3 text-gray-700 text-sm">
                              
                                {idx+1}
                            </td>
                            <td className="p-3 text-gray-700 text-[15px] capitalize">
                              {p.client_name}
                            </td>
                            <td className="p-3 text-gray-700 text-sm">
                                {p.loan_id}
                            </td>
                            <td className="p-3 text-gray-800 capitalize  text-[14px]">
                                {p.client_amount} UGX
                            </td>
                             <td className="p-3 text-gray-700 text-[14px] capitalize">
                                {p.signed_by}
                            </td>
                             <td className="p-3 text-gray-700 text-[15px]">
                                {formatDate(p.date)}
                            </td>
                            <td className="p-3">
                              <span className={` ${p.status === 'done' ? 'bg-blue-400 text-white ' : ''} capitalize text-gray-500 px-3 py-1 rounded-full text-xs font-medium`}>
                                {t(`rp.status.${p.status}`)}
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

                </div> }
            </div>
             
            <div className='shadow p-4 my-4 bg-white rounded-md' >
                <div className='pb-4 md:mx-4'>
                    <h2 className={` ${messagekey||chartData.length==1 ? 'hidden':''} 
                    capitalize font-extrabold text-xl md:text-2xl
                     text-gray-800 pb-2`}>{t('rp.trends_title')}</h2>
                    <div className='flex gap-2 items-center'>
                        <div className={`${messagekey||chartData.length==1 ? 'hidden':''}p-2 h-fit w-fit rounded-full bg-blue-400`}></div>
                        <p className={`${messagekey||chartData.length==1 ? 'hidden':''} text-sm capitalize font-semibold text-gray-600`}>
                            {t('rp.repaid_currency')}</p>
                    </div>
                </div>
                <div className={`${Loading ? 'animate-pulse':''}h-64 md:h-75 w-full text-xs`}>
                    {messagekey&&Errorsize===0 ? 
                    <div className='text-[15px] flex flex-col justify-center h-34 md:h-45 items-center'>
                      <span className='bg-blue-400 text-white p-4 rounded-full '>
                        <ChartSpline  size={70}/></span>
                      <p className='text-gray-800 font-bold text-xl'>{(t(messagekey))}</p>
                      <p className='text-[15px] pt-2'>{t('errors.repaynt_graph_error_desc')}</p>
                    </div>    
                    :messagekey&&Errorsize!==0 ? <div
                    className='flex flex-col px-5  space-y-1.5 justify-center border py-7 rounded-sm border-red-500'>
                        <p className='uppercase text-[15px] italic text-red-500 font-semibold'>{t(messagekey)}</p>
                        <p className='text-[15px] italic'>{t('errors.graph_server_error_desc')}</p>
                        <p className='text-[15px] italic'>{t('errors.error_desc')}</p>
                    </div> 
                    :chartData.length===1 ? 
                    <div className='text-[15px] flex  flex-col justify-center items-center h-34 md:h-60'>
                        <span className='bg-blue-400 p-3 rounded-full text-white'>
                            <ChartSpline size={70}/></span>
                       <h2 className='uppercase p-2 font-bold text-gray-800'>Repayment trend coming soon</h2> 
                       <p className='text-[15px] text-gray-800 tracking-tight'>Continue recording repayments. the trend  will appear automatically once repayments exist across multiple dates.</p>

                    </div> :<ResponsiveContainer width={'100%'} height={'100%'}>
                        <AreaChart data={graphData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid 
                            strokeDasharray={'3,3'}/>
                            <XAxis dataKey="date"
                            hide={Loading}
                            />
                            <YAxis
                             hide={Loading}
                            tickFormatter={(v)=>{
                                if(v>=1000000) {return v/1000000 +'M'}
                                if(v>=1000){return v/1000 +"K"}
                                return v
                            }}/>
                            {!Loading &&<Tooltip/> }
                            <Tooltip/>
                            <Area type="monotone" dataKey="Paid"
                                stroke="#E5E7EB"
                                fill={Loading ? "#E5E7EB":"#60A5FA"}
                               strokeWidth={2}
                              dot={{r:Loading ? 2:4}}
                              activeDot={!Loading}
                              fillOpacity={Loading ? 0.5:1}
                              isAnimationActive={!Loading}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                }
                    
                </div>
            </div>
            </div>}

           
        </div>
    )
}

export default Repayments