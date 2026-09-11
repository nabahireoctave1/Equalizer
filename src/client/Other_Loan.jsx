import  { useState } from 'react';
import {useTranslation} from 'react-i18next'
const Other_loan = () => {

const {t} = useTranslation();

    const [loans, setLoans] = useState([
        { id: 1, name: 'Akea', unpaidDays: '4 Days', officeNumber: '07836749674', amount: '700,000', balance: '551,000', lastDate: '01/06/2026' },
        { id: 2, name: 'Excel', unpaidDays: '3 Days', officeNumber: '07836749674', amount: '590,000', balance: '551,000', lastDate: '01/06/2026' },
        { id: 3, name: 'Apelx', unpaidDays: '16 Days', officeNumber: '07836749674', amount: '710,000', balance: '551,000', lastDate: '07/06/2025' }
    ]);

    const handleReject = (id, name) => {
        alert(`Rejected loan for: ${name} (ID: ${id})`);
        
    };

    const handleAdminConfirm = (id, name) => {
        alert(`Admin Confirmed loan for: ${name} (ID: ${id})`);
    };

    const handleSubmit = (id, name) => {
        alert(`Submitted loan for: ${name} (ID: ${id})`);
    };

    return (
            <div className="space-y-6">
                <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                    <span className="text-gray-700 font-semibold min-w-30">{t("clientName")}</span>
                    <input 
                        type="text" 
                        readOnly
                        placeholder="Webale Precious"
                        className="w-full sm:max-w-md px-3 py-2 text-sm border border-gray-300
                         rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-3">
                    <span className="text-gray-800 font-semibold block text-lg border-b border-gray-200 pb-2">Other Loans</span>
                    
                    <div className="w-full overflow-x-auto border border-gray-200 rounded-sm">
                        <table className="w-full text-left border-collapse min-w-200">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-sm font-medium text-gray-600">Name</th>
                                    <th className="px-4 py-3 text-sm font-medium text-gray-600">Unpaid Days</th>
                                    <th className="px-4 py-3 text-sm font-medium text-gray-600">Office Number</th>
                                    <th className="px-4 py-3 text-sm font-medium text-gray-600">Loan Amount</th>
                                    <th className="px-4 py-3 text-sm font-medium text-gray-600">Balance</th>
                                    <th className="px-4 py-3 text-sm font-medium text-gray-600">Last Paying date</th>
                                    <th className="px-4 py-3 text-sm font-medium text-gray-600 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white text-gray-700">
                                {loans.map((loan) => (
                                    <tr key={loan.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{loan.name}</td>
                                        <td className="px-4 py-3 text-sm">{loan.unpaidDays}</td>
                                        <td className="px-4 py-3 text-sm">{loan.officeNumber}</td>
                                        <td className="px-4 py-3 text-sm">{loan.amount}</td>
                                        <td className="px-4 py-3 text-sm">{loan.balance}</td>
                                        <td className="px-4 py-3 text-sm">{loan.lastDate}</td>
                                        
                                        {/* Row-specific action buttons */}
                                        <td className="px-4 py-3 text-sm text-center whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => handleReject(loan.id, loan.name)}
                                                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded transition duration-200"
                                                >
                                                    Reject
                                                </button>
                                                <button 
                                                    onClick={() => handleAdminConfirm(loan.id, loan.name)}
                                                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium rounded transition duration-200"
                                                >
                                                    Confirm
                                                </button>
                                                <button 
                                                    onClick={() => handleSubmit(loan.id, loan.name)}
                                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition duration-200"
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    );
};

export default Other_loan;