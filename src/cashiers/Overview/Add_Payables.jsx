// import  { useState } from 'react';

import { useTranslation } from "react-i18next";

const AddPayable = () => {

  const {t} = useTranslation();
 
  return (
    <div className="max-h-screen bg-slate-50 py-5 px-2 flex flex-col items-center justify-center ">
      <div className="w-full max-w-7xl bg-white rounded-md animate-bounce-once shadow-xl border border-slate-100 overflow-hidden">
        
        <div className="bg-linear-to-r from-sky-500 to-blue-600 p-6 text-white text-center relative">
        
          <h2 className="text-2xl uppercase font-black">
           {t("moneyReceivedFromAnotherBranch")}
          </h2>
          <p className="text-sky-100 text-[15px] font-medium mt-1">
            Gassani Branch
          </p>
        </div>

        <form className="p-6 space-y-2" onSubmit={(e) => e.preventDefault()}>
          
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="branch" className="text-sm font-semibold text-slate-700">
              {t("to:")}
            </label>
            <div className="relative">
              <select
                id="branch"
                defaultValue="none"
                className="w-full px-4 py-2.5 text-sm bg-slate-50
                 border border-slate-200 rounded-md text-slate-800 focus:outline-none focus:ring-1
                  focus:ring-sky-400 focus:border-sky-400 transition-all appearance-none cursor-pointer"
              >
               
                <option value="kyejojo">Kyenjojo</option>
                <option value="Gasani">Gasani</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label htmlFor="amount" className=" uppercase text-xs font-semibold text-slate-700">
             {t("amount")}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4
               text-slate-400 font-medium text-sm">
                shs
              </span>
              <input
                type="number"
                id="amount"
                placeholder="12,000,000"
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border
                 border-slate-200 rounded-lg text-slate-800 font-medium
                  placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 
                  transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-1.5">
            <label htmlFor="amountWords" className="text-xs uppercase font-semibold text-slate-700">
              {t("amountInWords")}
            </label>
            <textarea
              id="amountWords"
              rows="2"
              placeholder="Twelve Million Shillings Only"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200
               rounded-md text-slate-800 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 transition-all resize-none"
            />
          </div>
           
           <div className='flex justify-end items-center'>

          <button
            type="submit"
            className="w-fit mt-2 bg-sky-500 text-sm hover:bg-sky-600 text-white 
            font-semibold py-3 px-4 rounded-lg shadow-md shadow-sky-100 hover:shadow-md cursor-pointer transition-all duration-200 active:scale-[0.98]"
          >
            {t("submitPayable")}
          </button>

           </div>

          
        </form>
      </div>
    </div>
  );
};

export default AddPayable;


// these are the language translator 


// english
// {
//   "addPayable": {
//     "title": "Money Sent to Another Branch",
//     "branch": "Branch",
//     "to": "To:",
//     "amount": "Amount",
//     "amountInWords": "Amount in Words",
//     "amountPlaceholder": "12,000,000",
//     "amountWordsPlaceholder": "Twelve Million Shillings Only",
//     "currency": "shs",
//     "submit": "Submit Payable"
//   },
//   "branches": {
//     "kyenjojo": "Kyenjojo",
//     "gasani": "Gasani"
//   }
// }

// luganda

// {
//   "addPayable": {
//     "title": "Ssente Ezisindikiddwa ku Ttabi Eddala",
//     "branch": "Ttabi",
//     "to": "Eri:",
//     "amount": "Omuwendo",
//     "amountInWords": "Omuwendo mu Bigambo",
//     "amountPlaceholder": "12,000,000",
//     "amountWordsPlaceholder": "Obukadde Cumi na Bubiri Obwa Shillingi Obwokka",
//     "currency": "shs",
//     "submit": "Sindikira Payable"
//   },
//   "branches": {
//     "kyenjojo": "Kyenjojo",
//     "gasani": "Gasani"
//   }
// }


// kinyarwanda
// {
//   "addPayable": {
//     "title": "Amafaranga Yoherejwe ku Ishami Rindi",
//     "branch": "Ishami",
//     "to": "Kuri:",
//     "amount": "Amafaranga",
//     "amountInWords": "Amafaranga mu Magambo",
//     "amountPlaceholder": "12,000,000",
//     "amountWordsPlaceholder": "Miliyoni Cumi n'Ebyiri z'Amashilingi Gusa",
//     "currency": "shs",
//     "submit": "Ohereza Payable"
//   },
//   "branches": {
//     "kyenjojo": "Kyenjojo",
//     "gasani": "Gasani"
//   }
// }

// runyakore

// {
//   "addPayable": {
//     "title": "Esente Zohereziibwe Aha Shami Erindi",
//     "branch": "Shami",
//     "to": "Kuri:",
//     "amount": "Omuwendo",
//     "amountInWords": "Omuwendo omu Bigambo",
//     "amountPlaceholder": "12,000,000",
//     "amountWordsPlaceholder": "Emiliyoni Ikumi na Ibiri za Shilingi Zonka",
//     "currency": "shs",
//     "submit": "Ohereza Payable"
//   },
//   "branches": {
//     "kyenjojo": "Kyenjojo",
//     "gasani": "Gasani"
//   }
// }

// kiswahil

// {
//   "addPayable": {
//     "title": "Pesa Zilizotumwa kwenye Tawi Lingine",
//     "branch": "Tawi",
//     "to": "Kwenda:",
//     "amount": "Kiasi",
//     "amountInWords": "Kiasi kwa Maneno",
//     "amountPlaceholder": "12,000,000",
//     "amountWordsPlaceholder": "Shilingi Milioni Kumi na Mbili Pekee",
//     "currency": "shs",
//     "submit": "Wasilisha Payable"
//   },
//   "branches": {
//     "kyenjojo": "Kyenjojo",
//     "gasani": "Gasani"
//   }
// }