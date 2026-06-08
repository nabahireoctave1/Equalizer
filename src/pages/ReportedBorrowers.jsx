import { ChevronDown, Funnel, ShieldAlertIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
function ReportedBorrowers() {
    const data = [
        {names:"john Eric",reporter:"james willilock",Reason:"Existing loan",date:"05-05-2026",status:"pending"},
        {names:"james traphord",reporter:"jane umutesi",Reason:"Froud suspicion",date:"05-07-2026",status:"rejected"},
        {names:"bugingo blaise",reporter:"jonh sengo",Reason:"overdue loan",date:"05-015-2026",status:"approved"},     
           {names:"bugingo blaise",reporter:"jonh sengo",Reason:"overdue loan",date:"05-015-2026",status:"approved"},
         {names:"bugingo blaise",reporter:"jonh sengo",Reason:"overdue loan",date:"05-015-2026",status:"approved"},
    ]

    const [selectedDate, setSelectedDate] = useState('');

    const filteredData = data.filter(d => {
        return selectedDate === '' || d.date === selectedDate;
    });

    const {t}=useTranslation()

    return (
    <div>
        <div className='flex flex-col sm:flex-row p-4 justify-between gap-4 sm:gap-2 items-start sm:items-center bg-white'>
            <div className='flex gap-2'>
                <span className='bg-red-100 rounded-md text-red-600 p-2'><ShieldAlertIcon/></span>
                <h2 className='text-2xl font-extrabold uppercase text-gray-800'>{t('rptb.reportedBorrowers')}</h2>
            </div>
          
            <div className='flex flex-col sm:flex-row gap-2 items-stretch sm:items-center w-full sm:w-auto'>
               
                
                <span className='relative flex border items-center p-1 rounded-sm text-sm border-gray-200 w-full sm:w-auto bg-white'>
                    <Funnel size={15}/> 
                    <p className='ml-1 mr-1 text-gray-700'>
                        {selectedDate ? selectedDate :t('rptb.filter')}
                    </p> 
                    <ChevronDown size={15} className='ml-auto' />
                    
                    <select 
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    >
                        <option value="">{t('rptb.all')}</option>
                        <option value="05-05-2026">05-05-2026</option>
                        <option value="05-07-2026">05-07-2026</option>
                        <option value="05-015-2026">05-015-2026</option>
                    </select>
                </span>
            </div>
        </div>
        
        <div className="mt-6 overflow-x-auto w-full">
          <table className="w-full border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 uppercase text-[11px] border-b border-gray-200">
                <th className="p-3">No</th>
                <th className="p-3">{t('rptb.borrowerNames')}</th>
                <th className="p-3">{t('rptb.reportedBy')}</th>
                <th className="p-3">{t('rptb.reason')}</th>
                <th className="p-3">{t('rptb.reportedDate')}</th>
                <th className="p-3">{t('rptb.status')}</th>
                <th className="p-3">{t('rptb.decision')}</th>
              </tr>
            </thead>

            <tbody>
                {filteredData.map((d, idx) => {
                    return <tr key={idx} className="border-t border-gray-100 cursor-pointer hover:bg-gray-50 transition">
                 <td className="p-3 text-gray-700 text-sm">
                    {idx + 1} 
                </td>
                <td className="p-3 text-gray-700 text-sm capitalize">
                {d.names}
                </td>
                <td className="p-3 capitalize text-gray-500 text-sm">
                    {d.reporter}
                </td>
                <td className="p-3 text-gray-500 text-sm">
                    {d.Reason}
                </td>
                 <td className="p-3 text-gray-500 text-sm">
                    {d.date}
                </td>
                <td className="p-3">
                  <span className={`${d.status==='pending' ? 'bg-yellow-300'
                     :d.status==='approved' ? 'bg-green-400':d.status==='rejected' ? 'bg-red-400':'bg-gray-100'} text-white 
                     capitalize  px-3 py-1 rounded-md text-xs font-medium`}>
                  {t(`rptb.${d.status}`)}
                  </span>
                </td>
                 <td className="p-3 flex items-center gap-2 text-white text-xs">
                   
                   <button disabled={d.status==='approved'||d.status==='rejected'} className={`${d.status==='approved'|| d.status==='rejected' ? 'bg-gray-400   cursor-not-allowed':'bg-blue-400 cursor-pointer'} p-1 px-2 rounded-sm  capitalize`}>{t('rptb.approved')}</button>
                   <button  className={`${d.status==='approved'||d.status==='rejected' ? 'bg-gray-400   cursor-not-allowed':'bg-red-400 cursor-pointer'} p-1 px-2  rounded-sm  capitalize`}>{t('rptb.rejected')}</button>
                </td>
              </tr>
                })}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default ReportedBorrowers