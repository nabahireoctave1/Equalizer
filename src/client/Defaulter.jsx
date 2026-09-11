


import { useState } from 'react';
import Credit_Record from './Client_record';
import { 
  AlertTriangle, 
  User, 
  DollarSign, 
  Phone, 
  ShieldCheck, 
  Users, 
  Calendar, 
  BookOpen,
  Layers,
  X ,LockIcon
} from 'lucide-react';

const Defaulters = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const clientsData = [
        { id: 1, name: "Mugisha Brian", balance: "800,000 RWF", contact: "07876346541", security: ` Hoofer`, guarantor: "Nshuti Lauben", gContact: "07935432542", endDate: "2/3/2026" },
        { id: 2, name: "Mugisha Brian", balance: "800,000 RWF", contact: "07876346541", security: ` Hoofer`, guarantor: "Nshuti Lauben", gContact: "07935432542", endDate: "2/3/2026" },
        { id: 3, name: "Mugisha Brian", balance: "800,000 RWF", contact: "07876346541", security: ` Hoofer`, guarantor: "Nshuti Lauben", gContact: "07935432542", endDate: "2/3/2026" },
        { id: 4, name: "Mugisha Brian", balance: "800,000 RWF", contact: "07876346541", security: ` Hoofer`, guarantor: "Nshuti Lauben", gContact: "07935432542", endDate: "2/3/2026" },
        { id: 5, name: "Mugisha Brian", balance: "800,000 RWF", contact: "07876346541", security: ` Hoofer`, guarantor: "Nshuti Lauben", gContact: "07935432542", endDate: "2/3/2026" },
    ];

    const openCreditModal = (client) => {
        setSelectedClient(client);
        setIsModalOpen(true);
    };

    const closeCreditModal = () => {
        setIsModalOpen(false);
        setSelectedClient(null);
       };

    return (
        <>
            <div className=" w-full min-h-screen bg-gray-50 p-6 sm:p-10">
                <div className="max-w-full mx-auto bg-white rounded-xs  border border-gray-100 
                overflow-hidden">
                    
                    <div className=" p-2 border-b border-gray-200  sm:text-left flex flex-col
                     sm:flex-row justify-between items-center gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center justify-center sm:justify-start gap-2">
                                <Layers className="w-6 h-6 text-blue-600" />
                                AKEA FINANCIAL
                            </h2>
                            <p className="text-sm font-medium text-red-600 mt-2 bg-red-50 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                                <AlertTriangle className="w-4 h-4 animate-pulse" />
                                This is the List Of Defaulters Client at Risk
                            </p>
                        </div>
                        <div className="text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1.5 rounded-lg">
                            Total Records: {clientsData.length}
                        </div>
                    </div>

                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold tracking-wider border-b border-gray-200">
                                    <th className="py-4 px-4"><span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Names</span></th>
                                    <th className="py-4 px-4"><span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" />Balance</span></th>
                                    <th className="py-4 px-4"><span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Contact</span></th>
                                    <th className="py-4 px-4"><span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Security</span></th>
                                    <th className="py-4 px-4"><span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Guarantors</span></th>
                                    <th className="py-4 px-4"><span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> G_Contact</span></th>
                                    <th className="py-4 px-4"><span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />End Date</span></th>
                                    <th className="py-4 px-4 text-center">Credit Book</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-sm text-gray-600">
                                {clientsData.map((client) => (
                                    <tr key={client.id} className="hover:bg-slate-50 transition-colors duration-150 odd:bg-white even:bg-gray-50/50">
                                        <td className="py-4 px-4 font-medium text-gray-900">{client.name}</td>
                                        <td className="py-4 px-4 font-semibold text-red-600">{client.balance}</td>
                                        <td className="py-4 px-4 text-gray-500">{client.contact}</td>
                                        <td className="py-4 px-4">
                                            <span className="bg-amber-50  flex items-center  text-red-500 text-xs px-2.5 
                                            py-1 rounded-md font-medium border border-amber-200 
                                              gap-1">
                                              <LockIcon size={17}/>  {client.security}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">{client.guarantor}</td>
                                        <td className="py-4 px-4 text-gray-500">{client.gContact}</td>
                                        <td className="py-4 px-4 text-gray-500">{client.endDate}</td>
                                        
                                        <td className="py-4 px-4 text-center">
                                            <button 
                                                onClick={() => openCreditModal(client)}
                                                className="inline-flex items-center gap-1
                                                 px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-md transition-colors cursor-pointer"
                                            >
                                                <BookOpen className="w-3.5 h-3.5" />
                                                Credit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 
                    sm:p-6 md:p-10 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300"
                    onClick={closeCreditModal} 
                >
                    <div 
                        className="relative w-full max-w-full max-h-[90vh] bg-white rounded-sm shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-5 h-5 text-emerald-600" />
                                <h3 className="text-lg font-bold text-gray-900">
                                    Credit Record: <span className="text-gray-600 font-medium">{selectedClient?.name}</span>
                                </h3>
                            </div>
                            <button 
                                onClick={closeCreditModal}
                                className="p-1.5 text-white
                                 bg-red-500 rounded-full transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                            <Credit_Record client={selectedClient} />
                        </div>

                        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                            <button
                                onClick={closeCreditModal}
                                className="px-4 py-2 text-sm font-medium text-white
                                  border border-gray-300 rounded-sm 
                                 bg-red-500 transition-colors cursor-pointer"
                            >
                                Close Window
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Defaulters;