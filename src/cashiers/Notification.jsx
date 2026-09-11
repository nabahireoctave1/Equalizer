

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
const Notification = () => {

  const {t} = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const systemAlerts = [
    {
      id: 1,
      title: t("systemMaintenance"),
      description: t("systemMaintenanceDescription"),
      time: "12:00 AM Tonight",
      type: "system",
      urgency: t("high")
    },
    {
      id: 2,
      title: t("lowMessageBalance"),
      description: t("lowMessageBalanceDescription"),
      meta: t("remainingMessages"),
      type: "warning",
      urgency: t("high")
    },
    {
      id: 3,
      title: t("officeReportDeadline"),
      description: t("officeReportDescription"),
      time: "Due within 2 hours",
      type: "info",
      urgency: t("medium")
    }
  ];

  const financialDirectives = [
    {
      id: 1,
      title: t("officeReportDeadline"),
      description: t("officeReportDescription"),
      urgency: t("critical")
    },
    {
      id: 2,
      title: t("cashoutDirective"),
      description: t("cashoutDirectiveDescription"),
      urgency: t("high")
    }
  ];

  const stockSecurityLogs = [
    { id: "S1", client: "Webale Precious", type: t("released"), item: t("nationalId"), status: t("outOfStock") },
    { id: "S2", client: "Onlyx Precious", type: t("released"), item: t("nationalId"), status: t("inStock") },
    { id: "S3", client: "Webale Precious", type: t("received"), item:  t("assetDeed"), status: t("outOfStock") },
    { id: "S4", client: "Ayembazibwe Abert", type: t("received"), item:  t("assetDeed"), status: t("inStock") },
  
  ];

  const filteredStock = stockSecurityLogs.filter(log =>
    log.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 text-slate-800  ">
       <div className="flex flex-col sm:flex-row 
        sm:items-center justify-between bg-white py-3 px-5 top-0 sticky z-50
        gap-4 border-b border-gray-100 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">{t("title")}</h1>
            <p className="text-[15px] text-gray-700 mt-1">{t("subtitle")}</p>
          </div>
          <span className="self-start sm:self-center
           bg-blue-50 text-blue-700 border border-blue-200 px-3
            py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
            {t("portalName")}
          </span>
        </div>
      <div className="max-w-7xl  space-y-8 mt-2 px-5 pt-3">
        
       

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 
              mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                {t("systemNotifications")}
              </h2>
              <div className="space-y-3">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} 
                  className="bg-white border border-gray-100 p-4 rounded-sm  transition-all">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 uppercase">{alert.title}</h4>
                        <p className="text-[14px]  text-gray-700 mt-1">{alert.description}</p>
                        
                        {alert.meta && (
                          <div className="mt-3 inline-block bg-rose-50 
                          text-red-500 text-xs font-bold px-2.5 py-1
                           rounded-full border border-rose-100">
                            {alert.meta}
                          </div>
                        )}
                        
                        {alert.time && (
                          <span className="block text-sm font-medium
                           text-blue-600 mt-2 bg-blue-50/50  px-2 py-0.5 rounded">
                           {t("schedule")}: {alert.time}
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                        alert.urgency === 'High' ? 'bg-red-50 text-red-500 border border-red-100' : 
                        'bg-amber-50 text-500-500'
                      }`}>
                        {alert.urgency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                {t("branchOperations")}
              </h2>
              <div className="space-y-3">
                {financialDirectives.map((directive) => (
                  <div key={directive.id} className="bg-linear-to-br
                   from-white to-slate-50/50 border-l-4 border-l-blue-600 
                   border-y border-r border-gray-200 p-4 rounded-r-md">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-semibold uppercase text-gray-800 text-base">{directive.title}</h4>
                        <p className="text-[14px] text-gray-700 mt-1">{directive.description}</p>
                      </div>
                      <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                       {t("actionRequired")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="bg-white border border-gray-100 
          rounded-md h-full p-5 space-y-4 self-start">
            <div>
            <h3 className="font-bold text-gray-800 text-lg">{t("securityMonitor")}</h3>
              <p className="text-[13px] text-gray-700">{t("securityMonitorDescription")}</p>
            </div>

            <div className="relative">
               <span className='absolute top-2 left-2'>
                <Search size={20}/>
              </span>
              <input 
                type="text"
                placeholder={t("searchPlaceholder")} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full text-sm pl-9 pr-4 py-2 rounded-md border border-gray-200 bg-gray-50
                 focus:bg-white focus:outline-none 
                focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all'
                />
                
             
            </div>

            <div className="space-y-3 max-h-100 overflow-y-auto pr-1">
              {filteredStock.length > 0 ? (
                filteredStock.map((log) => (
                  <div 
                    key={log.id} 
                    className={`p-2 rounded-md  border text-sm transition-colors ${
                      log.type === t("released") 
                        ? 'bg-red-50 border-rose-100' 
                        : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center font-semibold mb-1">
                      <span className="text-slate-800 font-semibold">{log.client}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[12px] ${
                        log.type === t("released") ? 'bg-red-100 text-red-600'
                         : 'bg-gray-100 text-green-600'
                      }`}>
                        {log.type}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[13px]">{log.item}</p>
                    <div className="mt-2 text-[13px] text-gray-800 flex justify-between items-center">
                      <span>{t("id")}: {log.id}</span>
                      <span className="font-medium uppercase">{log.status}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                 {t("noLogsFound")} "{searchQuery}"
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Notification;


// english


// {
  // "portalName": "Akea Financial Portal",

  // "title": "Notification Control Center",
  // "subtitle": "Monitor system infrastructure alerts, branch cash directives, and client security stock operations.",

  // "systemNotifications": "System & Account Notifications",
  // "branchOperations": "Branch Cash Payables & Operations",

  // "securityMonitor": "Security Stock Monitor",
  // "securityMonitorDescription": "Track client physical assets entering or leaving vault storage.",

  // "searchPlaceholder": "Search client security profile...",
  // "noLogsFound": "No security logs found matching",

  // "schedule": "Schedule",
  // "actionRequired": "Action Required",

  // "systemMaintenance": "System Scheduled Maintenance",
  // "systemMaintenanceDescription": "The Equalizer Balancing System will undergo a major core update tonight. Expect brief offline windows.",

  // "lowMessageBalance": "Low Message Balance Alert",
  // "lowMessageBalanceDescription": "Your SMS/Message allocation is about to run out. Please contact your administrator or manager immediately to purchase additional units.",
  // "remainingMessages": "Remaining Balance",

  // "officeReportDeadline": "Office Performance Report Deadline",
  // "officeReportDescription": "The end-of-period Office Report is ready for final verification and is about to be auto-submitted.",

  // "cashoutDirective": "No Cashout Operations Tomorrow",
  // "cashoutDirectiveDescription": "Strict directive: No manual cashout transactions will be authorized tomorrow. All branch cash-in volume must be instantly routed and banked into either the corporate Bank Account or designated Mobile Money wallets.",

  // "cashTransfer": "Mandatory Cash Transfer to Kampala Branch",
  // "cashTransferDescription": "Cash Payables Directive: All physical cash-in collected during tomorrow's shift must be securely bundled and processed for immediate transfer to the Kampala Branch office.",

  // "released": "Released",
  // "received": "Received",
  // "outOfStock": "Out of Stock",
  // "inStock": "In Stock",

  // "nationalId": "National ID / Security Collateral",
  // "assetDeed": "Asset Deed / Security Entry",

  // "high": "High",
  // "medium": "Medium",
  // "critical": "Critical",

  // "id": "ID"
// }





// luganda



// {
  // "portalName": "Akea Financial Portal",

  // "title": "Ekifo ky'Okufuga Ebimanyisibwa",
  // "subtitle": "Londoola ebimanyisibwa bya sisitemu, ebiragiro by'ensimbi n'ebintu bya bakasitoma ebiri mu sitoowa.",

  // "systemNotifications": "Ebimanyisibwa bya Sisitemu ne Akawunti",
  // "branchOperations": "Ensimbi n'Emirimu gy'Amatabi",

  // "securityMonitor": "Okulondoola Ebintu eby'Obukuumi",
  // "securityMonitorDescription": "Londoola ebintu bya bakasitoma ebiyingira oba okuva mu sitoowa.",

  // "searchPlaceholder": "Noonya eby'obukuumi bya kasitoma...",
  // "noLogsFound": "Tewali byafuniddwa ebifaanana",

  // "schedule": "Enteekateeka",
  // "actionRequired": "Kikole mangu",

  // "systemMaintenance": "Okuddaabiriza Sisitemu",
  // "systemMaintenanceDescription": "Sisitemu ejja kuddaabirizibwa ekiro kino.",

  // "lowMessageBalance": "Obubaka Buweddeko",
  // "lowMessageBalanceDescription": "Obubaka bwo bunaatera okuggwaako. Yogera n'omuddukanya.",
  // "remainingMessages": "Obubaka Obusigadde",

  // "officeReportDeadline": "Lipoota y'Ofiisi",
  // "officeReportDescription": "Lipoota eyetegefu okusunsulwa.",

  // "cashoutDirective": "Tewajja kuba Cashout enkya",
  // "cashoutDirectiveDescription": "Cashout yonna egiddwawo enkya.",

  // "cashTransfer": "Tambuza Ensimbi e Kampala",
  // "cashTransferDescription": "Ensimbi zonna zitwalibwe e Kampala.",

  // "released": "Kyatwaliddwa",
  // "received": "Kyafuniddwa",
  // "outOfStock": "Tekiri mu Sitoowa",
  // "inStock": "Kiri mu Sitoowa",

  // "nationalId": "Endagamuntu",
  // "assetDeed": "Ebbaluwa y'Obwannannyini",

  // "high": "Kya Maanyi",
  // "medium": "Ekya Wakati",
  // "critical": "Kikulu Nnyo",

  // "id": "Namba"
// }


// kinyarwanda



// {
  // "portalName": "Akea Financial Portal",

  // "title": "Ikigo cy'Amatangazo",
  // "subtitle": "Kurikirana amatangazo ya sisitemu, amabwiriza y'amafaranga n'umutekano w'ibintu by'abakiliya.",

  // "systemNotifications": "Amatangazo ya Sisitemu",
  // "branchOperations": "Ibikorwa by'Amafaranga",

  // "securityMonitor": "Ikurikirana ry'Umutekano",
  // "securityMonitorDescription": "Kurikirana umutungo winjira cyangwa usohoka.",

  // "searchPlaceholder": "Shakisha umutekano w'umukiliya...",
  // "noLogsFound": "Nta makuru abonetse",

  // "schedule": "Gahunda",
  // "actionRequired": "Igikorwa Gisabwa",

  // "systemMaintenance": "Gusana Sisitemu",
  // "systemMaintenanceDescription": "Sisitemu izavugururwa iri joro.",

  // "lowMessageBalance": "Ubutumwa Burashira",
  // "lowMessageBalanceDescription": "Ubutumwa busigaye ni buke.",
  // "remainingMessages": "Ubutumwa Busigaye",

  // "officeReportDeadline": "Raporo y'Ibiro",
  // "officeReportDescription": "Raporo yiteguye koherezwa.",

  // "cashoutDirective": "Nta Cashout Ejo",
  // "cashoutDirectiveDescription": "Cashout zose zirahagaritswe ejo.",

  // "cashTransfer": "Ohereza Amafaranga i Kampala",
  // "cashTransferDescription": "Amafaranga yose ajyanwe i Kampala.",

  // "released": "Byasohotse",
  // "received": "Byakiriwe",
  // "outOfStock": "Ntibihari",
  // "inStock": "Birahari",

  // "nationalId": "Indangamuntu",
  // "assetDeed": "Icyangombwa cy'Umutungo",

  // "high": "Byihutirwa",
  // "medium": "Hagati",
  // "critical": "Byihutirwa Cyane",

  // "id": "ID"
// }





// runyankore


// {
  // "portalName": "Akea Financial Portal",

  // "title": "Ekicweka ky'Ebimanyiso",
  // "subtitle": "Reeba ebimanyiso bya sisitemu, eby'esente n'eby'umutekano.",

  // "systemNotifications": "Ebimanyiso bya Sisitemu",
  // "branchOperations": "Emirimo y'Esente",

  // "securityMonitor": "Okureeberera Oburinzi",
  // "securityMonitorDescription": "Reeba eby'oburinzi by'abakiliya.",

  // "searchPlaceholder": "Shwijuma omukiliya...",
  // "noLogsFound": "Tihariho byafunyenwe",

  // "schedule": "Entebeekanisa",
  // "actionRequired": "Kora Hati",

  // "systemMaintenance": "Okugaruramu Sisitemu",
  // "systemMaintenanceDescription": "Sisitemu eragarurwamu nyekiro.",

  // "lowMessageBalance": "Obutumwa Burikuhwaho",
  // "lowMessageBalanceDescription": "Obutumwa busigaire bukye.",
  // "remainingMessages": "Obusigaire",

  // "officeReportDeadline": "Rapoota y'Ofiisi",
  // "officeReportDescription": "Rapoota eri kwenda kutumwa.",

  // "cashoutDirective": "Tihari Cashout Nyencakare",
  // "cashoutDirectiveDescription": "Cashout zoona zaremesibwe.",

  // "cashTransfer": "Twara Esente Kampala",
  // "cashTransferDescription": "Esente zoona zitwarwe Kampala.",

  // "released": "Kyaihiremu",
  // "received": "Kyafunyenwe",
  // "outOfStock": "Tikirimu",
  // "inStock": "Kirimu",

  // "nationalId": "Endangamuntu",
  // "assetDeed": "Ebaruha y'Obutaka",

  // "high": "Kikuru",
  // "medium": "Hagati",
  // "critical": "Kikuru Munonga",

  // "id": "ID"
// }





// swahili


// {
  // "portalName": "Akea Financial Portal",

  // "title": "Kituo cha Arifa",
  // "subtitle": "Fuatilia arifa za mfumo, maagizo ya fedha na usalama wa mali za wateja.",

  // "systemNotifications": "Arifa za Mfumo",
  // "branchOperations": "Fedha za Tawi na Uendeshaji",

  // "securityMonitor": "Ufuatiliaji wa Usalama",
  // "securityMonitorDescription": "Fuatilia mali za wateja zinazoingia au kutoka.",

  // "searchPlaceholder": "Tafuta taarifa za usalama...",
  // "noLogsFound": "Hakuna taarifa zilizopatikana",

  // "schedule": "Ratiba",
  // "actionRequired": "Hatua Inahitajika",

  // "systemMaintenance": "Matengenezo ya Mfumo",
  // "systemMaintenanceDescription": "Mfumo utaboreshwa usiku wa leo.",

  // "lowMessageBalance": "Salio la Ujumbe Limepungua",
  // "lowMessageBalanceDescription": "Salio la SMS linakaribia kuisha.",
  // "remainingMessages": "Ujumbe Uliobaki",

  // "officeReportDeadline": "Ripoti ya Ofisi",
  // "officeReportDescription": "Ripoti iko tayari kuwasilishwa.",

  // "cashoutDirective": "Hakuna Cashout Kesho",
  // "cashoutDirectiveDescription": "Cashout zote zimezuiwa kesho.",

  // "cashTransfer": "Hamisha Fedha Kampala",
  // "cashTransferDescription": "Fedha zote zihamishwe Kampala.",

  // "released": "Imetolewa",
  // "received": "Imepokelewa",
  // "outOfStock": "Haipo",
  // "inStock": "Ipo",

  // "nationalId": "Kitambulisho cha Taifa",
  // "assetDeed": "Hati ya Mali",

  // "high": "Juu",
  // "medium": "Wastani",
  // "critical": "Muhimu Sana",

  // "id": "Kitambulisho"
// }