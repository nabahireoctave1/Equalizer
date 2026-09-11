



import  { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Layers, 
  User, 
  Phone, 
  Calendar,
  FileSpreadsheet,
  Plus,
  X,
  PlusCircle,
  Trash2,
  Edit3,
  Check,
  XCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next'


const Report = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAmount, setEditAmount] = useState('');

  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Office Internet Utilities', amount: 350000 },
    { id: 2, title: 'Logistics Transport & Fuel', amount: 150000 },
    { id: 3, title: 'Printing Paper & Stationeries', amount: 85000 },
  ]);

  const handleAddExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expenseTitle || !expenseAmount) return;

    const newExpense = {
      id: Date.now(),
      title: expenseTitle,
      amount: parseFloat(expenseAmount)
    };

    setExpenses((prev) => [...prev, newExpense]);
    setExpenseTitle('');
    setExpenseAmount('');
    setIsModalOpen(false);
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter(item => item.id !== id));
    if (editingId === id) cancelEdit();
  };

  const startEdit = (expense) => {
    setEditingId(expense.id);
    setEditTitle(expense.title);
    setEditAmount(expense.amount);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditAmount('');
  };

  const handleSaveEdit = (id) => {
    if (!editTitle || !editAmount) return;

    setExpenses((prev) => prev.map((item) => {
      if (item.id === id) {
        return { ...item, title: editTitle, amount: parseFloat(editAmount) };
      }
      return item;
    }));

    cancelEdit();
  };

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const formatNumber = (num) => new Intl.NumberFormat().format(num);
  const {t} = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50  rounded-xs  font-sans text-gray-800 relative">
         <div className="bg-gray-100 rounded-sm  border border-gray-100 p-6 mb-3 sticky top-0 z-50
        flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-400 p-2 rounded-full text-white">
              <FileSpreadsheet size={35} />
            </div>
            <div>
              <p className="text-sm text-gray-700 font-medium">{t("dashboard")}</p>
              <h2 className="text-2xl font-extrabold uppercase text-gray-700 flex items-center gap-2">
                {t("dailyFinancialReport")}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-600 px-4 py-2 rounded-md ">
           <div className="bg-gray-300 px-4 py-2 rounded-sm"> 
            <span className='text-[13px] uppercase'> Previous report</span></div>
             <input type="date"

             className='bg-gray-100 text-sm py-2 border border-gray-200 rounded-sm
              px-4 outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer uppercase '
              />
          </div>
        </div>
      <div className="max-w-7xl  space-y-4 px-3 py-2">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2
                  lg:grid-cols-3 gap-2">
          <div className="bg-white p-5 rounded-sm  hover:translate-y-0.5  cursor-pointer transition-all
          border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 font-medium">{t("openingStock")}</p>
              <p className="text-[20px] font-semibold mt-1">1,000,000</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-full text-gray-600"><Layers size={20} /></div>
          </div>

          <div className="bg-white p-5 rounded-sm border border-gray-100 hover:translate-y-0.5 transition-all cursor-pointer
           flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 font-medium">{t("cashReceived")}</p>
              <p className="text-[20px] font-semibold text-green-600 mt-1">1,000,000</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-full text-green-600"><TrendingUp size={20} /></div>
          </div>

          <div className="bg-white p-5 rounded-sm  border border-gray-100  cursor-pointer hover:translate-y-0.5 transition-all
          flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700 font-medium">{t("cashIn")}</p>
              <p className="text-[20px] font-semibold text-blue-600 mt-1">700,000</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-full text-blue-600"><TrendingDown size={20} /></div>
          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
        
          <div className="bg-linear-to-br from-blue-500 to-indigo-700 p-5 rounded-sm
           shadow-md text-white flex items-center justify-between col-span-1 sm:col-span-2 md:col-span-1">
            <div>
              <p className="text-sm text-blue-100 font-medium">{t("totalCash")}</p>
              <p className="text-[20px] font-semibold mt-1">1,500,000</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl text-white"><DollarSign size={20} /></div>
          </div>
          
          <div className="bg-linear-to-br from-green-600 to-indigo-700 p-5 rounded-sm shadow-md text-white flex items-center justify-between col-span-1 sm:col-span-2 md:col-span-1">
            <div>
              <p className="text-sm text-blue-100 font-medium">{t("closingBalance")}</p>
              <p className="text-[20px] font-semibold mt-1">500,000</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl text-white"><DollarSign size={20} /></div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-sm  border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <TrendingDown size={18} className="text-red-500" /> {t("cashOutDetails")}
              </h3>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left text-sm min-w-100">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
                  <tr>
                    <th className="p-4 flex items-center gap-1">
                      <User size={14}/>{t("names")}</th>
                    <th className="p-4">{t("cashOut")}</th>
                    <th className="p-4 flex gap-1"><Phone size={14}/>{t("contact")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  <tr className="hover:bg-gray-50/50 transition">
                    <td className="p-4 font-medium">Webale Precious</td>
                    <td className="p-4 font-semibold text-[17px] text-red-600">1,200,000</td>
                    <td className="p-4 text-gray-500">078941543</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition">
                    <td className="p-4 font-medium">Tumukunde Apollo</td>
                    <td className="p-4 font-semibold text-[17px] text-red-600">1,200,000</td>
                    <td className="p-4 text-gray-500">078941543</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50 transition">
                    <td className="p-4 font-medium">Banguma Willy</td>
                    <td className="p-4 font-semibold text-[17px] text-red-600">1,200,000</td>
                    <td className="p-4 text-gray-500">078941543</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-md border border-gray-200 overflow-hidden flex flex-col justify-between h-95">
            <div className="flex flex-col h-full overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center gap-2 shrink-0">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 whitespace-nowrap">
                  <TrendingDown size={18} className="text-orange-500" /> {t("expenseDetails")}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1.5 bg-blue-600 text-white hover:bg-blue-700 active:scale-95 transition px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm"
                >
                  <Plus size={14} />
                  {t("addExpense")}
                </button>
              </div>
              
              {/* Scrollable Container */}
              <div className="overflow-y-auto grow w-full max-h-60">
                <table className="w-full text-sm min-w-85">
                  <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th className="p-4 text-left bg-gray-50">{t("expenses")}</th>
                      <th className="p-4 text-right bg-gray-50">{t("amount")}</th>
                      <th className="p-4 text-center bg-gray-50 w-24">{t("actions")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {expenses.length === 0 ? (
                      <tr>
                        <td colSpan="3" className="p-8 text-center text-gray-400 text-xs">
                          {t("noExpenses")}
                        </td>
                      </tr>
                    ) : (
                      expenses.map((expense) => (
                        <tr key={expense.id} className="hover:bg-gray-50/50 transition">
                          
                          <td className="p-4 text-left">
                            {editingId === expense.id ? (
                              <input 
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="w-full px-2 py-2 text-[15px] bg-gray-50 border 
                                border-gray-300 rounded  text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            ) : (
                              <span className="font-medium
                               text-gray-900 block wrap-break-word max-w-37.5">
                                {expense.title}
                              </span>
                            )}
                          </td>

                          <td className="p-4 text-right">
                            {editingId === expense.id ? (
                              <input 
                                type="number"
                                value={editAmount}
                                onChange={(e) => setEditAmount(e.target.value)}
                                className="w-24 px-2 py-2 text-[15px] bg-gray-50 border text-gray-700
                                 border-gray-300 rounded   focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            ) : (
                              <span className="text-[18px] font-semibold text-gray-700">
                                {formatNumber(expense.amount)}
                              </span>
                            )}
                          </td>

                          <td className="p-4 text-center">
                            {editingId === expense.id ? (
                              <div className="flex items-center justify-center gap-2">
                                <button 
                                  onClick={() => handleSaveEdit(expense.id)}
                                  className="text-green-600 hover:text-green-800 p-2 outline-0
                                   hover:bg-green-50 rounded-full transition cursor-pointer"
                                  title={t("saveChanges")}
                                >
                                  <Check size={16} />
                                </button>
                                <button 
                                  onClick={cancelEdit}
                                  className="text-gray-400 hover:text-gray-700 outline-0
                                   p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
                                  title={t("cancelEdit")}
                                >
                                  <XCircle size={16} />
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-1">
                                <button 
                                  onClick={() => startEdit(expense)}
                                  className="text-gray-700 hover:text-blue-600
                                   p-2  hover:bg-blue-50 rounded-full transition cursor-pointer"
                                  title={t("editExpense")}
                                >
                                  <Edit3 size={15} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteExpense(expense.id)}
                                  className="text-gray-700 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition cursor-pointer"
                                  title={t("deleteExpense")}
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            )}
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-orange-50/50 p-4 border-t border-orange-100 flex justify-between items-center shrink-0">
              <span className="font-semibold text-gray-900">{t("totalExpenses")}</span>
              <span className="font-semibold text-[18px] text-orange-600  text-base">
                {formatNumber(totalExpenses)}
              </span>
            </div>
          </div>

        </div>

        <div className="bg-white rounded-md  border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-bold text-gray-800 uppercase">{t("summaryOverview")}</h3>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm text-center min-w-175">
              <thead className="bg-gray-50 text-gray-700  uppercase border-b border-gray-100">
                <tr>
                  <th className="p-4 text-left">{t("names")}</th>
                  <th className="p-4">{t("numberClients")}</th>
                  <th className="p-4">{t("cashIn")}</th>
                  <th className="p-4">{t("cashOut")}</th>
                  <th className="p-4">{t("paid")}</th>
                  <th className="p-4">{t("unpaid")}</th>
                  <th className="p-4">{t("advance")}</th>
                  <th className="p-4">{t("new")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr className="hover:bg-gray-50/50 transition">
                  <td className="p-4 text-left font-semibold text-gray-900">{t("office")}</td>
                  <td className="p-4">135</td>
                  <td className="p-4 text-emerald-600 font-semibold">1,600,000</td>
                  <td className="p-4 text-red-600 font-semibold">5,400,000</td>
                  <td className="p-4 font-medium text-emerald-600">89</td>
                  <td className="p-4 font-medium text-red-500">12</td>
                  <td className="p-4">5</td>
                  <td className="p-4 text-blue-600 font-medium">10</td>
                </tr>
                <tr className="hover:bg-gray-50/50 transition">
                  <td className="p-4 text-left font-semibold text-gray-900">{t("field")}</td>
                  <td className="p-4">135</td>
                  <td className="p-4 text-emerald-600 font-semibold">1,600,000</td>
                  <td className="p-4 text-red-600 font-semibold">5,400,000</td>
                  <td className="p-4 font-medium text-emerald-600">89</td>
                  <td className="p-4 font-medium text-red-500">12</td>
                  <td className="p-4">5</td>
                  <td className="p-4 text-blue-600 font-medium">10</td>
                </tr>
                <tr className="bg-blue-50/60 font-bold text-gray-900">
                  <td className="p-4 text-left">{t("total")}</td>
                  <td className="p-4">135</td>
                  <td className="p-4 text-emerald-700">1,600,000</td>
                  <td className="p-4 text-red-700">5,400,000</td>
                  <td className="p-4 text-emerald-700">89</td>
                  <td className="p-4 text-red-600">12</td>
                  <td className="p-4">5</td>
                  <td className="p-4 text-blue-700">10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* IN-COMPONENT MODAL DIALOG PORTAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-200"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 w-full max-w-md overflow-hidden transform transition-all z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{t("addNewExpense")}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{t("fillExpenseDetails")}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddExpenseSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  {t("expenseDescription")}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t("expensePlaceholder")}
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  {t("valueAmount")}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <DollarSign size={16} />
                  </span>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="00"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition"
                >
                  {t("cancel")}
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-sm transition"
                >
                  <PlusCircle size={16} />
                  {t("saveEntry")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;

// swahili 

// {
  // "dashboard": "Dashibodi ya Mhasibu",
  // "dailyFinancialReport": "Ripoti ya Fedha ya Kila Siku",

  // "openingStock": "Salio la Mwanzo",
  // "cashReceived": "Fedha Zilizopokelewa",
  // "cashIn": "Fedha Zilizoingia",
  // "totalCash": "Jumla ya Fedha",
  // "closingBalance": "Salio la Mwisho",

  // "cashOutDetails": "Maelezo ya Fedha Zilizotolewa",
  // "names": "Majina",
  // "cashOut": "Fedha Zilizotolewa",
  // "contact": "Simu",

  // "expenseDetails": "Matumizi",
  // "addExpense": "Ongeza Matumizi",
  // "expenses": "Matumizi",
  // "amount": "Kiasi",
  // "actions": "Vitendo",
  // "editExpense": "Hariri Matumizi",
  // "deleteExpense": "Futa Matumizi",
  // "saveChanges": "Hifadhi Mabadiliko",
  // "cancelEdit": "Ghairi",

  // "noExpenses": "Hakuna matumizi yaliyorekodiwa. Bonyeza 'Ongeza Matumizi'.",
  // "totalExpenses": "Jumla ya Matumizi",

  // "summaryOverview": "Muhtasari",
  // "numberClients": "Idadi ya Wateja",
  // "paid": "Wamelipa",
  // "unpaid": "Hawajalipa",
  // "advance": "Advance",
  // "new": "Wapya",
  // "office": "Ofisi",
  // "field": "Uwanjani",
  // "total": "Jumla",

  // "addNewExpense": "Ongeza Matumizi Mapya",
  // "expenseDescription": "Maelezo ya Matumizi",
  // "fillExpenseDetails": "Jaza taarifa za matumizi.",
  // "expensePlaceholder": "Mfano: Chakula cha Ofisi",
  // "valueAmount": "Kiasi",
  // "cancel": "Ghairi",
  // "saveEntry": "Hifadhi"
// }