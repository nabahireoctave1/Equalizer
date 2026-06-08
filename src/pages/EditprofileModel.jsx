import { Plus, User } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function EditProfileModal({ onClose }) {
  const { t } = useTranslation();
  const [img, setImg] = useState(null);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex  justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl  bg-white rounded-xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">

        <div className="px-6 py-2 border-b border-slate-50">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">
              {t("adp.editProfile")}
            </h2>

            <p className="text-xs text-slate-500 uppercase mt-0.5">
              {t("adp.updateInfo")}
            </p>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="p-6 space-y-5">

          <div className="flex justify-center">
            <div className="relative group">
              <div className="w-30 h-30 rounded-full ring-2 ring-slate-100 overflow-hidden bg-slate-50 flex items-center justify-center shadow-inner transition group-hover:ring-blue-100">
                {img ? (
                  <img src={img} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-slate-400" />
                )}
              </div>

              <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer shadow-md transition-all duration-200 hover:scale-105 flex items-center justify-center">
                <Plus size={14} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImgChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                {t("adp.fullName")}
              </label>
              <input
                type="text"
                placeholder={t("adp.fullNamePlaceholder")}
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-800 transition"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                {t("adp.email")}
              </label>
              <input
                type="email"
                placeholder={t("adp.emailPlaceholder")}
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-800 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                {t("adp.phone")}
              </label>
              <input
                type="tel"
                placeholder={t("adp.phonePlaceholder")}
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-800 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                {t("adp.location")}
              </label>
              <input
                type="text"
                placeholder={t("adp.locationPlaceholder")}
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-800 transition"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                {t("adp.company")}
              </label>
              <input
                type="text"
                placeholder={t("adp.companyPlaceholder")}
                className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-slate-800 transition"
              />
            </div>

          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 cursor-pointer rounded-sm bg-gray-200 text-sm font-medium text-slate-600 hover:text-slate-800 transition"
            >
              {t("adp.cancel")}
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-sm text-sm font-medium shadow-sm shadow-blue-500/10 transition"
            >
              {t("adp.save")}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;