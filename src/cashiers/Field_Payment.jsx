import { useTranslation } from "react-i18next";
import api from "../api";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Funnel, Search } from "lucide-react";


const Field = () => {
  const {t} = useTranslation();


  const [Period,setperiod]=useState(null);
  const [SearchTerms,setSearch]=useState("");
  const [messageKey,setmessageKey]=useState(null);
  const [size,setsize]=useState(null);
  const [networkError,setNetworkError]=useState(null);
  const [Loading,setLoading]=useState(null);
  const [debounceSearch,setDebounceSearch]=useState(null);
  const paymentPerPage=15;
  const [currentPage,setCurrentPage]=useState(1);
  const [totalamountcollected,settotalamountcollected]=useState(null);
  const [TotalPage,setTotalpage]=useState(null);
  const [totalEntries,settotalEntries]=useState(null);
  const [Payment,setpayment]=useState([]);

  const FetchborrowersPayinField= async()=>{
    setperiod(null);
    setmessageKey(null);
    setNetworkError(null)
    setsize(null);
    setLoading(true);
    setpayment([]);
   try{
  const res=await api.get(`/fieldPayment?limit=${paymentPerPage}&page=${currentPage}&search=${encodeURIComponent(SearchTerms)}`);
   setpayment(res?.data?.field_payment);  
   settotalamountcollected(res?.data?.TotalCollected);
   setTotalpage(res?.data?.totalPage)
   settotalEntries(res?.data?. totalfieldpayment)
  
  }

   catch(err){



   }finally{
  setLoading(false)
 }

  }

  
   
  useEffect(()=>{
   FetchborrowersPayinField();
  },[currentPage,debounceSearch])

    useEffect(()=>{
    const Timer=  setTimeout(() => {
         setDebounceSearch(SearchTerms);
      }, 1000);
    
    return ()=>clearTimeout(Timer)

    },[SearchTerms])

  const FormatDate= (date)=>{
    if(!date) return;
    return date.split('T')[0].split('-').reverse().join('-')
  }

   const StatusBadge=(status)=>{
    switch (status) {
      case 'paid': return 'bg-blue-500 text-white py-1 px-8 rounded-sm'
      case 'partial_paid': return 'bg-yellow-500 text-white py-1 px-3 rounded-sm'
     case 'advance': return 'bg-green-600 text-white py-1 px-5 rounded-sm' 
      default:break;
    }

   }


   const Next=()=>{
    if(currentPage<TotalPage) setCurrentPage(currentPage+1);
   }

   const Previous=()=>{
    if(currentPage>1) setCurrentPage(currentPage-1);
   } 

  return (
    <div className="min-h-screen bg-gray-50  font-sans">
       <div className="mb-6 sticky top-0 z-50 bg-gray-50 px-3 py-3 flex flex-col space-y-2 sm:flex-row  justify-between items-center  ">
         <div>
           <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight uppercase">
            Akea Financial
          </h1>
          <div className="flex  gap-2 mt-2">
            <span className="h-px w-8 bg-blue-500"></span>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              {t("reportTitle")}
            </p>
            <span className="h-px w-8 bg-blue-500"></span>
          </div>
         </div>

          
          <div className="px-4 w-full sm:w-sm" >
            <span className="flex items-center gap-1 ">
              <Funnel size={20}/>
            <h2 className="text-gray-800 first-letter:uppercase text-[15px] font-medium">filter by officer names</h2>
            </span>
            <div>
              <input type="text" placeholder="musimenta annet" 
              className="w-full p-1.5 border border-gray-200 rounded-sm outline-0 
              placeholder:capitalize placeholder:text-[15px] text-[15px] text-gray-700 mt-1 pl-2 focus:ring-1 focus:ring-blue-500" 
              name="officer" />
            </div>
          </div>
        </div>
      <div className="max-w-7xl bg-white rounded-sm  border border-gray-100 p-2 sm:p-4">
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg uppercase font-bold text-slate-800">{t("clientFieldCollections")}</h3>
            <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">{totalEntries} {t("entries")}</span>
          </div>
          
          <div className="py-1 mb-2 ">
            <div className="relative">
              <span className="absolute top-2 px-1"><Search size={20}/></span>
              <input type="text" onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search by Borrower Name or Borrower Id" className="py-1.5 pl-7 text-[15px]  w-full border focus:ring-2
                text-gray-700 rounded-sm border-gray-200 bg-gray-50 
              outline-0 focus:ring-blue-400" />
            </div>
          </div>
          <div className="overflow-x-auto border border-gray-100 rounded-sm">
            <table className="w-full">
              <thead className="bg-gray-50 text-[12px] uppercase text-gray-800 font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">{t("number")}</th>
                  <th className="px-6 py-4">{t("clientid")}</th>
                  <th className="px-6 py-4">{t("names")}</th>
                  <th className="px-6 py-4">{t("payments")}</th>
                  <th className="px-6 py-4">{t("balance")}</th>
                  <th className="px-6 py-4">{t("date")}</th>
                  <th className="px-6 py-4">{t("paymentstatus")}</th>

                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Loading ? Array.from({length:5}).map((_,idx)=>(
                  <tr>
                    
                  </tr>
                )):Payment.map((p,_idx) => (
                  <tr key={_idx} className="hover:bg-gray-50 cursor-pointer transition-colors group">
                    <td className="text-center py-3 text-gray-800  text-[15px] font-semibold whitespace-nowrap">{_idx+1}</td>
                    <td className="text-center py-3  text-gray-800 whitespace-nowrap">{p?.client_id}</td>
                    <td className="text-center py-3 text-[15px] text-gray-800 font-semibold whitespace-nowrap">{p?.client_name}</td>
                    <td className="text-center py-3 text-[18px] text-green-600 font-semibold whitespace-nowrap">{Number(p?.client_amount).toFixed(2)}</td>
                    <td className="text-center py-3 text-[18px] font-semibold text-red-600 tracking-wide whitespace-nowrap">{Number(p?.Balance).toFixed(2)}</td>
                    <td className="text-center py-3  text-gray-800 text-[15px] whitespace-nowrap">{FormatDate(p?.date)}</td>
                    <td>
                      <span className={`${StatusBadge(p?.payment_status)} flex  items-center justify-center text-[15px] capitalize`}>
                        {p?.payment_status.toLowerCase()==='partial_paid' ? 'Partial paid':p?.payment_status}
                      </span>
                    </td>
                     
                  </tr>
                ))}
              </tbody>
            
          
            

             
            </table>
          </div>
          
        </section>

         <div className="bg-gray-50 flex justify-between p-3 rounded-b-sm border-t border-gray-200 mb-2">  
          <span><h2 className="font-semibold text-sm uppercase text-gray-800">Total collections</h2></span>
        <span ><h2 className="text-gray-800 font-semibold text-[18px] uppercase">ugx {Number(totalamountcollected).toFixed(2)}</h2> </span>

         </div>
 <div className="flex justify-between p-2 items-center">
         <button 
         disabled={currentPage===1}
         onClick={Previous}
         className="bg-gray-100 p-1.5 rounded-xs text-gray-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
          <ChevronLeft/>
         </button>
         <span>
          <p className="flex text[13px] font-mono text-gray-700 capitalize ">showing {currentPage} of {TotalPage} pages</p>
         </span>
         <button 
         disabled={currentPage===TotalPage}
         onClick={Next} className="bg-gray-100 p-1.5 rounded-xs text-gray-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
          <ChevronRight/>
         </button>
      </div>
     

      </div>
     
    </div>
  );
};

export default Field;



