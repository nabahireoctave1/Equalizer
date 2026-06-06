 

 import i18n from "i18next";
 import { initReactI18next } from "react-i18next";
 import en from '../pages/locales/en.json'
 import fr from '../pages/locales/fr.json'
 import lg from '../pages/locales/lg.json'


 i18n.use(initReactI18next).init({
    resources:{
    en:{translation:en},
    fr:{translation:fr},
    lg:{translation:lg},
    } ,

    lgn:localStorage.getItem('lang')||'en',
    fallbackLng:'en',
      interpolation:{
        escapeValue:false
      }
    
 })

 export default i18n