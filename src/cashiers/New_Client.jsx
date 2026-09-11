import { XIcon } from 'lucide-react';
// import Other_loan from '../client/Other_Loan';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// this is the converting the digits to words

const convertToWords = (numStr) => {
  const num = parseInt(numStr, 10);
  if (isNaN(num) || num === 0) return 'Zero shillings only';

  const a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  function getBelowThousand(n) {
    if (n === 0) return '';
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
    return a[Math.floor(n / 100)] + ' hundred' + (n % 100 !== 0 ? ' and ' + getBelowThousand(n % 100) : '');
  }

  function getWords(n) {
    if (n === 0) return 'zero';
    let result = '';
    
    if (n >= 1000000000) {
      result += getBelowThousand(Math.floor(n / 1000000000)) + ' billion ';
      n %= 1000000000;
    }
    if (n >= 1000000) {
      result += getBelowThousand(Math.floor(n / 1000000)) + ' million ';
      n %= 1000000;
    }
    if (n >= 1000) {
      result += getBelowThousand(Math.floor(n / 1000)) + ' thousand ';
      n %= 1000;
    }
    if (n > 0) {
      result += getBelowThousand(n);
    }
    
    return result.trim();
  }

  const words = getWords(num);
  return words.charAt(0).toUpperCase() + words.slice(1) + ' shillings only';
};
// end

const New_client = ({onClose}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // const [amount, setAmount] = useState("");
  // const [amountInWords, setAmountInWords] = useState("");

  // const handleAmountChange = (e) => {
  //   setAmount(e.target.value);
  //   setAmountInWords(e.target.value ? "Converted words will appear here..." : "");
  // };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const inputStyle = "w-full mt-1 p-2.5 border border-gray-100 text-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 bg-gray-50";
  const labelStyle = "block text-sm font-semibold text-gray-700";
  const sectionGrid = "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3";

  const {t} = useTranslation();

   const [amount, setAmount] = useState('120000');
  
    // ✅ Derived state: calculated on render without useEffect or extra state setters
    const amountInWords = convertToWords(amount.replace(/[^0-9]/g, ''));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      
      
      
      <div className="bg-white   rounded-lg  w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl animate-fadeIn">

        <div className="bg-blue-400 p-6 text-white text-center">
         <div onClick={onClose} className='flex justify-end cursor-pointer'>
        <XIcon/>

      </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase">{t("loanApplicationPortal")}</h2>

          <div className="mt-4 flex items-center justify-center space-x-2 text-xs sm:text-sm text-blue-200">
            <span>{t("step")} {currentStep} of {totalSteps}</span>
            <div className="w-32 bg-blue-500 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-white h-full transition-all duration-100 ease-in" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>

            </div>

          </div>

        </div>

        <div className="p-6 sm:p-10">
          
          {currentStep === 1 && (
            <div className="space-y-4 ">
              <h3 className="text-xl font-bold text-gray-800 border-b  border-gray-200 pb-2">{t("particularApplicants")}</h3>
              <div className={sectionGrid}>
                <div>
                  <label className={labelStyle}>{t("name")}:</label>
                  <input type="text" className={inputStyle} placeholder='John Doe'/>
                </div>
                <div>
                  <label className={labelStyle}>{t("contact")}:</label>
                  <input type="text" className={inputStyle} placeholder='07835456132'/>
                </div>
              </div>
              <div className={sectionGrid}>
                <div>
                  <label className={labelStyle}>{t("address")}:</label>
                  <input type="text" className={inputStyle} placeholder='Kampala'/>
                </div>
                <div>
                  <label className={labelStyle}>{t("idNumber")}:</label>
                  <input type="text" className={inputStyle} placeholder='xxxxxxxxxxx'/>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">{t("businessDetails")}</h3>
              <div className={sectionGrid}>
                
                <div>
                  <label className={labelStyle}>{t("businessType")}:</label>
                  <input type="text" className={inputStyle} placeholder={t("placeholderBusinessType")}/>
                </div>
                <div>
                  <label className={labelStyle}>{t("businessLocation")}:</label>
                  <input type="text" className={inputStyle}  placeholder='Kampala'/>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Particular of Loan */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">{t("loanDetails")}</h3>
              <div className={sectionGrid}>
                <div>
                  <label className={labelStyle}>{t("amountApplied")} (Digits):</label>
                  <input 
                    type="text" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="150000" 
                    className={inputStyle} 
                  />
                </div>
                <div>
                  <label className={labelStyle}>{t("amountWords")}:</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={amountInWords}
                    placeholder="One Hundred thousand shillings Only" 
                    className={`${inputStyle} bg-gray-100 font-medium text-blue-400 select-all`} 
                  />
                </div>
              </div>
              <div className={sectionGrid}>
                <div>
                  <label className={labelStyle}>{t("duration")}:</label>
                  <select className={inputStyle}>
                    <option value="">{t("duration0")}</option>
                    <option value="">{t("duration1")}</option>
                    <option value="">{t("duration2")}</option>
                    <option value="">{t("duration3")}</option>
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>{t("interest")}:</label>
                  <input type="text" placeholder="20%" className={inputStyle} />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-3">{t("securityDetails")}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelStyle}>{t("securityName")}:</label>
                    <input type="text" className={inputStyle} placeholder={t("placeholderSecurity")}/>
                  </div>
                  <div>
                    <label className={labelStyle}>{t("securityNumber")}:</label>
                    <input type="number" className={inputStyle} placeholder='1'/>
                  </div>
                  <div>
                    <label className={labelStyle}>{t("securityPicture")}:</label>
                    <input type="file" className="w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-400 hover:file:bg-blue-100" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-3">{t("guarantorDetails")}s</h3>
                <div className={sectionGrid}>
                  <div>
                    <label className={labelStyle}>{t("guarantorName")}:</label>
                    <input type="text" className={inputStyle} placeholder='Jane Doe'/>
                  </div>
                  <div>
                    <label className={labelStyle}>Contact:</label>
                    <input type="text" className={inputStyle} placeholder='07865432546'/>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-bold text-red-600 border-b border-gray-200 pb-2">{t("terms")}</h3>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-gray-700 space-y-3 max-h-60 overflow-y-auto leading-relaxed">
                <p><strong>1.</strong>{t("term1")}</p>
                <p><strong>2.</strong>{t("term2")} </p>
                <p><strong>3.</strong>{t("term3")}</p>
                <p><strong>4.</strong>{t("term4")} </p>
                <p><strong>5.</strong>{t("term5")} </p>
              </div>
              <div className="pt-4 mt-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded text-blue-600 border-gray-300" required />
                  <span className="text-sm text-gray-600 font-medium">
                   {t("agreeTerms")}
                  </span>
                </label>
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-xl font-bold text-green-700 border-b border-gray-200 pb-2 mb-3">{t("loanApproval")}</h3>
              <div className={sectionGrid}>
                <div>
                  <label className={labelStyle}>{t("loanApproval")}:</label>
                  <input type="text" className={inputStyle} placeholder="Cashier's Name"/>
                </div>
                <div>
                  <label className={labelStyle}>{t("effectiveDate")}:</label>
                  <input type="text" className={inputStyle} placeholder='06/01/2026'/>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6  flex justify-between items-center">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                currentStep === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t("previous")}
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md"
              >
                {t("nextStep")}
              </button>
            ) : (
              <button
                type="submit"
                onClick={() => alert('Form Submitted Successfully!')}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-all shadow-md"
              >
                {t("submitForm")}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default New_client;



// language translator

// English

// {
  // "loanApplicationPortal": "Loan Application Portal",
  // "step": "Step",
  // "of": "of",

  // "previous": "Previous",
  // "nextStep": "Next Step",
  // "submitForm": "Submit Form",
  // "formSubmitted": "Form Submitted Successfully!",

  // "particularApplicants": "Particular of Applicants",

  // "name": "Name",
  // "contact": "Contact",
  // "address": "Address",
  // "idNumber": "ID Number",

  // "placeholderName": "John Doe",
  // "placeholderContact": "07835456132",
  // "placeholderAddress": "Kampala",
  // "placeholderID": "XXXXXXXXXXX",

  // "businessDetails": "Type of Business Details",
  // "businessType": "Business Type",
  // "businessLocation": "Business Location",
  // "placeholderBusinessType": "Business Man",
  // "placeholderBusinessLocation": "Kampala",

  // "loanDetails": "Particular of the Loan",
  // "amountApplied": "Amount Applied (Digits)",
  // "amountWords": "UGX in Words",
  // "convertedWords": "Converted words will appear here...",
  // "placeholderAmount": "150000",
  // "placeholderAmountWords": "One Hundred Fifty Thousand Uganda Shillings Only",

  // "duration": "Duration",
  // "duration1": "Month / Daily / Per Day",
  // "duration2": "Season / Three Months / Per Week",
  // "duration3": "Year / Per Month",

  // "interest": "Interest",
  // "placeholderInterest": "20%",

  // "securityDetails": "Security Details",
  // "securityName": "Security Name",
  // "securityNumber": "Number of Security",
  // "securityPicture": "Security Picture",

  // "placeholderSecurity": "Television",

  // "guarantorDetails": "Guarantor Details",
  // "guarantorName": "Guarantor's Name",

  // "terms": "Terms and Conditions",

  // "term1": "Loan payment shall be made daily for a period of 30 days.",
  // "term2": "Office service charges apply to every loan.",
  // "term3": "Failure to pay for two consecutive days activates default procedures.",
  // "term4": "The guarantor becomes liable if the borrower defaults.",
  // "term5": "Late payment penalty: UGX 5,000 per day.",

  // "agreeTerms": "I have carefully read and understood the terms and conditions.",

  // "loanApproval": "Loan Approval",

  // "approvedBy": "Approved By",
  // "effectiveDate": "Effective Date",

  // "cashierName": "Cashier's Name"
// }


// luganda


// {
  // "loanApplicationPortal": "Okusaba Ssente z'Ensimbi",
  // "step": "Omutendera",
  // "of": "ku",

  // "previous": "Ddayo",
  // "nextStep": "Omutendera Oguddako",
  // "submitForm": "Weereza Foomu",
  // "formSubmitted": "Foomu Eweerezeddwa Bulungi!",

  // "particularApplicants": "Ebikwata ku Musaba",

  // "name": "Erinnya",
  // "contact": "Essimu",
  // "address": "Endagiriro",
  // "idNumber": "Namba y'Endagamuntu",

  // "placeholderName": "John Doe",
  // "placeholderContact": "07835456132",
  // "placeholderAddress": "Kampala",
  // "placeholderID": "XXXXXXXXXXX",

  // "businessDetails": "Ebikwata ku Busuubuzi",
  // "businessType": "Ekika ky'Obusuubuzi",
  // "businessLocation": "Ekifo ky'Obusuubuzi",

  // "placeholderBusinessType": "Omusuubuzi",
  // "placeholderBusinessLocation": "Kampala",

  // "loanDetails": "Ebikwata ku Ssente Ezisabiddwa",

  // "amountApplied": "Omuwendo mu Namba",
  // "amountWords": "Omuwendo mu Bigambo",

  // "convertedWords": "Bigenda kulabika wano...",
  // "placeholderAmount": "150000",

  // "placeholderAmountWords": "Emitwalo kikumi mu nkumi amakumi ataano za Uganda zokka",

  // "duration": "Obudde",
  // "duration1": "Buli Lunaku",
  // "duration2": "Buli Wiiki",
  // "duration3": "Buli Mwezi",

  // "interest": "Amagoba",

  // "securityDetails": "Ebikwata ku Bweyamo",
  // "securityName": "Erinnya ly'Obweyamo",
  // "securityNumber": "Obungi",
  // "securityPicture": "Ekifaananyi",

  // "guarantorDetails": "Ebikwata ku Mweyimirizi",
  // "guarantorName": "Erinnya ly'Omweyimirizi",

  // "terms": "Amateeka n'Obukwakkulizo",

  // "term1": "Okusasula kuba kwa buli lunaku okumala ennaku 30.",
  // "term2": "Ssente z'ofiisi zisasulwa ku buli loan.",
  // "term3": "Bw'olemererwa okusasula ennaku bbiri, amateeka gatandika okukola.",
  // "term4": "Omweyimirizi avunaanyizibwa singa omusaba alemererwa.",
  // "term5": "Ekibonerezo kya UGX 5,000 buli lunaku.",

  // "agreeTerms": "Nsomye era ntegedde amateeka gano.",

  // "loanApproval": "Okukkiriza Loan",

  // "approvedBy": "Akkiriziddwa",
  // "effectiveDate": "Olunaku Olutandika"
// }


// kinyarwanda


// {
  // "loanApplicationPortal": "Gusaba Inguzanyo",
  // "step": "Intambwe",
  // "of": "muri",

  // "previous": "Subira Inyuma",
  // "nextStep": "Intambwe Ikurikira",
  // "submitForm": "Ohereza Ifishi",
  // "formSubmitted": "Ifishi Yoherejwe Neza!",

  // "particularApplicants": "Amakuru y'Uwasabye",

  // "name": "Amazina",
  // "contact": "Telefone",
  // "address": "Aderesi",
  // "idNumber": "Nomero y'Indangamuntu",

  // "businessDetails": "Amakuru y'Ubucuruzi",

  // "businessType": "Ubwoko bw'Ubucuruzi",
  // "businessLocation": "Aho Ubucuruzi Bukorera",

  // "loanDetails": "Amakuru y'Inguzanyo",

  // "amountApplied": "Amafaranga Yasabwe",
  // "amountWords": "Amafaranga mu Magambo",

  // "convertedWords": "Amagambo azagaragara hano",

  // "duration": "Igihe",

  // "interest": "Inyungu",

  // "securityDetails": "Ingwate",

  // "securityName": "Izina ry'Ingwate",

  // "securityNumber": "Umubare",

  // "securityPicture": "Ifoto y'Ingwate",

  // "guarantorDetails": "Amakuru y'Umwishingizi",

  // "guarantorName": "Izina ry'Umwishingizi",

  // "terms": "Amategeko n'Amabwiriza",

  // "term1": "Kwishyura bikorwa buri munsi mu minsi 30.",
  // "term2": "Hari amafaranga y'ibiro yishyurwa kuri buri nguzanyo.",
  // "term3": "Kutishyura iminsi ibiri bikurikiranye bitangiza ibihano.",
  // "term4": "Umwishingizi abazwa igihe uwahawe inguzanyo yananiwe kwishyura.",
  // "term5": "Igihano cyo gutinda ni UGX 5,000 ku munsi.",

  // "agreeTerms": "Nasomye kandi numvise amabwiriza yose.",

  // "loanApproval": "Kwemeza Inguzanyo",

  // "approvedBy": "Byemejwe na",
  // "effectiveDate": "Itariki Itangira"
// }

// runyankore


// {
  // "loanApplicationPortal": "Okusaba Eshente",
  // "step": "Ekicweka",
  // "of": "aha",

  // "previous": "Garuka",
  // "nextStep": "Ekicweka Ekirikukurataho",
  // "submitForm": "Ohereza",
  // "formSubmitted": "Fomu Yohereziibwe Kurungi!",

  // "particularApplicants": "Amakuru g'Omusabi",

  // "name": "Eiziina",
  // "contact": "Essimu",
  // "address": "Endagiriro",
  // "idNumber": "Namba y'Indangamuntu",

  // "businessDetails": "Amakuru g'Obushuubuzi",

  // "businessType": "Ekika ky'Obushuubuzi",

  // "businessLocation": "Aho Obushuubuzi Buri",

  // "loanDetails": "Amakuru g'Eshente",

  // "amountApplied": "Omuhendo",
  // "amountWords": "Omuhendo omu Bigambo",

  // "convertedWords": "Bigambo biraza kureebeka hanu",

  // "duration": "Obwire",

  // "interest": "Amagoba",

  // "securityDetails": "Oburinzi",

  // "guarantorDetails": "Amakuru g'Omweyimirizi",

  // "terms": "Amateeka",

  // "agreeTerms": "Nsomire kandi ntegyereize amateeka."

// }


// swahili



// {
  // "loanApplicationPortal": "Maombi ya Mkopo",

  // "step": "Hatua",
  // "of": "ya",

  // "previous": "Nyuma",
  // "nextStep": "Hatua Inayofuata",

  // "submitForm": "Wasilisha Fomu",

  // "formSubmitted": "Fomu Imewasilishwa Kikamilifu!",

  // "particularApplicants": "Taarifa za Mwombaji",

  // "name": "Jina",
  // "contact": "Simu",
  // "address": "Anwani",
  // "idNumber": "Namba ya Kitambulisho",

  // "businessDetails": "Maelezo ya Biashara",

  // "businessType": "Aina ya Biashara",
  // "businessLocation": "Mahali pa Biashara",

  // "loanDetails": "Maelezo ya Mkopo",

  // "amountApplied": "Kiasi Kilichoombwa",
  // "amountWords": "Kiasi kwa Maneno",

  // "convertedWords": "Maneno yataonekana hapa",

  // "duration": "Muda",

  // "interest": "Riba",

  // "securityDetails": "Dhamana",

  // "securityName": "Jina la Dhamana",

  // "securityNumber": "Idadi",

  // "securityPicture": "Picha ya Dhamana",

  // "guarantorDetails": "Maelezo ya Mdhamini",

  // "guarantorName": "Jina la Mdhamini",

  // "terms": "Sheria na Masharti",

  // "term1": "Malipo ya mkopo yatafanywa kila siku kwa muda wa siku 30.",
  // "term2": "Ada ya huduma ya ofisi itatozwa kwa kila mkopo.",
  // "term3": "Kutolipa kwa siku mbili mfululizo kutaanzisha taratibu za kuchelewa.",
  // "term4": "Mdhamini atawajibika ikiwa mkopaji atashindwa kulipa.",
  // "term5": "Adhabu ya kuchelewa ni UGX 5,000 kwa siku.",

  // "agreeTerms": "Nimesoma na kuelewa masharti yote.",

  // "loanApproval": "Idhini ya Mkopo",

  // "approvedBy": "Imeidhinishwa na",
  // "effectiveDate": "Tarehe ya Kuanza"
// }


