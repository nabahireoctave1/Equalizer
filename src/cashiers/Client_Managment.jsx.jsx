
import { useState } from 'react';
import Dashboard from './Overview/Dashboard';
import Report from './Report';
import Client from './Clients';
import Paid from './Paid_details';
import Unpaid from './Unpaid';
import Field from './Field_Payment'
import Profile from './Profile';
import Notification from './Notification';

import { useTranslation } from 'react-i18next';
import i18n from '../pages/i18n';
import logo from '../assets/image.jpeg'



import { 
  LayoutDashboard, 
  Users, 
  FileX, 
   CreditCard, 
  HandCoins, 
  User, 
  Bell, 
  FileText, 
  LogOut, 
  Menu, 
  X, 
  User2Icon,
  Languages,
  UserX2
} from 'lucide-react';

const Client_Management = () => {

function changeLanguage(lang){
  i18n.changeLanguage(lang);
}

const {t} = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
 
  const [activePage, setActivePage] = useState(t(`Dashboard`));

  const NavLink = ({ icon: Icon, label }) => {
    const isActive = activePage === label;
    return (
      <div 
        onClick={() => {
          setActivePage(label);
          
          setIsMobileMenuOpen(false); 
        }}
        className={`flex items-center gap-3 px-3 py-2 rounded-xs
           transition-colors cursor-pointer text-[14px] select-none
          ${isActive 
            ? 'text-blue-600 font-medium' 
            : 'text-gray-800'
          }`}
      >
        <Icon className="w-5 h-5 shrink-0" />
        <span>{label}
          
        </span>
        
      </div>
    );
  };

  const renderPageContent = () => {
    switch(activePage) {
      case t('Dashboard'):
        return <Dashboard />;
      case t('Client'):
        return <Client />;
      case t('Unpaid'):
        return <Unpaid />;
     
      case t('Paid Details'):
        return <Paid />;
      case t('Field Payment'):
        return <Field />;
      case t('Profile'):
        return <Profile />;
      case t('Notification'):
        return <Notification />;
      case t('Report'):
        return <Report />;
      default:
        return <Dashboard />;
    }
  };

 

  return (
    <div className="w-full flex h-screen overflow-hidden bg-gray-100 font-sans antialiased">
      
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col justify-between 
        transform transition-transform duration-300 ease-in-out
        md:relative md:transform-none
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        <div className="p-4 border-b border-gray-100">
          <div className="flex  mb-2 items-center gap-2">
            <img src={logo} alt="Logo" className="h-12 object-cover" />
            <h2 className="text-center font-extrabold text-2xl uppercase text-blue-500 tracking-tight">
            {t("Equalizer")}
          </h2>
          </div>
          
        </div>

        <div className="flex-1 overflow-y-auto 
        px-4 py-6 space-y-1 capitalize">
          <NavLink icon={LayoutDashboard} label={t("Dashboard")} />
          <NavLink icon={Users} label={t("Client")} />
          <NavLink icon={UserX2} label={t("Unpaid")} />
          <NavLink icon={CreditCard} label={t("Paid Details")} />
          <NavLink icon={HandCoins} label={t("Field Payment")} />
          <NavLink icon={User} label={t("Profile")} />
          <NavLink icon={Bell} label={t("Notification")} />
          <NavLink icon={FileText} label={t("Report")} />
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-2
           text-red-500  rounded-sm  cursor-pointer font-medium">
            <LogOut className="w-5 h-5" />
            <span>{t('Logout')}</span>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        <header className="bg-white border-b border-gray-200 p-6 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 rounded-md text-gray-600 hover:bg-gray-100 md:hidden focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <h1 className="text-xl font-extrabold uppercase text-gray-800 truncate">
             
              Akea Financial Service
            </h1>
            
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActivePage(t('Notification'))} 
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2
               ring-white"></span>
            </button>
            <div 
              onClick={() => setActivePage(t('Profile'))}
              className="w-8 h-8 rounded-full md:w-[50%] bg-gray-200 border border-gray-300 cursor-pointer "
            >
              <User2Icon className="w-full h-full object-cover p-1" alt="User Profile"/>
              
            </div>
         {/* <button
              // onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full cursor-pointer bg-slate-100 dark:bg-slate-700 text-slate-600
               dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
              aria-label="Toggle Theme Mode"
            >
             
             
              
            </button> */}
            <div className="relative flex ">
              <Languages size={27} className='text-gray-700 '/>
              <span className='absolute'>
              <select onChange={(e) => changeLanguage(e.target.value)}
                className="bg-gray-100 text-[14px] opacity-0 outline-none
                 border-none   text-gray-600 uppercase  "
              >
                <option  value="en">English</option>
                <option  value="lg">Luganda</option>
                <option  value="fr">French</option>
                <option  value="nyn">Runyakore</option>
              </select>
              

              </span>

   
              <div className="absolute inset-y-0 right-1.5 flex items-center pointer-events-none text-slate-500">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
              </div>
            </div>
          </div>

        </header>

        <main className="flex-1 p-1  max-h-screen   overflow-y-auto ">
          <div className="  ">
           
            <div className="">
              {renderPageContent()}
            </div>
          </div>
        </main>
        
      </div>
    </div>
  );
};

export default Client_Management;
