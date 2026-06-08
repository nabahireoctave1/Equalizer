import React from 'react'
import { GitBranchIcon, Mail, MapPin, Phone, User2, XIcon } from 'lucide-react'
import { useTranslation } from "react-i18next"

function EditCashier({ onClose }) {
  const { t } = useTranslation()

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'>

      <div className='w-full max-w-2xl bg-white shadow-md rounded-md overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200'>

        <div className='flex justify-between items-center bg-blue-300 px-6 py-4 text-white'>
          <h1 className='text-lg font-extrabold uppercase'>
            {t("nc.editCashier")}
          </h1>

          <button onClick={onClose} className='bg-blue-500 cursor-pointer p-1.5 rounded-full'>
            <XIcon className='w-5 h-5' />
          </button>
        </div>

        <form className='p-6 space-y-6'>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>

            <div className='space-y-4'>

              <div>
                <label className='flex gap-2 text-xs font-medium text-gray-600 uppercase mb-1.5 items-center'>
                  <User2 className='w-4 h-4 text-blue-500' />
                  {t("nc.fullName")}
                </label>
                <input
                  type="text"
                  placeholder={t("nc.fullNamePlaceholder")}
                  className="w-full p-2.5 border border-gray-200 rounded-md text-sm"
                />
              </div>

              <div>
                <label className='flex gap-2 text-xs font-medium text-gray-600 uppercase mb-1.5 items-center'>
                  <Mail className='w-4 h-4 text-blue-500' />
                  {t("nc.email")}
                </label>
                <input
                  type="email"
                  placeholder={t("nc.emailPlaceholder")}
                  className="w-full p-2.5 border border-gray-200 rounded-md text-sm"
                />
              </div>

              <div>
                <label className='flex gap-2 text-xs font-medium text-gray-600 uppercase mb-1.5 items-center'>
                  <Phone className='w-4 h-4 text-blue-500' />
                  {t("nc.phone")}
                </label>
                <input
                  type="tel"
                  placeholder={t("nc.phonePlaceholder")}
                  className="w-full p-2.5 border border-gray-200 rounded-md text-sm"
                />
              </div>

            </div>

            <div className='space-y-4'>

              <div>
                <label className='flex gap-2 text-xs font-medium text-gray-600 uppercase mb-1.5 items-center'>
                  <MapPin className='w-4 h-4 text-blue-500' />
                  {t("nc.location")}
                </label>
                <input
                  type="text"
                  placeholder={t("nc.locationPlaceholder")}
                  className="w-full p-2.5 border border-gray-200 rounded-md text-sm"
                />
              </div>

              <div>
                <label className='flex gap-2 text-xs font-medium text-gray-600 uppercase mb-1.5 items-center'>
                  {t("nc.gender")}
                </label>

                <div className='flex gap-6 p-2.5 bg-gray-50  rounded-lg h-5 items-center'>
                  <label className='flex items-center gap-2 text-sm'>
                    <input type="radio" name="gender" />
                    {t("nc.male")}
                  </label>

                  <label className='flex items-center gap-2 text-sm'>
                    <input type="radio" name="gender" />
                    {t("nc.female")}
                  </label>
                </div>
              </div>

              <div>
                <label className='flex gap-2 text-xs font-medium text-gray-600 uppercase mb-1.5 items-center'>
                  <GitBranchIcon className='w-4 h-4 text-blue-500' />
                  {t("nc.branch")}
                </label>
                <input
                  type="text"
                  placeholder={t("nc.branchPlaceholder")}
                  className="w-full p-2.5 border border-gray-200 rounded-md text-sm"
                />
              </div>

            </div>

          </div>

          <div className='flex justify-end gap-3 pt-4 border-t border-gray-100'>

            <button onClick={onClose} type="button" className='px-4 py-2 text-sm bg-gray-100 rounded-md'>
              {t("nc.cancel")}
            </button>

            <button type="submit" className='px-4 py-2 text-sm text-white bg-blue-400 rounded-md'>
              {t("nc.save")}
            </button>

          </div>

        </form>

      </div>
    </div>
  )
}

export default EditCashier