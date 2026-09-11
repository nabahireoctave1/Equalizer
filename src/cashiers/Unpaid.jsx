import  { useState } from 'react';
import Paying from '../client/Paying';
import Credit_Record from '../client/Client_record';
import {useTranslation} from 'react-i18next';
import { 
  Search, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  CreditCard, 
  BookOpen, 
  X,
  AlertCircle
} from 'lucide-react';

const INITIAL_USERS = [
  {
    id: 1,
    name: "Alex Morgan",
    email: "alex@example.com",
    phone: "1 555 019-2834",
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
    phone: "1 555 014-9921",
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
    phone: "1 555 017-8833",
    missedPaymentDate: "2026-05-20",
    dueDate: "2026-07-10",
    balance: 85.00,
    location: "Seoul, South Korea",
    creditBook: "Retail_Small"
  }
];

export default function Unpaid() {
  const {t} = useTranslation();
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPayingModalOpen, setIsPayingModalOpen] = useState(false);
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false); 

  const today = new Date();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'UGX' }).format(amount);
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

  const openPayingModal = (user) => {
    setSelectedUser(user);
    setIsPayingModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const openCreditModal = (user) => {
    setSelectedUser(user);
    setIsCreditModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModals = () => {
    setIsPayingModalOpen(false);
    setIsCreditModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const filteredUsers = users.filter((user) => {
    const normalizedSearch = searchTerm.toLowerCase();
    return user.name.toLowerCase().includes(normalizedSearch) || user.phone.includes(normalizedSearch);
  });

  return (
    <div className="bg-gray-50  min-h-screen font-sans antialiased">
      <div className="max-w-7xl">
        
        <div className="sticky top-0 z-50  flex flex-col sm:flex-row justify-between
       mb-8 gap-4 bg-white p-6 rounded-md border-b border-gray-100">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-blue-600">{t("titleUnpaid")}</h1>
            <p className="text-sm text-slate-500 mt-1">{t("subtitleunpaid")}</p>
          </div>
             <div className="relative w-full lg:w-md">
              <span className='absolute top-3.5 px-2'>
              <Search size={18} className="text-slate-400 " />

              </span>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border border-slate-200 bg-white 
              py-3 pl-11 pr-4 text-sm placeholder-slate-400 focus:border-blue-500 
              focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 transition-all "
              placeholder={t("searchPlaceholderUnpaid")}
            />
          </div>
        
        </div>

      

        <div className="grid grid-cols-1 gap-4 md:hidden">
          {filteredUsers.map((user) => {
            const { unpaidDays, daysRemaining } = calculateDays(user.missedPaymentDate, user.dueDate);
            return (
              <div key={user.id} className="bg-white rounded-2xl p-5  border border-slate-100 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800 text-base">{user.name}</h3>
                    <span className="flex items-center gap-1 text-sm text-gray-800 mt-1">
                      <MapPin size={12} /> {user.location}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] text-gray-800 uppercase tracking-wider font-bold">Balance</p>
                    <p className="font-mono font-semibold text-[17px] text-red-500 ">{formatCurrency(user.balance)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-sm border border-slate-100 text-center">
                  <div>
                    <p className="text-[13px] text-gray-800 font-medium uppercase">Unpaid Days</p>
                    <p className="font-mono font-bold text-red-600 mt-0.5">{unpaidDays} Days</p>
                  </div>
                  <div>
                    <p className="text-[13px] text-gray-800 font-medium uppercase">Status</p>
                    <div className="mt-1">
                      {daysRemaining < 0 ? (
                        <span className="px-2 py-2 text-[13px]  
                         font-semibold bg-red-50 text-red-500 
                         rounded-md flex items-center justify-center gap-1">
                          <AlertCircle size={16} /> Risk {Math.abs(daysRemaining)}
                        </span>
                      ) : (
                        <span className="text-slate-700 font-semibold bg-slate-200/80 px-2 py-0.5 rounded-full text-[10px]">
                          {daysRemaining}{t("daysShort")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button onClick={() => openPayingModal(user)} className="flex items-center
                   justify-center gap-2 bg-green-600 text-white 
                   font-semibold py-2.5 rounded-sm text-xs active:scale-95 transition-all">
                    <CreditCard size={14} /> {t("paying")}
                  </button>
                  <button onClick={() => openCreditModal(user)} className="flex items-center bg-blue-50
                  justify-center gap-2  text-blue-700 border border-slate-200
                   font-semibold py-2.5 rounded-sm text-xs active:scale-95 transition-all">
                    <BookOpen size={14} /> {("records")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hidden md:block w-full overflow-x-auto 
        rounded-sm border border-gray-100  bg-white p-4 ">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6 whitespace-nowrap">{t("names")}</th>
                <th className="py-4 px-6 whitespace-nowrap">{t("contactDetails")}</th>
                <th className="py-4 px-6 text-center whitespace-nowrap">{t("unpaidWindow")}</th>
                <th className="py-4 px-6 text-center whitespace-nowrap">{t("deadlineSafety")}</th>
                <th className="py-4 px-6 text-right whitespace-nowrap">{t("outstandingBalance")}</th>
                <th className="py-4 px-6 whitespace-nowrap">{t("location")}</th>
                <th className="py-4 px-6 text-center whitespace-nowrap">{t("actions")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredUsers.map((user) => {
                const { unpaidDays, daysRemaining } = calculateDays(user.missedPaymentDate, user.dueDate);
                return (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-900 whitespace-nowrap">
                      {user.name}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex flex-col text-[15px] space-y-1">
                        <span className="text-gray-800  flex items-center gap-2">
                          <Phone size={12} className="text-slate-800" />{user.phone}
                        </span>
                        <span className="text-gray-800 flex items-center gap-2">
                          <Mail size={12} className="text-gray-800" />{user.email}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 flex  gap-1 justify-center items-center  font-semibold
                     text-red-600
                     text-base whitespace-nowrap">
                      {unpaidDays} 
                      <span className="text-sm text-gray-700 font-sans 
                      font-normal">{t("days")}</span>
                    </td>
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      {daysRemaining < 0 ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[13px] 
                          bg-red-50 text-red-600 rounded-full
                          border border-red-100 animate-pulse">
                          <AlertCircle size={15} /> {t("overdue")} {Math.abs(daysRemaining)} {t("days")}
                        </span>
                      ) : (
                        <span className="text-slate-700 font-medium bg-slate-100 px-3 py-1 rounded-full text-xs border border-slate-200">
                          {daysRemaining} {t("daysRemaining")}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right text-[18px]  font-semibold text-rose-600
                     text-base whitespace-nowrap">
                      {formatCurrency(user.balance)}
                    </td>
                    <td className="py-4 px-6 text-gray-800 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 font-medium text-sm">
                        <MapPin size={14} className="text-slate-400" /> {user.location}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openPayingModal(user)} className="bg-green-600 
                        cursor-pointer text-white font-semibold
                         px-4 py-2 rounded-sm text-xs transition-all 
                         shadow-sm flex items-center gap-2 active:scale-95">
                          <CreditCard size={14} /> {t("paying")}
                        </button>
                        <button onClick={() => openCreditModal(user)} className="text-gray-700 
                        cursor-pointer hover:text-blue-600 px-3 py-2 rounded-sm
                         hover:bg-slate-100 transition flex items-center
                          gap-1.5 font-semibold text-xs border border-slate-200 active:scale-95">
                          <BookOpen size={14} /> {t("records")}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>


        {isPayingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center
           bg-black/60 backdrop-blur-sm p-4">
               <button 
                onClick={closeModals}
                className="absolute top-5 right-2 z-60 p-2  
                 text-red-600  cursor-pointer
                   "
              >
                <X size={20} />
              </button>
            <div className="relative w-full max-w-lg rounded-md overflow-visible">
           
              
                 <Paying clientName={selectedUser.name} amount={selectedUser.balance} currency="UGX" />
            </div>
          </div>
        )}

        {isCreditModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-7xl h-[80vh] rounded-md shadow-2xl relative flex flex-col">
              <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 uppercase">{t("ledgerHistory")}</h2>
                  <p className="text-lg font-bold capitalize text-gray-800">{selectedUser?.name}</p>
                </div>
                <button onClick={closeModals} className="p-2 bg-red-500 rounded-full transition-colors">
                  <X size={20} className="text-white cursor-pointer" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                <Credit_Record selectedUser={selectedUser} />
              </div>
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                <button onClick={closeModals} className="px-6 py-2 cursor-pointer
                 bg-red-500 text-white text-xs font-bold rounded-sm active:scale-95 transition-all">
                  {t("closeWindow")}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}



// english

// {
//   "unpaid": {
    // "title": "Unpaid Accounts Ledger",
    // "subtitle": "Real-time tracking of outstanding balances and client metrics.",
    // "date": "Date",
    // "searchPlaceholder": "Search by customer name or phone...",

    // "balance": "Balance",
    // "unpaidDays": "Unpaid Days",
    // "status": "Status",

    // "days": "Days",
    // "daysShort": "d left",
    // "daysRemaining": "days remaining",

    // "risk": "Risk",
    // "overdue": "Overdue",
    // "remaining": "Remaining",

    // "paying": "Paying",
    // "records": "Records",

    // "ledgerHistory": "Ledger History",
    // "closeWindow": "Close Window",

    // "table": {
    //   "names": "Names",
    //   "contactDetails": "Contact Details",
    //   "unpaidWindow": "Unpaid Window",
    //   "deadlineSafety": "Deadline Safety",
    //   "outstandingBalance": "Outstanding Balance",
    //   "location": "Location",
    //   "actions": "Actions"
//     }
//   }
// }


// luganda


// {
//   "unpaid": {
//     "title": "Ekitabo ky'Amabanja Agatasasuddwa",
//     "subtitle": "Okulondoola mu kiseera ekituufu amabanja n'ebikwata ku bakasitoma.",
//     "date": "Olunaku",
//     "searchPlaceholder": "Noonya erinnya oba essimu ya kasitoma...",

//     "balance": "Ssente Ezibanjibwa",
//     "unpaidDays": "Ennaku Ezitasasuddwa",
//     "status": "Embeera",

//     "days": "Ennaku",
//     "daysShort": "ennaku ezisigadde",
//     "daysRemaining": "ennaku ezisigadde",

//     "risk": "Akabi",
//     "overdue": "Yayisizza Ekiseera",
//     "remaining": "Ezisigadde",

//     "paying": "Sasula",
//     "records": "Ebiwandiiko",

//     "ledgerHistory": "Ebyafaayo by'Amabanja",
//     "closeWindow": "Ggalawo"

// ,
//     "table": {
//       "names": "Amannya",
//       "contactDetails": "Ebikwata ku Nkwatagana",
//       "unpaidWindow": "Ennaku Ezitasasuddwa",
//       "deadlineSafety": "Obukuumi bw'Ekiseera",
//       "outstandingBalance": "Ssente Ezibanjibwa",
//       "location": "Ekifo",
//       "actions": "Ebikolebwa"
//     }
//   }
// }

// kinyarwanda



// {
//   "unpaid": {
//     "title": "Igitabo cy'Imyenda Itarishyuwe",
//     "subtitle": "Gukurikirana imyenda n'amakuru y'abakiriya mu gihe nyacyo.",
//     "date": "Itariki",
//     "searchPlaceholder": "Shakisha umukiriya ukoresheje izina cyangwa telefoni...",

//     "balance": "Umwenda",
//     "unpaidDays": "Iminsi Itarishyuwe",
//     "status": "Imiterere",

//     "days": "Iminsi",
//     "daysShort": "isigaye",
//     "daysRemaining": "iminsi isigaye",

//     "risk": "Ibyago",
//     "overdue": "Yarengeje Igihe",
//     "remaining": "Bisigaye",

//     "paying": "Kwishyura",
//     "records": "Amakuru",

//     "ledgerHistory": "Amateka y'Umwenda",
//     "closeWindow": "Funga"

// ,
//     "table": {
//       "names": "Amazina",
//       "contactDetails": "Amakuru y'Itumanaho",
//       "unpaidWindow": "Iminsi Itarishyuwe",
//       "deadlineSafety": "Igihe Gisigaye",
//       "outstandingBalance": "Umwenda Usigaye",
//       "location": "Aho Aherereye",
//       "actions": "Ibikorwa"
//     }
//   }
// }

// runyankore


// {
//   "unpaid": {
//     "title": "Ekitabo ky'Amabanja Agatakasaswirwe",
//     "subtitle": "Okukurata amabanja n'amakuru ga bakasitoma omu bwire nyabwo.",
//     "date": "Eizooba",
//     "searchPlaceholder": "Shakisha omukasitoma n'eiziina rwe nari esimu...",

//     "balance": "Eibanja",
//     "unpaidDays": "Ebiro Bitakasaswirwe",
//     "status": "Embeera",

//     "days": "Ebiro",
//     "daysShort": "ebiro bisigaire",
//     "daysRemaining": "ebiro bisigaire",

//     "risk": "Akabi",
//     "overdue": "Akahingura Obwire",
//     "remaining": "Bisigaire",

//     "paying": "Shashura",
//     "records": "Ebyahandiikirwe",

//     "ledgerHistory": "Ebyafaayo by'Amabanja",
//     "closeWindow": "Gara"

// ,
//     "table": {
//       "names": "Amabara",
//       "contactDetails": "Amakuru g'Okutunga",
//       "unpaidWindow": "Ebiro Bitakasaswirwe",
//       "deadlineSafety": "Obwire Obusigaire",
//       "outstandingBalance": "Eibanja Erisigaire",
//       "location": "Ahantu",
//       "actions": "Ebikorwa"
//     }
//   }
// }

// swahili



// {
//   "unpaid": {
//     "title": "Daftari la Madeni Yasiyolipwa",
//     "subtitle": "Ufuatiliaji wa muda halisi wa madeni na taarifa za wateja.",
//     "date": "Tarehe",
//     "searchPlaceholder": "Tafuta kwa jina la mteja au namba ya simu...",

//     "balance": "Salio la Deni",
//     "unpaidDays": "Siku Bila Malipo",
//     "status": "Hali",

//     "days": "Siku",
//     "daysShort": "zimebaki",
//     "daysRemaining": "siku zimebaki",

//     "risk": "Hatari",
//     "overdue": "Umechelewa",
//     "remaining": "Zimebaki",

//     "paying": "Lipa",
//     "records": "Rekodi",

//     "ledgerHistory": "Historia ya Deni",
//     "closeWindow": "Funga"

// ,
//     "table": {
//       "names": "Majina",
//       "contactDetails": "Maelezo ya Mawasiliano",
//       "unpaidWindow": "Siku Bila Malipo",
//       "deadlineSafety": "Muda Uliobaki",
//       "outstandingBalance": "Deni Lililobaki",
//       "location": "Mahali",
//       "actions": "Vitendo"
//     }
//   }
// }