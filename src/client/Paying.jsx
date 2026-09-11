// import React from 'react';
// Importing icons from lucide-react (Make sure to install it: npm install lucide-react)
import { CreditCard, User, DollarSign } from 'lucide-react';

const Paying = () => {
    return (
        <div className="  flex  justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md bg-white rounded-md shadow-xl
              overflow-hidden transition-all duration-300 hover:shadow-2xl">
                
                <div className="bg-linear-to-r from-blue-400 to-indigo-500 p-6 sm:p-8 text-white text-center relative">
                    <div className="absolute top-4 right-4 opacity-10">
                        <CreditCard size={80} />
                    </div>
                    <h2 className="text-xl sm:text-3xl font-extrabold uppercase tracking-tight">
                        Akea Financial Service
                    </h2>
                    <p className="text-blue-100 text-sm mt-1 font-medium tracking-wide uppercase">
                        Payment Portal
                    </p>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                    
                    <div className="space-y-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Client's Name
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <User size={18} />
                            </div>
                            <input 
                                type="text" 
                                name="clientName" 
                                id="clientName" 
                                placeholder="Webale Precious"
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Amount Paid
                        </label>
                        <div className="relative rounded-lg shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                <DollarSign size={18} />
                            </div>
                            <input 
                                type="number" 
                                name="amount" 
                                id="amount" 
                                placeholder="12000"
                                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button 
                            type="submit" 
                            className="w-full flex capitalize text-sm items-center justify-center gap-2
                             bg-blue-500 to-blue-400 hover:from-blue-700
                              hover:to-indigo-700 text-white font-medium py-3 
                              px-4 rounded-md shadow-md hover:shadow-md  border-none
                              focus:ring-1 focus:ring-indigo-500  disabled:opacity-50 
                              disabled:cursor-not-allowed transition-all cursor-pointer"
                        >
                            <span>pay now</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Paying;