





import { AlertCircle, ChevronLeft, ChevronRight, CircleAlert, Eye, Search, X } from "lucide-react";
import LoanApplicationPortal from "../cashiers/LoanApplicationPortal";
import  { useEffect, useState } from "react";
import api from "../api";

const Old_client = () => {
  const [Data,setdata]=useState([])
  const [SelectedLoan,setSelectedLoan]=useState({});
  const [viewLoan,setViewloan]=useState(null);
  const [viewschedules,setViewschedules]=useState(null);
  const [name,setname]=useState(null);
  const [SelectedLoanSchedule,setSelectedLoanSchedule]=useState({})
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [currentPage,setCurrentPage]=useState(1);
  const [SearchTerms,setSearchTerm]=useState("")
  const [debounceSearch,setDebounceSearch]=useState(null);
  const loanPerPage=2;
  const [totalpage,setTotalpage]=useState(0);
  const [totalRecord,settotalRecord]=useState(null);

  const closemodel=()=>setIsNewClientModalOpen(false)


  
  const FetchOverLoanHistory= async()=>{
    try{

     const res= await api.get(`/Current-OverLoaned/History?limit=${loanPerPage}&page=${currentPage}&search=${debounceSearch}`)
     setdata(res?.data?.response);
settotalRecord(res?.data?.totalRecord);
setTotalpage(res.data?.totalPage);
    }

    catch(err){

    }
  }


  useEffect(()=>{
    FetchOverLoanHistory()
  },[currentPage,debounceSearch]);


  useEffect(()=>{
     const timer= setTimeout(() => {
        setDebounceSearch(SearchTerms);
     }, 1000);
 
     return ()=>clearTimeout(timer);

  },[SearchTerms])

  const FormatDate= (date)=>{
    if(!date) return;
    return date.split('T')[0].split('-').reverse().join('-'); 

  }

  const OpenViewModel= (Loan,type)=>{
      setSelectedLoan(Loan);
      setViewloan(true)
  }

const OpenViewpaymentscheduleHistory=(Loan,name)=>{
    setSelectedLoanSchedule(Loan);
    setViewschedules(true);
    setname(name)
}

const CloseModel= ()=>{
  setSelectedLoan(null);
  setViewloan(null);
  setViewschedules(null);
}

const HandleNext= ()=>{
  if(currentPage<totalpage) setCurrentPage(currentPage+1);

}

const HandlePrevious= ()=>{
  if(currentPage>1) setCurrentPage(currentPage-1);
}


   const StatusBadge=(status)=>{
    switch (status) {
      case 'paid': return 'bg-blue-500 text-white py-1 px-8 rounded-sm'
      case 'partial_paid': return 'bg-yellow-500 text-white py-1 px-3 rounded-sm'
     case 'advance': return 'bg-green-600 text-white py-1 px-5 rounded-sm' 

     case 'overdue':return 'bg-red-500 text-white py-1 px-5 rounded-sm'
      default:break;
    
    }

   }


  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-2 flex flex-col justify-between">
      <div className="w-full space-y-3">
        
        <div className="pb-2">
         
          <h1 className="text-2xl md:text-3xl pt-2  uppercase font-extrabold text-gray-800 tracking-tight">
            Over Loaned Clients
          </h1>
        </div>

        <div className="bg-white rounded-md  border border-gray-200 overflow-hidden">
          
          <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">
                List Of The Users That Took The Loan Previously
              </h2>
              <span className="inline-flex items-center px-2.5 
              py-1.5 rounded-sm text-[14px]  
               bg-blue-400 text-white mt-1 capitalize font-medium">
                {totalRecord} over loans
              </span>
            </div>
            
            <div className="relative w-full md:w-72">
              <span className="absolute top-2.5 rigth-0 mx-2">
                <Search size={18}/>
              </span>
              <input
                type="text"
                placeholder="Search..."
                onChange={(e)=>{setSearchTerm(e.target.value)}}
                className="w-full pl-8 pr-10 py-2  border border-gray-300 rounded-sm text-sm 
                disabled:cursor-not-allowed
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <table className=" text-left border-collapse">
              <thead>
                <tr className=" text-[12px] font-semibold uppercase  text-gray-700 border-b border-gray-200">
                  <th className="py-4 px-6 whitespace-nowrap">No</th>
                 
                  <th className="py-4 px-6 whitespace-nowrap">Names</th>
                  <th className="py-4 px-6 whitespace-nowrap">Loans Taken</th>
                  <th className="py-4 px-6 whitespace-nowrap">Last Loan Payment Date</th>
                  <th className="py-4 px-6 whitespace-nowrap">Last Loaned Amount</th>
                  <th className="py-4 px-6 whitespace-nowrap ">Last Loan History</th>
                  <th className="py-4 px-6 whitespace-nowrap text-center">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Data.map((Loan,idx) => (
                  <tr key={Loan.client_id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-800 whitespace-nowrap text-[15px]">{(currentPage-1)*loanPerPage+idx+1}</td>

                    <td className="py-4 px-6 font-medium text-gray-800 whitespace-nowrap text-[15px]">{Loan.client_name}</td>
                    <td className="py-4 px-6 text-gray-800 whitespace-nowrap text-[15px]">{Loan.LastLoanTaken}</td>
                    <td className="py-4 px-6 text-gray-800 whitespace-nowrap text-[15px]">{FormatDate(Loan.LastLoan?.schedules?.filter(
                      schedule=>['paid','partial_paid'].includes(schedule.payment_status?.toLowerCase())).slice(-1)[0]?.due_date)||'-'
                      
                      }</td>
                    <td className="py-4 px-6 font-semibold text-[18px] text-gray-800 whitespace-nowrap uppercase">
                     ugx {Number(Loan.LastLoan?.Loanamount).toFixed(2)}
                      </td>
                  
                    
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                      <span className="px-4 py-1 rounded-full  capitalize bg-red-100 text-sm
                       border border-red-500 text-red-500 animate-pulse">
                        overdue {Loan.LastLoan?.overdueHistory} Window{Number(Loan.LastLoan?.overdueHistory)>1&&'s'}
                      </span>
                       <span className="px-2 py-1 rounded-full bg-yellow-100 border 
                       text-yellow-600 animate-pulse text-sm">
                         Partial {Loan.LastLoan?.PartialPaymentHistory} Window{Number(Loan.LastLoan?.PartialPaymentHistory)>1&&'s'}
                      </span>
                      </div>
                    </td>
                   
                  
                    <td  className="py-4 px-6 ">
                       <div className="flex items-center justify-center gap-3 ">
                        <button
                         onClick={()=>{OpenViewModel(Loan)}}
                        className="flex gap-1 whitespace-nowrap bg-gray-200 py-1.5 px-3 
                        text-[15px] items-center rounded-sm outline-none cursor-pointer">
                          <span>
                            <Eye size={18}></Eye>
                            </span>
                            View more
                        </button>
                        <button 
                          onClick={() => setIsNewClientModalOpen(true)}
                          className="px-4 py-1.5 whitespace-nowrap bg-blue-500 
                           text-white text-[15px]  rounded-sm transition-colors shadow-sm cursor-pointer"
                        >
                          Apply Loan
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         
        </div>
         <div className="flex justify-between p-4">
           <div>
              <p className="italic text-gray-700">showing: {(currentPage-1)*loanPerPage+1} to: {Math.min(currentPage*loanPerPage,totalRecord)} of {totalRecord}</p>
           </div>

           <div className="gap-1 flex items-center">  
            <button
             disabled={currentPage===1}
            onClick={HandlePrevious} className="bg-gray-200 p-1.5 rounded-sm
             text-gray-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"><ChevronLeft/></button>
            <button
             disabled={currentPage===totalpage}
            onClick={HandleNext} className="bg-gray-200 p-1.5 rounded-sm
             text-gray-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"><ChevronRight/></button>

           </div>

          </div>
      </div>

     {SelectedLoan&&viewLoan &&
      <div className="fixed inset-0 bg-black/70 z-50 flex justify-center">
       <div className="bg-white p-4 w-full max-w-5xl h-[50vh] rounded-sm animate-bounce-once  mt-8">
        <div className="mb-5">
          <div className="flex justify-between">
           <span><h2 className="capitalize font-extrabold text-gray-800 text-xl">
            {SelectedLoan?.client_name}</h2></span>
           <span onClick={CloseModel} className="text-red-500 cursor-pointer"><X /></span>
          </div>
            <div>
           <h2 className="font-semibold text-[15px] text-blue-500 capitalize">Client Previous loan account Ledger</h2>
              </div>
        </div>

        <div className=" py-4 overflow-auto ">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
            <tr className="bg-gray-50">
              <th className="text-[13px] text-gray-800 uppercase tracking-wide font-semibold py-3 border border-gray-300">No</th>
              <th className="text-[13px] text-gray-800 uppercase tracking-wide font-semibold py-3 border border-gray-300">loan ID</th>
              <th className="text-[13px] text-gray-800 uppercase tracking-wide font-semibold py-3 border border-gray-300">Loan Amount</th>
              <th className="text-[13px] text-gray-800 uppercase tracking-wide font-semibold py-3 border border-gray-300">Loan status</th>
              <th className="text-[13px] text-gray-800 uppercase tracking-wide font-semibold py-3 border border-gray-300">Overdue Window</th>
              <th className="text-[13px] text-gray-800 uppercase tracking-wide font-semibold py-3 border border-gray-300">Partial window</th>
              <th className="text-[13px] text-gray-800 uppercase tracking-wide font-semibold py-3 border border-gray-300">view history</th>
               
            </tr>
            </thead>

            <tbody>
          {SelectedLoan.loans.map((loan,_idx)=>(
          <tr key={_idx}>
           <td className="px-6 text-center  whitespace-nowrap border-b border-gray-200 py-2 text-[15px] text-gray-800 capitalize  ">{_idx+1}</td>
           <td className="px-6 text-center  whitespace-nowrap border-b border-gray-200 py-2 text-[15px] text-gray-800 capitalize  ">{loan.loanId}</td>
           <td className="px-6 text-center  whitespace-nowrap border-b border-gray-200 py-2 text-[18px] font-semibold text-gray-800 capitalize  ">{Number(loan.Loanamount).toFixed(2)}</td>
           <td className="px-6 text-center  whitespace-nowrap border-b border-gray-200 py-2 text-[13px] text-gray-800 capitalize  ">
            <span className={loan.loanstatus?.toLowerCase()==='paid'? 'bg-blue-500 px-4 py-1 text-white rounded-sm'
              :'bg-gray-400 text-gray-800 rounded-md py-1.5'}>{loan.loanstatus}</span></td>
           <td className="px-6 text-center  whitespace-nowrap border-b border-gray-200 py-2 text-[15px] text-gray-800 capitalize">
            <span className="bg-red-100  py-1 rounded-full border animate-pulse
             border-red-500 text-red-500 flex gap-1 items-center justify-center text-[14px]"> 
            <CircleAlert size={18}/>overdue {loan.overdueHistory} Window</span>  </td>
           <td className="px-6 text-center  whitespace-nowrap border-b border-gray-200 py-2
            text-[15px] text-gray-800 capitalize">
              <span className="p-1.5 border bg-yellow-100 border-yellow-500 px-4 rounded-full text-[14px]
               text-yellow-500 animate-pulse"> Partial {loan.PartialPaymentHistory} window</span></td>
             <td className="px-6 text-center  whitespace-nowrap border-b border-gray-200 py-1 text-[15px]
              text-gray-800 capitalize">
                <button 
                 onClick={()=>OpenViewpaymentscheduleHistory(loan,SelectedLoan?.client_name)}
                className="flex  items-center gap-1 bg-blue-500 px-4 rounded-sm
                 py-1 justify-center text-white cursor-pointer text-[14px]">
              <Eye size={18}/>
              <p>View</p>
              </button></td>
         
          </tr>
          ))}
            
            </tbody>
          </table>
      

        </div>
       
       </div>

      </div>}

   
      {SelectedLoanSchedule&&viewschedules&&
       <div  className="fixed inset-0 z-80 bg-white">

        <div className="flex justify-between border-b border-gray-100 p-4 items-center">
          <span>
               <h2 className="text-2xl text-gray-800">{name}</h2>
           <p className="text-[15px] font-semibold text-gray-700 capitalize">Borrower Schedules Payment History </p>
          </span>
          <span onClick={CloseModel} className="text-red-500 cursor-pointer">
            <X/>
          </span>
       
        </div>

        <div className="flex justify-center items-center p-3">
          <div className="overflow-auto w-full  border border-collapse border-gray-200 rounded-sm">
            <table className="w-full">
              
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="py-2 text-[14px] uppercase  font-semibold">No</th>
                   <th className="py-2 text-[14px] uppercase  font-semibold">Due Date </th>
                   <th className="py-2 text-[14px] uppercase  font-semibold">amount expected</th>

                   <th className="py-2 text-[14px] uppercase  font-semibold">Amount Paid</th>
                   <th className="py-2 text-[14px] uppercase  font-semibold">status history</th>
                   <th className="py-2 text-[14px] uppercase  font-semibold">payment status</th>
                   </tr>
                </thead>
                <tbody>
                {SelectedLoanSchedule?.schedules.map((sch,_idx)=>(
              <tr> 
                <td className="px-3 whitespace-nowrap text-center text-[15px] text-gray-800  py-2 border-b border-gray-100">{_idx+1}</td>
                <td className="px-3 whitespace-nowrap text-center text-[15px] text-gray-800  py-2 border-b border-gray-100">{FormatDate(sch.due_date)}</td>
                <td className="px-3 whitespace-nowrap text-center text-[18px] font-semibold text-gray-800  py-2 border-b border-gray-100  uppercase ">ugx {Number(sch.expected_amount).toFixed(2)}</td>

                <td className="px-3 whitespace-nowrap text-center text-[18px] text-gray-800  py-2 border-b border-gray-100 uppercase font-semibold"> ugx {Number(sch.amount_paid).toFixed(2)}</td>
                <td className="px-3 whitespace-nowrap text-center text-[15px] text-gray-800  py-2 border-b border-gray-100">
                  <span className={StatusBadge(sch?.status_history)}>{sch?.status_history?.toLowerCase()=== 'partial_paid' ? 'Partial Paid':sch?.status_history}</span></td>
                <td className="px-3 whitespace-nowrap text-center text-[15px] text-gray-800  py-2 border-b border-gray-100">
                  <span className={StatusBadge(sch?.payment_status)}>{sch?.payment_status?.toLowerCase()==='partial_paid' ? 'Partial Paid' :sch?.payment_status }</span></td>

  
              </tr>
            ))}

                </tbody>
            </table>
       
          </div>
          </div>

       </div>
      }

      {isNewClientModalOpen && (
        <div 
          onClick={() => setIsNewClientModalOpen(false)} 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden p-6 max-h-[90vh] overflow-y-auto transform transition-all animate-scaleUp"
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="text-lg font-bold text-gray-900">New Loan Application</h3>
              <button
                onClick={() => setIsNewClientModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-light leading-none p-1 cursor-pointer"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>
            
            <div>
              <LoanApplicationPortal onClose={closemodel} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Old_client;