
import { useState } from "react";
import { useTranslation } from "react-i18next";
const Demand = () => {
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

  const {t} = useTranslation() 

  return (
    <div className="bg-gray-50 p-2 font-sans text-gray-800">
      <div className="max-w-full  bg-white rounded-md  border border-gray-100 overflow-hidden">
        
        <div className="p-6 bg-linear-to-r from-blue-700 to-indigo-800 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold tracking-wide">{t("demandListForClients")}</h3>
            <p className="text-blue-100 text-sm mt-1">{t("allOfficeAndFieldDemands")}</p>
            <p className="text-xs text-blue-200 mt-2 bg-blue-900/40 inline-block px-3 py-1 rounded-full">
              {t("sortRiskMetrics")}
            </p>
          </div>

          <div className="flex  flex-col sm:flex-row items-center gap-3 bg-white/10 p-2 rounded-lg backdrop-blur-sm self-stretch md:self-auto justify-between">
            <span className="text-sm font-semibold tracking-wider uppercase text-blue-200">{t("sortBy")}:</span>
            <select 
              value={sortBy} 
              onChange={handleSortChange}
              className="bg-gray-900 text-white text-sm rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            >
              <option value="date">{t("dateRegistered")}</option>
              <option value="amount-desc">{t("demandAmountHighToLow")}</option>
              <option value="amount-asc">{t("demandAmountLowToHigh")}</option>
              <option value="good-paying">{t("goodPayingLowUnpaidDays")}</option>
              <option value="existing-loan">{t("existingLoansCounter")}</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider font-semibold border-b border-gray-200">
                <th className="p-4 whitespace-nowrap">{t("names")}</th>
                <th className="p-4 whitespace-nowrap">{t("contact")}</th>
                <th className="p-4 whitespace-nowrap">{t("amount")}</th>
                <th className="p-4 whitespace-nowrap">{t("business")}</th>
                <th className="p-4 whitespace-nowrap">{t("type")}</th>
                <th className="p-4 whitespace-nowrap">{t("existingLoan")}</th>
                <th className="p-4 whitespace-nowrap">{t("location")}</th>
                <th className="p-4 whitespace-nowrap">{t("newClient")}</th>
                <th className="p-4 whitespace-nowrap text-center">{t("status")}</th>
                <th className="p-4 whitespace-nowrap text-center">{t("operation")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {demands.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="p-4 font-semibold text-[15px] text-gray-800 whitespace-nowrap">{client.name}</td>
                  
                  <td className="p-4 text-gray-800 text-[15px] whitespace-nowrap">{client.contact}</td>
                  
                  <td className="p-4 font-semibold text-[18px] text-gray-800 whitespace-nowrap">
                    {client.amount.toLocaleString()} 
                  </td>
                  
                  <td className="p-4 text-gray-800 whitespace-nowrap">{client.business}</td>
                  
                  <td className="p-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                      client.type === "Office" ? "bg-purple-100 text-purple-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {client.type}
                    </span>
                  </td>
                  
                  {/* Existing Loans */}
                  <td className="p-4 font-medium whitespace-nowrap">
                    <span className={client.existingLoans > 0 ? "text-amber-600 font-semibold" : "text-gray-400"}>
                      {client.existingLoans} Loan Account{client.existingLoans !== 1 && 's'}
                    </span>
                  </td>
                  
                  {/* Location */}
                  <td className="p-4 text-gray-600 uppercase text-xs tracking-wider whitespace-nowrap">{client.location}</td>
                  
                  {/* New Client badge */}
                  <td className="p-4 font-medium text-center whitespace-nowrap ">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      client.newClient.toUpperCase() === t('yes') ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {client.newClient}
                    </span>
                  </td>

                  {/* Operational Status */}
                  <td className="p-4 text-center whitespace-nowrap">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full cursor-pointer ${
                      client.status === t('approved') ? 'bg-green-100 text-green-700' :
                      client.status === t('Rejected') ? 'bg-red-100 text-red-700' : 'bg-yellow-500 text-white'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  
                  {/* Operations Column with separated clean functional layout */}
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-2">
                      <button 
                        onClick={() => handleViewRecords(client.name)}
                        className="text-xs bg-gray-100 hover:bg-blue-50 text-blue-600 font-medium py-1.5 px-3 rounded border border-gray-200 hover:border-blue-200 transition-all"
                      >
                        {t("records")}
                      </button>
                      
                      <button 
                        disabled={client.status !== t("pending")}
                        onClick={() => handleApprove(client.id)}
                        className="text-xs bg-green-600 hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-1.5 px-3 rounded transition-all shadow-sm"
                      >
                        {t("approve")}
                      </button>
                      
                      <button 
                        disabled={client.status !== t('pending')}
                        onClick={() => handleReject(client.id)}
                        className="text-xs bg-red-50 hover:bg-red-100 disabled:opacity-40 disabled:cursor-not-allowed text-red-600 font-medium py-1.5 px-3 rounded border border-red-200 transition-all"
                      >
                        {t("reject")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer info block */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 text-xs text-gray-500 text-right">
          {t("showingTotalLoanRequests")} {demands.length}
        </div>
      </div>
    </div>
  );
};

export default Demand;