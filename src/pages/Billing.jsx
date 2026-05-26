import {
  BitcoinIcon,
  CircleCheck,
  CreditCard,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";
import React from "react";

function Billing() {
  return (
    <div className="p-4 lg:p-6 shadow-sm h-full m-2 rounded-2xl bg-white">
      <div className="pb-5 border-b border-gray-100">
        <h2 className="font-extrabold text-2xl lg:text-3xl text-gray-800">
          Billing & Instant Activation
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Pay for account activation & company activation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="border border-gray-200 rounded-2xl p-5 bg-gradient-to-b from-gray-50 to-white">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <span className="bg-blue-100 text-blue-700 p-3 rounded-xl">
                <ReceiptText size={28} />
              </span>

              <div>
                <h2 className="font-extrabold text-xl text-gray-800">
                  Billing Summary
                </h2>

                <p className="text-sm text-gray-500">
                  Payment information
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-5">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Service</span>

                <span className="font-semibold text-gray-700 text-sm text-right">
                  Company Activation
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <span className="text-gray-500 text-sm">
                  Description
                </span>

                <span className="font-medium text-gray-700 text-sm text-right max-w-[180px]">
                  Unlock premium business features & secure services
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">
                  Activation Fee
                </span>

                <span className="font-extrabold text-xl text-gray-800">
                  100,000 UGX
                </span>
              </div>

              <div className="border-t border-dashed pt-4 flex items-center justify-between">
                <span className="font-extrabold text-gray-700">
                  Total
                </span>

                <span className="font-extrabold text-2xl text-blue-700">
                  100,000 UGX
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl p-5 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <ReceiptText size={120} />
            </div>

            <div className="relative z-10">
              <span className="bg-white/20 p-3 rounded-xl w-fit block">
                <ShieldCheck />
              </span>

              <h2 className="font-extrabold text-xl mt-4">
                Instant Receipt
              </h2>

              <p className="text-sm text-blue-100 mt-1 leading-6">
                Download your receipt instantly after successful payment
                verification.
              </p>

              <button className="mt-5 bg-white text-blue-700 font-bold px-4 py-3 rounded-xl text-sm hover:scale-[1.02] transition-all duration-200 cursor-pointer">
                Get Receipt Now
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 border border-gray-200 rounded-2xl p-5 bg-gradient-to-b from-gray-50 to-white">
          <div className="flex items-center gap-3 pb-5 border-b border-gray-100">
            <span className="bg-blue-100 text-blue-700 p-3 rounded-xl">
              <CreditCard />
            </span>

            <div>
              <h2 className="font-extrabold text-2xl text-gray-800">
                Payment Methods
              </h2>

              <p className="text-sm text-gray-500">
                Choose your preferred payment option
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
            <div className="border border-blue-100 bg-white rounded-2xl p-5 hover:shadow-md transition-all duration-300">
              <div className="flex gap-3">
                <span className="bg-blue-100 text-blue-700 p-3 rounded-full h-fit">
                  <BitcoinIcon />
                </span>

                <div>
                  <h2 className="font-bold text-xl text-gray-800">
                    Pay with Crypto
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Secure payment using USDT on Binance Smart Chain
                  </p>
                </div>
              </div>

              <div className="space-y-3 mt-5">
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <CircleCheck size={18} className="text-green-500" />
                  Currency: USDT
                </p>

                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <CircleCheck size={18} className="text-green-500" />
                  Network: BSC
                </p>

                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <CircleCheck size={18} className="text-green-500" />
                  Instant verification
                </p>

                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <CircleCheck size={18} className="text-green-500" />
                  Fast & secure transaction
                </p>
              </div>

              <button className="w-full mt-6 bg-blue-400  cursor-pointer text-white py-3 rounded-md text-sm font-semibold transition-all duration-200">
                Pay 
              </button>
            </div>

            <div className="border border-green-100 bg-white rounded-2xl p-5 hover:shadow-md transition-all duration-300">
              <div className="flex gap-3">
                <span className="bg-blue-100 text-blue-700 p-3 rounded-full h-fit">
                  <Wallet />
                </span>

                <div>
                  <h2 className="font-bold text-xl text-gray-800">
                    Other Method
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Pay using MTN MoMo,Airtel Money,Visa card and etc
                  </p>
                </div>
              </div>

              <div className="space-y-3 mt-5">
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <CircleCheck size={18} className="text-green-500" />
                  MTN Mobile Money
                </p>

                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <CircleCheck size={18} className="text-green-500" />
                  Airtel Money
                </p>

                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <CircleCheck size={18} className="text-green-500" />
                  Visa card
                </p>
                 <p className="flex items-center gap-2 text-sm text-gray-600">
                  <CircleCheck size={18} className="text-green-500" />
                  bank transfer
                </p>

               
              </div>

              <button className="w-full text-sm mt-6 cursor-pointer bg-blue-400  text-white py-3 rounded-md font-semibold transition-all duration-200">
                Pay 
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;