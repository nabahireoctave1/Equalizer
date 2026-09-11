





import { Search } from "lucide-react";
import New_client from "../cashiers/New_Client";
import  { useState } from "react";

const Old_client = () => {
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const closemodel=()=>setIsNewClientModalOpen(false)

  const clients = [
    { id: 1, name: "John Doe", loans: 5, date: "12/5/2026", amount: "6,000,000", days: 7, reasoned: "YES" },
    { id: 2, name: "Jane Smith", loans: 7, date: "12/5/2026", amount: "6,000,000", days: 7, reasoned: "YES" },
    { id: 3, name: "Alex Jones", loans: 7, date: "12/5/2026", amount: "6,000,000", days: 7, reasoned: "YES" },
  ];

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
               bg-blue-400 text-white mt-1">
                130 Total old clients
              </span>
            </div>
            
            <div className="relative w-full md:w-72">
              <span className="absolute top-2.5 rigth-0 mx-2">
                <Search size={18}/>
              </span>
              <input
                type="text"

                placeholder="Search..."
                className="w-full pl-8 pr-10 py-2  border border-gray-300 rounded-sm text-sm 
                disabled:cursor-not-allowed
                focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="max-w-7xl text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-700 border-b border-gray-200">
                  <th className="py-4 px-6 whitespace-nowrap">Names</th>
                  <th className="py-4 px-6 whitespace-nowrap">Loans Taken</th>
                  <th className="py-4 px-6 whitespace-nowrap">Last Payment Date</th>
                  <th className="py-4 px-6 whitespace-nowrap">Last Loaned Amount</th>
                  <th className="py-4 px-6 whitespace-nowrap">Unpaid Days Consisted</th>
                  <th className="py-4 px-6 whitespace-nowrap">Reasoned</th>
                  <th className="py-4 px-6 whitespace-nowrap text-center">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-800 whitespace-nowrap">{client.name}</td>
                    <td className="py-4 px-6 text-gray-800 whitespace-nowrap">{client.loans}</td>
                    <td className="py-4 px-6 text-gray-800 whitespace-nowrap">{client.date}</td>
                    <td className="py-4 px-6 font-semibold text-[18px] text-gray-800 whitespace-nowrap">
                      {client.amount}
                      </td>
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <span className="px-2 py-1 rounded bg-amber-50 text-amber-700 text-xs font-medium">
                        {client.days} Days
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs 
                      font-medium bg-green-600 text-white">
                        {client.reasoned}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center">
                        <button 
                          onClick={() => setIsNewClientModalOpen(true)}
                          className="px-4 py-1.5 whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-md transition-colors shadow-sm cursor-pointer"
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
      </div>

     

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
              <New_client onClose={closemodel} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Old_client;