import { act, useEffect, useState } from 'react';
import Paying from '../client/Paying';
import Credit_Record from '../client/Client_record';
import LoanApplicationPortal from './LoanApplicationPortal';
import { XIcon,Smartphone,Image, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';
import api from '../api';
import SkeletonCellLoader from '../pages/SkeletonCellLoader';
import NetworkError from '../pages/NetworkError'


const Loans = () => {
  const {t} = useTranslation();
  
  const[LoanInfo,setLoaninfo]=useState([]);
  const [Loading,setLoading]=useState(null);
  const [errorsize,setErrorsize]=useState(null);
  const [messagekey,setmessageKey]=useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const LoanPerPage = 6;
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeModal, setActiveModal] = useState(null); 
const [preview,setpreview]=useState(null);
const [uploadwithPhone,setuploadwithphone]=useState(false)

  
 const startIndex= (currentPage-1)*LoanPerPage;
 const lastIndex=startIndex+LoanPerPage;

 const totalPages=Math.ceil(LoanInfo.length/LoanPerPage);

 const paginatedLoan=LoanInfo.slice(startIndex,lastIndex);


 const HandleNext= ()=>{
    if(currentPage<totalPages) setCurrentPage(currentPage+1);
       }

       const HandlePrevious= ()=>{
         if(currentPage>1) setCurrentPage(currentPage-1)
       }

  const openModal = (loan, type) => {
    setSelectedClient(loan);
    setActiveModal(type);
  };

  const closeModal = () => {
    setSelectedClient(null);
    setActiveModal(null);
  };

  const [openClientmodel, setopenclientmodel] = useState(false);
  const [networkError,setNetworkError]=useState(null);

  
  const openmodel = () => {
    setopenclientmodel(true);
  };

  const closeclientmodel = () => {
    setopenclientmodel(false);
  };

  
  const FindCUrrentBranchLoan=async()=>{
    setLoading(true);
    setNetworkError(null);
     try{
     const res= await api.get('/branch-current-loans');
     setLoaninfo(res?.data);

     }
     catch(err){
      if(!err.response){
        setNetworkError(true);
      }
     
     }finally{
      setLoading(false);
     }
  }


  useEffect(()=>{
   FindCUrrentBranchLoan();
  },[])


  const Retry=()=>{
    FindCUrrentBranchLoan();
  }

    const Formatdate= (date)=>{
        if(!date) return null;

        return date.split('T')[0].split('-').reverse().join('-')

    }

  

  const AddPictureModel= ()=>{
    return (
      <div>
        <div className='fixed inset-0 z-70  flex items-center  justify-center p-5 bg-black/70  '>
                    <div className='bg-white  w-100 md:w-200 animate-bounce-once
                     lg:w-210 h-130 rounded-sm px-6 py-3'>
                      
                      
            <div className='mb-5'>
            <div className='flex  items-center gap-2'>
              <span className='bg-violet-100 rounded-md text-blue-600 p-1'><Image size={45}/></span>
              <div>
                 <h2 className='text-[15px] font-bold uppercase text-gray-800'>Add collateral picture</h2>
              <p className='text-[15px]'>Upload client collateral picture </p>
                </div>
             
            </div>

            </div>


            <div className='flex  justify-between gap-3 mb-5'>
               <div className='flex  items-center justify-center border px-6 gap-2
                rounded-sm border-gray-300 bg-gray-100/50 py-4'>
                <span className='bg-gray-200 p-2 rounded-sm text-gray-800'>
                  <Smartphone size={40}/>
                </span>
                <div>
                  <h2 onClick={()=>setuploadwithphone(true)} className='font-semibold text-gray-800 text-[14px] hover:text-blue-600
                   cursor-pointer'>Upload with Phone</h2>
                  <p className='text-[14px]'>Upload picture with your phone</p>
                </div>

               </div>

               <div className='flex  items-center justify-center border px-6 gap-2
                rounded-sm border-blue-600 bg-gray-100/50 py-4  '>
                <span className='bg-gray-200/50 rounded-sm  p-2 text-blue-600 '>
                <Image size={40}/>
                 
                </span>
                
                <div>
                  <label  className='text-[14px] 
                   font-semibold cursor-pointer  hover:underline  text-blue-700'>
                  Choose from this device
                      <input type="file"   className='hidden'/>
                  </label>
                  <p className='text-[14px]'>Upload photo from this device </p>
                    
                </div>
               </div>

            </div>

             <div className='bg-gray-100 w-full h-65 mb-2 border border-gray-200 rounded-sm' >
              {preview ? 
               <img src= {preview }  className='w-full object-cover  h-full rounded-sm ' />

              :''
              
            }
             </div>
                {uploadwithPhone &&
         <div className='flex justify-center fixed inset-0 items-center z-100 bg-black/90 rounded-sm'>   
         <div className='bg-gray-50 rounded-xl w-md'>
          <div className='px-3 py-2 flex justify-between items-center'>
            <span>
          <h2 className='text-[20px] uppercase font-extrabold  text-gray-800'>upload Collateral picture</h2> 
            </span>
            <span>
              <XIcon size={20} onClick={()=>setuploadwithphone(false)} className='text-red-500 cursor-pointer'/>
            </span>


          </div>
          <div className='flex justify-center flex-col items-center   p-6'> 
          <p className='py-2 text-[15px] text-gray-800'>
           Scan Qrcode  with your phone to upload a collateral picture
          </p>
             <QRCode value='http/localhost/upload-collateral-picture/ibf67k3' size={180}/>
          </div>
          </div> 
         
          

          </div> 

        }

             <div className='flex justify-end p-2 gap-2'>
              <button onClick={closeModal}  className='text-[15px] bg-gray-300 px-6 py-1.5 text-gray-700 rounded-sm cursor-pointer '>Cancel</button>
              <button  className='text-[15px] bg-blue-500 px-6 py-1.5 text-white rounded-sm  cursor-pointer'>Confirm</button>
             </div>

        
                
          </div>
          
        </div>
         
       
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 font-sans antialiased text-slate-800 "> 
                      {networkError && <div className='fixed inset-0 z-100 flex justify-center
                       items-center bg-black/30'>
           <NetworkError HandleRetry={Retry}/>
          </div>}
          
    
     <div className={`${networkError ? 'mb-2':'mb-4'} sticky top-0 z-50 bg-white px-6 py-4 rounded-md  border border-gray-100`}>
          <h2 className="text-2xl font-bold uppercase text-blue-600 mb-2 sm:text-3xl">
            {t("panel")}
          </h2>
          <div className="text-slate-600 max-w-2xl">
                       <p className="text-sm sm:text-base  text-gray-800 leading-relaxed italic">
             {t("loanpanelDesc")}
            </p>
          </div>
       
        </div>
         

      <div className="max-w-7xl p-2">
           

        <div className="bg-white rounded-md  border border-gray-100 overflow-hidden">
          
          <div className="px-3 py-4 border-b border-slate-100 flex flex-col   sm:flex-row space-y-3 justify-between">
            <h3 className="font-extrabold uppercase text-slate-700 text-2xl">{t("CurrentLoans")}</h3>
            <div className="flex items-center gap-4">
              {Loading||networkError ? <div className='w-35'><SkeletonCellLoader/></div> :
              <span className="hidden sm:flex  items-center 
               text-[13px] font-semibold uppercase gap-2 bg-gray-100
               text-gray-800 px-2.5 py-1 rounded-full">
                <span>{t("totalRecords")}:</span>
                 <p className='text-[15px] 
                font-semibold'>{LoanInfo.length}</p> 
              </span>
              }

              <button 
                onClick={openmodel} 
                disabled={Loading||networkError}
                className='capitalize bg-blue-500 px-4 py-2 rounded-sm disabled:cursor-not-allowed
                 text-sm font-semibold text-white cursor-pointer 
                  hover:bg-blue-600 transition-colors shadow-sm  disabled:opacity-60' 
              >
               {t("newLoan")} 
              </button>
            </div>
          </div>

          <div className="overflow-auto w-full">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-100 text-xs font-semibold
               uppercase tracking-wider text-gray-700">
                <tr>
                  <th className="p-2 whitespace-nowrap">{t("number")}</th>
                  <th className="p-4 whitespace-nowrap">{t("clients")}</th>
                  <th className="p-4 whitespace-nowrap">{t("dayPayments")}</th>
                  <th className="p-4 whitespace-nowrap">{t("amountGiven")}</th>
                  <th className="p-4 whitespace-nowrap">{t("balance")}</th>
                  <th className="p-4 whitespace-nowrap">{t("Loan-Charge")}</th>
                  <th className="p-4 whitespace-nowrap">{t("Chargeamount")}</th>
                  <th className="p-4 whitespace-nowrap">{t("totalrepay")}</th>
                  <th className="p-4 whitespace-nowrap">{t("closingDate")}</th>
                  <th className="p-2 whitespace-nowrap">{t("paymentFrequency")}</th>

                  <th className="p-2 whitespace-nowrap">{t("Borrowercontacts")}</th>
                  <th className="p-2 whitespace-nowrap">{t("Borrowerlocation")}</th>
                  <th className="p-2 whitespace-nowrap">{t("guarantor")}</th>
                  <th className="p-2 whitespace-nowrap">{t("guarantorPhone")}</th>
                  <th className="p-2 whitespace-nowrap">{t("guarantorLocation")}</th>
                  <th className="p-2 whitespace-nowrap">{t("CollateralName")}</th>
                  <th className="p-2 whitespace-nowrap">{t("Loanstatus")}</th>
                  <th className="p-2 whitespace-nowrap text-center">{t("payLoan")}</th>
                  <th className="p-2 whitespace-nowrap text-center">{t("creditBook")}</th>
                  <th className="p-2 whitespace-nowrap text-center">{t("addPicture")}</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-gray-800">
                {Loading||networkError ? Array.from({length:5}).map((_,idx)=>(
                 <tr>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                  <td className='p-3'><SkeletonCellLoader/></td>
                 </tr>
                )):paginatedLoan.map((loan,idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-3 py-2 font-medium text-gray-800">{startIndex+idx+1}</td>
                    <td className="px-3 py-2 font-semibold text-gray-800 text-[15px] whitespace-nowrap">{loan.client_name}</td>
                    <td className="px-3 py-2 whitespace-nowrap font-semibold text-[18px] tracking-tighter text-gray-800">{Number(loan.DailyInstallment).toFixed(2)}</td>
                    <td className="px-3 py-2 whitespace-nowrap font-semibold text-[18px] tracking-tighter text-gray-800">{Number(loan.amount_given).toFixed(2)}</td>
                    <td className="px-3 py-2 whitespace-nowrap font-medium text-green-700 text-[18px] tracking-tighter">
                      {Number(loan.Balance).toFixed(2)}</td>
                    <td className="px-3 py-2 whitespace-nowrap font-medium text-gray-800 text-[18px] tracking-tighter">{Number(loan.amountAfterOfficeCharge).toFixed(2)}</td>
                    <td className="px-3 py-2 whitespace-nowrap font-medium text-gray-800 text-[18px] tracking-tighter">{Number(loan.chargeAmount).toFixed(2)}</td>
                    <td className="px-3 py-2 whitespace-nowrap font-medium text-blue-700 text-[18px] tracking-tighter">{Number(loan.totalpay).toFixed(2)}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800 text-[15px]">{Formatdate(loan.loan_closingDate)}</td>                 
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800 text-[15px] capitalize">{loan.pay_frequency
}</td>
                    
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800 text-[15px]">{loan.client_contact}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-[15px]">{loan.client_address}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800 text-[15px] capitalize">{loan.guarantor_name}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800 text-[15px] capitalize">{loan.guarantor_contacts}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800 text-[15px]">{loan.guarantor_address}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800 text-[15px]">{loan.security_name}</td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-800 text-[12px] capitalize">
                      <span className={`${loan.status.toLowerCase()==='active' ?'bg-green-600 px-5 py-1.5 font-semibold uppercase rounded-sm text-white' 
                        :'bg-blue-600 px-5 py-1.5 uppercase font-semibold rounded-sm text-white'}`}>
                        {loan.status}

                      </span>
                      </td>
                    
                    <td className="px-3 py-2 text-center whitespace-nowrap">
                      <button 
                        onClick={() => openModal(loan, 'pay')}
                        className="px-3 py-1.5 text-[13px]  bg-blue-500
                         text-white rounded-sm border border-blue-200 cursor-pointer"
                      >
                       {t("payLoan")}
                      </button>
                    </td>
                    <td className="p-4 text-center whitespace-nowrap">
                      <button 
                        onClick={() => openModal(loan, 'record')}
                        className="px-3 py-1.5 text-[13px]  bg-green-600
                         text-white rounded-sm
                          border cursor-pointer border-none 
                          "
                      >
                       {t("viewRecord")} 
                      </button>
                    </td>
                    <td className="p-4 text-center whitespace-nowrap">
                      <button 
                        onClick={() => openModal(loan, 'addPic')}
                        className="px-3 py-1 text-md font-medium bg-blue-500
                         text-white rounded-md border cursor-pointer outline-none"
                      >
                       {t("addPics")} 
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row
           items-center justify-between gap-4">
           {Loading||networkError ? 
            <div className='w-45'>
              <SkeletonCellLoader/>
              </div>
           :
            <div className="text-[14px] italic sm:text-[14px]  text-gray-800 order-2
             sm:order-1">
             {t("showing")} <span className="text-[15px] text-gray-800">
              {startIndex+1}
            </span> {t("to")}{' '}
              <span className="text-[15px] text-gray-800">
               {Math.min(lastIndex,LoanInfo.length)}
              </span>{' '}
              {t("of")} <span className="font-[15px] text-gray-800">
               {LoanInfo.length}
              </span> {t("clients")}
            </div>
           }

              {
                Loading||networkError ? <div className='w-45'>
                  <SkeletonCellLoader/>
                </div>
                 :
                  <div className="inline-flex items-center space-x-2 order-1 sm:order-2 w-full sm:w-auto justify-between sm:justify-end">
              <button
              disabled={currentPage===1}
                onClick={HandlePrevious}
                className={`flex-1 sm:flex-initial px-2 py-1 text-xs sm:text-sm 
                 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50
                   rounded-sm border border-gray-200 transition-all duration-200 `}
              >
                <ChevronLeft/>
              </button>
              <div className="text-xs font-medium italic text-gray-700 px-3">

              </div>
              <button
                onClick={HandleNext}
                disabled={currentPage === totalPages}
                className={`flex-1 sm:flex-initial px-2 p-1 text-xs sm:text-sm 
                  disabled:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50
                  rounded-sm border border-gray-200 transition-all duration-200 `}
              >
                <ChevronRight/>
                {console.log(currentPage)}
              </button>
            </div>
              }
           
          </div>
        </div>
      </div>

      {activeModal && selectedClient && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white
         overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          <div className="w-full flex items-center justify-between px-6 py-4 border-b  border-gray-200">
              
            <div>
              <h3 className="text-xl sm:text-2xl capitalize font-bold text-slate-900">{selectedClient.name}</h3>
              <p className="text-[12px] sm:text-xs text-blue-600 uppercase tracking-widest font-extrabold">
                {activeModal === 'pay' ? 'Loan Payment Processing' : 'Credit History Record'}
              </p>
            </div>
            
            <button 
              onClick={closeModal} 
              className="p-2 cursor-pointer rounded-full
               text-red-600  flex items-center justify-center"
            >
              <XIcon size={24} strokeWidth={1} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto ">
            <div className="max-w-6xl mx-auto  min-h-full">
              <div className="p-6 md:p-12">
                {activeModal === 'pay' ? (
                  <Paying client_name={selectedClient.name} onSuccess={closeModal} />
                ) :activeModal==='record' ? (
                  <Credit_Record  />
                ):activeModal==='addPic' ? (
                   <AddPictureModel/>
                ):''}
              </div>
            </div>
          </div>
        </div>
      )}

      {openClientmodel && (
        <div className="fixed inset-0 z-110 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeclientmodel} />
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
            <LoanApplicationPortal onClose={closeclientmodel} />
          </div>
        </div>
      )}

    </div>
  );
};

export default Loans;

