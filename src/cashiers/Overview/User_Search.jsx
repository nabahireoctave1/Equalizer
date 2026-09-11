import { useState } from 'react';
import { Search as SearchIcon, UserCheck, UserX, ShieldAlert, Phone, MapPin, CreditCard, Calendar, Repeat } from 'lucide-react';
import {useTranslation} from 'react-i18next'

const Search = () => {


  const {t} = useTranslation()
  const [query, setQuery] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const allUsers = [
    {
      id: 1,
      names: "Webale Precious",
      phone: "07783647456",
      nin: "CM123456789ABC",
      location: "IHUNGA",
      activeLoans: 2,
      totalBorrowed: "70,000,000 UGX",
      status: "Active Borrower",
      riskLevel: "Low Risk",
      lastPaymentDate: "2026-06-10",
      appearances: 3
    },
    {
      id: 2,
      names: "Webale Precious",
      phone: "07783647456",
      nin: "CM123456789ABC",
      location: "KAMPALA",
      activeLoans: 0,
      totalBorrowed: "10,000,000 UGX",
      status: "Completed / Closed",
      riskLevel: "Good Standing",
      lastPaymentDate: "2025-11-15",
      appearances: 3
    },
    {
      id: 3,
      names: "Kansiime Brenda",
      phone: "0752987654",
      nin: "CF987654321XYZ",
      location: "MBARARA",
      activeLoans: 1,
      totalBorrowed: "15,000,000 UGX",
      status: "Pending Clearance",
      riskLevel: "Medium Risk",
      lastPaymentDate: "2026-05-20",
      appearances: 1
    },
    {
      id: 4,
      names: "Tumusiime Alex",
      phone: "0782112233",
      nin: "CM456123789DEF",
      location: "KAMPALA",
      activeLoans: 0,
      totalBorrowed: "45,000,000 UGX",
      status: "Completed / Eligible",
      riskLevel: "Good Standing",
      lastPaymentDate: "2026-04-12",
      appearances: 1
    }
  ];

  // Handle Enter key press or Search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const searchTerm = query.toLowerCase().trim();
    const foundUsers = allUsers.filter(
      (user) =>
        user.names.toLowerCase().includes(searchTerm) ||
        user.phone.toLowerCase().includes(searchTerm) ||
        user.nin.toLowerCase().includes(searchTerm)
    );

    setSearchedUsers(foundUsers);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-4">
            <SearchIcon size={24} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {t("crossCheckClientRecords")}
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            {t("searchExistingLoansDescription")}
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                <SearchIcon size={18} />
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("enterNinPhoneNames")}
                className="w-full bg-gray-50 border border-gray-300 pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-xs"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl text-sm transition-all shadow-sm cursor-pointer shrink-0"
            >
              {t("searchRecord")}
            </button>
          </form>
        </div>

        {/* Dynamic Results Display Area */}
        {hasSearched && (
          <div className="space-y-4">
            {searchedUsers.length > 0 ? (
              <>
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {t("searchResults")} ({searchedUsers.length} entries found)
                  </span>
                </div>

                {/* Looping through searched users */}
                {searchedUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className="bg-white rounded-2xl shadow-sm border border-green-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                  >
                    <div className="bg-green-600 px-6 py-4 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <UserCheck size={20} />
                        <span className="font-semibold text-sm sm:text-base">{t("userFoundInSystemRecord")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-white/20 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                          <Repeat size={12} />{t("appearsTimes")}{user.appearances} 
                        </span>
                        <span className="bg-white/30 text-xs font-semibold px-3 py-1 rounded-full">
                          {user.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-6">
                      {/* Name and Basic Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
                        <div>
                          <span className="text-xs uppercase font-semibold text-gray-400 block tracking-wider">{t("clientName")}</span>
                          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">{user.names}</h2>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100 px-3.5 py-2 rounded-lg text-xs font-mono font-semibold text-gray-700 self-start sm:self-auto">
                          <CreditCard size={15} className="text-gray-500" />
                          {user.nin}
                        </div>
                      </div>

                      {/* Grid Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                            <Phone size={14} />{t("phoneContact")}
                          </span>
                          <span className="text-sm font-bold text-gray-800 mt-1 block font-mono">{user.phone}</span>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                            <MapPin size={14} /> {t("locationBranch")}
                          </span>
                          <span className="text-sm font-bold text-gray-800 mt-1 block uppercase">{user.location}</span>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <span className="text-xs text-gray-400 block font-medium">{t("activeLoanAccounts")}</span>
                          <span className="text-sm font-bold text-blue-600 mt-1 block">{user.activeLoans} {t("account")}(s)</span>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <span className="text-xs text-gray-400 block font-medium">{t("totalBorrowedPortfolio")}</span>
                          <span className="text-sm font-bold text-gray-900 mt-1 block">{user.totalBorrowed}</span>
                        </div>
                      </div>

                      {/* Footer status notice */}
                      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm text-blue-900">
                        <span className="flex items-center gap-2 font-medium">
                          <Calendar size={16} className="text-blue-600" /> {t("lastTransactionDate")}: {user.lastPaymentDate}
                        </span>
                        <span className="font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-md">
                          {user.riskLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              /* User Not Found Card */
              <div className="bg-white rounded-2xl shadow-sm border border-red-200 p-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-500 mx-auto">
                  <UserX size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{t("noExistingRecordFound")}</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto">
                  {t("noMatchingClient")} <span className="font-semibold text-gray-700">"{query}"</span> {t("inOtherDatabase")}
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-4 py-2 rounded-lg border border-green-200">
                    <ShieldAlert size={15} /> {t("safeToProceed")}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Search;

