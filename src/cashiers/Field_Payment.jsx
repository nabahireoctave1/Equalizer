import { useTranslation } from "react-i18next";


const Field = () => {
  const {t} = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50  font-sans">
      <div className="max-w-7xl bg-white rounded-sm  border border-gray-100 p-2 sm:p-4">
        
        <header className="mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight uppercase">
            Akea Financial
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="h-px w-8 bg-blue-500"></span>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              {t("reportTitle")}
            </p>
            <span className="h-px w-8 bg-blue-500"></span>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: t("fieldOfficer"), type: "select",
               options: ["All Officers", "Webale Precious",
                 "Rwema", "Gungu", "Kamasa Goefrey"] },
            { label: t("date"), value: "01-09-2026" },
            { label: t("officeLocation"), value: "Gassan" },
            { label: t("totalAmountEarned"), 
              value: "UGX 50,000", highlight: true },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">
                {item.label}
              </label>
              {item.type === "select" ? (
                <select className="w-full text-sm bg-gray-50 border border-gray-200 rounded-sm
                px-4 py-2 text-gray-700 font-medium focus:ring-1 focus:ring-blue-500
                 outline-none transition-all cursor-pointer">
                  {item.options.map((opt) => <option key={opt}>{opt}</option>)}
                </select>

              
                            ) : (
                <input 
                  readOnly 
                  value={item.value} 
                  className={`w-full border rounded-sm px-4 py-2
                      outline-none  text-sm
                     transition-all ${item.highlight ? 'bg-blue-400 text-white border-none font-bold'
                       : 'bg-gray-50 border-gray-200 font-semibold  text-slate-700'}`} 
                />
              )}
            </div>
          ))}
        </div>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg uppercase font-bold text-slate-800">{t("clientFieldCollections")}</h3>
            <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">6 {t("entries")}</span>
          </div>
          
          <div className="overflow-x-auto border border-gray-100 rounded-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-[12px] uppercase text-gray-800 font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">{t("number")}</th>
                  <th className="px-6 py-4">{t("names")}</th>
                  <th className="px-6 py-4">{t("payments")}</th>
                  <th className="px-6 py-4">{t("balance")}</th>
                  <th className="px-6 py-4">{t("date")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <tr key={item} className="hover:bg-gray-50 cursor-pointer transition-colors group">
                    <td className="px-6 py-4 text-gray-700 font-mono text-sm">{item}</td>
                    <td className="px-6 py-4 font-semibold text-slate-700">Webale Precious</td>
                    <td className="px-6 py-4 text-[18px] text-emerald-600 font-semibold">10,000</td>
                    <td className="px-6 py-4 text-[18px] text-rose-500 font-semibold">80,000</td>
                    <td className="px-6 py-4 text-gray-700  text-[15px]">5-23-2026</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Field;



