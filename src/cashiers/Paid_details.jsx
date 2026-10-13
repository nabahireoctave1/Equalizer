


import  { useEffect, useState } from 'react';
import Credit_Record from '../client/Client_record';
import { Search, BookOpen, X, Info, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import api from '../api';

const Paid = () => {
  const {t} = useTranslation();
  const [activeModal, setActiveModal] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [Loading,setLoading]=useState(null);
  const [Payments,setPayments]=useState([])
  const [messagekey,setmessageKey]=useState(null)
  const [size,setsize]=useState(null);
  const  [searchTerm,setSearchTerm]=useState("")
  const [CurrentPage,setCurrentPage]=useState(1);
  const [selectedPeriod,setSelectedPeriod]=useState({
    period:'today'
  });

 const  [period,setperiod]=useState(null);
  const openModal = (type, clientName) => {
    setSelectedClient(clientName);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedClient(null);
  };


  const FetchTodayPayment= async()=>{
    setLoading(true)
    setmessageKey(null);
    setsize(null);
    setPayments([]);

    try{

      const res= await api.get(`/Today-payments?period=${selectedPeriod.period==='customDate' ? 'today':selectedPeriod.period }`);
      setPayments(res?.data);

    }
    catch(err){
      const error= err.response?.data;
      setmessageKey(error?.messagekey);
      setsize(error?.size);
      setperiod(error?.period);
    }
  }
   
  const filteredpayments= Payments.filter((payment)=>(
    payment.client_name?.toLowerCase().includes(searchTerm?.toLowerCase())
  ))


  const paymentPerPage=6;
  const startIndex= (CurrentPage-1)*paymentPerPage
  const end= startIndex+paymentPerPage
  const TotalPage=Math.ceil(Payments.length/paymentPerPage);
  const paginatedPayment= filteredpayments.slice(startIndex,end);

  const HandlePeriodChanges= (e)=>{
    const {name,value}=e.target;

    setSelectedPeriod((prev)=>({
      ...prev,[name]:value
    }))

  }



  const Next=()=>{
   if(CurrentPage<TotalPage)setCurrentPage(CurrentPage+1)
  }

  const Previous= ()=>{
    if(CurrentPage >1)setCurrentPage(CurrentPage-1);
  }


  useEffect(()=>{
   FetchTodayPayment();
  },[selectedPeriod])

   const FormatedDate= (date)=>{
    if(!date) return null;
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

   const periodMaker=(period)=>{
    switch (period) {
      case 'today': return 'today payment'
      break;

      case'yesterday':return 'payments on yestereday'
       break;
       case'last7days':return 'payment on last 7 days'
       case 'lastweek': return 'last week payments'
       break;
       case 'lastmonth': return 'last month payment detail'
      default: return''
       break;
    }
   }


   


  return (
    <div className="relative min-h-screen bg-gray-50 rounded-md text-gray-800">
      <div className=" w-full ">
        <div className='flex  flex-col sm:flex-row justify-between md:items-center space-y-1
        p-3 top-0 sticky z-50 border-b border-gray-200 bg-white'> 
          <div className=''>
            <h2 className="text-sm  uppercase font-semibold mb-4">
              {t("officePaymentDetails")} 
            </h2>
            
            <select  name='period'
              onChange={HandlePeriodChanges}
            className='capitalize text-[13px] border border-gray-300 w-full
            md:w-full sm:w-43 p-2 outline-none focus:ring-2 focus:ring-blue-400 
             rounded-sm cursor-pointer'>
              <option value="today">to day</option>
              <option value="yesterday">yester day</option>
              <option value="last7days">last 7 days </option>
              <option value="lastmonth">Last Month</option>
              <option value="customDate">custom date</option>

                     </select>


            </div>
         

              <div className="relative w-full md:w-[45%]">
                <span className="absolute inset-y-0 left-0 flex items-center 
                pl-3 pointer-events-none text-gray-400">
                  <Search size={18} />
                </span>
                <input 
                onChange={(e)=>{setSearchTerm(e.target.value)}}
                  className="w-full text-[13px] text-gray-700 bg-white border border-gray-200  pl-10 pr-4 py-2.5
                   rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 " 
                  type="text" 
                  placeholder={t("searchPlaceholder")}
                /> 
              </div>
        </div>
        <div className="w-full">
          <div className=" bg-gray-50 z-50 ">
          


            <div className="w-full bg-blue-100 border border-blue-200 p-4 mb-10 rounded-xs flex items-start gap-3">
              <Info className="text-blue-600 shrink-0 mt-0.5" size={20} />
              <div>
                <span className="font-medium block text-blue-900">{t("todayClients")}</span>
                <span className="text-sm text-blue-800 block mt-1">
                 {t('modifyPayments')}
                  <p className="text-red-600 font-semibold mt-1">{t("noModification")}</p>
                </span>
              </div>
            </div>

            
          </div>

          {messagekey&&size===0 ? 
          <div>
              <span>

              </span>
                <span>
                  <h2>{periodMaker(period)}</h2>
                   {messagekey}
                </span>


            </div> :
            messagekey&&size==1 ? 
            <div>
              hhhhh

            
            </div>
            :filteredpayments.length ===0 ?
            <div>


            </div> 
               :
               <div>
              
                  <div className="w-full overflow-x-auto px-3">
            <div className="inline-block min-w-full align-middle border border-gray-200 rounded-md ">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center uppercase text-[14px] whitespace-nowrap">{t("no")}</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase text-[14px] whitespace-nowrap">{t("clients")}</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center uppercase text-[14px] whitespace-nowrap">{t("dayPayments")}</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center uppercase text-[14px] whitespace-nowrap">{t("amountPaid")}</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center uppercase text-[14px] whitespace-nowrap">{t("balance")}</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center uppercase text-[14px] whitespace-nowrap">{t("paymentdate")}</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center uppercase text-[14px] whitespace-nowrap">{t("field")}</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center uppercase text-[14px] whitespace-nowrap">{t("paymentstatus")}</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center uppercase text-[14px] whitespace-nowrap">{t("status")}</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center uppercase text-[14px] whitespace-nowrap">{t("creditBook")}</th>
                     
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 text-center text-[15px]">
                  {paginatedPayment.map((payment, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-semibold text-gray-700">{startIndex+index+1}</td>
                      <td className="p-3 text-left  text-gray-800 whitespace-nowrap">{payment.client_name}</td>
                      <td className="p-3 text-green-600 font-medium text-[18px] whitespace-nowrap">{Number(payment.DailyInstallment).toFixed(2)}</td>
                      <td className="p-3 font-medium text-[18px] whitespace-nowrap">{Number(payment.client_amount).toFixed(2)}</td>
                      <td className="p-3 text-red-500 font-medium text-[18px] whitespace-nowrap">{Number(payment.Balance).toFixed(2)}</td>
                      <td className="p-3 whitespace-nowrap text-gray-800">{FormatedDate(payment.date)}</td>
                      <td className="p-3 whitespace-nowrap text-gray-800 capitalize">
                        <span className={payment.payment_field?.toLowerCase()==='office'?
                           'bg-gray-200 py-1 px-5 text-gray-700 rounded-sm'
                           :'bg-green-100 text-gray-700 py-1 px-5 rounded-sm'
                           }>{payment.payment_field}</span></td>
                      <td className="p-3 whitespace-nowrap text-gray-800 capitalize">
                        <span className={`${StatusBadge(payment.payment_status)}`}>{payment.payment_status?.toLowerCase()==='partial_paid' ? 'partial paid'
                        :payment.payment_status}</span></td>
                      <td className="p-3 text-gray-800 whitespace-nowrap capitalize">
                        <span className={payment.status?.toLowerCase()==='done'? 'bg-green-600 py-1 px-5 rounded-sm text-white':''}>
                          {payment.status}
                          </span></td>
                      <td className="p-3">
                        <button 
                          onClick={() => openModal('record', payment.client_name)}
                          className="inline-flex items-center cursor-pointer gap-1 whitespace-nowrap
                           bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition shadow-sm"
                        >
                          <BookOpen size={14} /> {t("viewRecord")}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          
          </div>
                <div className='flex  justify-between px-3 py-5'>
             <div className='flex gap-1 text-[15px]  text-gray-700 italic'>
              <p>Showing: {startIndex+1} </p>
              <p> to: {TotalPage}</p>
              <p> of: {Payments.length}</p> 
             </div>

             <div className='flex gap-3 items-center '>
              <button 
               disabled={CurrentPage===1}
              onClick={Previous} className='bg-gray-300 p-1 rounded-sm text-gray-700 cursor-pointer
               disabled:cursor-not-allowed disabled:opacity-50'>
                <ChevronLeft/>
              </button>
              <button disabled={CurrentPage===TotalPage} onClick={Next} className='bg-gray-300 p-1 rounded-sm text-gray-700 cursor-pointer 
              disabled:cursor-not-allowed disabled:opacity-50'>
                <ChevronRight/>
              </button>
             </div>


           </div>
               </div>


          }


       
       

        </div>
      </div>

      {activeModal && (
        <div 
          onClick={closeModal} 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300 ease-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white  shadow-2xl relative transform transition-all duration-300 ease-out scale-100 flex flex-col
                       w-[95%] sm:w-[90%] md:w-[80%] lg:w-[full] xl:w-[full] 
                       max-h-[90vh] md:max-h-[85vh]"
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2 text-amber-500">
                <BookOpen size={24} />
                <h3 className="text-lg md:text-xl font-bold text-gray-900">
                  {t("titleP")} ({selectedClient})
                </h3>
              </div>
              <button 
                onClick={closeModal} 
                className="text-white  p-1.5 rounded-full bg-red-500 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
              {activeModal === 'record' && (
                <div className="mt-1 mb-2">
                  <Credit_Record clientName={selectedClient} />
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl shrink-0 flex justify-end">
              <button 
                onClick={closeModal} 
                className="w-full sm:w-auto px-5 py-2 bg-red-500
                 hover:bg-red-600 text-white cursor-pointer
                  font-medium rounded-sm text-sm transition shadow-sm"
              >
                {t("closeRecords")}
              </button>
            </div>
          </div>
        </div>
      )}

  
    </div>
  );
};

export default Paid;


