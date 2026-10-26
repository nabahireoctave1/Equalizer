

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import img from '../../assets/image.jpeg'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import api from '../../api';

const Stock = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [debounceSearch,setDebounceSearch]=useState(null);
  const rowsPerPage = 2;

  const [totalPage,settotalPage]=useState(0);
  const [TotalRecord,settotalRecord]=useState(null);
 const [Data,setData]=useState([]);
 
  const FetchCurrentStockInfo= async()=>{
   try{
    const res= await api.get(`/stock-info?limit=${rowsPerPage}&page=${currentPage}&searchQuery=${encodeURIComponent(debounceSearch)}`);
     setData(res?.data?.response);
      settotalPage(res?.data?.totalPage)
      settotalRecord(res?.data?.totalRecord)

      console.log(res);
   }

   catch(err){

   }

  }

  useEffect(()=>{
 
    const timer=setTimeout(() => {
       setDebounceSearch(searchTerm); 
    }, 1000);
   
    return ()=>clearTimeout(timer);
  },[searchTerm])


  useEffect(()=>{
    FetchCurrentStockInfo();
  },[currentPage,debounceSearch])

  const FormDate= (date)=>{
    if(!date) return

    return date.split('T')[0].split('-').reverse().join('-');
  }
 

  const StatusBadge=(status)=>{
   switch(status){
    case'instock': return 'bg-green-50 border py-2 border-green-600 text-green-600 px-5 rounded-sm capitalize animate-pulse';
     break
     default : return 'bg-red-50 border border-red-500 text-red-600 px-5 rounded-sm capitalize'
  }
  }

 const HandleRealseCollateral= async(LoanId,collateralname,clientId)=>{
  try{
    
   const res= await api.post(`/Release-collateral/${LoanId}/${collateralname}/${clientId}`);
   console.log(res);
  }

  catch(err){

  }
 }


  const {t} = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="max-w-7xl  bg-white rounded-sm border
       border-gray-100 ">
        
        <div className="flex flex-col sm:flex-row justify-between items-center  p-2 py-5 border-b border-gray-100">
          <h2 className="text-2xl font-extrabold uppercase text-blue-900">{t("storedSecurities")}</h2>
          <div className='relative'>
            <span className='absolute top-2 px-2'>
              <Search size={20}/></span>
          <input
            type="text"
            placeholder={t("searchByClientName")} 
            className="w-full sm:w-64 px-4 py-2 text-sm border pl-8
            border-gray-300 rounded-sm focus:ring-1 focus:ring-blue-500 outline-none"
            onChange={(e) => { setSearchTerm(e.target.value); }}
          />
          </div>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-700  uppercase text-xs font-semibold">
                <th className="p-4">{t("No")}</th>
                <th className="p-4">{t("LoanID")}</th>

                <th className="p-4">{t("clientName")}</th>
                <th className="p-4">{t("stored at")}</th>
                <th className="p-4">{t("Collateral")}</th>
                <th className="p-4">{t("picture")}</th>
                <th className="p-4">{t("collateralstatus")}</th>

                <th  className="p-4">{t("operations")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {Data.map((item,idx) => (
                <tr key={idx} className="hover:bg-gray-100/50 cursor-pointer ">
                  <td className="px-3 py-1.5 text-[15px]  text-gray-800 whitespace-nowrap">{(currentPage-1)*rowsPerPage+idx+1}</td>
                  <td className="px-3 py-1.5 text-[15px]  text-gray-800 whitespace-nowrap">{item.loan_id}</td>

                  <td className="px-3 py-1.5 text-[15px]  text-gray-800 whitespace-nowrap">{item.client_name}</td>
                  <td className="px-3 py-1.5 text-[15px] text-gray-700 capitalize">{FormDate(item.collateral_registered_at)}</td>
                  <td className="px-3 py-1.5 text-[15px] text-gray-700 capitalize ">{item.security_name}</td>
                  <td className="px-3 py-1.5 text-[15px] text-gray-700 capitalize">
                    <img src={`http://localhost:3000/uploads/collateral_uploads/${item.picture}`} alt="Picture" className="w-16 h-12 object-cover rounded-md" />
                  </td>
                  <td className={`px-3 py-1.5 text-[15px]  text-gray-800 whitespace-nowrap text-center`}>
                    <span className={StatusBadge(item.status)}>{item.status}</span></td>

                  <td className="p-4">
                    <button onClick={()=>HandleRealseCollateral(item.loan_id,item.security_name,item.client_id)} 
                    className="bg-red-50 border border-red-500 text-red-600  px-3  cursor-pointer
                     py-1.5 rounded text-[15px] outline-none hover:bg-red-200 ">{t("release")}</button>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-3 py-4 px-2 border-t border-gray-100">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="px-2 py-1.5 bg-gray-200 text-gray-700 cursor-pointer disabled:cursor-not-allowed rounded disabled:opacity-50 text-sm"
          >
            <ChevronLeft/>
          </button>
          <span className="text-sm text-gray-700">
           {""} {t("page")}
            {currentPage} {t("of")} {totalPage || 1}</span>
          <button 
            disabled={currentPage >= totalPage}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-2 py-1.5 bg-gray-200 text-gray-700 disabled:cursor-not-allowed rounded disabled:opacity-50 text-sm"
          >
            <ChevronRight/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stock;