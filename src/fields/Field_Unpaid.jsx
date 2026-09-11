
import { useState } from 'react';

const INITIAL_USERS = [
  {
    id: 1,
    name: "Alex Morgan",
    email: "alex@example.com",
    phone: "+1 (555) 019-2834",
    missedPaymentDate: "2026-05-01", 
    dueDate: "2026-06-15",           
    balance: 450.00,
    location: "New York, USA",
    creditBook: "Book_A_2026"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    email: "sarah.j@example.com",
    phone: "+1 (555) 014-9921",
    missedPaymentDate: "2026-04-15",
    dueDate: "2026-05-20",         
        balance: 1200.50,
    location: "London, UK",
    creditBook: "Premium_Ledger"
  },
  {
    id: 3,
    name: "David Kim",
    email: "kim.d@example.com",
    phone: "+1 (555) 017-8833",
    missedPaymentDate: "2026-05-20",
    dueDate: "2026-07-10",
    balance: 85.00,
    location: "Seoul, South Korea",
    creditBook: "Retail_Small"
  }
];

export default function Unpaid_Field() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const today = new Date();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const calculateDays = (missedDateStr, dueDateStr) => {
    const missedDate = new Date(missedDateStr);
    const dueDate = new Date(dueDateStr);

    const unpaidTimeDiff = today.getTime() - missedDate.getTime();
    const unpaidDays = Math.max(0, Math.floor(unpaidTimeDiff / (1000 * 3600 * 24)));

    const remainingTimeDiff = dueDate.getTime() - today.getTime();
    const daysRemaining = Math.floor(remainingTimeDiff / (1000 * 3600 * 24));

    return { unpaidDays, daysRemaining };
  };

  const handlePaying = (userName, balance) => {
    alert(`Processing payment gateway setup for ${userName} ($${balance})`);
  };

  const handleCreditBook = (bookName) => {
    alert(`Opening ledger file: ${bookName}`);
  };

  const handleViewMore = (user) => {
    alert(`Detailed profile for ${user.name}\nLocation: ${user.location}\nEmail: ${user.email}`);
  };

  return (
    <div className="bg-gray-200 text-gray-700 min-h-screen p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-gray-700">Unpaid Accounts Ledger</h1>
            <p className="text-sm text-gray-400">Real-time tracking of outstanding balances and client metrics.</p>
          </div>
          <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 text-sm">
            <span className="text-gray-400">Current Date: </span>
            <span className="font-mono text-emerald-400 font-semibold">
              {today.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
        {/* Responsive Wrappers */}
        <div className="w-full overflow-x-auto rounded-xl border border-gray-100 shadow-xl bg-gray-700">
          <table className="w-full text-left border-collapse min-w-262.5">
            <thead>
              <tr className="bg-gray-750 border-b border-gray-700 text-gray-300 text-sm font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">Names</th>
                <th className="py-4 px-6">Contact</th>
                <th className="py-4 px-6 text-center">Unpaid Days</th>
                <th className="py-4 px-6 text-center">Days Remaining</th>
                <th className="py-4 px-6 text-right">Balance</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 text-sm">
              {users.map((user) => {
                const { unpaidDays, daysRemaining } = calculateDays(user.missedPaymentDate, user.dueDate);

                return (
                  <tr key={user.id} className="hover:bg-gray-750 transition-colors duration-150">
                    <td className="py-4 px-6 font-medium text-white whitespace-nowrap">
                      {user.name}
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex flex-col text-xs space-y-0.5">
                        <span className="text-gray-300">
                          <span className="text-gray-500 mr-1.5">📞</span>{user.phone}
                        </span>
                        <span className="text-gray-400">
                          <span className="text-gray-500 mr-1.5">✉️</span>{user.email}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center font-mono font-bold text-amber-400 text-base whitespace-nowrap">
                      {unpaidDays} <span className="text-xs text-gray-400 font-sans font-normal">days</span>
                    </td>

                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      {daysRemaining < 0 ? (
                        <span className="inline-block px-2.5 py-1 text-xs font-medium bg-red-900/40 text-red-400 rounded-full border border-red-800/60 animate-pulse">
                          Overdue by {Math.abs(daysRemaining)} days
                        </span>
                      ) : (
                        <span className="text-gray-200 font-semibold bg-gray-700/50 px-2.5 py-1 rounded-full text-xs">
                          {daysRemaining} days left
                        </span>
                      )}
                    </td>

                    {/* Balance */}
                    <td className="py-4 px-6 text-right font-mono font-semibold text-rose-400 whitespace-nowrap">
                      {formatCurrency(user.balance)}
                    </td>

                    {/* Location */}
                    <td className="py-4 px-6 text-gray-300 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1">
                        <span className="text-gray-500">📍</span> {user.location}
                      </span>
                    </td>

                    {/* Integrated CTA Elements (view_more, paying, credit_book) */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center justify-center space-x-2">
                        {/* Paying */}
                        <button
                          onClick={() => handlePaying(user.name, user.balance)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3 py-1.5 rounded-md text-xs transition-all shadow-sm active:scale-95"
                        >
                          Paying
                        </button>

                        {/* Credit Book */}
                        <button
                          onClick={() => handleCreditBook(user.creditBook)}
                          className="bg-gray-750 hover:bg-gray-700 border border-gray-600 text-gray-200 px-2.5 py-1.5 rounded-md text-xs transition-all active:scale-95"
                        >
                          📖 {user.creditBook}
                        </button>

                        <button
                          onClick={() => handleViewMore(user)}
                          className="text-gray-400 hover:text-white p-1.5 rounded-md hover:bg-gray-700 transition"
                          title="View More Info"
                        >
                          ⚙️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}