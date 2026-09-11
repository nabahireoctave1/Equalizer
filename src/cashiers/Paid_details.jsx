


import  { useState } from 'react';
import Credit_Record from '../client/Client_record';
import { Search, BookOpen, X, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Paid = () => {
  const {t} = useTranslation();
  const [activeModal, setActiveModal] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  const openModal = (type, clientName) => {
    setSelectedClient(clientName);
    setActiveModal(type);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedClient(null);
  };

  const clientData = [
    { id: 1, name: "Webale Precious", daily: "10,000", total: "250,000", balance: "200,000", date: "06-23-2026", phone: "0783124352", loc: "Gasani" },
    { id: 2, name: "Kalangira Faizo", daily: "10,000", total: "250,000", balance: "200,000", date: "06-23-2026", phone: "0783124352", loc: "Gasani" },
    { id: 3, name: "John Doe", daily: "10,000", total: "250,000", balance: "200,000", date: "06-23-2026", phone: "0783124352", loc: "Gasani" },
    { id: 4, name: "Baguma Willy", daily: "10,000", total: "250,000", balance: "200,000", date: "06-23-2026", phone: "0783124352", loc: "Gasani" },
    { id: 5, name: "Mugisha Dan", daily: "10,000", total: "250,000", balance: "200,000", date: "06-23-2026", phone: "0783124352", loc: "Gasani" },
    { id: 6, name: "Ahisibwe Byamukana", daily: "10,000", total: "250,000", balance: "200,000", date: "06-23-2026", phone: "0783124352", loc: "Gasani" }
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 rounded-md text-gray-800">
      <div className=" w-full ">
        <div className='flex  flex-col sm:flex-row justify-between md:items-center space-y-1
        p-3 top-0 sticky z-50 border-b border-gray-200 bg-white'> 
          <div className=''>
            <h2 className="text-sm  uppercase font-semibold mb-4">
              {t("officePaymentDetails")} 
            </h2>
            
            <select className='capitalize text-[13px] border border-gray-300 w-full
            md:w-full sm:w-43 p-2 outline-none focus:ring-2 focus:ring-blue-400 
             rounded-sm cursor-pointer' type="date" >
              <option value="today">to day</option>
              <option value="yesterday">yester day</option>
              <option value="last7week">last 7 days </option>
              <option value="lastweek">last week </option>
              <option value="monthly">Last Month</option>
                     </select>


            </div>
         

              <div className="relative w-full md:w-[45%]">
                <span className="absolute inset-y-0 left-0 flex items-center 
                pl-3 pointer-events-none text-gray-400">
                  <Search size={18} />
                </span>
                <input 
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

          <div className="w-full overflow-x-auto px-3">
            <div className="inline-block min-w-full align-middle border border-gray-200 rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">{t("no")}</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-left">{t("clients")}</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">{t("dayPayments")}</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">{t("amountGiven")}</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">{t("balance")}</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">{t("closingDate")}</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">{t("phone")}</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">{t("location")}</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">{t("creditBook")}</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 text-center text-sm">
                  {clientData.map((client, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-medium text-gray-500">{client.id}</td>
                      <td className="p-3 text-left font-semibold text-gray-900 whitespace-nowrap">{client.name}</td>
                      <td className="p-3 text-green-600 font-medium">{client.daily}</td>
                      <td className="p-3 font-medium">{client.total}</td>
                      <td className="p-3 text-red-500 font-medium">{client.balance}</td>
                      <td className="p-3 whitespace-nowrap">{client.date}</td>
                      <td className="p-3 whitespace-nowrap">{client.phone}</td>
                      <td className="p-3">{client.loc}</td>
                      <td className="p-3">
                        <button 
                          onClick={() => openModal('record', client.name)}
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


