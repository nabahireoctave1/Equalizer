// import { useState } from 'react';


import {useTranslation} from "react-i18next"
const AddReceivable = () => {
  const {t} = useTranslation();


  return (
   <div className="max-h-screen bg-slate-50 py-5 px-2 flex flex-col items-center justify-center ">
      
    

      <div className="w-full max-w-full bg-white rounded-md animate-bounce-once shadow-xl border border-slate-100 overflow-hidden">
        
        <div className="bg-linear-to-r from-sky-500 to-blue-600 p-6 text-white text-center relative">
          
          <h2 className="text-2xl font-black  capitalize">
            {t("moneyReceivedFromAnotherBranch")}
          </h2>
          <p className="text-sky-100 text-sm font-medium mt-1">
            Gassani {t("branch")}
          </p>
        </div>

        <form className="p-6 space-y-2" onSubmit={(e) => e.preventDefault()}>
          
          <div className="flex flex-col space-y-1.5">
            <label htmlFor="branch" className="text-sm font-semibold text-slate-700">
              {/* {t("selectBranch")} */}
              {t("from")}
            </label>
            <div className="relative capitalize">
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
                placeholder="120000"
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
              placeholder={t("wordsPlaceholder")}
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
            {t("submitBtn")}
          </button>

           </div>

          
        </form>
      </div>
    </div>
  );
};

export default AddReceivable;




// const translations = {
//   en: {
//     title: "AKEA FINANCIAL SERVICE",
//     branch: "Gassani Branch",
//     toLabel: "To:",
//     selectBranch: "Select the Branch",
//     amountLabel: "Amount",
//     amountPlaceholder: "12,000,000",
//     wordsLabel: "Amount In Words",
//     wordsPlaceholder: "Twelve Million Shillings Only",
//     submitBtn: "Submit Receivable"
//   },
//   sw: {
//     title: "HUDUMA YA KIFEDHA YA AKEA",
//     branch: "Tawi la Gassani",
//     toLabel: "Kwenda:",
//     selectBranch: "Chagua Tawi",
//     amountLabel: "Kiasi",
//     amountPlaceholder: "12,000,000",
//     wordsLabel: "Kiasi kwa Maneno",
//     wordsPlaceholder: "Shilingi Milioni Kumi na Mbili Tu",
//     submitBtn: "Wasilisha Malipo"
//   },
//   runy: {
//     title: "AKEA FINANCIAL SERVICE",
//     branch: "Itaagi rya Gassani",
//     toLabel: "Kuza aha:",
//     selectBranch: "Toorana Itaagi",
//     amountLabel: "Sente",
//     amountPlaceholder: "12,000,000",
//     wordsLabel: "Sente omu Bigambo",
//     wordsPlaceholder: "Siringi Mirioni Ikumi na Ibiri Zonka",
//     submitBtn: "Hayo amafaranga"
//   },
//   rw: {
//     title: "IKIGO CY'IMARI CHA AKEA",
//     branch: "Ishami rya Gassani",
//     toLabel: "Kuri:",
//     selectBranch: "Hitamo Ishami",
//     amountLabel: "Amafaranga",
//     amountPlaceholder: "12,000,000",
//     wordsLabel: "Amafaranga mu Magambo",
//     wordsPlaceholder: "Amashilingi Miliyoni Cumi n'Ebyiri Gusa",
//     submitBtn: "Tanga Ubwishyu"
//   }
// };