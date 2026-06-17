import { XIcon,Users,CircleDashed,BadgeCheck,TriangleAlert, icons, WalletCards } from 'lucide-react'
import React, { useState } from 'react'

function Field_officers_Activity({ name, branch, Onclose }) {
const stats = [
  { icon: <Users size={30} />, label: "Total Clients", value: 180, color: "text-blue-500" },
  { icon: <BadgeCheck size={30} />, label: "Paid Today", value: 56, color: "text-green-500" },
  { icon: <CircleDashed size={30} />, label: "Unpaid Today", value: 56, color: "text-gray-500" },
  { icon: <WalletCards size={30} />, label: "Collection Today", value: " UGX 250000", color: "text-green-500" },
  { icon: <TriangleAlert size={30} />, label: "Overdue Loans", value: 56, color: "text-red-500" },
]


  const tabs = ["Client", "Paid", "Unpaid", "Overdue"]


  const allData = [
    { name: "John Doe", phone: "250 788 000 000", location: "Bunyoro",  amount:40000, date:"02-10-2026", status: "Active", type: "Client" },
    { name: "Alice Smith", phone: "250 789 000 000", location: "Hoima",  amount:40000, date:"02-10-2026", status: "unpaid", type: "Unpaid" },
    { name: "Cyusa Eddy", phone: "26078453566467", location: "Kampala",  amount:40000, date:"02-10-2026", status: "paid", type: "Paid" },
    { name: "Steven Lorence", phone: "26078596564754", location: "Mubende",  amount:40000, date:"02-10-2026", status: "overdue", type: "Overdue" },
    { name: "John Doe", phone: "250 788 000 000", location: "Bunyoro",  amount:40000, date:"02-10-2026", status: "Active", type: "Client" },
    { name: "Alice Smith", phone: "250 789 000 000", location: "Hoima",  amount:40000, date:"02-10-2026", status: "unpaid", type: "Unpaid" },
    { name: "Cyusa Eddy", phone: "26078453566467", location: "Kampala",  amount:40000, date:"02-10-2026", status: "paid", type: "Paid" },
    { name: "Steven Lorence", phone: "26078596564754", location: "Mubende",  amount:40000, date:"02-10-2026", status: "overdue", type: "Overdue" },
    { name: "John Doe", phone: "250 788 000 000", location: "Bunyoro",  amount:40000, date:"02-10-2026", status: "Active", type: "Client" },
    { name: "Alice Smith", phone: "250 789 000 000", location: "Hoima",  amount:40000, date:"02-10-2026", status: "unpaid", type: "Unpaid" },
    { name: "Cyusa Eddy", phone: "26078453566467", location: "Kampala",  amount:40000, date:"02-10-2026", status: "Paid", type: "Paid" },
    { name: "Steven Lorence", phone: "26078596564754", location: "Mubende",  amount:40000, date:"02-10-2026", status: "overdue", type: "Overdue" },{ name: "John Doe", phone: "250 788 000 000", location: "Bunyoro", status: "Active", type: "Active" },
    { name: "Alice Smith", phone: "250 789 000 000", location: "Hoima",  amount:40000, date:"02-10-2026", status: "unpaid", type: "Unpaid" },
    { name: "Cyusa Eddy", phone: "26078453566467", location: "Kampala",  amount:40000, date:"02-10-2026", status: "paid", type: "Paid" },
    { name: "Steven Lorence", phone: "26078596564754", location: "Mubende",  amount:40000, date:"02-10-2026", status: "overdue", type: "Overdue" },
  ]


  const [activeTab, setActiveTab] = useState("Client")



  const filteredData = allData.filter(item => item.type === activeTab)




  return (
    <div className='bg-white min-h-[90vh] rounded-sm p-4 overflow-auto'>

      <div className='flex justify-between  items-center pb-3 '>

        <div className='flex gap-2 flex-col sm:flex-row items-center'>
          <h2 className='uppercase text-2xl text-gray-800 font-black'>
            {name}
          </h2>

          <span className='text-gray-700 font-bold uppercase'>
            ({branch})
          </span>
        </div>

        <button onClick={Onclose} className='cursor-pointer'>
          <XIcon className="text-red-400" />
        </button>

      </div>





      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-3 mt-4'>

      {stats.map((item, idx) => (
  <div
    key={idx}
    className='border cursor-pointer border-gray-200 rounded-sm px-4 pb-8 pt-3 bg-gray-50'
  >

    <div className={`mb-2 ${item.color}`}>
      {item.icon}
    </div>

    <h2 className='text-xs uppercase text-gray-700'>
      {item.label}
    </h2>

    <p className='text-xl font-bold text-gray-800'>
      {item.value}
    </p>

  </div>
))}

      </div>





      <div className='mt-8 bg-gray-200 p-2  border-b border-gray-300 capitalize pb-2 flex gap-5 text-sm font-semibold'>

        {tabs.map((tab, idx) => (
          <span
            key={idx}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer ${
              activeTab === tab ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-gray-600"
            }`}
          >
            {tab}
          </span>
        ))}

      </div>





      <div className='mt-4 overflow-auto'>

        <table className='w-full  border border-gray-200 text-sm'>

          <thead className='bg-gray-100 text-left'>
            <tr>
              <th className='p-2 uppercase text-xs text-gray-800 whitespace-nowrap'>Name</th>
              <th className='p-2 uppercase text-xs text-gray-800'>Phone</th>
              <th className='p-2 uppercase text-xs text-gray-800 whitespace-nowrap'>Location</th>
              <th className='p-2 uppercase text-xs text-gray-800 whitespace-nowrap'>amount</th>
              <th className='p-2 uppercase text-xs text-gray-800 whitespace-nowrap'>Date</th>

              <th className='p-2 uppercase text-xs text-gray-800 whitespace-nowrap'>Loan Status</th>
            </tr>
          </thead>





          <tbody>

            {filteredData.map((item, idx) => (
              <tr key={idx} className='border-t border-gray-200'>

                <td className='p-3 whitespace-nowrap'>{item.name}</td>
                <td className='p-3 whitespace-nowrap'>{item.phone}</td>
                <td className='p-3 whitespace-nowrap'>{item.location}</td>
                <td className='p-3 whitespace-nowrap'>{item.amount}</td>
                <td className='p-3 whitespace-nowrap'>{item.date}</td>

                <td className={`p-3  whitespace-nowrap capitalize font-semibold ${
                  item.status === "Active" || item.status==='paid'
                    ? "text-green-600"
                    : "text-red-500"
                }`}>
                  {item.status}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Field_officers_Activity