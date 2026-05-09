import { AlertTriangle, CheckSquare, CreditCard, Bitcoin,LucideSquareArrowOutUpRight } from 'lucide-react';
import React from 'react';

const PLANS = [
  { name: "Starter Plan", duration: "Monthly", cost: "45,000", discount: "5%", limit: "500", allowed: false },
  { name: "Pro Plan", duration: "3 Months", cost: "90,000", discount: "10%", limit: "1,000", allowed: true },
  { name: "Professional Plan", duration: "6 Months", cost: "150,000", discount: "15%", limit: "Unlimited", allowed: true },
  { name: "Enterprise Plan", duration: "12 Months", cost: "240,000", discount: "20%", limit: "Unlimited", allowed: true },
];

const PAYMENTS = [

  { icon: Bitcoin, label: "Crypto", id: "crypto" },
  { icon:CreditCard, label: "Other method", id: "other" },

];

function Billing() {
  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="mb-10 text-center md:text-left bg-blue-300 p-6 w-full ">
        <h2 className="text-2xl font-bold text-blue-500 uppercase tracking-widest">Check out</h2>
        <h1 className="text-3xl font-black text-gray-800">Secure payments. Instant activation</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 m-4">
        {PLANS.map((plan, index) => (
          <div key={index} className="bg-white border  border-gray-200 rounded-xl shadow shadow-blue-200 ">
            
            <div className="pt-2 px-5 py-5 bg-gray-100  border-gray-200">
              <h2 className="text-xl font-black text-gray-800">{plan.name}</h2>
              <p className="text-[12px] text-gray-500 font-medium">{plan.duration}</p>
              
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-lg font-bold text-gray-900">{plan.cost} UGX</span>
                <span className="text-[12px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                  -{plan.discount}
                </span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-[12px] font-bold text-gray-400 uppercase mb-3">Plan Features</h3>
              <ul className="space-y-2.5">
                {[
                  "Management (clients)",
                  "Loan & Repayments",
                  "Reports",
                  `discount: ${plan.discount}`,
                  `Limit: ${plan.limit} clients`
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-[12px] text-gray-600 font-medium">
                    <CheckSquare size={16} className="text-blue-500 shrink-0" />
                    {feat}
                  </li>
                ))}
                <li className="flex items-center gap-3 text-[12px] font-medium text-gray-600">
                  {plan.allowed ? (
                    <CheckSquare size={16} className="text-blue-500 shrink-0" />
                  ) : (
                    <AlertTriangle size={16} className="text-amber-500 shrink-0" />
                  )}
                  System settings: {plan.allowed ? 'Allowed' : 'Not allowed'}
                </li>
              </ul>
            </div>

            <div className="p-5 pt-0">
              <div className="border-t border-gray-200 pt-4 mb-4">
                <p className="text-[12px] font-bold text-gray-400 uppercase mb-3">Select Method</p>
                <div className="grid grid-cols-2 gap-2">
                  {PAYMENTS.map((m) => (
                    <label key={m.id} className="cursor-pointer group">
                      <input type="radio" name={`pay-${index}`} className="peer sr-only" defaultChecked={m.id === 'mm'} />
                      <div className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg bg-gray-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all">
                        <m.icon size={14} className="text-gray-400 group-hover:text-blue-500 peer-checked:text-blue-500" />
                        <span className="text-[12px] font-bold text-gray-600">{m.label}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full bg-blue-500
               hover:bg-blue-600 cursor-pointer text-white text-sm
                font-bold py-3 rounded-md transition-all shadow-sm shadow-blue-300 active:scale-95">
                Pay Service
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Billing;