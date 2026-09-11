



import React from 'react';

const Not_found = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 overflow-hidden">
      <div className="text-center max-w-xl w-full px-4">
        
        {/* Animated Visual Section */}
        <div className="relative mb-8 select-none">
          <div className="text-[10rem] md:text-[12rem] font-extrabold leading-none tracking-tighter bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent animate-[bounce_4s_infinite]">
            404
          </div>
          {/* Subtle Shadow Effect */}
          <div className="w-36 h-3 bg-black/5 mx-auto rounded-full blur-[4px] animate-[pulse_4s_infinite]" />
        </div>

        {/* Text Section */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          Lost in space?
        </h1>
        <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-md mx-auto mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-white bg-indigo-600 rounded-xl shadow-[0_4px_14px_rgba(99,102,241,0.3)] hover:bg-indigo-700 hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Go to Homepage
          </a>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-base font-semibold text-slate-600 bg-transparent border-2 border-slate-200 rounded-xl hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 transition-all duration-200"
          >
            Go Back
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Not_found;