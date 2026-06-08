import React, { useState } from "react";
import {
  Calendar,
  Edit2,
  Mail,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import EditProfileModal from "./EditprofileModel";

function Adprofile() {
  const { t } = useTranslation();
  const [isopened, setisopened] = useState(false);

  const openedit = () => setisopened(true);
  const closeedit = () => setisopened(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col items-center text-center">

          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256"
            alt="profile"
            className="w-25 h-25 rounded-full object-cover"
          />

          <h2 className="mt-4 text-2xl font-bold">{t("adminName")}</h2>

          <p className="text-blue-600 font-medium uppercase text-sm">
            {t("adminRole")}
          </p>

          <span className="mt-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs">
            {t("activated")}
          </span>

          <div className="w-full mt-6 space-y-4 text-sm text-left">

            <div className="border-t border-b border-gray-100 py-3">
              <p className="text-gray-500">{t("adminId")}</p>
              <p className="uppercase font-extrabold text-gray-800">
                ADM-2025-001
              </p>
            </div>

            <div>
              <h2 className="text-gray-800 font-extrabold mb-1">
                {t("memberSince")}
              </h2>

              <div className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} />
                <p>January 10, 2026</p>
              </div>
            </div>

          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">

          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-blue-700">
              {t("personalInfo")}
            </h2>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between pb-2">
                <span>{t("fullName")}</span>
                <span className="font-semibold">John Doe</span>
              </div>

              <div className="flex justify-between pb-2">
                <span>{t("role")}</span>
                <span className="font-semibold">{t("adminRole")}</span>
              </div>

              <div className="flex justify-between pb-2">
                <span>{t("company")}</span>
                <span className="font-semibold">TechNova Ltd</span>
              </div>

              <div className="flex justify-between">
                <span>{t("loc")}</span>
                <span className="font-semibold">Kigali, Rwanda</span>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex gap-3">
              <ShieldCheck className="text-blue-600 shrink-0" />

              <div className="w-full space-y-3">
                <h3 className="font-extrabold text-gray-800">
                  {t("accountDetails")}
                </h3>

                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {t("createdAt")}
                  </span>
                  <span>January 10, 2026</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={14} /> {t("sts")}
                  </span>

                  <span className="bg-green-700 p-1 px-2 text-xs text-white rounded-full">
                    {t("activated")}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex gap-3">
              <PhoneCall className="text-blue-600 shrink-0" />

              <div className="w-full space-y-3">
                <h3 className="font-extrabold text-gray-800">
                  {t("contactInfo")}
                </h3>

                <div className="space-y-2 text-sm">

                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <Mail size={14} /> {t("email")}
                    </span>
                    <p>johndoe12@gmail.com</p>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <PhoneCall size={14} /> {t("phone")}
                    </span>
                    <p>2675857464545</p>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="mt-6 bg-white p-6 rounded-xl border border-gray-200">
        <h2 className="text-lg font-semibold mb-2 capitalize">
          {t("adminRoleTitle")}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {t("adminRoleDesc")}
        </p>
      </div>

      <div className="justify-end flex items-center">
        <button
          onClick={openedit}
          className="p-2 bg-blue-400 flex gap-2 cursor-pointer items-center text-sm mt-4 text-white rounded-md px-7"
        >
          <Edit2 size={20} />
          {t("editProfile")}
        </button>
      </div>

      {isopened && <EditProfileModal onClose={closeedit} />}
    </div>
  );
}

export default Adprofile;