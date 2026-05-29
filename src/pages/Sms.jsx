import React from "react";
import {
  Wallet,
  MessageSquareMore,
  CreditCard,
  Activity,
} from "lucide-react";

function Sms() {
  const transactions = [
    {
      id: "msx-1-2034",
      sms: "25,000 SMS",
      amount: "UGX 120,000",
      method: "MTN MOMO",
      status: "Success",
      date: "29 May 2026",
    },
    {
      id: "msx-1-2035",
      sms: "10,000 SMS",
      amount: "UGX 50,000",
      method: "Airtel Money",
      status: "failed",
      date: "28 May 2026",
    },
    {
      id: "msx-1-2036",
      sms: "50,000 SMS",
      amount: "UGX 240,000",
      method: "MTN MOMO",
      status: "Success",
      date: "27 May 2026",
    },
  ];

  return (
    <div>
      <div className="bg-white py-4 ">
          <div>
          
            <h1 className="text-3xl px-4 uppercase font-black text-gray-800">
              Buy SMS
            </h1>

           
          </div>

         
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-md  border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="uppercase text-gray-700 text-sm font-bold tracking-wider">
                    Current SMS
                  </p>

                  <h2 className="text-2xl pb-2 font-black text-gray-800 mt-3">
                    25000 SMS
                  </h2>

                  <p className="text-gray-700 text-xs mt-1 uppercase">
                    Available SMS remaining
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-[#f8faff] border border-blue-100 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-800 text-sm">
                        Total Purchased
                      </p>

                      <h3 className="text-xl font-black text-gray-800 mt-1">
                        150K SMS
                      </h3>

                      <p className="text-[11px] text-gray-700 uppercase mt-1">
                        SMS package usage
                      </p>
                    </div>

                    <div className="bg-blue-400 p-2.5 rounded-md">
                      <MessageSquareMore
                        className="text-white"
                        size={18}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-gray-700">
                        Usage
                      </span>

                      <span className="text-[11px] font-bold text-gray-700">
                        78%
                      </span>
                    </div>

                    <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                      <div className="w-[78%] h-full bg-blue-300 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f8faff] border border-indigo-100 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-800 text-sm">
                        Daily Usage
                      </p>

                      <h3 className="text-xl font-black text-gray-800 mt-1">
                        2,340 SMS
                      </h3>

                      <p className="text-[11px] text-gray-700 uppercase mt-1">
                        To day message used
                      </p>
                    </div>

                    <div className="bg-blue-400 p-2.5 rounded-md">
                      <Activity
                        className="text-white"
                        size={18}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-gray-700">
                        Daily Usage
                      </span>

                      <span className="text-[11px] font-bold text-gray-700">
                        46%
                      </span>
                    </div>

                    <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
                      <div className="w-[46%] h-full bg-blue-300 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-md  border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className=" p-3 rounded-2xl">
                  <CreditCard
                    size={35}
                  />
                </div>

                <div>
                  <h2 className="font-black text-xl text-gray-800">
                    Purchase SMS
                  </h2>

                  <p className="text-gray-500 text-xs">
                    Enter payment details
                  </p>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    SMS Package
                  </label>

                  <input
                    type="number"
                    placeholder="Enter SMS amount"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-2">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    placeholder="07XXXXXXXX"
                    className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-blue-600"
                  />
                </div>

                <button className="w-full bg-blue-400 cursor-pointer text-white py-3 rounded-md text-sm font-bold hover:opacity-90 duration-300 shadow-lg">
                Purchase
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mt-6 p-6 overflow-x-auto">
          <div className="mb-5">
            <h2 className="text-xl font-black text-gray-800">
              Transaction History
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Recent SMS purchase records
            </p>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 text-gray-600 text-xs uppercase">
                  Date
                </th>

                <th className="text-left py-3 text-gray-600 text-xs uppercase">
                  Transaction ID
                </th>

                <th className="text-left py-3 text-gray-600 text-xs uppercase">
                  SMS
                </th>

                <th className="text-left py-3 text-gray-600 text-xs uppercase">
                  Amount
                </th>

                <th className="text-left py-3 text-gray-600 text-xs uppercase">
                  Payment
                </th>

                <th className="text-left py-3 text-gray-600 text-xs uppercase">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-50 hover:bg-gray-50 duration-200"
                >
                  <td className="py-4 text-xs text-gray-700">
                    {item.date}
                  </td>

                  <td className="py-4 text-xs uppercase text-gray-800">
                    {item.id}
                  </td>

                  <td className="py-4 text-xs text-gray-700">
                    {item.sms}
                  </td>

                  <td className="py-4 text-xs text-gray-700">
                    {item.amount}
                  </td>

                  <td className="py-4 text-xs text-gray-700">
                    {item.method}
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                        item.status === "Success"
                          ? "bg-blue-400 text-white"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Sms;