import { useState } from 'react';
import Demand_field from './Demnand_field.jsx';
import Field_Paid from './Field_Paid.jsx';
import Unpaid_Field from './Field_Unpaid.jsx';
import All_field_clients from './All_field_clients.jsx';

const Field_officer = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All My Clients' },
    { id: 'paid', label: 'Paid' },
    { id: 'unpaid', label: 'Unpaid' },
    { id: 'demand', label: 'Demand' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'paid': return <Field_Paid />;
      case 'unpaid': return <Unpaid_Field />;
      case 'demand': return <Demand_field />;
      default: return <All_field_clients />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-full">
        
        <div className="bg-white rounded-t-lg border-b border-gray-200 p-6 sm:p-8 text-center">
          <h1 className="text-2xl sm:text-3xl uppercase font-extrabold text-blue-900 tracking-tight">
            Akea Financial Service
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">
            Field Officer Payment Report
          </p>
        </div>

        <div className="bg-white p-6 shadow-sm border-b border-gray-100">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Field Officer Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 block uppercase">Officer Name</label>
              <span className="text-lg font-semibold text-gray-800">Webale Precious</span>
            </div>
            <div>
              <label className="text-xs text-gray-400 block uppercase">Collected Amount</label>
              <span className="text-lg font-semibold text-green-600">9,000,000 UGX</span>
            </div>
            <div className="col-span-full pt-2 mt-2 border-t border-gray-100 flex gap-6 text-xs text-gray-500">
              <div><strong>Branch:</strong> Gasani</div>
              <div><strong>Date:</strong> 11/7/2026</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex flex-wrap justify-around sm:justify-start gap-2 sm:gap-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm font-semibold capitalize transition-colors duration-200 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white sm:p-8 min-h-100">
          {renderContent()}
        </div>

      </div>
    </div>
  );
};

export default Field_officer;
