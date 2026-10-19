import  { useEffect, useState } from 'react';
import Paying from '../client/Paying';
import Credit_Record from '../client/Client_record';
import {useTranslation} from 'react-i18next';
import { 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  CreditCard, 
  BookOpen, 
  X,
  AlertCircle,
  Clock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import api from '../api';



export default function Unpaid() {
  const {t} = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
   const [debounceSearch,setDebounceSearch]=useState(null);
    const [selectedUser, setSelectedUser] = useState({
      clientId:null,
      clientName:null,
      LoanId:null
    });
  const [isPayingModalOpen, setIsPayingModalOpen] = useState(false);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false); 
  const [loading,setLoading]=useState(null);
  const [messageKey,setmessageKey]=useState(null);
  const [size,setsize]=useState(null);
  const [Data,setData]=useState([]);
  const HistoryPerpage=20;
  const [currentPage,setCurrentPage]=useState(1);
  const [Totalpage,setTotalPage]=useState(0);
  const [totalRecord,setTotalRecord]=useState(null);
 
  const FetchUnpaidHistory= async()=>{
    setData([]);
    try{
      const  res= await api.get(`/unpaid-history?limit=${HistoryPerpage}&page=${currentPage}&search=${encodeURIComponent(searchTerm)}`);
      setData(res?.data?.response)
      setTotalPage(res?.data?.totalPages);
      setTotalRecord(res?.data?.TotalRecord)
   

    }
    catch(err){

    }
  }





  useEffect(()=>{
 FetchUnpaidHistory();

  },[currentPage,debounceSearch])

  useEffect(()=>{
  
     const Timer= setTimeout(() => {
       setDebounceSearch(searchTerm)
     }, 1000);

     return ()=>clearTimeout(Timer)

  },[searchTerm])





  const openPayingModal = (clientId,client_name,LoanId) => {
       setSelectedUser({
      clientId:clientId,
      clientName:client_name,
      LoanId:LoanId
    })
    setIsPayingModalOpen(true);
  };

  const openCreditModal = (clientId,client_name,LoanId) => {
    setSelectedUser({
      clientId:clientId,
      clientName:client_name,
      LoanId:LoanId
    })
    setIsCreditModalOpen(true);
  };

  const closeModals = () => {
    setIsPayingModalOpen(false);
    setIsCreditModalOpen(false);
  };


  const HandleNext= ()=>{
    if(currentPage<Totalpage) setCurrentPage(currentPage+1);
  }

  const HandlePrevious= ()=>{
  if(currentPage>1) setCurrentPage(currentPage-1);

  }




  return (
    <div className="bg-gray-50  min-h-screen font-sans antialiased">
      <div className="max-w-7xl">
        
        <div className="sticky top-0 z-50  flex flex-col sm:flex-row justify-between
       mb-8 gap-4 bg-white p-6 rounded-md border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-blue-600">{t("titleUnpaid")}</h1>
            <p className="text-sm text-slate-500 mt-1">{t("subtitleunpaid")}</p>
          </div>
             <div className="relative w-full lg:w-md">
              <span className='absolute top-3.5 px-2'>
              <Search size={18} className="text-slate-400 " />

              </span>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border border-slate-200 bg-white 
              py-3 pl-11 pr-4 text-sm placeholder-slate-400 focus:border-blue-500 
              focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 transition-all placeholder:capitalize "
              placeholder='Search by Loan Id OR borrower names'
            />
          </div>
        
        </div>

      


        <div className="w-full overflow-x-auto 
        rounded-sm border border-gray-100  bg-white p-4 ">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6 whitespace-nowrap">{t("No")}</th>
                <th className="py-4 px-6 whitespace-nowrap">{t("LoanId")}</th>
               
                <th className="py-4 px-6 whitespace-nowrap">{t("names")}</th>
                <th className="py-4 px-6 whitespace-nowrap">{t("contactDetails")}</th>
                <th className="py-4 px-6 text-center whitespace-nowrap">{t("unpaidWindow")}</th>
                <th className="py-4 px-6 text-center whitespace-nowrap">{t("Partial paid window")}</th>
                <th className="py-4 px-6 text-right whitespace-nowrap">{t("outstandingBalance")}</th>
                <th className="py-4 px-6 whitespace-nowrap">{t("location")}</th>
                <th className="py-4 px-6 text-center whitespace-nowrap">{t("actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[15px]">
              {Data?.map((user,_idx)=>(
                <tr key={_idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6  text-gray-800 whitespace-nowrap">
                      {(currentPage-1)*HistoryPerpage+_idx+1}
                    </td>    
                    <td className="py-4 px-6 text-gray-800 whitespace-nowrap">
                      {user.loan_id}
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-800 whitespace-nowrap">
                      {user.client_name}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex flex-col text-[15px] space-y-1">
                        <span className="text-gray-800  flex items-center gap-2">
                          <Phone size={12} className="text-slate-800" />{user.phone}
                        </span>
                     
                      </div>
                    </td>
                    <td className="py-4 px-3 flex  gap-1 justify-center items-center 
                    text-[15px]
                     text-base whitespace-nowrap">
                      <span className='bg-red-50 px-5 py-1  text-red-500 
                       border border-red-200 rounded-full animate-pulse flex gap-1 items-center justify-center'>
                        <span>
                          <AlertCircle size={15}/>
                        </span>
                        <span> 
                          Overdue  {user.unPaidwindowCount} 
                      {''} {t("days")}

                        </span>
                   
                      </span>
                   
                    </td>
                      <td className="py-4 px-6 text-gray-700 whitespace-nowrap">
                       <span className='flex  gap-1 items-center capitalize bg-yellow-50  p-1
                        border rounded-full px-3 border-yellow-500 text-yellow-500 animate-pulse'>
                        <Clock size={14}/>
                        {user.partialPaymentCount} Partial paid
                       </span>
                    </td>
                
                    <td className="py-4 px-6 text-right text-[18px]  font-semibold text-rose-600
                     text-base whitespace-nowrap">
                      UG {Number(user.Balance).toFixed(2)}
                                        </td>
                    <td className="py-4 px-6 text-gray-700 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 font-medium text-sm">
                        <MapPin size={14} className="text-slate-400" /> {user.client_address}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openPayingModal(user.clientId,user.client_name,user.LoanId)} className="bg-green-600 
                        cursor-pointer text-white font-semibold
                         px-4 py-2 rounded-sm text-xs transition-all 
                         shadow-sm flex items-center gap-2 active:scale-95">
                          <CreditCard size={14} /> {t("paying")}
                        </button>
                        <button onClick={() => openCreditModal(user.clientId,user.client_name,user.LoanId)} className="text-gray-700 
                        cursor-pointer hover:text-blue-600 px-3 py-2 rounded-sm
                         hover:bg-slate-100 transition flex items-center
                          gap-1.5 font-semibold text-xs border border-slate-200 active:scale-95">
                          <BookOpen size={14} /> {t("records")}
                        </button>
                      </div>
                    </td>
                  </tr>

              ))}
                  
            </tbody>
          </table>
        </div>


        {isPayingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center
           bg-black/60 backdrop-blur-sm p-4">
               <button 
                onClick={closeModals}
                className="absolute top-5 right-2 z-60 p-2  
                 text-red-600  cursor-pointer
                   "
              >
                <X size={20} />
              </button>
            <div className="relative w-full max-w-lg rounded-md overflow-visible">
           
              
                 <Paying client_name={selectedUser?.clientName} clientId={selectedUser.clientId} LoanId={selectedUser.LoanId} />
            </div>
          </div>
        )}

        {isCreditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-7xl h-[80vh] rounded-md shadow-2xl relative flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 uppercase">{t("ledgerHistory")}</h2>
                  <p className="text-lg font-bold capitalize text-gray-800">{selectedUser?.clientName}</p>
                </div>
                <button onClick={closeModals} className="p-2 bg-red-500 rounded-full transition-colors">
                  <X size={20} className="text-white cursor-pointer" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                <Credit_Record selectedUser={selectedUser.clientId}/>
              </div>
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                <button onClick={closeModals} className="px-6 py-2 cursor-pointer
                 bg-red-500 text-white text-xs font-bold rounded-sm active:scale-95 transition-all">
                  {t("closeWindow")}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className='flex justify-between py-2 px-3 bg-white'>
          <div>
        <button 
         disabled={currentPage===1}
        onClick={HandlePrevious} className='bg-gray-200 p-1.5 rounded-sm text-gray-700 disabled:cursor-not-allowed cursor-pointer disabled:opacity-50'><ChevronLeft/></button>
          </div>
           <div>
             <p className='text-[15px] text-gray-700 italic'>showing : {(currentPage-1)*HistoryPerpage+1} 
              {""} to: {Math.min(currentPage*HistoryPerpage,totalRecord)} of {totalRecord} account{totalRecord>1&&'s'}</p>
              </div> 
          <div>
             <button
              disabled={currentPage===Totalpage}
             onClick={HandleNext} className='bg-gray-200 p-1.5 rounded-sm text-gray-700 disabled:cursor-not-allowed cursor-pointer disabled:opacity-50'><ChevronRight/></button>
          </div>
      </div>
      </div>
     
    </div>
  );
}

