import { useState } from 'react';

const convertToWords = (numStr) => {
  const num = parseInt(numStr, 10);
  if (isNaN(num) || num === 0) return 'Zero shillings';

  const a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  function getBelowThousand(n) {
    if (n === 0) return '';
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
    return a[Math.floor(n / 100)] + ' hundred' + (n % 100 !== 0 ? ' and ' + getBelowThousand(n % 100) : '');
  }

  function getWords(n) {
    if (n === 0) return 'zero';
    let result = '';
    
    if (n >= 1000000000) {
      result += getBelowThousand(Math.floor(n / 1000000000)) + ' billion ';
      n %= 1000000000;
    }
    if (n >= 1000000) {
      result += getBelowThousand(Math.floor(n / 1000000)) + ' million ';
      n %= 1000000;
    }
    if (n >= 1000) {
      result += getBelowThousand(Math.floor(n / 1000)) + ' thousand ';
      n %= 1000;
    }
    if (n > 0) {
      result += getBelowThousand(n);
    }
    
    return result.trim();
  }

  const words = getWords(num);
  return words.charAt(0).toUpperCase() + words.slice(1) + ' shillings';
};

const Apply_New_Loan = () => {
  const [amount, setAmount] = useState('120000');

  const amountInWords = convertToWords(amount.replace(/[^0-9]/g, ''));

  return (
    <div className="p-8">
        
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-blue-900 uppercase tracking-tight">
            Loan Application
          </h1>
          <p className="text-gray-600 text-xs font-medium mt-1 uppercase">
            Complete the form to request your new loan
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase ml-1 mb-2">
              Requesting Loan (UGX)
            </label>
            <input 
              type="text" 
              value={amount}
         onChange={(e) => setAmount(e.target.value)}
              placeholder="12000"
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-4
               py-2 text-[17px] font-semibold text-gray-700 focus:ring-1
                focus:ring-blue-400 outline-none transition-all"
            /> 
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase ml-1 mb-2">
              Amount In Words
            </label>
            <input type='text' value={amountInWords} 
            readOnly className="w-full bg-gray-50 border  border-gray-200 rounded-md px-4 outline-none focus:ring-1 focus:ring-blue-400
             py-2 text-sm text-green-600 font-medium italic min-h-11"/>
            
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase ml-1 mb-2">
              Guarantor's Full Name
            </label>
            <input 
              type="text" 
         
              placeholder="Guarantor"
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2
               text-[15px] placeholder:text-gray-700
               text-slate-800 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase ml-1 mb-2">
              Guarantor's contact
            </label>
            <input 
              type="text" 
            
              placeholder="Phone"
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-gray-700
               focus:ring-1 focus:ring-blue-400 outline-none transition-all text-[15px] placeholder:text-gray-700"
            />
          </div>
         <div className='flex justify-end'>
 <button 
            className="px-4 bg-blue-400 hover:bg-blue-500 text-white 
             py-2 rounded-sm transition-all mt-4font-semibold  uppercase cursor-pointer "
            onClick={() => alert(`Application submitted for ${amount}`)}>
              Request now
          </button>
         </div>
         
        </div>
    </div>
  );
};

export default Apply_New_Loan;




