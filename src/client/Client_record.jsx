



import { useState, useEffect, useRef } from 'react';
import { Download, Printer, FileSpreadsheet, FileText, ChevronDown, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Credit_Record = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clientInfo = {
    name: "Webale Precious",
    guarantor: "Kobusinge Sarah",
    loanAmount: 120000,
    dailyPayment: 4000,
    dateFrom: "2-03-2026",
    dateTo: "2-04-2026",
    currentBalance: 116000 
  };

  const paymentRecords = [
    { date: "2-03-2026", amount: 4000, balance: 116000, officer: "Gungu" },
    { date: "3-03-2026", amount: 4000, balance: 112000, officer: "Gungu" },
    { date: "4-03-2026", amount: 4000, balance: 108000, officer: "Gungu" },
    { date: "5-03-2026", amount: 4000, balance: 104000, officer: "Gungu" },
    { date: "6-03-2026", amount: 4000, balance: 100000, officer: "Gungu" },
  ];


  const sanitizeFileName = (suffix) => {
    return `Ledger_${clientInfo.name.replace(/\s+/g, '_')}_${suffix}`;
  };

  const exportToExcel = () => {
    const headers = ['Payment Date', 'Amount Paid (UGX)', 'Resulting Balance (UGX)', 'Account Officer'];
    const rows = paymentRecords.map(record => [
      record.date,
      record.amount,
      record.balance,
      record.officer
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${sanitizeFileName('Statement')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsMenuOpen(false);
  };


  const handlePrint = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
      window.print();
    }, 100);
  };
  const {t} = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans print:bg-white print:py-0">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-sm  border border-gray-100 p-6 print:border-none print:shadow-none">
            <h2 className="text-xs font-semibold text-gray-700 uppercase tracking-wider
             mb-4">{t("clientInformation")}</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-800 block">{t("clientName")}</label>
                <span className="text-lg font-medium text-gray-800">{clientInfo.name}</span>
              </div>
              <div>
                <label className="text-sm text-gray-800 block">{t("guarantor")}</label>
                <span className="text-md font-medium text-gray-700">{clientInfo.guarantor}</span>
              </div>
             
            </div>
          </div>

          <div className="bg-white rounded-sm border border-gray-100 p-6 print:border-none print:shadow-none">
            <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wider mb-4">{t("loanStructure")}</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{t("totalLoanPrincipal")}</span>
                <span className="text-lg font-semibold text-gray-900">UGX {clientInfo.loanAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center bg-orange-50 py-3 px-2 rounded-md
                print:bg-transparent print:p-0">
                <span className="text-sm text-orange-700 font-medium print:text-gray-700">{t("dailyInstallment")}</span>
                <span className="text-[18px] font-semibold text-orange-700
                 print:text-gray-900">UGX {clientInfo.dailyPayment.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-sm  border border-gray-100 p-6 print:border-none print:shadow-none">
            <div>
              <h2 className="text-xs font-semibold text-gray-800 uppercase tracking-wider
               opacity-80">{t("remainingBalance")}</h2>
              <p className="text-3xl font-bold mt-2 text-gray-900">UGX {clientInfo.currentBalance.toLocaleString()}</p>
            </div>
            <div className="mt-6 pt-3  border-t border-gray-200 
            flex justify-between text-sm text-gray-900">
              <span className=''>{t("status")}</span>
              <span className="bg-green-50 text-green-800 px-2 py-0.5
               rounded-md font-medium print:border print:border-green-500">{t("unpaid")}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md  border border-gray-200 overflow-hidden print:border-none print:shadow-none">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between print:bg-transparent">
            <div className="flex flex-col sm:flex-row  justify-between w-full gap-4">
              <div>
                <h3 className="text-md font-bold text-gray-800 uppercase">{t("paymentCollectionHistory")}</h3>
                <span className="text-sm uppercase border border-gray-200
                 bg-gray-200 text-gray-700 px-8 py-0.5 
                rounded-full inline-block mt-1 print:hidden">
                  {paymentRecords.length} Entries
                </span>
              </div>

              <div className="print:hidden relative" ref={dropdownRef}>
                
                <div className="flex justify-between items-center space-x-2">
                  <button 
                    onClick={exportToExcel}
                    className="flex items-center space-x-1.5 px-3 bg-green-500
                     py-2  border border-gray-200 text-sm
                      font-medium text-white rounded-sm cursor-pointer "
                  >
                    <FileSpreadsheet  />
                    <span>Excel</span>
                  </button>
                  
                 
                  <button 
                    onClick={handlePrint}
                    className="flex items-center space-x-1.5 px-3 py-2 cursor-pointer
                     bg-blue-600 text-sm font-medium text-white rounded-sm
                      hover:bg-blue-700 transition shadow-sm"
                  >
                    <Printer  />
                    <span>{t("print")}</span>
                  </button>
                </div>

              

              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-800 uppercase tracking-wider print:bg-transparent">
                  <th className="px-6 py-3.5 whitespace-nowrap">Payment Date</th>
                  <th className="px-6 py-3.5 whitespace-nowrap">Amount Paid</th>
                  <th className="px-6 py-3.5 whitespace-nowrap">Resulting Balance</th>
                  <th className="px-6 py-3.5 whitespace-nowrap">Account Officer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                {paymentRecords.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50/80 transition-colors print:hover:bg-transparent">
                    <td className="px-6 py-4  text-[15px] text-gray-800">{record.date}</td>
                    <td className="px-6 py-4 text-[16px] whitespace-nowrap text-emerald-600
                     font-semibold print:text-black ">
                       UGX {record.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-[16px] font-semibold text-gray-800 whitespace-nowrap">
                      UGX {record.balance.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full whitespace-nowrap bg-gray-200 text-[10px] font-bold flex items-center justify-center text-gray-600 uppercase print:hidden">
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
    </div>
  );
};

export default Credit_Record;