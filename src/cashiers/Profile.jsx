import { useTranslation } from 'react-i18next';
import ProfilePhoto from '../assets/photo.png'

const Profile = () => {
  const {t} = useTranslation();
  const Data = {
    fullName: "Webale Precious",
    role: "Cashier Officer ",
    department: "Equalizer Balancing System",
    company: "AKEA FINANCIAL SERVICE",
    phone: "+256 700 123456",
    officeLocation: "Kampala city",
    startDate: "2023-03-15",
    Total_Salary: "1,055,000",
    Salary: "155,000",
    updatedAt: "May 28, 2026 • 14:32 PM",
    managedTeams: 4,
    activeAgents: 28
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 p-2  flex justify-center items-center">
      <div className="w-full max-w-full bg-white rounded-md shadow-xl border border-slate-100 overflow-hidden">
        
        <div className="h-25  bg-linear-to-r from-blue-400 via-blue-300 to-indigo-500 relative p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center text-white/80 text-xs tracking-widest font-bold uppercase">
            <span>{Data.company}</span>
            <span className="bg-blue-300/30 text-white   rounded-full text-[10px] backdrop-blur-sm">
              {t("managementPortal")}
            </span>
          </div>
        </div>

        <div className="px-6 sm:px-8 pb-4 relative flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-14 border-b border-slate-100">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-white p-1.5 shadow-md border border-slate-100 ring-4 ring-white">
            <img 
              src={ProfilePhoto} 
              alt={Data.fullName} 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          
          <div className="text-center sm:text-left flex-1 mb-2">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              {Data.fullName}
            </h1>
            <p className="text-blue-600 font-semibold text-sm">
              {Data.role}
            </p>
            <p className="text-gray-700 uppercase text-xs font-semibold mt-0.5">
              {Data.department}
            </p>
          </div>

          <div className="flex gap-3 text-center sm:mb-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
            <div className="px-3">
              <span className="block text-xl font-bold text-slate-800">{Data.managedTeams}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t("teams")}</span>
            </div>
            <div className="border-l border-slate-200 px-3">
              <span className="block text-xl font-bold text-blue-600">{Data.activeAgents}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{t("agents")}</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-4">
             {t("credentialsAssignment")}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t("fullName")}</label>
              <div className="w-full px-4 py-3 rounded-md border border-slate-200 bg-slate-50 font-medium text-slate-800 flex items-center">
                <span className="w-2.5 text-sm h-2.5 rounded-full bg-blue-500 mr-3"></span>
                {Data.fullName}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t("phoneNumber")}</label>
              <div className="w-full px-4 py-3 rounded-md border border-slate-200
               bg-white font-medium text-slate-800 hover:border-blue-400 transition-colors">
                <input 
                  type="tel" 
                  defaultValue={Data.phone}
                  className="w-full text-sm bg-transparent focus:outline-none text-slate-800  cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t("officeLocation")}</label>
              <div className="w-full px-4 py-3 rounded-md border border-slate-200 bg-white font-medium text-slate-800 hover:border-blue-400 transition-colors">
                <input 
                  type="text" 
                  defaultValue={Data.officeLocation}
                  className="w-full text-sm bg-transparent focus:outline-none text-slate-800  cursor-not-allowed"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t("startedDate")}</label>
              <div className="w-full px-4 py-3 rounded-md border border-slate-200 bg-slate-50 font-medium text-slate-700">
                <input 
                  type="date" 
                  defaultValue={Data. startDate}
                  disabled
                  className="w-full text-sm bg-transparent focus:outline-none text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t("totalSalary")}</label>
              <div className="w-full px-4 py-3 rounded-md border border-slate-200 bg-slate-50 font-medium text-slate-700">
                <input 
                  type="text" 
                  defaultValue={Data.Total_Salary}
                  disabled
                  className="w-full bg-transparent text-sm focus:outline-none text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t("remainingSalary")}</label>
              <div className="w-full px-4 py-3 rounded-md border border-slate-200 bg-slate-50 font-medium text-slate-700">
                <input 
                  type="text" 
                  defaultValue={Data.Salary}
                  disabled
                  className="w-full  text-sm bg-transparent focus:outline-none text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

          </div>

          <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            
            <div className="flex items-center text-xs text-slate-400 font-medium">
              <svg className="w-4 h-4 mr-1.5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t("lastUpdated")}: <strong className="text-slate-500">{Data.updatedAt}</strong></span>
            </div>

            <div className="w-full sm:w-auto flex gap-3">
             
              <button type="submit" className="flex-1 sm:flex-initial px-6 py-2.5 rounded-sm cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-600/10 transition-colors">
                {t("saveChanges")}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;



// ENGLISH

// {
  // "managementPortal": "Management Portal",

  // "teams": "Teams",
  // "agents": "Agents",

  // "credentialsAssignment": "Credentials & Assignment",

  // "fullName": "Full Name",
  // "phoneNumber": "Phone Number",
  // "officeLocation": "Office Location",
  // "startedDate": "Started Date",

  // "totalSalary": "Total Salary",
  // "remainingSalary": "Remaining Salary",

  // "lastUpdated": "Last Updated",
  // "saveChanges": "Save Changes"
// }


// luganda


// {
  // "managementPortal": "Olukiiko lw'Abaddukanya",

  // "teams": "Ttiimu",
  // "agents": "Ba Agent",

  // "credentialsAssignment": "Ebikwata ku Muntu n'Obuvunaanyizibwa",

  // "fullName": "Erinnya Lijjuvu",
  // "phoneNumber": "Namba y'Essimu",
  // "officeLocation": "Ekifo ky'Ofiisi",
  // "startedDate": "Olunaku lwe Yatandika",

  // "totalSalary": "Omusaala Gwonna",
  // "remainingSalary": "Omusaala Ogusigadde",

  // "lastUpdated": "Kyasembyeyo Okulongoosebwa",
  // "saveChanges": "Tereka Enkyukakyuka"
// }


// kinyarwanda


// {
  // "managementPortal": "Urubuga rw'Ubuyobozi",

  // "teams": "Amatsinda",
  // "agents": "Abakozi",

  // "credentialsAssignment": "Amakuru y'Umukozi n'Inshingano",

  // "fullName": "Amazina Yuzuye",
  // "phoneNumber": "Numero ya Telefoni",
  // "officeLocation": "Aho Ibiro Biherereye",
  // "startedDate": "Itariki Yatangiriyeho",

  // "totalSalary": "Umushahara Wose",
  // "remainingSalary": "Umushahara Usigaye",

  // "lastUpdated": "Byaherukaga Kuvugururwa",
  // "saveChanges": "Bika Impinduka"
// }

// runyankore

// {
  // "managementPortal": "Ekicweka ky'Abareberera",

  // "teams": "Amatsinda",
  // "agents": "Abakozi",

  // "credentialsAssignment": "Amakuru g'Omukozi n'Obujunanizibwa",

  // "fullName": "Eiziina Ryona",
  // "phoneNumber": "Namba ya Simu",
  // "officeLocation": "Ahari Ofiisi",
  // "startedDate": "Eizooba Yatandikireho",

  // "totalSalary": "Omushaara Gwona",
  // "remainingSalary": "Omushaara Ogusigaire",

  // "lastUpdated": "Kyaherukire Kuteekanizibwa",
  // "saveChanges": "Teeka Enkyukakyuka"
// }


// swahili

// {
  // "managementPortal": "Mfumo wa Usimamizi",

  // "teams": "Timu",
  // "agents": "Maafisa",

  // "credentialsAssignment": "Taarifa za Mtumiaji na Majukumu",

  // "fullName": "Jina Kamili",
  // "phoneNumber": "Namba ya Simu",
  // "officeLocation": "Mahali pa Ofisi",
  // "startedDate": "Tarehe ya Kuanza",

  // "totalSalary": "Jumla ya Mshahara",
  // "remainingSalary": "Mshahara Uliobaki",

  // "lastUpdated": "Ilisasishwa Mwisho",
  // "saveChanges": "Hifadhi Mabadiliko"
// }

