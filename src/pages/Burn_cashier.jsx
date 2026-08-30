import React from 'react'
import { AlertTriangle, CircleCheck, CircleX } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function Burn_cashier({ onClose, onConfirm ,loading,modelopen,success,messagekey}) {
  const { t } = useTranslation()


  return (
    <div className=''> 

    {modelopen && (
  <div className="fixed inset-0 z-70 animate-bounce-once flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
    <div
      className={`w-full max-w-md rounded-md border bg-white p-6 shadow-lg transition-all duration-300 ${
        success
          ? 'border-blue-200'
          : 'border-red-200'
      }`}
    >
      <div className="flex justify-center mb-4">
        <div
          className={`flex items-center justify-center rounded-full ${
            success
              ? 'bg-blue-100 text-blue-600'
              : ' text-red-600'
          }`}
        >
          {success ? (
            <span className="text-3xl"><CircleCheck size={40}/></span>
          ) : (
            <span className="text-3xl"><CircleX size={40}/></span>
          )}
        </div>
      </div>

      <div className="text-center">
        <h2
          className={`text-xl font-extrabold uppercase ${success ? 'text-blue-600' : 'text-red-600' }`}>
          {success ? t('bc.success') :t('bc.failed')}</h2>
        <p className={`${success ? 'text-[14px]':'italic'} mt-3 text-[15px] leading-6 text-gray-600`}>
          {t(messagekey)}
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <button onClick={onClose} className={`min-w-28 rounded-lg px-5 py-2 cursor-pointer text-sm 
        font-semibold text-white shadow-sm transition hover:scale-105 focus:outline-none ${
         success ? 'bg-blue-600 hover:bg-blue-700': 'bg-red-600'}`}
        >
          {t('bc.ok')}
        </button>
      </div>
    </div>
  </div>
)}
      
       <div className='fixed inset-0 z-50 min-h-screen flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>
    
      <div className='relative w-full max-w-md transform overflow-hidden rounded-md bg-white p-4 shadow-2xl transition-all border border-gray-100'>

        <div className='flex flex-col items-center text-center mt-2'>
            {modelopen ? '':

          <div className='flex h-15 w-15 items-center justify-center rounded-full bg-red-50 text-red-600 animate-bounce mb-2'>
          <AlertTriangle size={35} />
          
          </div>

            }
          <h3 className='text-lg font-extrabold text-gray-800'>
            {t("bc.title")}
          </h3>

          <p className='text-sm text-gray-800 mt-2 max-w-xs'>
            {t("bc.message")}
          </p>

        </div>

        <div className='mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2'>

          <button
            onClick={onClose}
            className='w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors'
          >
            {t("bc.cancel")}
          </button>

          <button
            onClick={onConfirm}
            className='w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-lg hover:cursor-pointer focus:outline-none transition-colors shadow-sm'
          >
            {loading ? t('bc.loading'):t("bc.yes")}
          </button>

        </div>

      </div>
    </div>
    </div>
  
  )
}

export default Burn_cashier