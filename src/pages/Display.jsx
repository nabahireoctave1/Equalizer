import { CopyCheck, CopyIcon, Info, ArrowLeft, ShieldCheck, Zap } from 'lucide-react'
import React, { useState } from 'react'
import QRCode from 'react-qr-code'
import photo from '../assets/image.Jpeg';

export default function WalletModal() {
  const [isCopied, setIsCopied] = useState(false)
  const walletAddress = '0x0245rx008374kl085772390485720394857203948'

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans  text-slate-900">
      
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={photo} alt="logo" className="w-10 h-10 object-cover  rounded-full shadow-sm" />
            <div className="hidden md:block">
              <p className="text-xl font-bold tracking-tight text-slate-800">Equaliizer</p>
              <p className="text-[10px] text-slate-500 uppercase font-semibold">Secure Activation</p>
            </div>
          </div>
          
          <button className=" flex items-center cursor-pointer gap-2 text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back 
          </button>
        </div>
      </nav>

      <main className=" flex items-center justify-center p-4  lg:py-7">
        <div className="w-full max-w-full grid md:grid-cols-2 bg-white rounded-xl overflow-hidden border border-slate-100">
          
          <div className="p-8 md:p-12 bg-slate-50 border-r border-slate-100 flex flex-col justify-center">
            <div className="flex items-center justify-center  gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 w-fit">
              <Zap className="w-3 h-3 fill-current" />
              Instant Activation
            </div>
            
            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight mb-4">
              Activate your <span className="text-blue-600">Finance Service</span>
            </h1>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              To activate your account, please transfer the required USDT amount to the secure wallet address provided.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className=" w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-400 shadow-sm">1</div>
                <p className="text-sm text-slate-600 self-center">Scan the QR code or copy the address.</p>
              </div>
              <div className="flex gap-4">
                <div className=" w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-400 shadow-sm">2</div>
                <p className="text-sm text-slate-600 self-center">Send <span className="font-bold text-slate-900">USDT via BEP20 Network</span>.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-400 shadow-sm">3</div>
                <p className="text-sm text-slate-600 self-center">Wait for automatic verification.</p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200 flex items-center gap-3">
              <ShieldCheck className="text-green-500 w-6 h-6" />
              <p className="text-[11px] text-slate-400 font-medium uppercase tracking-widest">
                End-to-End Encrypted Transaction
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12 flex flex-col items-center justify-center">
            
            <div className="relative  mb-10">
              <div className="bg-blue-50 rounded-md"></div>
              <div className="relative bg-white p-6 rounded-2xl  border-2 border-slate-100">
                <QRCode 
                  value={walletAddress} 
                  size={180} 
                  level="Q"
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </div>
            </div>

            <div className="w-full space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">activation address</label>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">BEP-20 ONLY</span>
              </div>

              <div 
                onClick={handleCopy}
                className={` relative flex flex-col p-2.5 rounded-md border transition-all cursor-pointer border-slate-100
                  ${isCopied ? 'bg-blue-50 ' : 'bg-slate-50'}`}
              >
                <div className="flex justify-between items-start w-full">
                  <span className={`text-sm font-mono break-all leading-relaxed ${isCopied ? 'text-slate-700' : 'text-slate-700'}`}>
                    {walletAddress}
                  </span>
                  <div className="ml-4 mt-1 shrink-0">
                    {isCopied ? (
                      <CopyCheck className="text-blue-600 w-5 h-5" />
                    ) : (
                      <CopyIcon className="text-blue-400  w-5 h-5" />
                    )}
                  </div>
                </div>
             
              </div>
            </div>

            <div className="mt-8 flex items-start gap-3 bg-red-50 p-4 rounded-md border border-red-100 w-full">
              <Info className="text-red-500 w-4 h-4 mt-0.5 shrink-0" />
              <p className="text-[11px] text-red-700 gap-2 font-medium uppercase leading-normal">
                IMPORTANT: Sending assets other than USDT or using a different network will result in 
                <span className="font-black"> permanent loss</span>.
              </p>
            </div>

          </div>
        </div>
      </main>

     
    </div>
  )
}