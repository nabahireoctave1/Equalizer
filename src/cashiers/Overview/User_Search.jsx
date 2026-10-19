import { useState } from 'react';
import { Search as SearchIcon, UserCheck, UserX, ShieldAlert, Phone, MapPin, CreditCard, Calendar, Repeat, LoaderCircle } from 'lucide-react';
import {useTranslation} from 'react-i18next'
import api from '../../api';

const Search = () => {

  const {t} = useTranslation()
  const [query, setQuery] = useState('');
  
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [hasRecord,setHasRecord]=useState([])


  const [Error,setError]=useState({});
  const [Loading,setLoading]= useState(null);
  





  const HandleSearch= async ()=>{
    try{
       setLoading(true);
      const res= await api.post(`/search-borrower-Record?searchQuery=${ encodeURIComponent(query)}`);
      console.log(res);

    }
    catch(err){
      const data= err.response.data;
    if(data?.error){
      setError(data.error);
      return
    }



    }
    finally{
      setLoading(false);
    }

  }

  
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-2 font-sans">
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="bg-white rounded-md shadow-xs border border-gray-100 p-6 sm:p-8 text-center ">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-4">
            <SearchIcon size={24} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {t("crossCheckClientRecords")}
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            {t("searchExistingLoansDescription")}
          </p>
          <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                <SearchIcon size={18} />
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => {setQuery(e.target.value)
                  setError({});
                }}
                placeholder={t("enterNinPhoneNames")}
                className={`${Error['query']? 'bg-red-50 border border-red-500'
                  :'bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:bg-white'} w-full 
                 pl-10 pr-4 py-2 rounded-sm text-[15px] focus:outline-none
                   transition-all`}
              />
            </div>


            <button
             onClick={HandleSearch}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2
               rounded-sm text-sm transition-all shadow-sm cursor-pointer shrink-0"
            >
              {Loading ? <span className='flex justify-center items-center gap-1'><LoaderCircle size={18} className='animate-spin'/><p>searching...</p></span>:t("searchRecord")}
            </button>
            
            

          </form>
         

        
        </div>


        
              <div className="bg-white rounded-md shadow-sm border border-gray-200 p-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-50 text-red-500 mx-auto">
                  <UserX size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{t("noExistingRecordFound")}</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto">
                  {t("noMatchingClient")} <span className="font-semibold text-gray-700">"{query}"</span> {t("inOtherDatabase")}
                </p>
               
              </div>
            
          </div>
        

      
    </div>
  );
};

export default Search;

