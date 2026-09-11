


import  { useState } from 'react';
import Credit_Record from '../client/Client_record';
import { Search, BookOpen, X, Info } from 'lucide-react';

const Field_Paid = () => {
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
    { id: 1, name: "Webale Precious", daily: "10,000", total: "250,000", balance: "200,000", date: "6/23/2026", phone: "0783124352", loc: "Gasani" },
    { id: 2, name: "Kalangira Faizo", daily: "10,000", total: "250,000", balance: "200,000", date: "6/23/2026", phone: "0783124352", loc: "Gasani" },
    { id: 3, name: "John Doe", daily: "10,000", total: "250,000", balance: "200,000", date: "6/23/2026", phone: "0783124352", loc: "Gasani" },
    { id: 4, name: "Baguma Willy", daily: "10,000", total: "250,000", balance: "200,000", date: "6/23/2026", phone: "0783124352", loc: "Gasani" },
    { id: 5, name: "Mugisha Dan", daily: "10,000", total: "250,000", balance: "200,000", date: "6/23/2026", phone: "0783124352", loc: "Gasani" },
    { id: 6, name: "Ahisibwe Byamukana", daily: "10,000", total: "250,000", balance: "200,000", date: "6/23/2026", phone: "0783124352", loc: "Gasani" }
  ];

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-800">
      <div className="flex w-full ">
        <div className="w-full">
          <div className="m-3">
            <h2 className="text-center text-xl font-bold mb-4">
              Office Payment Details On: <span className="text-blue-600">5/24/2026</span>
            </h2>

            <div className="w-full bg-blue-100 border border-blue-200 p-4 rounded-md flex items-start gap-3">
              <Info className="text-blue-600 shrink-0 mt-0.5" size={20} />
              <div>
                <span className="font-medium block text-blue-900 capitalize">These are the Clients who have Paid.</span>
                <span className="text-sm text-blue-800 block mt-1">
                  You can modify and correct incorrect payments right now before the reporting window closes.
                  <p className="text-red-600 font-semibold mt-1">After reports are sent, no modification access will be allowed.</p>
                </span>
              </div>
            </div>

            <div className="flex justify-end w-full mt-4">
              <div className="relative w-full md:w-[45%]">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Search size={18} />
                </span>
                <input 
                  className="w-full bg-white border border-gray-200 text-sm pl-10 pr-4 py-2.5
                   rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 " 
                  type="search" 
                  placeholder="Enter the username" 
                />
              </div>
            </div>
          </div>

          {/* List of Clients (Table Container) */}
          <div className="w-full overflow-x-auto px-3">
            <div className="inline-block min-w-full align-middle border border-gray-200 rounded-lg shadow">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">No</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-left">Clients</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">Day Payments</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">Balance</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">Amount Given</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">Credit Book</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 text-center text-sm">
                  {clientData.map((client, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-medium text-gray-500">{client.id}</td>
                      <td className="p-3 text-left font-semibold text-gray-900 whitespace-nowrap">{client.name}</td>
                      <td className="p-3 text-green-600 font-medium">{client.daily}</td>
                      <td className="p-3 text-gray-800 font-medium">{client.balance}</td>
                      <td className="p-3  font-medium">{client.total}</td>
                      <td className="p-3">
                        <button 
                          onClick={() => openModal('record', client.name)}
                          className="inline-flex items-center cursor-pointer gap-1 whitespace-nowrap bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition shadow-sm"
                        >
                          <BookOpen size={14} /> View Record
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
                  Credit Book Details ({selectedClient})
                </h3>
              </div>
              <button 
                onClick={closeModal} 
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition"
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

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl shrink-0 flex justify-end">
              <button 
                onClick={closeModal} 
                className="w-full sm:w-auto px-5 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg text-sm transition shadow-sm"
              >
                Close Records
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Field_Paid;