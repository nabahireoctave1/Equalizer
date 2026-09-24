import { act, useState } from 'react';
import Paying from '../client/Paying';
import Credit_Record from '../client/Client_record';
import New_client from './New_Client';
import { XIcon,Smartphone,Image, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';


const Loans = () => {
  const {t} = useTranslation();
  const allClients = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: i % 3 === 0 ? "Webale Precious" : i % 3 === 1 ? "John Doe" : "Sarah Smith",
    dayPayment: "10,000",
    amountGiven: "250,000",
    balance: "200,000",
    closingDate: "06-23-2026",
    phone: "0783124352",
    location: i % 3 === 0 ? "Kampala" : i % 3 === 1 ? 'Gasani' : 'Kigali',
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [selectedClient, setSelectedClient] = useState(null);
  const [activeModal, setActiveModal] = useState(null); 
const [preview,setpreview]=useState(null);
const [uploadwithPhone,setuploadwithphone]=useState(false)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClients = allClients.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(allClients.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const openModal = (client, type) => {
    setSelectedClient(client);
    setActiveModal(type);
  };

  const closeModal = () => {
    setSelectedClient(null);
    setActiveModal(null);
  };

  const [openClientmodel, setopenclientmodel] = useState(false);

  
  const openmodel = () => {
    setopenclientmodel(true);
  };

  const closeclientmodel = () => {
    setopenclientmodel(false);
  };


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

      
      
     <div className="mb-4 sticky top-0 z-50 bg-white px-6 py-4 rounded-md  border border-gray-100">
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
              <span className="hidden sm:flex  items-center 
               text-[13px] font-semibold uppercase gap-2 bg-gray-100
               text-gray-800 px-2.5 py-1 rounded-full">
                <span>{t("totalRecords")}:</span> <p className='text-[15px] 
                font-semibold'>{allClients.length}</p> 
              </span>
              <button 
                onClick={openmodel} 
                className='capitalize bg-blue-500 px-4 py-2 rounded-sm
                 text-sm font-semibold text-white cursor-pointer
                  hover:bg-blue-600 transition-colors shadow-sm'
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
                  <th className="p-4 whitespace-nowrap">{t("closingDate")}</th>
                  <th className="p-2 whitespace-nowrap">{t("phone")}</th>
                  <th className="p-2 whitespace-nowrap">{t("location")}</th>
                  <th className="p-2 whitespace-nowrap text-center">{t("payLoan")}</th>
                  <th className="p-2 whitespace-nowrap text-center">{t("creditBook")}</th>
                  <th className="p-2 whitespace-nowrap text-center">{t("addPicture")}</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-gray-800">
                {currentClients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 font-medium text-gray-800">{client.id}</td>
                    <td className="p-4 font-semibold text-gray-800 whitespace-nowrap">{client.name}</td>
                    <td className="p-4 whitespace-nowrap font-semibold">{client.dayPayment}</td>
                    <td className="p-4 whitespace-nowrap font-semibold">{client.amountGiven}</td>
                    <td className="p-4 whitespace-nowrap font-medium text-emerald-600">{client.balance}</td>
                    <td className="p-4 whitespace-nowrap text-gray-800">{client.closingDate}</td>
                    <td className="p-4 whitespace-nowrap text-gray-800">{client.phone}</td>
                    <td className="p-4 whitespace-nowrap">{client.location}</td>
                    <td className="p-4 text-center whitespace-nowrap">
                      <button 
                        onClick={() => openModal(client, 'pay')}
                        className="px-3 py-1.5 text-[13px]  bg-blue-500
                         text-white rounded-sm border border-blue-200 cursor-pointer"
                      >
                       {t("payLoan")}
                      </button>
                    </td>
                    <td className="p-4 text-center whitespace-nowrap">
                      <button 
                        onClick={() => openModal(client, 'record')}
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
                        onClick={() => openModal(client, 'addPic')}
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
            <div className="text-[14px] italic sm:text-[14px]  text-gray-800 order-2
             sm:order-1">
             {t("showing")} <span className="text-[15px] text-gray-800">
              {indexOfFirstItem + 1}</span> {t("to")}{' '}
              <span className="text-[15px] text-gray-800">
                {indexOfLastItem > allClients.length ? allClients.length : indexOfLastItem}
              </span>{' '}
              {t("of")} <span className="font-[15px] text-gray-800">
                {allClients.length}</span> {t("clients")}
            </div>

            <div className="inline-flex items-center space-x-2 order-1 sm:order-2 w-full sm:w-auto justify-between sm:justify-end">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`flex-1 sm:flex-initial px-4 py-1.5 text-xs sm:text-sm 
                  font-medium rounded-sm border transition-all duration-200 ${
                  currentPage === 1
                    ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 cursor-pointer active:scale-95'
                }`}
              >
                <ChevronLeft/>
              </button>
              <div className="text-xs font-medium italic text-gray-700 px-3">
               {t("page")}  {currentPage} of {totalPages}
              </div>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`flex-1 sm:flex-initial px-4 py-1.5 text-xs sm:text-sm 
                  font-medium rounded-sm border transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'bg-slate-50 text-gray-300 border-gray-200 cursor-not-allowed'
                    : 'bg-white text-gray-800 border-gray-200 hover:bg-slate-50 cursor-pointer active:scale-95'
                }`}
              >
                <ChevronRight/>
              </button>
            </div>
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
            <New_client onClose={closeclientmodel} />
          </div>
        </div>
      )}

    </div>
  );
};

export default Loans;

