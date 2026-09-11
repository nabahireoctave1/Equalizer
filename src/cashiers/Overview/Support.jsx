


import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Support = () => {

  const {t} = useTranslation();
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(null);
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How do I sync pending receivables between branches?",
      a: "Receivables log automatically across the central ledger. Once submitted from your local branch dashboard, the receiving branch will immediately see it flag under their 'Pending Verification' feed."
    },
    {
      q: "What should I do if an amount in words doesn't match the digit amount?",
      a: "The system will flag a mismatch warning. Please reject the receipt log, notify the initiating agent at the branch, and request a corrected re-submission."
    },
    {
      q: "How can I change the default system language?",
      a: "Scroll to the top language switcher banner on your dashboard module to change settings between English, Kiswahili, Runyankole, and Kinyarwanda instantaneously."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-blue-500 selection:text-white antialiased">
      
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden bg-linear-to-br from-slate-900 via-indigo-950 to-blue-900 text-white py-16 px-6 text-center">
        {/* Subtle Decorative Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-full text-blue-200 ring-1 ring-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t("supportHub")}
          </span>
          <h1 className="text-3xl md:text-5xl font-black mt-4 tracking-tight leading-none bg-linear-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
            {t("howCanWeHelp")}
          </h1>
          <p className="text-slate-300 mt-3 max-w-xl mx-auto text-sm md:text-base font-medium">
            {t("supportDescription")}
          </p>
          
          {/* Enhanced Quick Search Bar */}
          <div className="mt-8 max-w-lg mx-auto relative group">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchGuides")} 
              className="w-full pl-12 pr-4 py-3.5 bg-white text-slate-900 rounded-2xl shadow-xl shadow-blue-950/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium placeholder-slate-400"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 font-medium text-xs"
              >
                {t("clear")}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left & Middle Column: Documentation & FAQs */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: How It Works */}
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0,0.05)] border border-slate-100 ring-1 ring-black/2">
            <div className="flex items-center space-x-3.5 mb-5">
              <div className="p-2.5 bg-linear-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-xl shadow-inner">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{t("howEqualizerWorks")}</h2>
            </div>
            
            <div className="prose prose-slate text-slate-600 space-y-4 text-sm md:text-base leading-relaxed font-normal">
              <p>
                The <strong className="text-slate-900 font-semibold">{t("equalizerSystem")}</strong> serves as the unified financial clearing balance pipeline across all 
                Offices Service locations. It mitigates cross-branch settlement lag by tracking 
                outstanding <span className="bg-amber-50 text-amber-800 font-medium px-1.5 py-0.5 rounded text-xs">{t("payables")}</span> and real-time incoming <span className="bg-emerald-50 text-emerald-800 font-medium px-1.5 py-0.5 rounded text-xs">Receivables</span> inside a singular, high-speed workspace.
              </p>
              <p>
                Whenever money is processed from <em className="text-slate-800 font-medium not-italic">A Branch</em> to<em className="text-slate-800 font-medium not-italic"> {t("anotherBranch")}</em> or 
                regional sub-stations, clerks enter explicit numerical parameters alongside mandatory localized records. 
                This transparency completely safeguards against transaction translation anomalies.
              </p>
            </div>

            {/* Step-by-Step Interactive Pipeline Flow */}
            <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/80 hover:border-blue-200 transition-colors relative group">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-100/80 px-2 py-0.5 rounded-md">01</span>
                <p className="text-xs font-bold text-slate-900 mt-2">{t("systemParts")}</p>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">{t("systemPartsDescription")} </p>
                {/* <p className="text-[11px] text-slate-500 mt-1 leading-normal">Input clean data directly via the core Payable/Receivable forms.</p> */}
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/80 hover:border-blue-200 transition-colors relative">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-100/80 px-2 py-0.5 rounded-md">02</span>
                <p className="text-xs font-bold text-slate-900 mt-2">{t("reports")} </p>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">{t("reportsDescription")} </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/80 hover:border-blue-200 transition-colors relative">
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100/80 px-2 py-0.5 rounded-md">03</span>
                <p className="text-xs font-bold text-slate-900 mt-2">{t("notifications")}</p>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">{t("notificationsDescription")}</p>
              </div>
            </div>
          </section>

          {/* Section 2: Interactive Accordion FAQs */}
          <section className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0,0.05)] border border-slate-100 ring-1 ring-black/2">
            <h2 className="text-xl font-bold text-slate-900 mb-1 tracking-tight">{t("frequentlyAskedQuestions")}</h2>
            <p className="text-xs text-slate-500 mb-5">{t("faqDescription")}</p>
            
            <div className="space-y-3">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`border rounded-2xl overflow-hidden transition-all duration-200 ${isOpen ? 'border-blue-200 bg-blue-50/2 shadow-sm' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                    >
                      <button 
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between p-4.5 font-semibold text-sm text-left text-slate-800 transition-all duration-150 active:scale-[0.99]"
                      >
                        <span className={`pr-4 ${isOpen ? 'text-blue-600' : 'text-slate-800'}`}>{faq.q}</span>
                        <div className={`p-1 rounded-lg transition-colors ${isOpen ? 'bg-blue-50 text-blue-600' : 'text-slate-400'}`}>
                          <svg className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                          </svg>
                        </div>
                      </button>
                      <div className={`grid transition-all duration-200 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 border-t border-slate-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                        <div className="overflow-hidden">
                          <div className="p-4.5 text-xs md:text-sm text-slate-600 bg-slate-50/50 leading-relaxed font-normal">
                            {faq.a}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-slate-400 text-sm font-medium border border-dashed border-slate-200 rounded-2xl">
                  {t("noMatchesFound")} "{searchQuery}"
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar - Support Channels Contact Card */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0,0.05)] border border-slate-100 ring-1 ring-black/2">
            <h3 className="text-lg font-bold text-slate-900 mb-1 tracking-tight">{t("directAssistance")}</h3>
            <p className="text-xs text-slate-500 mb-6">{t("assistanceDescription")}</p>
            
            <div className="space-y-4">
              {/* Phone Line Support */}
              <div className="flex items-start space-x-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors group">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t("itDeskHelplines")}</h4>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5 hover:text-blue-600 transition-colors cursor-pointer">+256 700 000000</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{t("mondayToFriday")}</p>
                </div>
              </div>

              {/* Email Support */}
              <div className="flex items-start space-x-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors group pt-4 border-t border-slate-100">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t("systemEmailLogs")}</h4>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5 hover:text-blue-600 transition-colors cursor-pointer">Equalizer12@gmail.com</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{t("twentyFourHourResponse")}</p>
                </div>
              </div>

              {/* Local Branch Escalation */}
              <div className="flex items-start space-x-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors group pt-4 border-t border-slate-100">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{t("hqHubLocation")}</h4>
                  <p className="text-sm font-semibold text-slate-900 mt-0.5">{t("mainAdministrationOffice")}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{t("kampalaHubCompound")}l 2</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Notice Alert Box */}
          <div className="relative overflow-hidden bg-linear-to-br from-amber-50 to-orange-50/50 border border-amber-200/70 rounded-3xl p-5 text-amber-900 shadow-sm">
            <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-amber-200/30 font-bold text-7xl select-none pointer-events-none">
              !
            </div>
            <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider bg-amber-200/60 px-2 py-0.5 rounded text-amber-900">
              {t("systemNotice")}
            </span>
            <p className="text-xs mt-3 leading-relaxed font-medium text-amber-800">
              {t("dailySettlementNotice")}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Support;