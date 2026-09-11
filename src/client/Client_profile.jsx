



const Client_profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <div className="bg-blue-300 px-6 py-5 sm:px-8">
          <h2 className="text-xl font-bold leading-7 text-white sm:text-2xl">
            Client Details Profile
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-indigo-100">
            Overview of personal, financial, and loan information.
          </p>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Grid Layout: Responsive 1 column on mobile, 2 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Box 1: Core Personal Info */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 space-y-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Personal & Contact Info
              </h3>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="text-gray-900 font-semibold">Kurisi Godfrey</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-600 font-medium">Contact:</span>
                <span className="text-gray-900">0789446364</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-600 font-medium">Address:</span>
                <span className="text-gray-900">Gassani</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-gray-600 font-medium">Business Details:</span>
                <span className=" font-medium px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-sm">
                  Restaurant
                </span>
              </div>
            </div>

            {/* Box 2: Guarantor Info */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 space-y-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Guarantor Details
              </h3>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-600 font-medium">Guarantor's Name:</span>
                <span className="text-gray-900 font-semibold">Baguma Willy</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-gray-600 font-medium">Guarantor's Contact:</span>
                <span className="text-gray-900">0784844364</span>
              </div>
            </div>

            {/* Box 3: Financial Status */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 space-y-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Financial Status
              </h3>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-600 font-medium">Amount Earned:</span>
                <span className=" font-bold text-green-600">1,800,000 UGX</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-600 font-medium">Loan Balance:</span>
                <span className=" font-bold text-red-600">900,000 UGX</span>
              </div>
              <div className="flex justify-between pt-1 items-center">
                <span className="text-gray-600 font-medium">Time Remaining:</span>
                <span className="text-sm font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
                  5 days left
                </span>
              </div>
            </div>

            {/* Box 4: Administration & Compliance */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 space-y-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Compliance & Admin
              </h3>
              <div className="flex justify-between border-b border-gray-200 pb-2 items-center">
                <span className="text-gray-600 font-medium">Penalties:</span>
                <span className="text-sm font-medium px-2.5 py-0.5 bg-green-100 text-green-800 rounded-full">
                  None
                </span>
                </div>
                {/* Penalties Avaliable here */}
                <div className="flex justify-between border-b  border-gray-200 pb-2 items-center">
                  <span className="text-gray-600 font-medium">Penalties:</span>
                <span className="text-sm font-medium px-2.5 py-0.5 bg-green-100 text-green-800 rounded-full">
                  None
                </span>
                </div>
              {/* </div> */}
              <div className="flex justify-between pt-1">
                <span className="text-gray-600 font-medium">Officer Signed:</span>
                <span className="text-gray-900 italic font-medium">Webale Precious</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Client_profile;