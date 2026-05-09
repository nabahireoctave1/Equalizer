import React, { useState } from 'react';
import { ToggleRight, ToggleLeft, Lock, Unlock, Bell, CreditCard, AlertTriangle, Save, CheckCircle2 } from 'lucide-react';

function Setting() {
  const [isAutoNotifOpen, setAutoNotif] = useState(true);
  
  const [lockPayment, setLockPayment] = useState(false);
  const [lockNotif, setLockNotif] = useState(false);
  const [lockPenalties, setLockPenalties] = useState(false);

  const [selectedCurrency, setSelectedCurrency] = useState('UGX');
  const [selectedMethod, setSelectedMethod] = useState('momo');

  const cardStyle = "bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6 transition-all duration-300";
  const labelStyle = "block text-sm font-bold text-gray-800 mb-4 capitalize tracking-wider";
  const inputStyle = "w-full p-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-300 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  
  const selectableBox = (isActive, isDisabled) => `
    flex items-center justify-between text-sm p-4 rounded-md border-1 transition-all 
    ${isActive ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm' : 'border-gray-100 bg-gray-50 text-gray-400'}
    ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-200'}
  `;

  return (
    <div className="min-h-screen bg-[#F9FAFB] w-full overflow-auto py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">System Settings</h2>
            <p className="text-gray-500 mt-2 font-semibold">Manage application settings.</p>
          </div>
          <button className="flex items-center text-sm gap-2 bg-blue-500 hover:cursor-pointer text-white px-6 py-2 rounded-md font-semibold transition-all shadow-lg shadow-blue-200 active:scale-95">
            <Save size={20} />save
          </button>
        </div>

        <div className={`${cardStyle} ${lockPayment ? 'bg-gray-50' : ''}`}>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${lockPayment ? 'bg-gray-200 text-gray-500' : 'bg-blue-50 text-blue-600'}`}>
                <CreditCard size={24}/>
              </div>
              <h3 className="text-xl font-bold text-gray-800">Payment & Currency</h3>
            </div>
            <button onClick={() => setLockPayment(!lockPayment)} className="text-gray-400 hover:text-blue-600 transition-colors">
              {lockPayment ? <Lock size={24} className="text-red-500" /> : <Unlock size={24} />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className={labelStyle}>Allow Currencies</label>
              <div className="space-y-3">
                <div 
                  onClick={() => !lockPayment && setSelectedCurrency('UGX')} 
                  className={selectableBox(selectedCurrency === 'UGX', lockPayment)}
                >
                  <span className="font-bold">UGX</span>
                  <CheckCircle2 size={20} className={selectedCurrency === 'UGX' ? 'text-blue-600' : 'text-gray-200'} />
                </div>
                

                <div 
                  onClick={() => !lockPayment && setSelectedCurrency('USDT')} 
                  className={selectableBox(selectedCurrency === 'USDT', lockPayment)}
                >
                  <span className="font-bold">USDT (Crypto)</span>
                  <CheckCircle2 size={20} className={selectedCurrency === 'USDT' ? 'text-blue-600' : 'text-gray-200'} />
                </div>
              </div>
            </div>

            <div>
              <label className={labelStyle}>Allowed Method</label>
              <div className="space-y-3">
                <div 
                  onClick={() => !lockPayment && setSelectedMethod('other')} 
                  className={selectableBox(selectedMethod === 'other', lockPayment)}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      readOnly
                      checked={selectedMethod === 'other'} 
                      disabled={lockPayment}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="font-bold capitalize">Other payments(card , Momo , Bank)</span>
                  </div>
                  <CheckCircle2 size={20} className={selectedMethod === 'other' ? 'text-blue-400' : 'text-gray-200'} />
                </div>


                <div 
                  onClick={() => !lockPayment && setSelectedMethod('crypto')} 
                  className={selectableBox(selectedMethod === 'crypto', lockPayment)}
                >
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      readOnly
                      checked={selectedMethod === 'crypto'} 
                      disabled={lockPayment}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="font-bold capitalize">Crypto</span>
                  </div>
                  <CheckCircle2 size={20} className={selectedMethod === 'crypto' ? 'text-blue-400' : 'text-gray-200'} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${cardStyle} ${lockNotif ? 'bg-gray-50 opacity-75' : ''}`}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3 text-blue-600">
              <div className="p-2 bg-purple-50 rounded-lg"><Bell size={24}/></div>
              <h3 className="text-xl font-bold text-gray-800">Notification settings</h3>
            </div>
            <button onClick={() => setLockNotif(!lockNotif)} className="text-gray-400 hover:text-purple-600">
              {lockNotif ? <Lock size={22} className="text-red-500" /> : <Unlock size={22} />}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-6 border border-gray-100">
            <div>
              <span className="font-bold text-gray-700">Automation Mode</span>
              <p className="text-sm text-gray-500">Enable/Disable auto-messaging system</p>
            </div>
            <button 
              disabled={lockNotif}
              onClick={() => setAutoNotif(!isAutoNotifOpen)}
              className="disabled:opacity-30 transition-transform active:scale-90"
            >
              {isAutoNotifOpen ? <ToggleRight size={35} className="text-blue-400" /> : <ToggleLeft size={35} className="text-gray-300" />}
            </button>
          </div>

          <div className="space-y-4">
            {isAutoNotifOpen ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>Reminder Message</label>
                  <textarea disabled={lockNotif} className={`${inputStyle} h-32 resize-none text-sm`} placeholder="Reminder text..."></textarea>
                </div>
                <div>
                  <label className={labelStyle}>Overdue Message</label>
                  <textarea disabled={lockNotif} className={`${inputStyle} h-32 resize-none text-sm`} placeholder="Overdue text..."></textarea>
                </div>
              </div>
            ) : (
              <div>
                <label className={labelStyle}>Manual Message</label>
                <textarea disabled={lockNotif} className={`${inputStyle} h-32 text-sm resize-none`} placeholder="Write message..."></textarea>
              </div>
            )}
          </div>
        </div>

        <div className={`${cardStyle} ${lockPenalties ? 'bg-gray-50 opacity-75' : ''}`}>
          <div className="flex justify-between items-center mb-6 text-orange-600">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg"><AlertTriangle size={24}/></div>
              <h3 className="text-xl font-bold text-gray-800">Penalties & Account Locking</h3>
            </div>
            <button onClick={() => setLockPenalties(!lockPenalties)} className="text-gray-400 hover:text-orange-600">
              {lockPenalties ? <Lock size={22} className="text-red-500" /> : <Unlock size={22} />}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelStyle}>Interest % Ratio</label>
              <input disabled={lockPenalties} type="number" className={`${inputStyle} text-sm`} placeholder='5%'/>
            </div>
            <div>
              <label className={labelStyle}>Grace Days</label>
              <input disabled={lockPenalties} type="number" className={`${inputStyle} text-sm`} placeholder='7 days' />
            </div>
            <div>
              <label className={labelStyle}>Lock After (Days)</label>
              <input disabled={lockPenalties} type="number" className={`${inputStyle} text-sm`} placeholder="1 days" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Setting;