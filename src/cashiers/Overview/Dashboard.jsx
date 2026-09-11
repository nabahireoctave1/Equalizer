import  { useState } from "react";
import AddPayable from "./Add_Payables";
import AddReceivable from "./Add_recievable";
import Demand from "./Demand";
import Support from "./Support";
import Defaulters from "../../client/Defaulter";
import UnpaidComponent from "../Unpaid"; 
import Old_client from "../../client/old_client";
import Other_loan from "../../client/Other_Loan";
import Stock from "./Security";
import Search from "./User_Search";
import { Wallet, X,ClipboardList,ChartNoAxesCombined,CalendarClock,Target, Users, UserCheck, UserRoundX, CircleAlert } from 'lucide-react';
import { useTranslation } from 'react-i18next';


const l = {
  logo: "Cashier Hub",
  overview: "Office Overview",
  payables: "Sent",
  Stock : "Stock",
  receivables: "Received",
  cash: "Demand",
  Old_client: "Over Loaned",
  support: "Support",
  regUsers: "Registered Users",
  paidUsers: "Paid Users",
  unpaidUsers: "Unpaid Users",
  defaulters: "Defaulters",
  loanMatrix: "External Loan Matrix",
  loanSub: "Active profiles cross-borrowed elsewhere",
  totalCross: "Total Cross-Loaned Users",
  customers: "Customers",
  Search: "Search User"
};

import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
   AreaChart,
  Area
} from "recharts";
import Equalizer from "../../Equalizer";


const data = [
  {
    date: "2026-06-01",
    overdueAmount: 120000,
    loanedAmount: 500000,
    collectedAmount: 300000,
  },
  {
    date: "2026-06-02",
    overdueAmount: 80000,
    loanedAmount: 450000,
    collectedAmount: 280000,
  },
  {
    date: "2026-06-03",
    overdueAmount: 150000,
    loanedAmount: 600000,
    collectedAmount: 350000,
  },
  {
    date: "2026-06-04",
    overdueAmount: 90000,
    loanedAmount: 520000,
    collectedAmount: 310000,
  },
  {
    date: "2026-06-05",
    overdueAmount: 110000,
    loanedAmount: 550000,
    collectedAmount: 330000,
  },
  {
    date: "2026-06-06",
    overdueAmount: 70000,
    loanedAmount: 480000,
    collectedAmount: 290000,
  },
  {
    date: "2026-06-07",
    overdueAmount: 130000,
    loanedAmount: 620000,
    collectedAmount: 400000,
  },
];



const payinfo= [
  { date: "2026-06-01", paymentAmount: 125000 },
  { date: "2026-06-02", paymentAmount: 98000 },
  { date: "2026-06-03", paymentAmount: 145000 },
  { date: "2026-06-04", paymentAmount: 87000 },
  { date: "2026-06-05", paymentAmount: 162000 },
  { date: "2026-06-06", paymentAmount: 118000 },
  { date: "2026-06-07", paymentAmount: 190000 },
];



const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-md w-full max-h-[95vh] overflow-y-auto shadow-md border border-slate-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white z-10">
          <h3 className="text-2xl font-bold text-gray-700 uppercase tracking-tight">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-full text-white bg-red-500 cursor-pointer transition-colors">
            <X strokeWidth={3} className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const Dashboard = () => {


const {t} = useTranslation();


  const [activeTab, setActiveTab] = useState("Office Overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUnpaidOpen, setIsUnpaidOpen] = useState(false);
  const [isDefaultersOpen, setIsDefaultersOpen] = useState(false);
  const [showLoanedTable, setShowLoanedTable] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const navItems = [
    { id: "Office Overview", label: l.overview },
    { id: "Add Payables", label: l.payables },
    { id: "Add Receivable", label: l.receivables },
    { id: "Cash on Hand", label: l.cash },
    { id: "Old_client", label: l.Old_client },
    { id: "Support", label: l.support },
    { id: "Stock", label: l.Stock },
    { id: "Search", label: l.Search }
  ];




  const handleViewRecordClick = (recordData) => {
    setSelectedRecord(recordData);
    setIsRecordModalOpen(true);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case "Add Payables": return <AddPayable />;
      case "Add Receivable": return <AddReceivable />;
      case "Cash on Hand": return <Demand />;
      case "Old_client": return <Old_client />;
      case "Support": return <Support />;
      case "Search": return <Search />;
      case "Stock": return <Stock />;
      case "Office Overview":
      default: return renderOverviewGrid();
    }
  };

  const renderOverviewGrid = () => {
    const dynamicLoanedUsers = [
      { id: 1, name: "webale precious", dayPayment: "1,200,000", amountGiven: "240,000,000", balance: "12,000,000", closingDate: "4/9/2026", phone: "078945655", location: "Gassan", type: "2" },
      { id: 2, name: "Nsubuga Derrick", dayPayment: "800,000", amountGiven: "150,000,000", balance: "8,500,000", closingDate: "12/9/2026", phone: "075211442", location: "Kabalagala", type: "3" },
      { id: 3, name: "Nankya Harriet", dayPayment: "500,000", amountGiven: "90,000,000", balance: "3,200,000", closingDate: "18/9/2026", phone: "070198845", location: "Makindye", type: "4" }
    ];

    return (
      <div className="space-y-3 animate-fadeIn p-2 bg-gray-50">
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 
   p-3 border border-gray-100 rounded-md mt-5 bg-white  transition-all">
  <div className="bg-white p-5 rounded-md border-r border-gray-100 cursor-pointer">
    <span className="flex gap-2 items-center">
      <span className="bg-blue-50 p-2  text-blue-600 rounded-full">
      <ClipboardList size={20}/>
      </span>
  <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
      {t("demandSummary")}
    </p>
    </span>
  

    <p className="text-[14px] font-semibold text-slate-800 mt-3 flex items-center justify-between gap-2">
      {t("totalDemand")} <span className="text-green-600 text-[18px]">35</span>
    </p>

    <p className="text-[14px] font-semibold text-slate-900 mt-2 flex items-center justify-between gap-2">
      {t("approvedDemand")} <span className="text-blue-500 text-[18px]">15</span>
    </p>

    <p className="text-[14px] font-semibold text-slate-900 mt-2 flex items-center justify-between gap-2">
      {t("pendingDemand")} <span className="text-yellow-500 text-[18px]">20</span>
    </p>
  </div>


  <div className="bg-white p-5 rounded-md cursor-pointer border-r border-gray-100">
    <p className="text-xs font-bold flex  gap-2 items-center uppercase tracking-wider text-slate-800">
      <span className="bg-green-50 text-green-600 p-2 rounded-full"> <ChartNoAxesCombined size={20}/> </span>
      <span>  {t("loanPerformance")} </span>
    </p>

    <p className="text-[14px] font-semibold flex items-center justify-between text-slate-900 mt-3">
      {t("loaned")} <span className="font-semibold text-[18px]">10 M</span>
    </p>

    <p className="text-[14px] font-semibold flex justify-between items-center text-slate-900 mt-2">
      {t("collected")} <span className="font-semibold text-[18px]">900 K</span>
    </p>

    <p className="text-[14px] font-semibold flex  items-center justify-between text-slate-900 mt-2">
     {t("outstanding")} <span className="font-semibold text-[18px]">150 M</span>
    </p>
  </div>


  <div className="bg-white p-5 rounded-md border-r border-gray-100 cursor-pointer">
    <p className="text-xs font-bold flex  gap-2 items-center uppercase tracking-wider text-slate-800">
      <span className="bg-yellow-100 p-2 rounded-full text-yellow-500">
        <CalendarClock size={20}/></span>
      <span> {t("paymentDueToday")}</span>
    </p>

    <p className="text-[14px] font-semibold flex items-center justify-between text-slate-900 mt-3">
      {t("clientsDueToday")} <p className="text-[18px] font-semibold">12</p>
    </p>

    <p className="text-[14px] font-semibold text-slate-900 mt-2 flex items-center justify-between">
      {t("expectedCollection")} <p className="font-semibold text-[18px] whitespace-nowrap">500 K</p>
    </p>

    <p className="text-[14px] font-semibold text-slate-900 flex  items-center justify-between mt-2">
      {t("paidToday")} <p className="text-[18px] font-semibold">8</p>
    </p>
  </div>


  <div className="bg-white p-5 cursor-pointer">
    <p className="text-xs  flex  items-center gap-2 font-bold uppercase tracking-wider text-slate-800">
      <span className="bg-violet-100 p-2 rounded-full"><Target size={20}/></span>
      <span> {t("collectionTarget")}</span>
    </p>

    <div className="flex items-center justify-between mt-4">
      <p className="text-lg font-bold text-slate-900">
        500K / 800K
      </p>

      <p className="text-[14px] font-semibold text-gray-800">
        65%
      </p>
    </div>

    <div className="mt-3 w-full h-2 bg-slate-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
        style={{width:"65%"}}
      />
    </div>

    <p className="text-sm text-slate-700 mt-2">
      300K {t("remaining")}
    </p>
  </div>
  </div>


  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">

    <div className="bg-white p-6 rounded-sm cursor-pointer border
     border-gray-100  transition-all hover:-translate-y-0.5">
      <p className="text-center text-xs flex   gap-2 items-center 
      font-semibold uppercase tracking-wider text-slate-700">
        <span className="bg-blue-500 p-2 text-white rounded-full">
          <Users/>
        </span>
        <span>
        {t("registeredUsers")}
          
        </span>
        
      </p>

      <p className="flex items-center justify-center text-3xl font-extrabold text-slate-800 mt-2">
        290
      </p>
      
    </div>


    <div className="bg-white p-5 rounded-sm cursor-pointer border border-gray-100 transition-all hover:-translate-y-0.5">
      <p className="text-center text-xs flex gap-2 items-center font-semibold uppercase tracking-wider text-slate-700">
       <span className="bg-green-500 p-2 rounded-full text-white"><UserCheck/></span>
       <span>
        
        {t("paidUsers")}
      
       </span>
      </p>
      <p className="flex items-center justify-center text-3xl font-extrabold text-sky-500 mt-2">
        59
      </p>
    </div>


    <div className="bg-white p-5 rounded-sm cursor-pointer border border-gray-100  transition-all hover:-translate-y-0.5">
      <p className="text-center text-xs flex items-center gap-2 font-semibold uppercase tracking-wider text-slate-700">
        <span className="bg-orange-200 p-2 rounded-full text-orange-600"> <UserRoundX/></span>
        <span>{t("unpaidUsers")}</span>
      </p>

      <p className="flex items-center justify-center text-3xl font-extrabold text-amber-500 mt-2">
        25
      </p>

      <button
        onClick={() => setIsUnpaidOpen(true)}
        className="w-full text-xs font-bold text-blue-600 flex justify-center p-1.5 mt-2 cursor-pointer"
      >
        {t("viewUnpaid")}
      </button>
    </div>


    <div className="bg-white p-5 rounded-sm cursor-pointer border border-gray-100 
     transition-all hover:-translate-y-0.5">
      <p className="text-center text-xs flex items-center gap-2  font-semibold uppercase tracking-wider text-slate-700">
        <span className="p-2 rounded-full bg-red-600"><CircleAlert className="text-white"/></span>
        <span> {t("defaulters")}</span>
      </p>

      <p className="flex items-center justify-center text-3xl font-extrabold text-red-500 mt-2">
        12
      </p>

      <button
        onClick={() => setIsDefaultersOpen(true)}
        className="w-full text-xs font-bold text-red-600 flex justify-center p-1.5 mt-2 cursor-pointer"
      >
        {t("viewDefaulters")}
      </button>
    </div>

  </div>


        <div className="grid grid-cols-1  lg:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-md border border-gray-100  lg:col-span-2
           flex flex-col justify-between min-h-55">
            <span className="text-center py-1 text-[15px] uppercase font-medium text-gray-800">
              {t("smsSystem")}
               <span className="text-blue-500 font-bold"></span>
            </span>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">

  <div className="bg-gray-50 p-6 rounded-sm border border-gray-100">
    <h3 className="text-sm uppercase font-bold text-gry-800">{t("usedMessages")}</h3>
    <div className="bg-white p-4 rounded-lg border border-slate-200 text-center mt-4">
      <span className="text-[25px] font-bold text-blue-500">6000 SMS</span>
    </div>
  </div>

  <div className="bg-gray-50 p-6 rounded-sm border border-gray-100">
    <h3 className="text-sm font-bold uppercase text-gray-800">{t("leftMessages")}</h3>
    <div className="bg-white p-4 rounded-lg border border-slate-200 text-center mt-4">
      <span className="text-[25px] font-bold text-green-600">5000 SMS</span>
    </div>
  </div>

</div>
          </div>

          <div className="bg-white p-6 rounded-md border border-slate-200  flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">{t("loanMatrix")}</h3>
              <p className="text-sm text-gray-500 mt-0.5 italic">{t("loanSub")}</p>
            </div>
            <div className="bg-sky-50 p-4 rounded-lg border border-sky-100 text-center my-2">
              <span className="text-[13px] text-gray-600 font-medium block">{t("totalCrossLoaned")}</span>
              <span className="text-2xl font-black text-sky-600 mt-0.5 block">19 {t("clients")}</span>
            </div>
            <button onClick={() => setShowLoanedTable(!showLoanedTable)} 
            className="text-xs font-bold text-sky-600 hover:cursor-pointer">
              {showLoanedTable ? t("hideLedger") : t("viewMore")}
            </button>
          </div>
        </div>

        {showLoanedTable && (
          <div className="bg-white p-6 rounded-md border border-gray-100  animate-fadeIn overflow-hidden">
            <h3 className="text-xl uppercase font-extrabold text-gray-800 mb-4">{t("loanedUsers")}</h3>
            <div className="overflow-x-auto rounded-md border border-gray-100">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase">
                  <tr>
                    <th className="p-4">{t("no")}</th>
                    <th className="p-4">{t("clients")}</th>
                    <th className="p-4">{t("dayPayments")}</th>
                    <th className="p-4">{t("balance")}</th>
                    <th className="p-4">{t("location")}</th>
                    <th className="p-4 text-center">{t("action")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-slate-600">
                  {dynamicLoanedUsers.map((user, idx) => (
                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">{idx + 1}</td>
                      <td className="p-4 font-bold text-slate-900">{user.name}</td>
                      <td className="p-4">{user.dayPayment}</td>
                      <td className="p-4 font-medium text-emerald-600">{user.balance}</td>
                      <td className="p-4">{user.location}</td>
                      <td className="p-4 text-center">
                        <button onClick={() => handleViewRecordClick(user)}
                         className="px-3 py-1 text-[13px] font-medium bg-blue-500
                          text-white rounded-sm border
                           border-slate-200 hover:bg-blue-700 cursor-pointer hover:text-white transition-all">
                          {t("viewRecord")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="bg-white p-4 rounded-md text-sm  ">
          <h3 className="text-3xl font-extrabold uppercase text-center text-gray-700">{t("analytics")}</h3>
           <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="min-h-97.5 p-2 shadow rounded-md my-6">
            <h2 className="capitalize pb-6 font-extrabold text-2xl  text-gray-700">{t("loanAnalysis")}</h2>
           
           <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" />
        <YAxis  tickFormatter={(v)=>{
          if(v>=1000) {
            return v/1000 +'K'
            
          }

          if(v>=1000000){
            return v/1000000 +'M'

          }

          return v
        }}/>

        <Tooltip />
        <Legend />

        <Bar dataKey="loanedAmount"  maxBarSize={30} radius={[2,2,0,0]} fill="#3B82F6" name={t("loaned")} />
        <Bar dataKey="collectedAmount"  maxBarSize={30} radius={[2,2,0,0]} fill="#10B981" name={t("collected")} />
        <Bar dataKey="overdueAmount"  maxBarSize={30} radius={[2,2,0,0]} fill="#EF4444" name={t("overdue")} />
      </BarChart>
    </ResponsiveContainer>

            
               
           </div>

           <div className="min-h-97.5 p-2 shadow rounded-md my-6 ">
            <h2 className="font-extrabold pb-6 text-2xl uppercase text-gray-800">{t("repaidAmount")}</h2>

             <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={payinfo}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis   tickFormatter={(v)=>{
           if(v>=1000) {
            return v/1000 +'K'
            
          }

          if(v>=1000000){
            return v/1000000 +'M'

          }

          return v
        }}/>
        <Tooltip />

        <Area
          type="monotone"
          dataKey="paymentAmount"
          name="Payments"
          stroke="#2563eb"
          fill="#60A5FA"
          
        />
      </AreaChart>
    </ResponsiveContainer>
           </div>
           </div>
             
      <footer className="max-w-7xl border-t border-gray-100/50  text-center py-1 mt-8 ">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-gray-500 hover:text-blue-600 transition-colors cursor-pointer tracking-wide w-full"
        >
          <div className="w-full text-center  text-gray-700 cursor-pointer pt-4 uppercase">
            &copy; 2026 Equalizer IT Problem Solvers : 256792135699 {t("call")}. All Rights Reserved. {t("clickView")}.
          </div>
        </button>
      </footer>
          </div>
          
      {isModalOpen && (
        <div 
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center
           p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white w-full max-w-full rounded-sm shadow-2xl overflow-hidden p-6 max-h-[90vh] overflow-y-auto transform transition-all"
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="text-lg font-extrabold text-gray-900 uppercase">{t("equalizerAnalysis")}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-800 hover:text-gray-600 text-2xl font-light leading-none
                 p-1 cursor-pointer"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            
            <div>
              <Equalizer />
            </div>
          </div>
        </div>
      )}
        </div>
    );
  };

  return (
    <div className='min-h-screen w-full font-sans flex flex-col bg-slate-50'>
      <header className="w-full bg-gray-100 border-b border-slate-200 sticky top-0 z-40 px-4 py-3">
        <div className="max-w-full mx-auto flex items-center justify-between">
          <div className="font-extrabold text-lg text-sky-500 flex items-center gap-2">
            <span className="p-1.5 bg-sky-100 text-sky-600 rounded-md text-sm"><Wallet/></span> 
            <h2 className="uppercase">{l.logo}</h2> 
          </div>
          
          <nav className="hidden xl:flex gap-1 p-2 ">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-5 cursor-pointer py-2 rounded-sm outline-none text-[11px] uppercase font-bold transition-all ${
                  activeTab === item.id ? "bg-sky-500 text-white shadow-md shadow-sky-100" :
                   "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="xl:hidden p-2 text-slate-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="xl:hidden mt-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => { setActiveTab(item.id);
               setIsMobileMenuOpen(false); }} className={`w-full text-left px-4 py-3
                rounded-full text-xs font-bold ${activeTab === item.id ? "bg-sky-500 text-white" : "text-slate-600"}`}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="">
       <div className="w-full">{renderActiveView()}</div>
      </main>

      <Modal isOpen={isUnpaidOpen}
       onClose={() => setIsUnpaidOpen(false)} title={l.unpaidUsers}>
        <UnpaidComponent />
      </Modal>
      <Modal isOpen={isDefaultersOpen} onClose={() => setIsDefaultersOpen(false)} title={l.defaulters}>
        <Defaulters />
      </Modal>
      <Modal isOpen={isRecordModalOpen} onClose={() => { setIsRecordModalOpen(false); setSelectedRecord(null); }}
       title={`Profile: ${selectedRecord?.name || ""}`}>
        <Other_loan record={selectedRecord} />
      </Modal>
    </div>   
  );
};

export default Dashboard;

