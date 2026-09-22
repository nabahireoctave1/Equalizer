import React, { useState } from 'react';
import { CreditCard, User, DollarSign, LoaderCircle } from 'lucide-react';
import api from '../api';
import { useTranslation } from 'react-i18next';

const Paying = ({client_name}) => {
    const [formData,setFormData]=useState({
        client_name:client_name,
        paymentAmount:null
    })

    const [loading,setLoading]=useState(false);
    const [errors,setErrors]=useState({});
    const {t}=useTranslation();



    const HandleInputchanges= (e)=>{
        const {name,value}=e.target;
         
        setFormData((prev)=>({...prev,[name]:value}))

    }


    const HandlePay= async()=>{
        setLoading(true)
        try{ 
           
            const res=await api.post('/PayLoan',formData);
            console.log(res)



        }
        catch(err){
            const data= err.response?.data
             if(data?.errors){
                 setErrors(data.errors);
                 return;
             }
        }finally{
            setLoading(false);
        }
    }

   const InputStyle=(field)=>`${errors[field] ? 'bg-red-100  focus:ring-red-500 border-red-500' 
    :' focus:ring-blue-500 focus:border-blue-500  border-gray-300'} 
    block w-full pl-10 pr-3 py-2.5 border
    rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 
    text-sm transition-all`

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
                                name="client_name" 
                                onChange={HandleInputchanges}
                                value={formData.client_name?? ''}
                                
                                placeholder="Webale Precious"
                                className={InputStyle('client_name')}
                            />
                        </div>
                            <span className='text-[14px] text-red-500'>{t(errors.client_name)}</span>

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
                                onChange={HandleInputchanges}
                                name="paymentAmount" 
                                placeholder="12000"
                                className={InputStyle('paymentAmount')}
                            />
                        </div>
                            <span className='text-[14px] text-red-500'>{t(errors.paymentAmount)}</span>

                    </div>

                    <div className="pt-2">
                        <button  onClick={HandlePay}
                            type="submit" 
                            disabled={loading}
                            className="w-full flex capitalize text-sm items-center justify-center gap-2
                             bg-blue-500 to-blue-400 hover:from-blue-700
                              hover:to-indigo-700 text-white font-medium py-3 
                              px-4 rounded-md shadow-md hover:shadow-md  border-none
                              focus:ring-1 focus:ring-indigo-500  disabled:opacity-50 
                              disabled:cursor-not-allowed transition-all cursor-pointer"
                        >
                            
                            {loading ? <span className='flex items-center justify-center gap-1'>
                                <LoaderCircle size={20} className='animate-spin'/>
                                <p>paying...</p>
                            </span>:'Pay now'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Paying;