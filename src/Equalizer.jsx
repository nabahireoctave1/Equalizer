


// import React from 'react';

const Equalizer = () => {
  const services = [
    {
      title: "Creating Websites",
      desc: "We build tailored, high-converting websites designed to effectively showcase and advertise your services country-wide.",
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      title: "Creating Systems",
      desc: "We build intuitive business systems that centralize company management activities and provide easy reports for managers.",
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 00-4-4H3m14 2v2a4 4 0 004 4h2m-3-4h3m-12 0H3M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      title: "Updating Systems",
      desc: "We seamlessly introduce fresh features, optimization patches, and new logic layers into your existing workflow solutions.",
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 15H19" />
        </svg>
      )
    },
    {
      title: "Security Maintenance",
      desc: "If your sensitive corporate resources or database logs are exposed, we reinforce security to safeguard your architecture.",
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2"
         viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 
          0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    }
  ];

  const issues = [
    {
      title: "Security Check-Ups",
      desc: "We perform full-scale penetration checks to surface infrastructure vulnerabilities before they threaten your ecosystem."
    },
    {
      title: "System Sluggishness & Overloading",
      desc: "If execution speeds drop or databases stall under heavy load, we diagnose bottlenecks to restore fast throughput."
    },
    {
      title: "Error Displays & Redirection Bugs",
      desc: "We resolve script crashes, visual error codes, broken navigation trees, and misconfigured interfaces quickly."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      <header className="relative bg-linear-to-br from-slate-900 via-indigo-950 to-blue-950 text-white py-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full text-blue-200 ring-1 ring-white/10">
            Digital Solution Partners
          </span>
          <h1 className="text-4xl uppercase md:text-6xl font-black mt-5 tracking-tight bg-linear-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
            Welcome to Equalizer
          </h1>
          <p className="text-slate-300 mt-4 max-w-2xl mx-auto text-sm md:text-lg font-medium leading-relaxed">
            We empower scaling businesses by delivering secure custom software architecture, seamless platform maintenance, and reliable full-stack optimization.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs md:text-sm">
            <a href="tel:+256792135699" className="flex items-center gap-2 bg-white/10 hover:bg-white/20
             backdrop-blur-md px-4 py-2.5 rounded-md border border-white/10 transition-all font-medium">
              <span className="text-blue-400">Call:</span> +256 792 135 699
            </a>
            <a href="https://wa.me/250732782595" target="_blank" rel="noreferrer" 
            className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 backdrop-blur-md
             px-4 py-2.5 rounded-md border border-emerald-500/20 text-emerald-300 transition-all font-medium">
              <span className="text-emerald-400 ">WhatsApp:</span> +250 732 782 595
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        
        <section className="space-y-8">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md">Capabilities</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">What We Offer</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((srv, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.03)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex gap-4 items-start">
                <div className="p-3 bg-blue-50 rounded-xl shrink-0">
                  {srv.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-900 text-base md:text-lg">{srv.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Audit & Optimization Section */}
        <section className="bg-linaer-to-br from-slate-900 to-slate-950 text-white p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">System Troubleshooting</span>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Experiencing System Performance Issues?</h2>
              <p className="text-slate-400 text-sm max-w-xl">We audit legacy systems and resolve technical issues to keep your business operating efficiently.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {issues.map((issue, idx) => (
                <div key={idx} className="bg-white/0.04 border border-white/6 p-5 rounded-2xl space-y-2 hover:bg-white/[0.07] transition-colors">
                  <h3 className="font-bold text-sm text-blue-300 tracking-wide flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    {issue.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{issue.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/8 flex items-center gap-2 text-xs md:text-sm text-slate-400 font-medium">
              <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Our team provides continuous engineering support beyond the list of items mentioned above.</span>
            </div>
          </div>
        </section>

        {/* Global Actionable Footer Contact Section */}
        <section className="bg-white border border-slate-100 p-8 md:p-10 rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0,0.04)] text-center max-w-3xl mx-auto space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Connect With Us</h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-md mx-auto">
              Get in touch with us to schedule a strategy consultation, perform an emergency fix, or initiate your project build.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2">
            {/* Direct Calls Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/80 space-y-1.5">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Direct Voice Support</h4>
              <div className="text-xs font-semibold text-slate-900 space-y-0.5">
                <a href="tel:+256792135699" className="block hover:text-blue-600 transition-colors">+256 792 135 699</a>
                <a href="tel:0732782595" className="block hover:text-blue-600 transition-colors">0732 782 595</a>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/80 space-y-1.5">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">WhatsApp Secure Chats</h4>
              <div className="text-xs font-semibold text-slate-900 space-y-0.5">
                <a href="https://wa.me/250732782595" target="_blank" rel="noreferrer" className="block hover:text-emerald-600 transition-colors">+250 732 782 595</a>
                <a href="https://wa.me/256792135699" target="_blank" rel="noreferrer" className="block hover:text-emerald-600 transition-colors">+256 792 135 699</a>
              </div>
            </div>

            {/* Social Channels Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100/80 space-y-1.5">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-sans">Social Portfolio</h4>
              <div className="text-xs font-semibold text-slate-900">
                <a href="https://instagram.com/Precious8pro" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-pink-600 transition-colors">
                  @Precious8pro
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Equalizer;