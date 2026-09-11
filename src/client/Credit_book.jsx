


import  { useState } from 'react';
import { LogOut, Printer, FileText, X } from 'lucide-react';
import Apply_New_Loan from './Apply_new_loan';
import Support from '../cashiers/Overview/Support';
import i18n from '../pages/i18n';
import { useTranslation } from  'react-i18next'

function changeLanguage(lang){
  i18n.changeLanguage(lang);
}
const Credit_Book = () => {

  const [showApplyLoan, setShowApplyLoan] = useState(false);

  const clientInfo = {
    name: "Webale Precious",
    guarantor: "Kobusinge Sarah",
    loanAmount: 120000,
    dailyPayment: 4000,
    dateFrom: "02-03-2026",
    dateTo: "02-04-2026",
    fines: "12000",
    currentBalance: 116000 
  };

  const paymentRecords = [
    { date: "02-03-2026", amount: 4000, balance: 116000, officer: "Gungu" },
    { date: "03-03-2026", amount: 4000, balance: 112000, officer: "Office" },
    { date: "04-03-2026", amount: 4000, balance: 108000, officer: "Gungu" },
    { date: "05-03-2026", amount: 4000, balance: 104000, officer: "Kamasa" },
    { date: "06-03-2026", amount: 4000, balance: 100000, officer: "Gungu" },
  ];

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Credit Book - Payment Records</title>');
    printWindow.document.write('<style>body { font-family: Arial, sans-serif; padding: 20px; } table { width: 100%; border-collapse: collapse; margin-top: 20px; } th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } th { background-color: #f2f2f2; }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(`<h2>Akea Service - Credit Book</h2>`);
    printWindow.document.write(`<p><strong>${t("clientName")}:</strong> ${clientInfo.name}</p>`);
    printWindow.document.write(`<p><strong>${t("guarantor")}:</strong> ${clientInfo.guarantor}</p>`);
    printWindow.document.write(`<p><strong>${t("remainingBalance")}:</strong> UGX ${clientInfo.currentBalance.toLocaleString()}</p>`);
    printWindow.document.write(`<h3>${t("paymentCollectionHistory")}</h3>`);
    printWindow.document.write(`<table><thead><tr><th>${t("paymentDate")}</th><th>${t("amountPaid")}</th><th>${t("resultingBalance")}</th><th>${t("accountOfficer")}</th></tr></thead><tbody>`);
    
    paymentRecords.forEach(record => {
      printWindow.document.write(`<tr><td>${record.date}</td><td>UGX ${record.amount.toLocaleString()}</td><td>UGX ${record.balance.toLocaleString()}</td><td>${record.officer}</td></tr>`);
    });

    printWindow.document.write('</tbody></table>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handlePDF = () => {
    alert(t("preparingPdf"));
    handlePrint();
  };
     
  const {t} = useTranslation()



  return (
    
     <div className="min-h-screen bg-gray-50 pt-5 px-6  font-sans relative"> 
        
          <div className="flex justify-center p-2">
                 
            <span className=' px-2 capitalize text-sm'> {t("selectlanguage")}</span>
             
              
             <div className=" flex cursor-pointer">
            
              
              <select onChange={(e) => changeLanguage(e.target.value)}
                className="bg-none text-xs px-2 text-slate-700 border-none uppercase"
              >
                <option  value="en">English</option>
                <option  value="lu">Luganda</option>
                <option  value="nyn">Runyakore</option>
                <option  value="rw">Kinyarwanda</option>
                <option  value="sw">Swahili</option>
              </select>
              

             
            
            </div>
            </div>
      <div className="w-full mx-auto space-y-6 ">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-5  px-5
        border-b border-gray-100 gap-4">
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">{t("companyName")}</h1>
            <p className="text-sm text-gray-500 mt-1 py-2">{t("creditBookTitle")}</p>
           
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowApplyLoan(true)}
              className="inline-flex items-center justify-center cursor-pointer w-full sm:w-auto px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 shadow-sm transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
              {t("applyNewLoan")}
            </button>

            <button 
              onClick={() => alert('Logged out successfully.')}
              className="inline-flex items-center cursor-pointer justify-center w-full sm:w-auto px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm transition-colors duration-200"
            >
              <LogOut className="w-4 h-4 mr-2" /> {t("logout")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          <div className="bg-white rounded-md shadow-sm border border-gray-100 p-6">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">{t("clientInformation")}</h2>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-400 block">{t("clientName")}</label>
                <span className="text-lg font-medium text-gray-800">{clientInfo.name}</span>
              </div>
              <div>
                <label className="text-xs text-gray-400 block">{t("guarantor")}</label>
                <span className="text-md font-medium text-gray-700">{clientInfo.guarantor}</span>
              </div>
              <div className="pt-2 grid grid-cols-2 gap-2 border-t border-gray-100 text-[14px] text-gray-700">
                <div className='uppercase font-semibold'>{t("from")}: {clientInfo.dateFrom}</div>
                <div className='uppercase font-semibold'>{t("to")}: {clientInfo.dateTo}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">{t("loanStructure")}</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{t("totalLoanPrincipal")}</span>
                <span className="text-lg font-semibold text-gray-900">UGX {clientInfo.loanAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center bg-green-50 p-2.5 rounded-md">
                <span className="text-sm text-green-700 font-medium">{t("dailyInstallment")}</span>
                <span className="text-md font-bold text-green-700">UGX {clientInfo.dailyPayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center bg-orange-50 p-2.5 rounded-lg">
                <span className="text-sm text-orange-700 font-medium">{t("finesPenalties")}</span>
                <span className="text-md font-bold text-orange-700">UGX {Number(clientInfo.fines).toLocaleString()} </span>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-green-600 to-emerald-700 rounded-md shadow-md p-6 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-semibold text-emerald-100 uppercase tracking-wider opacity-80">{t("remainingBalance")}</h2>
              <p className="text-3xl font-bold mt-2">UGX {clientInfo.currentBalance.toLocaleString()}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-emerald-500/30 flex justify-between text-xs text-emerald-100">
              <span>{t("status")}</span>
              <span className="bg-emerald-500/40 px-2 py-0.5 rounded-full font-medium">{t("unpaid")}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-lg font-semibold text-gray-800">{t("paymentCollectionHistory")}</h3>
            <div className="flex items-center gap-3">
              <button 
                onClick={handlePDF}
                className='bg-blue-600 hover:bg-blue-700 px-5 text-sm cursor-pointer py-2 rounded-md font-semibold text-white inline-flex items-center gap-2 shadow-sm transition-colors'
              >
                <FileText className="w-4 h-4" /> {("pdf")}
              </button>
              <button 
                onClick={handlePrint}
                className='bg-slate-700 hover:bg-slate-800 px-5 text-sm cursor-pointer py-2 rounded-md font-semibold text-white inline-flex items-center gap-2 shadow-sm transition-colors'
              >
                <Printer className="w-4 h-4" /> {("print")}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto ">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3.5 whitespace-nowrap">{t("paymentDate")}</th>
                  <th className="px-6 py-3.5 whitespace-nowrap">{t("amountPaid")}</th>
                  <th className="px-6 py-3.5 whitespace-nowrap">{t("resultingBalance")}</th>
                  <th className="px-6 py-3.5 whitespace-nowrap">{("accountOfficer")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                {paymentRecords.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{record.date}</td>
                    <td className="px-6 py-4 text-emerald-600 font-semibold whitespace-nowrap">
                       UGX {record.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-mono text-gray-700 whitespace-nowrap">
                      UGX {record.balance.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-gray-200 text-[10px] font-bold flex items-center justify-center text-gray-600 uppercase">
                          {record.officer.substring(0, 2)}
                        </span>
                        <span>{record.officer}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showApplyLoan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center
         bg-black/80 backdrop-blur-xs h-full px-2">
          <div className="bg-white w-full lg:w-4/5 rounded-sm m-6 lg:m-0 ">
            <div className="flex justify-between items-center border-b  border-gray-200 px-6 py-5">
              <h3 className="text-2xl uppercase font-extrabold text-gray-800">{t("applyLoanTitle")}</h3>
              <button 
                onClick={() => setShowApplyLoan(false)} 
                className="text-red-500 bg-red-50 p-2 rounded-full cursor-pointer transition-colors"
              >
                <X strokeWidth={2.5} className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 w-full">
              <Apply_New_Loan onClose={() => setShowApplyLoan(false)} />
            </div>
          </div>
        </div>
      )}

   

    </div>
  );
};

export default Credit_Book;

