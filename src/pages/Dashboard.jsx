import {
  Bell, MenuIcon, Settings, MonitorCheck, LogOut, LayoutDashboard,
  Users, CircleCheck, BarChart3, Banknote, Building2, Edit2, Trash2, 
  ChevronRight, ChevronLeft, TrendingDown, CreditCard, DollarSign, PieChart, X,
  User2
} from "lucide-react";

import { useState } from "react";
import AdminList from "./AdminList";
import Companies from "./Companies";
import Loan from "./Loan";
import Setting from "./Settings";
import Transactionlog_model from "./Transactionlog_model";
import User_info_model from "./User_info_model";
import Agents from "./Agents";
import Notification from "./Notification";

let Dashboard = () => {
  const [activePage, setactivepage] = useState('overview');
  const [isopentransactionmodel, setisopened] = useState(false);
  const [isopenusermodel, setopenusermodel] = useState(false);
  const [issidebaropen, setissidebaropen] = useState(false);
  const  [isnotificationopen,setisnotificatonopen]=useState(false)
   

  const transactionmodelopened = (e) => { e.preventDefault(); setisopened(true); };
  const openuserinformodel = (e) => { e.preventDefault(); setopenusermodel(true); };
  const opennotification=(e)=>{e.preventDefault();setisnotificatonopen(true)}
  const closemodel = () => setisopened(false);
  const closeusermodel = () => setopenusermodel(false);
  const closenotificationmodel= ()=>setisnotificatonopen(false)

  const navigateTo = (page) => {
    setactivepage(page);
    setissidebaropen(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      
      <header className="flex justify-between bg-gradient-to-r from-blue-300 to-blue-600 p-4 sticky top-0 z-50 shrink-0 shadow-md">
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
                className={`flex p-3 gap-3 text-sm  capitalize font-semibold rounded-sm  text-gray-700   cursor-pointer transition-colors `}
              >
                <LayoutDashboard className="w-5" />overview
              </nav>
              <nav 
                onClick={() => navigateTo('adminlist')} 
                className={`flex p-3 gap-3 text-sm capitalize font-semibold rounded-xs text-gray-700 cursor-pointer transition-colors `}
              >
                <MonitorCheck className="w-5" /> admin
              </nav>
              <nav className="flex p-3 gap-3 capitalize text-sm font-semibold text-gray-700 rounded-xs cursor-pointer transition-colors">
                <BarChart3 className="w-5" /> report
              </nav>
              <nav 
                onClick={() => navigateTo('Loan')} 
                className={`flex p-3 gap-3 text-sm capitalize font-semibold rounded-xs text-gray-700 cursor-pointer transition-color'}`}
              >
                <Banknote className="w-5" /> loan
              </nav>
              <nav 
                onClick={() => navigateTo('companies')} 
                className={`flex p-3 gap-3 text-sm capitalize font-semibold rounded-xs text-gray-700 cursor-pointer transition-colors `}
              >
                <Building2 className="w-5" /> companies
              </nav>
               <nav 
                onClick={() => navigateTo('agents')} 
                className={`flex p-3 gap-3 text-sm capitalize font-semibold rounded-xs text-gray-700 cursor-pointer transition-colors `}
              >
                <User2 className="w-5" /> agents
              </nav>
              <nav 
                onClick={() => navigateTo('setting')} 
                className={`flex p-3 gap-3 text-sm capitalize font-semibold rounded-xs text-gray-700 cursor-pointer transition-colors `}
              >
                <Settings className="w-5" /> setting
              </nav>
            </div>

            <div className="mt-auto">
              <nav className="flex p-3 gap-3 uppercase text-sm font-semibold text-red-500 cursor-pointer">
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
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center">
                        <div className="p-1.5 bg-green-50 rounded-lg"><Users className="text-green-600 w-4 h-4" /></div>
                        <CircleCheck className="text-green-500 w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Total Users</p>
                        <p className="text-lg font-black text-gray-800">1,450</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center">
                        <div className="p-1.5 bg-red-50 rounded-lg"><TrendingDown className="text-red-600 w-4 h-4" /></div>
                        <span className="text-[8px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold">High</span>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Default Rate</p>
                        <p className="text-lg font-black text-gray-800">8.4%</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center">
                        <div className="p-1.5 bg-blue-50 rounded-lg"><Users className="text-blue-600 w-4 h-4" /></div>
                        <CircleCheck className="text-green-600 w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">logged in users</p>
                        <p className="text-lg font-black text-gray-800">842</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center">
                        <div className="p-1.5 bg-purple-50 rounded-lg"><CreditCard className="text-purple-600 w-4 h-4" /></div>
                        <span className="text-[8px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full font-bold">Monthly</span>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Total Payments</p>
                        <p className="text-lg font-black text-gray-800">$3,120</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center">
                        <div className="p-1.5 bg-teal-50 rounded-lg"><Building2 className="text-teal-600 w-4 h-4" /></div>
                        <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Total Company</p>
                        <p className="text-lg font-black text-gray-800">1,204</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-28 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center">
                        <div className="p-1.5 bg-amber-50 rounded-lg"><DollarSign className="text-amber-600 w-4 h-4" /></div>
                        <PieChart className="text-amber-400 w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-[9px] uppercase font-bold tracking-widest">Total Revenue</p>
                        <p className="text-lg font-black text-gray-800">$124.3k</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-1.5 rounded-lg"><Users className="w-4 h-4 text-white" /></div>
                        <h2 className="font-bold text-gray-800 uppercase tracking-wide text-sm">Cashier Management</h2>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-1.5 hover:bg-gray-100 rounded border border-gray-200 transition-colors"><ChevronLeft className="w-4 h-4 text-gray-500" /></button>
                        <button className="p-1.5 hover:bg-gray-100 rounded border border-gray-200 transition-colors"><ChevronRight className="w-4 h-4 text-gray-500" /></button>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto min-h-70">
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
                          {[
                            { id: 'EA00123', cid: 'AKEA001', name: 'Bugingo Blaise' },
                            { id: 'EA00124', cid: 'AKEA004', name: 'Mutesi Jolly' },
                            { id: 'EA00125', cid: 'AKEA009', name: 'Karasira Eric' }
                          ].map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                              <td className="px-6 py-4 font-semibold text-blue-600 whitespace-nowrap">{item.id}</td>
                              <td className="px-6 py-4 text-gray-500 font-mono text-xs whitespace-nowrap">{item.cid}</td>
                              <td className="px-6 py-4 text-gray-800 font-medium whitespace-nowrap">{item.name}</td>
                              <td className="px-6 py-4 text-center">
                                <div className="flex justify-center gap-2">
                                  <button className="text-[10px] font-bold text-amber-600 border border-amber-200 px-2 py-1 rounded bg-amber-50">Suspend</button>
                                  <button className="p-1.5 text-gray-400 hover:text-blue-600"><Edit2 className="w-4 h-4" /></button>
                                  <button className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/3 space-y-6 min-h-50">
                  <div className="bg-white shadow-sm rounded-xl border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-50 flex justify-between items-center">
                      <h1 className="font-bold text-gray-800 text-sm uppercase tracking-wide">Transaction Logs</h1>
                      <BarChart3 className="w-4 text-gray-400" />
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase font-bold">
                          <tr>
                            <th className="px-4 py-3">User</th>
                            <th className="px-4 py-3 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs">
                          {['TRX-001', 'TRX-002', 'TRX-003'].map((id, i) => (
                            <tr key={id} onClick={transactionmodelopened} className="hover:bg-gray-50 transition-all cursor-pointer">
                              <td className="px-4 py-3">
                                <p className="font-bold text-gray-800">User {i + 1}</p>
                                <p className="text-[12px] text-gray-600">{id}</p>
                              </td>
                              <td className="px-4 py-3 text-right">
                                <p className="font-bold text-gray-700">${(i + 1) * 400}</p>
                                <span className="text-[8px] bg-blue-100 tracking-widest text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase">Done</span>
                              </td>
                            </tr>
                            
                          ))}

                        </tbody>
                      </table>
                      <div className="flex justify-between pb-3 px-3">
                        <span className="bg-gray-200 p-1 rounded-md cursor-pointer"><ChevronLeft/></span>
                        <span className="bg-gray-200 p-1 rounded-md cursor-pointer"><ChevronRight/></span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-5 min-h-50 overflow-auto">
                    <h1 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-6">Company Admins</h1>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-[10px] border border-blue-200">UA</div>
                            <div>
                              <p className="text-xs font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Admin User {i}</p>
                              <p className="text-[12px] text-gray-700">+250 788 000 00{i}</p>
                            </div>
                          </div>
                          <ChevronRight onClick={openuserinformodel} className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-all transform group-hover:translate-x-1" />
                        </div>
                      ))}
                    </div>
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

        {isopentransactionmodel && <Transactionlog_model onClose={closemodel} />}
        {isopenusermodel && <User_info_model onClose={closeusermodel} />}
      </div>
    </div>
  );
};

export default Dashboard;