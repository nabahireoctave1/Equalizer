
import { useState } from 'react';
// Make sure to install lucide-react: npm install lucide-react
import { Search, Landmark, BookOpen, X, Info } from 'lucide-react';

const All_field_clients = () => {
  const [searchQuery, setSearchQuery] = useState('');

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
    { id: 2, name: "Kobusingye Sarah", daily: "5,000", total: "150,000", balance: "100,000", date: "6/25/2026", phone: "0772345678", loc: "Town Center" },
    { id: 3, name: "Mwesigwa John", daily: "15,000", total: "400,000", balance: "350,000", date: "6/20/2026", phone: "0704567890", loc: "Kibuli" },
    { id: 4, name: "Namubiru Aisha", daily: "8,000", total: "200,000", balance: "180,000", date: "6/28/2026", phone: "0751122334", loc: "Nansana" },
    { id: 5, name: "Byaruhanga David", daily: "12,000", total: "300,000", balance: "240,000", date: "6/22/2026", phone: "0798877665", loc: "Makerere" },
    { id: 6, name: "Akello Grace", daily: "10,000", total: "250,000", balance: "200,000", date: "6/23/2026", phone: "0783124352", loc: "Gasani" }
  ];

  const filteredClients = clientData.filter((client) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;

    return (
      client.name.toLowerCase().includes(query) ||
      client.phone.toLowerCase().includes(query) ||
      client.loc.toLowerCase().includes(query) ||
      client.date.toLowerCase().includes(query)
    );
  });

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-800">
      <div className="flex w-full">
        <div className="w-full">
          <div className="m-3">
            <h2 className="text-center text-xl font-bold mb-4">
              Office Payment Details On: <span className="text-blue-600">5/24/2026</span>
            </h2>

            <div className="w-full bg-blue-100 border border-blue-200 p-4 rounded-lg flex items-start gap-3">
              <Info className="text-blue-600 shrink-0 mt-0.5" size={20} />
              <div>
                <span className="font-medium block text-blue-900">These are the all Clients for webale precious </span>
                <span className="text-sm text-blue-800 block mt-1">
                   These are the important information for the field clients.
                  <p className="text-red-600 font-semibold mt-1">No modification access for client on this page.</p> 
                </span>
              </div>
            </div>

            <div className="flex justify-end w-full mt-4">
              <div className="relative w-full md:w-[45%]">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Search size={18} />
                </span>
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-300 pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" 
                  type="search" 
                  placeholder="Search by name, phone, location, or date..." 
                />
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-auto px-3">
            <div className="inline-block min-w-full align-middle border border-gray-200 rounded-lg shadow whitespace-nowrap">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">No</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-left">Clients</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">Day Payments</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">Balance</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">Amount Given</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">Closing Date</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">Phone</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">Location</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">Pay Loan</th>
                    <th className="p-3 text-sm font-semibold tracking-wider text-center">Credit Book</th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 text-center text-sm">
                  {filteredClients.length > 0 ? (
                    filteredClients.map((client, index) => (
                      <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 font-medium text-gray-500">{index + 1}</td>
                        <td className="p-3 text-left font-semibold text-gray-900 whitespace-nowrap">{client.name}</td>
                        <td className="p-3 text-green-600 font-medium">{client.daily}</td>
                        <td className="p-3 text-red-500 font-medium">{client.balance}</td>
                        <td className="p-3 font-medium">{client.total}</td>
                        <td className="p-3 whitespace-nowrap">{client.date}</td>
                        <td className="p-3 whitespace-nowrap">{client.phone}</td>
                        <td className="p-3">{client.loc}</td>
                        <td className="p-3">
                          <button 
                            onClick={() => openModal('pay', client.name)}
                            className="inline-flex items-center cursor-pointer gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition shadow-sm"
                          >
                            <Landmark size={14} /> Pay Loan
                          </button>
                        </td>
                        <td className="p-3">
                          <button 
                            onClick={() => openModal('record', client.name)}
                            className="inline-flex items-center cursor-pointer gap-1 bg-amber-500 hover:bg-amber-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition shadow-sm"
                          >
                            <BookOpen size={14} /> View Record
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="py-8 text-center text-gray-500">
                        No clients matching your search criteria were found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {activeModal && (
        <div 
          onClick={closeModal} 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative transform transition-all"
          >
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition"
            >
              <X size={20} />
            </button>

            {activeModal === 'pay' && (
              <div>
                <div className="flex items-center gap-2 mb-4 text-blue-600">
                  <Landmark size={24} />
                  <h3 className="text-xl font-bold">Process Loan Payment</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Account processing adjustments for client <strong className="text-gray-900">{selectedClient}</strong>.
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Payment Amount</label>
                    <input type="number" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter amount to pay" />
                  </div>
                  <button onClick={closeModal} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition mt-2">
                    Submit Payment
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'record' && (
              <div>
                <div className="flex items-center gap-2 mb-4 text-amber-500">
                  <BookOpen size={24} />
                  <h3 className="text-xl font-bold">Credit Book History</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Showing historical ledgers for client <strong className="text-gray-900">{selectedClient}</strong>.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 max-h-48 overflow-y-auto space-y-2 text-xs">
                  <div className="flex justify-between border-b pb-1 text-gray-500"><p>May 20, 2026</p><p className="text-green-600 font-semibold">-10,000 UGX</p></div>
                  <div className="flex justify-between border-b pb-1 text-gray-500"><p>May 15, 2026</p><p className="text-green-600 font-semibold">-15,000 UGX</p></div>
                  <div className="flex justify-between pb-1 text-gray-500"><p>Initial Disbursal</p><p className="text-red-500 font-semibold">+250,000 UGX</p></div>
                </div>
                <button onClick={closeModal} className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded-lg transition mt-4">
                  Close Records
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default All_field_clients;



