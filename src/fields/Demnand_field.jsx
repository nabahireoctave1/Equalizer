import { useState } from "react";

const Demand_field = () => {
  const [demands, setDemands] = useState([
    {
      id: 1,
      name: "Webale Precious",
      contact: "07783647456",
      amount: 70000000,
      business: "Software Developer",
      type: "Office",
      existingLoans: 3,
      location: "IHUNGA",
      newClient: "YES",
      status: "Pending",
      dateRegistered: "2026-05-15",
      unpaidDays: 0,
    },
    {
      id: 2,
      name: "Kansiime Brenda",
      contact: "0752987654",
      amount: 15000000,
      business: "Retail Shop",
      type: "Field",
      existingLoans: 0,
      location: "MBARARA",
      newClient: "No",
      status: "Pending",
      dateRegistered: "2026-05-20",
      unpaidDays: 12,
    },
    {
      id: 3,
      name: "Tumusiime Alex",
      contact: "0782112233",
      amount: 45000000,
      business: "Hardware Store",
      type: "Office",
      existingLoans: 1,
      location: "KAMPALA",
      newClient: "No",
      status: "Pending",
      dateRegistered: "2026-05-10",
      unpaidDays: 4,
    },
  ]);

  const [sortBy, setSortBy] = useState("");
  const [SearchQuery, setSearchQuery] = useState("");

  // Handle Sort changes
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);

    let sortedData = [...demands];
    if (value === "date") {
      sortedData.sort((a, b) => new Date(b.dateRegistered) - new Date(a.dateRegistered));
    } else if (value === "amount-desc") {
      sortedData.sort((a, b) => b.amount - a.amount);
    } else if (value === "amount-asc") {
      sortedData.sort((a, b) => a.amount - b.amount);
    } else if (value === "good-paying") {
      sortedData.sort((a, b) => a.unpaidDays - b.unpaidDays);
    } else if (value === "existing-loan") {
      sortedData.sort((a, b) => b.existingLoans - a.existingLoans);
    }
    setDemands(sortedData);
  };

  // Action Handlers
  const handleApprove = (id) => {
    setDemands(demands.map(d => d.id === id ? { ...d, status: "Approved" } : d));
    alert(`Demand ID ${id} has been Approved!`);
  };

  const handleReject = (id) => {
    setDemands(demands.map(d => d.id === id ? { ...d, status: "Rejected" } : d));
    alert(`Demand ID ${id} has been Rejected.`);
  };

  const handleViewRecords = (name) => {
    alert(`Opening financial and background logs for: ${name}`);
  };

  // Fixed error: filter from state array 'demands' instead of setDemands function
  const filteredClients = demands.filter((client) => {
    const Query = SearchQuery.toLowerCase().trim();
    if (!Query) return true;

    return (
      client.name.toLowerCase().includes(Query) || 
      client.contact.toLowerCase().includes(Query) || 
      client.location.toLowerCase().includes(Query) || 
      client.dateRegistered.toLowerCase().includes(Query)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        
        <div className="p-6 bg-linear-to-r from-blue-700 to-indigo-800 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold tracking-wide">Demanda List For Field Clients</h3>
            <p className="text-blue-100 text-sm mt-1"> Field Demand Lists.</p>
            <p className="text-xs text-blue-200 mt-2 bg-blue-900/40 inline-block px-3 py-1 rounded-full">
               Sort by date, demand amount, or track historical risk metrics instantly.
            </p>
          </div>
          
          <input 
            type="search" 
            value={SearchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Search name, location, phone, date..."
            className="bg-white/10 border border-white/20 text-white placeholder-blue-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-auto"
          />

          <div className="flex flex-col sm:flex-row items-center gap-3 bg-white/10 p-2 rounded-lg backdrop-blur-sm self-stretch md:self-auto justify-between">
            <span className="text-sm font-semibold tracking-wider uppercase text-blue-200">Sort By:</span>
            <select 
              value={sortBy} 
              onChange={handleSortChange}
              className="bg-gray-900 text-white text-sm rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            >
              <option value="date">Date Registered</option>
              <option value="amount-desc">Demand Amount (High to Low)</option>
              <option value="amount-asc">Demand Amount (Low to High)</option>
              <option value="good-paying">Good Paying (Low Unpaid Days)</option>
              <option value="existing-loan">Existing Loans Counter</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider font-semibold border-b border-gray-200">
                <th className="p-4 whitespace-nowrap">No</th>
                <th className="p-4 whitespace-nowrap">Names</th>
                <th className="p-4 whitespace-nowrap">Contact</th>
                <th className="p-4 whitespace-nowrap">Amount</th>
                <th className="p-4 whitespace-nowrap">Business</th>
                <th className="p-4 whitespace-nowrap">Existing Loan</th>
                <th className="p-4 whitespace-nowrap">Location</th>
                <th className="p-4 whitespace-nowrap text-center">New Client</th>
                <th className="p-4 whitespace-nowrap text-center">Status</th>
                <th className="p-4 whitespace-nowrap text-center">Operation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredClients.length > 0 ? ( 
                filteredClients.map((client, index) => (
                  <tr key={client.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* Index Number */}
                    <td className="p-4 font-semibold text-gray-900 whitespace-nowrap">{index + 1}</td>
                    
                    {/* Name */}
                    <td className="p-4 font-semibold text-gray-900 whitespace-nowrap">{client.name}</td>
                    
                    {/* Contact */}
                    <td className="p-4 text-gray-500 font-mono whitespace-nowrap">{client.contact}</td>
                    
                    {/* Amount formatted to currency layout */}
                    <td className="p-4 font-bold text-gray-900 whitespace-nowrap">
                      {client.amount.toLocaleString()} UGX
                    </td>
                    
                    {/* Business */}
                    <td className="p-4 text-gray-600 whitespace-nowrap">{client.business}</td>
                    
                    {/* Existing Loans */}
                    <td className="p-4 font-medium whitespace-nowrap">
                      <span className={client.existingLoans > 0 ? "text-amber-600 font-semibold" : "text-gray-400"}>
                        {client.existingLoans} Loan Account{client.existingLoans !== 1 && 's'}
                      </span>
                    </td>
                    
                    {/* Location */}
                    <td className="p-4 text-gray-600 uppercase text-xs tracking-wider whitespace-nowrap">{client.location}</td>
                    
                    {/* New Client badge */}
                    <td className="p-4 font-medium text-center whitespace-nowrap">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        client.newClient.toUpperCase() === 'YES' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {client.newClient}
                      </span>
                    </td>

                    {/* Operational Status */}
                    <td className="p-4 text-center whitespace-nowrap">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full cursor-pointer ${
                        client.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        client.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-500 text-white'
                      }`}>
                        {client.status}
                      </span>
                    </td>
                    
                    {/* Operations Column */}
                    <td className="p-4">
                      <div className="flex justify-center items-center gap-2">
                        <button 
                          onClick={() => handleViewRecords(client.name)}
                          className="text-xs bg-gray-100 hover:bg-blue-50 text-blue-600 font-medium py-1.5 px-3 rounded border border-gray-200 hover:border-blue-200 transition-all"
                        >
                          Records
                        </button>
                        
                        <button 
                          disabled={client.status !== "Pending"}
                          onClick={() => handleApprove(client.id)}
                          className="text-xs bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-1.5 px-3 rounded transition-all shadow-sm"
                        >
                          Approve
                        </button>
                        
                        <button 
                          disabled={client.status !== "Pending"}
                          onClick={() => handleReject(client.id)}
                          className="text-xs bg-red-50 hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed text-red-600 font-medium py-1.5 px-3 rounded border border-red-200 transition-all"
                        >
                          Reject
                        </button>
                      </div>
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
        
        {/* Footer info block */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 text-xs text-gray-500 text-right">
          Showing {filteredClients.length} of {demands.length} total loan application request entries.
        </div>
      </div>
    </div>
  );
};

export default Demand_field;


