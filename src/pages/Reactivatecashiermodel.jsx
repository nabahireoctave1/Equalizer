import React from 'react'
import { RefreshCcw,CircleX } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function Reactivatecashiermodel({ onClose, onConfirm,loading,success,modelopen,messagekey }) {
  const { t } = useTranslation()

  return (
    <div>
 {modelopen && (
  <div className="fixed inset-0 z-70 flex items-center animate-bounce-once justify-center bg-black/80 backdrop-blur-sm p-4">
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
            <span className="text-3xl"><RefreshCcw size={40}/></span>
          ) : (
            <span className="text-3xl"><CircleX size={40}/></span>
          )}
        </div>
      </div>

      <div className="text-center">
        <h2
          className={`text-xl font-extrabold uppercase ${success ? 'text-blue-600' : 'text-red-600' }`}>
          {success ? 'Cashier Reactivated' : 'Reactivate cashier failed'}</h2>
        <p className={`${success ? 'text-[14px]':'italic'} mt-3 text-[15px] leading-6 text-gray-600`}>
          {t(messagekey)}
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <button onClick={onClose} className={`min-w-28 rounded-lg px-5 py-2 cursor-pointer text-sm 
        font-semibold text-white shadow-sm transition hover:scale-105 focus:outline-none ${
         success ? 'bg-blue-600 hover:bg-blue-700': 'bg-red-600'}`}
        >
          OK
        </button>
      </div>
    </div>
  </div>
)}

    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>

      <div className='relative w-full max-w-md animate-bounce-once transform overflow-hidden rounded-md bg-white p-4 shadow-2xl transition-all border border-gray-100'>

        <div className='flex flex-col items-center text-center mt-2'>

          <div className='flex h-15 w-15 items-center justify-center rounded-full bg-blue-50 text-blue-600 animate-pulse mb-2'>
            <RefreshCcw size={35} />
          </div>

          <h3 className='text-lg font-extrabold text-gray-800'>
            {t("rc.title")}
          </h3>

          <p className='text-sm text-gray-800 mt-2 max-w-xs'>
            {t("rc.message")}
          </p>

        </div>

        <div className='mt-6 flex flex-col-reverse sm:flex-row sm:justify-between gap-2'>

          <button
            onClick={onClose}
            className='w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none transition-colors'
          >
            {t("rc.cancel")}
          </button>

          <button
            onClick={onConfirm}
            className='w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-400 rounded-lg hover:cursor-pointer focus:outline-none transition-colors shadow-sm'
          >
            {loading ? t('rc.loading'):t("rc.yes")}
          </button>

        </div>

      </div>
    </div>
    </div>

  )
}

export default Reactivatecashiermodel