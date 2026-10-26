
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../api";
import { ChevronLeft, ChevronRight } from "lucide-react";
const Demand = () => {
 const [currentPage,setCurrentPage]=useState(1);
 const [totalPages,setTotalPage]=useState(0)
const [messageKey,setmessageKey]=useState(null);
const [size,setsize]=useState(null);
const [currentDemand,setCurrentDemand]=useState([]);
const [totalRecord,setTotalRecord]=useState(null);

const DemandPerPage=15;
const [sortBy, setSortBy] = useState("");

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
  };


const FetchCurrentDemands= async()=>{

   try{
     const res= await api.get(`/current-Demand?limit=${DemandPerPage}&page=${currentPage}`);
     setCurrentDemand(res.data?.demand);
     setTotalPage(res.data?.totalPage);
     setTotalRecord(res.data?.Totaldemand)
    

   }
   catch(err){

   }


}  

const SortedDemands= useMemo(()=>{
  const data=[...(currentDemand??[])];
  switch(sortBy){
    case'date':data.sort((first,second)=>new Date(second.created_at)-new Date(first.created_at));
    break;
    case'amount-desc':data.sort((first,second)=>Number(second.amount)-Number(first.amount));
    break;
    case'amount-asc':data.sort((first,second)=>Number(first.amount)-Number(second.amount));
    break;
    case 'existing-loan':data.sort((first,second)=>Number(second.loan_taken)-Number(first.loan_taken))

  }


  return data

},[currentDemand,sortBy]); 


useEffect(()=>{
  FetchCurrentDemands();
},[currentPage])


  const handleApprove = (id) => {
   
  };

  const handleReject = (id) => {
   
  };

  const handleViewRecords = (name) => {
    alert(`Opening financial and background logs for: ${name}`);
  };

  const HandleNext=()=>{
    if(currentPage<totalPages) setCurrentPage(currentPage+1);
  }
  const HandlePrevious= ()=>{
    if(currentPage >1) setCurrentPage(currentPage-1);
  }

  const {t} = useTranslation() 

  return (
    <div className="bg-gray-50 p-2 font-sans text-gray-800">
      <div className="max-w-full  bg-white rounded-md  border border-gray-100 overflow-hidden">
        
        <div className="p-6 bg-linear-to-r from-blue-700 to-indigo-800 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-2xl font-bold tracking-wide">{t("demandListForClients")}</h3>
            <p className="text-blue-100 text-sm mt-1">{t("allOfficeAndFieldDemands")}</p>
            <p className="text-[14px] text-blue-200 mt-2 bg-blue-200/40 inline-block px-5 py-1 rounded-full">
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
              <option value="existing-loan">{t("existingLoansCounter")}</option>
            </select>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-xs uppercase tracking-wider font-semibold border-b border-gray-200">
                <th className="p-4 whitespace-nowrap">{t("No")}</th>
                
                <th className="p-4 whitespace-nowrap">{t("names")}</th>
                <th className="p-4 whitespace-nowrap">{t("contact")}</th>
                <th className="p-4 whitespace-nowrap">{t("amount")}</th>
                <th className="p-4 whitespace-nowrap">{t("businesstype")}</th>

                <th className="p-4 whitespace-nowrap">{t("businessName")}</th>
                <th className="p-4 whitespace-nowrap">{t("businesslocation")}</th>
                <th className="p-4 whitespace-nowrap">{t("guarantor")}</th>
                <th className="p-4 whitespace-nowrap">{t("guarantorcontact")}</th>
                <th className="p-4 whitespace-nowrap">{t("guarantoraddress")}</th>

                <th className="p-4 whitespace-nowrap">{t("existingLoan")}</th>
                <th className="p-4 whitespace-nowrap">{t("location")}</th>
                <th className="p-4 whitespace-nowrap text-center">{t("status")}</th>
                <th className="p-4 whitespace-nowrap text-center">{t("operation")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[15px]">
              {SortedDemands?.map((client,_idx) => (
                <tr key={_idx} className="hover:bg-gray-50/70 transition-colors">
                  <td className="p-4 text-[15px] text-gray-800 whitespace-nowrap">{(currentPage-1)*DemandPerPage+_idx+1}</td>
                  <td className="p-4 font-semibold text-[15px] text-gray-800 whitespace-nowrap capitalize">{client?.client_name}</td>
                  
                  <td className="p-4 text-gray-800 text-[15px] whitespace-nowrap">{client?.contact}</td>
                  
                  <td className="p-4 font-semibold text-[18px] text-gray-800 whitespace-nowrap">
                    {Number(client?.amount).toFixed(2)} 
                  </td>
                  <td className="p-4 text-gray-800 whitespace-nowrap capitalize">{client?.businesstype}</td>
                  
                  <td className="p-4 text-gray-800 whitespace-nowrap capitalize">{client?.businessName}</td>
                  <td className="p-4 text-gray-800 whitespace-nowrap capitalize">{client?.businesslocation}</td>
                  <td className="p-4 text-gray-800 whitespace-nowrap capitalize">{client?.guarantor}</td>
                  
                  <td className="p-4 text-gray-800 whitespace-nowrap capitalize">{client?.guarantor_contact}</td>
                  <td className="p-4 text-gray-800 whitespace-nowrap capitalize">{client?.guarantor_address}</td>
                 
                  
                  <td className="p-4 font-medium whitespace-nowrap">
                    <span className={client?.loan_taken > 0 ? "text-amber-600 font-semibold" : "text-gray-600"}>
                      {client?.loan_taken} Loan Account{client?.loan_taken!== 1 && 's'}
                    </span>
                  </td>
                  
                  <td className="p-4 text-gray-700 capitalize text-[15px] tracking-wider whitespace-nowrap">{client?.client_location}</td>
                  <td className="p-4 text-center whitespace-nowrap">
                    <span className={`text-xs font-bold px-3 py-1 rounded-sm capitalize cursor-pointer ${
                      client?.status === t('approved') ? 'bg-green-100 text-green-700' :
                      client?.status === t('Rejected') ? 'bg-red-100 text-red-700' 
                      :client.status==='confirmed' ? 'bg-blue-50 text-blue-600': 'bg-yellow-500 text-white'
                    }`}>
                      {client?.status}
                    </span>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex justify-center items-center gap-2">
                      <button 
                        onClick={() => handleViewRecords(client?.client_name)}
                        className="text-xs bg-gray-100 hover:bg-blue-50 text-blue-600 font-medium py-1.5 px-3 rounded border border-gray-200 hover:border-blue-200 transition-all"
                      >
                        {t("records")}
                      </button>
                      
                      <button 
                    
                        className="text-xs bg-green-600 hover:bg-green-700
                         disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
                          text-white font-medium py-1.5 px-3 rounded transition-all shadow-sm"
                      >
                        {t("approve")}
                      </button>
                      
                      <button 
                        
                        className="text-xs bg-red-50 hover:bg-red-100 disabled:opacity-40
                         disabled:cursor-not-allowed text-red-600 font-medium py-1.5 px-3
                          rounded border border-red-200 transition-all cursor-pointer"
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
        
         <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between ">
          <div className="flex gap-1   text-[15px] italic">
          <span className="flex gap-1.5 text-gray-700"><p>showing</p>{(currentPage-1)*DemandPerPage+1} </span>
          <span className="flex gap-1.5 text-gray-700"><p>to</p>:{Math.min(currentPage*DemandPerPage,totalRecord)} </span>
          <span className="flex gap-1.5 text-gray-700"><p>of</p>:{totalRecord}<p>Demand{totalRecord>1 &&'s'}</p> </span>
        </div>
        <div className="flex gap-3">
          <button onClick={HandlePrevious}
          disabled={currentPage===1}
          className="bg-gray-200 p-1.5 px-2 rounded-sm text-gray-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"><ChevronLeft/></button>
          <button
          disabled={currentPage===totalPages}
           onClick={HandleNext} className="bg-gray-200 p-1.5 px-2 rounded-sm text-gray-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"><ChevronRight/></button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Demand;