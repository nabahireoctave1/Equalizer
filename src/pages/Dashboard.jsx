import {
  Bell, MenuIcon, Settings, MonitorCheck, LogOut, LayoutDashboard,
  Users, CircleCheck, BarChart3, Banknote, Building2, Edit2, Trash2, 
  ChevronRight, ChevronLeft, TrendingDown, CreditCard, DollarSign, PieChart, X,
  User2,
  Search,
  CircleX,
  ScrollText,
  WifiOff
} from "lucide-react";


import { useEffect, useState } from "react";
import AdminList from "./AdminList";
import Companies from "./Companies";
import Loan from "./Loan";
import Setting from "./Settings";
import Transactionlog_model from "./Transactionlog_model";
import User_info_model from "./User_info_model";
import Agents from "./Agents";
import Notification from "./Notification";

import {io} from 'socket.io-client'
import socket from "../socket";
import api from '../api'
import  {useNavigate} from 'react-router-dom'
import NetworkError from "./NetworkError";

let Dashboard = () => {
  const [activePage, setactivepage] = useState('overview');
  const [isopentransactionmodel, setisopened] = useState(false);
  const [isopenusermodel, setopenusermodel] = useState(false);
  const [issidebaropen, setissidebaropen] = useState(false);
  const  [isnotificationopen,setisnotificatonopen]=useState(false)
   const [loading,setlaoding]=useState(null)
   const [stats,setstats]=useState([]);
   const [transaction,settransaction]=useState([]);
   const [cashier,setcashier]=useState([]);
   const [userinfo,setuserinfo]=useState([])
const [selectedTransaction, setSelectedTransaction] = useState(null);
const [selecteduser,setselecteduser]=useState(null)
const navigate= useNavigate();

const [transactionpage,settransactionpage]=useState(1);
const transactionperpage=2;
const start= (transactionpage-1)*transactionperpage;
const end= start+transactionperpage;
const paginatedt=transaction.slice(start,end)
const totalpage=Math.ceil(transaction.length/transactionperpage);

const [cashierpage, setcashierpage] = useState(1);

const cashierperpage =4;

const startcashier =(cashierpage - 1) *cashierperpage;
const endcashier =startcashier +cashierperpage;
const paginetedc =cashier.slice(startcashier,endcashier);

const totalcashierpage =Math.ceil(cashier.length /cashierperpage);



  const opennotification=(e)=>{e.preventDefault();setisnotificatonopen(true)}
  const closemodel = () => setisopened(false);
  const closeusermodel = () => setopenusermodel(false);
  const closenotificationmodel= ()=>setisnotificatonopen(false)
  const [whatsappstatus,setwhatappstatus]=useState(null)
  const [qrcode,setqrcode]=useState(null)
  const [errors,seterrors]=useState({
    statserror:null,
    transactionerror:null,
    cashiererror:null,
    usererror:null
  })

  const [errorsize,seterrorsize]=useState({
     grobalDasherrorsize:null,
     transerrorsize:null,
     csherrorsize:null,
     cmpadminerrorsize:null
  })

  

const [networkerror, setnetworkerror] = useState({
  grobalnetwork: {error: false,reason: null},
  cshnetworkerror: {error: false,reason: null
  },
  transnetworkerror: {error: false,reason: null },
  cmpinfnetworkerror: { error: false,reason: null}
});

  const transactionmodelopened = (e, trans) => {
  e.preventDefault();

  setSelectedTransaction({
    transactionId: trans.transcation_id,
    amount: trans.amount,
    status: trans.status,
    companyname: trans.company_name
,
    date: trans.transcation_date
  });
  setisopened(true);
};

 const openuserinformodel = (e,comp) => { e.preventDefault(); 
  
    setselecteduser({
      cmpname:comp.company_name,

      created_at:comp.created_at,
      admin_id:comp.admin_id,
      phone:comp.phone,
      status:comp.status

       })
    setopenusermodel(true); };

  const navigateTo = (page) => {
    setactivepage(page);
    setissidebaropen(false);
  };

  useEffect(()=>{

  

    
  socket.on('whatsapp_gateway_status',(data)=>{
    setwhatappstatus(data.status);
    setqrcode(data.qr);
  },[])

  return ()=>{
    socket.off()
  }
  })

const FetchDashboard = async () => {
    seterrors({ statserror: null, transactionerror: null, cashiererror: null, comperror: null });
     seterrorsize({grobalDasherrorsize:null,csherrorsize:null,cmpadminerrorsize:null,transerrorsize:null})
      setnetworkerror({ grobalnetwork:{error:false,reason:null}, cshnetworkerror:{error:false,reason:null},
         transnetworkerror:{error:false,reason:null}, cmpinfnetworkerror:{error:null,reason:null}})
     setnetworkerror(null)
    let result = await Promise.allSettled([
      api.get('/dash-overview'),
      api.get('/transaction'),
      api.get('/cashier')
,
      api.get('/user-info')
    ]);

    const [statsinfo, trans, cashiers, userinfo]=result;

  
    if (statsinfo.status==='fulfilled'){
     setstats(statsinfo.value.data);
    } 
    else{
      const err=  statsinfo.reason
      if(err.response){
        seterrorsize((prev)=>({...prev,grobalDasherrorsize:err.response?.data?.size}))
        seterrors((prev)=>({...prev,statserror:err.response?.data?.message}))
      }
      else{
        setnetworkerror((prev)=>({...prev,grobalnetwork:{
          error:true,
          reason:err.message
        }}));
      }
    }
    if (trans.status==='fulfilled'){
    settransaction(trans.value.data);
    }
     else{
     const err= trans.reason;
     if(err.response){
      seterrorsize((prev)=>({...prev,transerrorsize:err.response?.data?.size}));
      seterrors((prev)=>({...prev,transactionerror:err.response?.data?.message}))
     }
     else{
      setnetworkerror((prev)=>({...prev,transnetworkerror:{
        error:true,reason:err.message
      }

      }))
     }
     
    } 

    if (cashiers.status==='fulfilled') {
      setcashier(cashiers.value.data);
    
    }
    else {
       const err= cashiers.reason;
       if(err.response){
        seterrorsize((prev)=>({...prev,csherrorsize:err.response?.data?.size}))
        seterrors((prev)=>({...prev,cashiererror:err.response?.data?.message}))
       }
       else{
       setnetworkerror((prev)=>({...prev,cshnetworkerror:{
        error:true,
        reason:err.message
       }}))
       }
    }
    if (userinfo.status==='fulfilled')
    {
       setuserinfo(userinfo.value.data);
       
    }
    else{
      const err= userinfo.reason;
      if(err.response){
        seterrorsize((prev)=>({...prev,cmpadminerrorsize:err.response?.data?.size}));
        seterrors((prev)=>({...prev,usererror:err.response?.data?.message}))
      }
      else{
        setnetworkerror((prev)=>({...prev,cmpinfnetworkerror:{
          error:true,
          reason:err.message
        }}))
      }
    }

  
};


const handleRetry= ()=>
{
  FetchDashboard();
}


useEffect(()=>{
  FetchDashboard();
},[])



const Formatamount = (amount) => {
  if (amount >= 1000000) {
    return (amount / 1000000)+ 'M';
  }

  if (amount >= 1000) {
    return (amount / 1000)+'K';
  }

  return amount
};

const formatDate = (date) => {
  return date
    .split('T')[0]
    .split('-')
    .reverse()
    .join('-');
};




const handleLogout= ()=>{
  localStorage.removeItem('token')
  socket.disconnect();
  navigate('/')
}



  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      
      {whatsappstatus==='scan_required' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-md shadow-sm p-6 max-w-1/2 w-full border border-gray-100 flex flex-col items-center relative animate-in fade-in zoom-in-95 duration-200">
            <h1 className="uppercase font-black text-gray-800 text-lg tracking-wide mb-4 text-center">Scan QR to Link Whatsapp ON system</h1>
            <div className="shadow-inner bg-gray-50 p-4 rounded-lg border border-gray-100 w-48 h-48 flex items-center justify-center">
              {qrcode ? (
                <img src={qrcode} alt="qrcode" className="w-full h-full object-contain" />
              ) : (
                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
            <p className="text-[10px] text-gray-800 mt-4 text-center  uppercase">Please open WhatsApp on your phone,
               adjust Linked Devices and scan this QRcode.</p>
          </div>
        </div>
      )}

    

      <header className="flex justify-between bg-gradient-to-r from-blue-400 to-blue-600 p-5 sticky top-0 z-50 shrink-0 shadow-md">
        <h2 className="text-white font-extrabold text-2xl tracking-tighter uppercase">Equalizer</h2>
        <div className="flex gap-5 text-white items-center">
          <Bell className="cursor-pointer w-5 h-5"  onClick={opennotification}/>
          <span 
            className="cursor-pointer w-6 h-6 md:hidden transition-transform active:scale-90" 
            onClick={() => setissidebaropen(true)}
          >
            <MenuIcon />
          </span>
          <div className="w-8 h-8 rounded-full bg-blue-400 border
           border-white/30 flex items-center justify-center text-xs font-bold cursor-pointer">AD</div>
        </div>
      </header>
{ isnotificationopen &&(
  <Notification onClose={closenotificationmodel}/>
) }
      <div className="flex flex-1 overflow-hidden relative">
        
        
        {issidebaropen && (
          <div 
            className="fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity"
            onClick={() => setissidebaropen(false)}
          />
        )}

        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 shadow-xl transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:z-0 md:block
          ${issidebaropen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="flex flex-col h-full py-2 px-2">
            <div className="flex justify-end md:hidden p-2">
              <X className="w-6 h-6 text-gray-700" onClick={() => setissidebaropen(false)} />
            </div>

            <div className="space-y-1 mt-2">
              <nav 
                onClick={() => navigateTo('overview')} 
                className={`flex p-3 gap-3 text-sm  capitalize ${activePage==='overview' ? 'text-blue-500 font-semibold  ':' text-gray-70'} rounded-xs 0   cursor-pointer transition-colors `}
              >
                <LayoutDashboard className="w-5" />overview
              </nav>
              <nav 
                onClick={() => navigateTo('adminlist')} 
                className={`flex p-3 gap-3 text-sm capitalize ${activePage==='adminlist'?'text-blue-500 font-semibold  ':'text-gray-700'} rounded-xs  cursor-pointer transition-colors `}
              >
                <MonitorCheck className="w-5" /> admin
              </nav>
              <nav className={`flex p-3 gap-3 capitalize text-sm ${activePage==='report'?'text-blue-500 font-semibold  ':'00 rounded-xs'} text-graxs7 cursor-pointer transition-colors`}>
                <BarChart3 className="w-5" /> report
              </nav>
              <nav 
                onClick={() => navigateTo('Loan')} 
                className={`flex p-3 gap-3 text-sm capitalize ${activePage==='Loan'?'text-blue-500 font-semibold  ':'text-gray-700'} rounded-xs  cursor-pointer transition-color'}`}
              >
                <Banknote className="w-5" /> loan
              </nav>
              <nav 
                onClick={() => navigateTo('companies')} 
                className={`flex p-3 gap-3 text-sm capitalize ${activePage==='companies'?'text-blue-500 font-semibold  ':'text-gray-700'} rounded-xs  cursor-pointer transition-colors `}
              >
                <Building2 className="w-5" /> companies
              </nav>
               <nav 
                onClick={() => navigateTo('agents')} 
                className={`flex p-3 gap-3 text-sm capitalize ${activePage==='agents'?'text-blue-500 font-semibold  ':'text-gray-700'} rounded-xs  cursor-pointer transition-colors `}
              >
                <User2 className="w-5" /> agents
              </nav>
              <nav 
                onClick={() => navigateTo('setting')} 
                className={`flex p-3 gap-3 text-sm capitalize ${activePage==='setting'?'text-blue-500 font-semibold  ':'text-gray-700'} rounded-xs  cursor-pointer transition-colors `}
              >
                <Settings className="w-5" /> setting
              </nav>
            </div>

            <div className="mt-auto">
              <nav  onClick= {handleLogout} className="flex p-3 gap-3 uppercase text-sm font-semibold text-red-500 cursor-pointer">
                <LogOut className="w-5" /> logout
              </nav>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {activePage === 'overview' && (
            <div className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-2/3 space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="bg-white p-4 rounded-md border border-gray-100 flex
                     flex-col justify-between h-28 ">
                      <div className="flex justify-between items-center">
                        <div className="p-1.5 bg-green-50 rounded-lg"><Users className="text-green-600 w-4 h-4" /></div>
                        <CircleCheck className="text-green-500 w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Total Users</p>
                        <p className="text-lg font-black text-gray-800">{stats.totalUsers ? stats.totalUsers:0}</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-md border border-gray-100 flex flex-col justify-between h-28 ">
                      <div className="flex justify-between items-center">
                        <div className="p-1.5 bg-red-50 rounded-lg"><TrendingDown className="text-red-600 w-4 h-4" /></div>
                        <span className="text-[8px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold">High</span>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Overdue Rate</p>
                        <p className="text-lg font-black text-gray-800">{stats.overdueCompanies ? stats.overdueCompanies/stats.totalCompanies*100:0}%</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-md border border-gray-100 flex flex-col justify-between h-28 ">
                      <div className="flex justify-between items-center">
                        <div className="p-1.5 bg-blue-50 rounded-lg"><Users className="text-blue-600 w-4 h-4" /></div>
                        <CircleCheck className="text-green-600 w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Online users</p>
                        <p className="text-lg font-black text-gray-800">{stats.activeUsers ? stats.activeUsers:0}</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-md border border-gray-100 flex flex-col justify-between h-28 ">
                      <div className="flex justify-between items-center">
                        <div className="p-1.5 bg-purple-50 rounded-lg"><CreditCard className="text-purple-600 w-4 h-4" /></div>
                        <span className="text-[8px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full font-bold">Monthly</span>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Total Payments</p>
                        <p className="text-lg font-black text-gray-800">UGX {stats.monthlyPayment? Formatamount(stats.monthlyPayment):0}</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-md border border-gray-100 flex 
                    flex-col justify-between h-28">
                      <div className="flex justify-between items-center">
                        <div className="p-1.5 bg-teal-50 rounded-lg"><Building2 className="text-teal-600 w-4 h-4" /></div>
                        <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Total Company</p>
                        <p className="text-lg font-black text-gray-800">{stats.totalCompanies ? stats.totalCompanies:0}</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-md border border-gray-100 flex flex-col justify-between h-28 ">
                      <div className="flex justify-between items-center">
                        <div className="p-1.5 bg-amber-50 rounded-lg"><DollarSign className="text-amber-600 w-4 h-4" /></div>
                        <PieChart className="text-amber-400 w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Total Revenue</p>
                        <p className="text-lg font-black text-gray-800">UGX {stats.totalRevenue ? Formatamount(stats.totalRevenue):0}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white shadow-sm rounded-xl  border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-1.5 rounded-lg"><Users className="w-4 h-4 text-white" /></div>
                        <h2 className="font-bold text-gray-800 uppercase tracking-wide text-sm">Cashier Management</h2>
                      </div>
                      <div className="flex gap-2 ">
                        <button onClick={()=>{
                          if(cashierpage > 1){
                            setcashierpage(cashierpage-1);
                          }
                        }}
                        disabled={cashierpage===1}
                         className={`p-1.5 ${errors.cashiererror ?'bg-gray-300 border-red-500 cursor-not-allowed':"cursor-pointer hover:bg-gray-100 border-gray-200"}  rounded border  transition-colors`}><ChevronLeft className="w-4 h-4 text-gray-500" /></button>
                        <button
                          onClick={()=>{
                            if(cashierpage < totalpage){
                              setcashierpage(cashierpage+1)
                            }
                          }}
                          disabled={cashierpage>=totalcashierpage}
                         className={`p-1.5 ${errors.cashiererror ?'bg-gray-300 border-red-500 cursor-not-allowed':"cursor-pointer hover:bg-gray-100 border-gray-200"}  rounded border  transition-colors`}><ChevronRight className="w-4 h-4 text-gray-500" /></button>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto min-h-70">
                       
                      
                      { networkerror&&networkerror.cshnetworkerror.error ? 
                      <div className="flex items-center flex-col h-55 justify-center p-6">
                        <span>
                          <WifiOff size={50} className="text-red-500"/></span>
                        <h1 className="text-red-500 text-2xl">{networkerror.cshnetworkerror.reason}</h1>
                          {networkerror.cshnetworkerror.reason.toLowerCase()==='network error' &&
                           <p className="text-[15px] italic text-gray-500">
                           Network error occured 
                          please check your internet connection and try again</p>
                          }
                        
                      </div>
                      :                   
                      errors.cashiererror&&errorsize.csherrorsize===0 ? 
                       <div className="flex  flex-col items-center p-12 h-55 justify-center">
                        <span className="bg-blue-400 p-3 rounded-full"><Users size={45} className="text-white"/></span>
                         <h2 className="text-2xl text-gray-800">Information not found</h2>
                         <p className="text-[15px] first-letter:uppercase">{errors.cashiererror}</p>
                       </div>
                      :
                      
                      errors.cashiererror&&errorsize.csherrorsize===1 ?
                       <div className="flex items-center  justify-center">

                        <div className="w-sm flex items-center flex-col justify-center h-60">
                        <CircleX size={50} className="text-red-500"/>

                        <h2 className="text-2xl text-red-500">Error occurred</h2>
                        <p className=" text-[15px]
                       text-gray-800 italic">
                          {errors.cashiererror}
                          </p>
                          </div></div>:
                      <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-400 text-[11px] uppercase font-bold">
                          <tr>
                            <th className="px-6 py-4 whitespace-nowrap">Cashier ID</th>
                            <th className="px-6 py-4 whitespace-nowrap">Company ID</th>
                            <th className="px-6 py-4 whitespace-nowrap">Full Name</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-sm">
                          {paginetedc.map((c, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                              
                              <td className="px-6 py-4 font-semibold text-blue-600 whitespace-nowrap">{c.cashier_id}</td>
                               <td className="px-6 py-4 text-gray-500 font-mono text-xs whitespace-nowrap">{c.company_id}</td> 
                              <td className="px-6 py-4 text-gray-800 font-medium whitespace-nowrap">{c.cashier_name}</td> 

                              <td className="px-6 py-4 text-center">
                                <div className="flex justify-center gap-2">
                                  <button className="text-[12px] font-bold text-amber-600 border border-amber-200 px-2 py-1 rounded bg-amber-50">Suspend</button>
                                  <button className="text-[12px] font-bold text-white border border-blue-200 px-2 py-1 rounded bg-blue-400">Reactivate</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          
                        </tbody>
                      </table>
                          }
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/3 space-y-2">
                  <div className="bg-white shadow-sm rounded-xl  min-h-[320px] border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                      <h1 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Transaction Logs</h1>
                      <ScrollText className="w-4 text-gray-400" />
                    </div>
                  <div className="relative w-full max-w-xs m-2">
              <input
             type="text"
           placeholder="ID..."
           disabled={errors.transactionerror}
           className="w-full h-10 pl-4 pr-12 text-sm rounded-sm border border-gray-200 bg-white disabled:bg-gray-50
             outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed"
          />

          <button
          disabled={errors.transactionerror}
          className="absolute right-1 top-1 bottom-1 w-10 rounded-sm disabled:cursor-not-allowed disabled:bg-blue-300
           bg-blue-500 text-white flex items-center justify-center
            cursor-pointer transition">

         <Search size={18}/>
          </button>
             </div>
                   { networkerror&&networkerror.transnetworkerror.error ?
                   <div className="flex items-center flex-col h-55 justify-center p-8">
                        <span><WifiOff size={50} className="text-red-500"/></span>
                        <h1 className="text-red-500 text-2xl">{networkerror.transnetworkerror.reason}</h1>
                        {networkerror.transnetworkerror.reason.toLowerCase()==='network error' && 
                         <p className="text-[15px] italic text-gray-500">Network error occured please check your internet connection and try again</p>
                        
                        }

                      </div>
                   :
                   errors.transactionerror&&errorsize.transerrorsize===0 ?
                         <div className="flex items-center flex-col justify-center py-2  w-full px-5">
                          <span className="bg-blue-400 p-2 rounded-full text-white">
                            <ScrollText size={45}/>
                          </span>
                          <h2 className="text-2xl  text-gray-800">Transaction not found</h2>
                         <p className="text-[15px]  text-gray-800"> {errors.transactionerror}</p>
                          </div>:errors.transactionerror&&errorsize.transerrorsize===1 ?
                          <div className="flex flex-col items-center  p-8 ">
                            <span><CircleX size={50} className="text-red-500"/></span>
                            <h2 className="text-2xl text-red-500">Error occurred</h2>
                            <p className="text-[15px] italic text-gray-800">{errors.transactionerror}</p>
                          </div>
                          :
                           <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-400 text-[11px] uppercase font-bold">
                          <tr>
                            <th className="px-4 py-3">company</th>
                            <th className="px-4 py-3 text-right">Amount</th>
                          </tr>
                        </thead>
                       
                        <tbody className="divide-y divide-gray-50 text-xs">
                          {paginatedt.map((trans, i) => (
                            
                            <tr key={i} onClick={(e)=>transactionmodelopened(e,trans)}
                             className="hover:bg-gray-50
                             transition-all cursor-pointer ">
                              
                              <td className="px-4 py-3">
                                <p className="font-semibold text-[13px] capitalize text-gray-800">{trans.company_name}</p>
                                <p className="text-[13px] text-gray-600">{trans.transcation_id}</p>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <p className="font-bold text-gray-700">{trans.amount}</p>
                                <span className={`text-[11px] ${trans.status=='failed'? 'bg-red-100 text-red-500'
                                :'bg-blue-100  text-blue-600 '} tracking-widest px-2 py-0.5 rounded-full
                                 font-bold uppercase`}>{
                                  trans.status}</span>
                              </td>
                            </tr>
                            
                          ))}

                        </tbody>
                         
                      </table>
                      <div className="flex justify-between pb-3 px-3 ">
                        <span onClick={()=>{
                          if(transactionpage > 1){
                            settransactionpage(transactionpage-1)
                          }
                        }} 
                        disabled={transactionperpage==1}
                        className={`${errors.transactionerror ? 'bg-gray-100 text-gray-50 border-red-500 cursor-not-allowed':'bg-gray-200 cursor-pointer'} p-1 rounded-md `}><ChevronLeft/></span>
                        <span onClick={()=>{
                          if(transactionpage < totalpage){settransactionpage(transactionpage+1)}

                        }} 
                        disabled={transactionpage === totalpage}
                        className={`${errors.transactionerror ? 'bg-gray-100 text-gray-50 border-red-500 cursor-not-allowed':'bg-gray-200 cursor-pointer'} p-1 rounded-md `}><ChevronRight/></span>
                      </div>
                    </div>
                           }
                   
                  </div>

                  <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-5 h-72 overflow-auto">
                    {networkerror&&networkerror.cmpinfnetworkerror.error ?
                    
                    <div className="flex items-center flex-col h-55 justify-center p-6">
                        <span><WifiOff size={50} className="text-red-500"/></span>
                        <p className="text-2xl text-red-500">{networkerror.cmpinfnetworkerror.reason}</p>
                        {networkerror.cmpinfnetworkerror.reason.toLowerCase()==='network error' && 
                         <p className="text-[15px] italic text-gray-500">Network error occured please check your internet connection and try again</p>
                        
                        }
                      </div>
                    :
                    
                    errors.usererror&&errorsize.cmpadminerrorsize===0 ?
                     <div className="flex  justify-center items-center
                      text-red-500 uppercase text-sm">
                        <p>empty state here !!!!!!!!!!</p>
                    </div>:errors.usererror&&errorsize.cmpadminerrorsize==1
                      ? <div className="flex items-center flex-col h-50 justify-center">
                        <span><CircleX size={50} className="text-red-500"/></span>
                        <p className="text-2xl text-red-500">Error occurred</p>
                      <p className="text-[15px] italic text-gray-800">{errors.usererror}</p>

                      </div>:                     
                    
                    <div>

                    <h1 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-6">Company Admins</h1>
                    <div className="space-y-4">
                      {userinfo.map((comp,i) => (
                        <div key={i} className="flex items-center justify-between group cursor-pointe
                        r hover:bg-gray-50 p-2 rounded-xl transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center
                             justify-center text-blue-600 font-bold text-[12px] border border-blue-200">{comp.admin_name
                             .split(" ").map(word=>word[0]).join("").toUpperCase()}</div>
                            <div>
                              <p className="text-xs font-bold text-gray-800 group-hover:text-blue-600 
                              transition-colors capitalize">{comp.admin_name}</p>
                              <p className="text-[14px] text-gray-700">{comp.phone}</p>
                            </div>
                          </div>
                          <ChevronRight onClick={(e)=>openuserinformodel(e,comp)} className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-all transform group-hover:translate-x-1" />
                        </div>
                      ))}
                    </div>
                    </div>
          }
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePage === 'adminlist' && <AdminList />}
          {activePage === 'companies' && <Companies />}
          {activePage === 'Loan' && <Loan />}
          {activePage === 'agents' && <Agents />}

          {activePage === 'setting' && <Setting />}
        </div>

  {isopentransactionmodel && selectedTransaction && (
<Transactionlog_model
onClose={closemodel}
transactionId={selectedTransaction.transactionId}
amount={selectedTransaction.amount}
status={selectedTransaction.status}
companyname={selectedTransaction.companyname
}
date={formatDate(selectedTransaction.date)}
/>
)}
        {isopenusermodel && <User_info_model status={selecteduser.status} 
         userid={selecteduser.admin_id} phonnumber={selecteduser.phone} companyname={selecteduser.cmpname}
         create_at={formatDate(selecteduser.created_at)}
        onClose={closeusermodel} />}

        
      </div>
       
    </div>
  );
};

export default Dashboard;