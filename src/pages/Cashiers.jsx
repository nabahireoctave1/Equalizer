import { BadgeDollarSign, Ban, Edit, Pencil, PlusCircle, PlusIcon, RefreshCcw, Search, Trash } from "lucide-react";
import React, { useState } from "react";
import Newcashiermodel from "./Newcashiermodel";
import EditCashier from "./EditCashier";
import Burn_cashier from "./Burn_cashier";
import Reactivatecashiermodel from "./Reactivatecashiermodel";
import { useTranslation } from "react-i18next";
function Cashiers() {
 
  const [searchterm,setsearchterm]=useState('')
  let count=1;
  const data=[
    {names:'John Doe',email:'john@example.com',phone:' 250 788 000 000',branch:'Rubavu live stock Hub',status:'active'},
    {names:' Alice Smith',email:'alice smith@gmail.com',phone:'250 789 000 000',branch:'akea service',status:'suspended'},
    {names:'cyusa Eddy',email:'eddycyusa@gmail.com',phone:'26078453566467',branch:'kigali tech',status:'active'},
    {names:'steven  lorence',email:'stevelorence@gmail.com',phone:'26078596564754',branch:'Alpha tech01',status:'active'},
  ]

  const filtereddata= data.filter((fd)=>{
   fd.names.toLocaleLowerCase().includes(searchterm.toLocaleUpperCase())||
   fd.email.toLocaleLowerCase().includes(searchterm.toLocaleUpperCase())
  })

  const {t}=useTranslation()


  const [isnewCashierModelopen,setisnewcashierModelopen]=useState(false)
  const [iseditmodelopen,setopeneditmodel]=useState(false)
  const [isburncashieropen,setisburncashieropen]=useState(false)
  const [reactivate,setreactivate]=useState(false)
  const opencashiermodel=(e)=>{e.preventDefault();setisnewcashierModelopen(true)}
  const closecashiermodel=()=>setisnewcashierModelopen(false)
  const openedit=(e)=>{e.preventDefault(); setopeneditmodel(true)}
   let oncloseEdit= ()=>setopeneditmodel(false)
   const openBurncashier= (e)=>{e.preventDefault();setisburncashieropen(true)}
   let closeBurncashier= ()=>setisburncashieropen(false)
   const openreactivate= (e)=>{ e.preventDefault(); setreactivate(true)}
   const closereactivate=()=>setreactivate(false)

  const statusbadge=(status)=>{
      switch(status){
        case 'active' :return 'bg-blue-500 text-white'; 
        case 'suspended': return 'bg-red-500 text-white';
        default:return 'bg-gray-100 text-gray-700'
      }
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-md border border-gray-200 p-3 sm:p-5">
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="bg-blue-400 text-white p-2 rounded-full shrink-0">
              <BadgeDollarSign size={22} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {t('c.cashier')}
              </h2>
              <p className="text-sm text-gray-500">
                {t('c.manageCashiers')}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-72 md:w-80">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                onChange={(e)=>setsearchterm(e.target.value)}
                placeholder={t('c.searchCashier')}
                className="w-full  border border-gray-200 rounded-md py-2 text-sm pl-10 pr-4 outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent transition"
              />
            </div>

            <button onClick={opencashiermodel} className="flex justify-start gap-2 bg-blue-400 text-white px-9 py-2
             rounded-md text-sm cursor-pointer  w-fit  sm:w-auto whitespace-nowrap">
              <PlusCircle size={18} />
              <span>{t('c.cashier')}</span>
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto w-full">
          <table className="w-full border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 uppercase text-[11px] border-b border-gray-200">
                <th className="p-3">{t('c.no')}</th>
                <th className="p-3">{t('c.names')}</th>
                <th className="p-3">{t('c.email')}</th>
                <th className="p-3">{t('c.phone')}</th>
                <th className="p-3">{t('c.branch')}</th>
                <th className="p-3">{t('c.status')}</th>
                <th className="p-3">{t('c.manage')}</th>
              </tr>
            </thead>

            <tbody>
              {data.map((c,idx)=>{
                return <tr key={idx} className="border-t border-gray-100 cursor-pointer hover:bg-gray-50 transition">
                 <td className="p-3 text-gray-700 text-sm">
                  {count++}
                </td>
                <td className="p-3 text-gray-700 text-sm capitalize">
                  {c.names}
                </td>
                <td className="p-3 text-gray-500 text-sm">
                  {c.email}
                </td>
                <td className="p-3 text-gray-500 text-sm">
                  {c.phone}
                </td>
                 <td className="p-3 text-gray-500 text-sm">
                  {c.branch}
                </td>
                <td className="p-3">
                  <span className={`${statusbadge(c.status)} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                  {t(`c.${c.status}`)}
                  </span>
                </td>
                 <td className="p-3 flex items-center gap-2 text-gray-500 text-sm">
                   <button onClick={openedit} title={t('c.edit')} className="p-1 rounded-md cursor-pointer"><Pencil size={18} className=" hover:text-blue-400"/></button>
                   <button title={t('c.remove')} className="p-1 bg-red-50 rounded-md cursor-pointer"><Trash size={18} className="text-red-400"/></button>
                   <button onClick={openBurncashier} title={t('c.burn')} className="cursor-pointer"><Ban size={18} className=" hover:text-red-400 "/></button>
                   <button onClick={openreactivate} title={t('c.reactivate')} className="cursor-pointer"> <RefreshCcw size={18} className="hover:text-green-500"/></button>
                </td>
              </tr>
              })}
            </tbody>
          </table>
        </div>
         
      </div>
       {isnewCashierModelopen &&
            <Newcashiermodel  onClose={closecashiermodel}/>
          }
          {iseditmodelopen && <EditCashier onClose={oncloseEdit}/>}
          {isburncashieropen && <Burn_cashier onClose={closeBurncashier}/>}
          {reactivate && <Reactivatecashiermodel onClose={closereactivate}/>}
    </div>
  );
}

export default Cashiers;