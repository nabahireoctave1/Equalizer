

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import img from '../../assets/image.jpeg'
import { Search } from 'lucide-react';

const Stock = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const allData = [
    { id: 1, name: 'Webale Precious', date: '2026-06-05', security: 'ID', number: 2 },
    { id: 2, name: 'John Doe', date: '2026-07-01', security: 'Passport', number: 1 },
    { id: 3, name: 'Alice Namu', date: '2026-07-05', security: 'Land Title', number: 1 },
    { id: 4, name: 'Robert Bakari', date: '2026-07-06', security: 'Logbook', number: 1 },
    { id: 5, name: 'Sarah Kesi', date: '2026-07-07', security: 'ID', number: 1 },
    { id: 6, name: 'Tom Lwanga', date: '2026-07-08', security: 'Land Title', number: 3 },
  ];

  const filteredData = allData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
 
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
                <th className="p-4">{t("clientName")}</th>
                <th className="p-4">{t("date")}</th>
                <th className="p-4">{t("security")}</th>
                <th className="p-4">{t("number")}</th>
                <th className="p-4">{t("picture")}</th>
                <th  className="p-4">{t("operations")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentRows.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100/50 cursor-pointer ">
                  <td className="px-3 py-1.5 text-[15px]  text-gray-800 whitespace-nowrap">{item.name}</td>
                  <td className="px-3 py-1.5 text-[15px] text-gray-700 capitalize">{item.date}</td>
                  <td className="px-3 py-1.5 text-[15px] text-gray-700 capitalize ">{item.security}</td>
                  <td className="px-3 py-1.5 text-[15px] text-gray-700 capitalize">{item.number}</td>
                  <td className="px-3 py-1.5 text-[15px] text-gray-700 capitalize">
                    <img src={img} alt="Security" className="w-16 h-12 object-cover rounded-md" />
                  </td>
                  <td className="p-4 flex gap-2">
                    <button className="bg-blue-600 text-white px-3  cursor-pointer
                     py-1.5 rounded text-[15px] hover:bg-blue-600">{t("released")}</button>
                    <input type="date" className="border border-gray-300 rounded px-3 uppercase 
                     outline-0  focus:ring-1 focus:ring-blue-100 text-[15px]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-3 pt-6 border-t border-gray-50">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-sm"
          >
            {t("previous")}
          </button>
          <span className="text-sm text-gray-700">{t("page")}
             {currentPage} {t("of")} {totalPages || 1}</span>
          <button 
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 text-sm"
          >
            {t("next")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stock;