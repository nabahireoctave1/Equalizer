import { Plus,  XIcon,Image,Smartphone, Trash, ImagePlus, CircleX, Banknote } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import  QRCode  from 'react-qr-code';
import api from '../api';


const convertToWords = (numStr) => {
  const num = parseInt(numStr, 10);
  if (isNaN(num)) return '';
  if(num === 0) return 'zero shilling'
  const a = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 
    'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
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
      result += getBelowThousand(Math.floor(n / 1000)) + ' thousand';
      n %= 1000;
    }
    if (n > 0) {
      result += getBelowThousand(n);
    }
    
    return result.trim();
  }

  const words = getWords(num);
  return words.charAt(0).toUpperCase() + words.slice(1) + ' shillings ';
};



const New_client = ({onClose}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  
  const [CurrentBorrowersInfo,setCurrentBorrowersinfo]=useState([])
 const [acceptterms,setaccepted]=useState(false)
 const [acceptTermsMessage,setacceptTermsmessage]=useState(null)
 const [OpenHasRecord,setHasRecordModel]=useState(null);
 const [clientRecord,setClientrecord]=useState([]);

  const [MessageKey,setMessageKey]=useState({
    fethErrorMessagekey:null,
    submitErrorMessagekey:null
  });
  const [isavailable,setisavailable]=useState(null);
  const [SecPicture,setSecPicture]=useState(null)
  const [errors,seterrors]=useState({})
  const [formData,setFormData]=useState({
   client_name:null,
   client_address:null,
   client_contact:null,
   IdNumber:null,
   client_B_type:null,
   client_B_location:null,
   amount:null,
   payment_frequency:'Daily',
   intrest:0,
   security_name:null,
   secNumber:null,
    guarantor_name:null,
   guarantor_contact:null,
   cashier_name:null,
   installment:null,
   clientId:null,
   guarantor_address:null
  })

  const [clientLoanSummary,setLoanSummary]=useState({
   clientName:null,
   TotalAmountPaid:null,
   TotalExpectedTopay:null,
   TotalLoan:null,
   TotalUnpaidLoanAmount:null ,
   CrossPaymentRate:null,

  })

  const [ClientLoan,setClientLoan]=useState([])

    const nextStep = () =>{

    const newError={};

    if(currentStep===1){
      if(!formData.client_name?.trim()){
       newError.client_name='client.client_name_required'
      }

      if(!formData.client_contact?.trim()){
    newError.client_contact='client.contact_required'
  }

  if(!formData.client_address?.trim()){
    newError.client_address='client.client_address_required'
  }
  
  if(!formData.IdNumber?.trim()){
   newError.IdNumber='client.Id_required'
  }

    }


    if(currentStep===2){

        
  if(!formData.client_B_type){
    newError.client_B_type='client.bussiness_type_required'
  }

  if(!formData.client_B_location?.trim()){
    newError.client_B_location='client.bussiness_location_required'
  }
    }


    if(currentStep===3){
        if(!formData.amount?.trim()){
    newError.amount='client.applied_amount_required'
  }

 if(!formData.payment_frequency?.trim()){
  newError.payment_frequency='client.payment_frequency_not_setted'
 }
  
 if(!formData.intrest===''||formData.intrest===null){
  newError.intrest='client.intrest_profit_ration_not_setted'
}

    }

    if(currentStep===4){
       
if(!formData.security_name?.trim()){
  newError.security_name='client.collateral_name_required'
}

if(!formData.secNumber){
 newError.secNumber='client.secNumber_required'
}

if(!formData.guarantor_name?.trim()){
  newError.guarantor_name='client.guarantor_names_required'
}

if(!formData.guarantor_contact){
  newError.guarantor_contact='client.guarantor_contact_required'
}

if(!formData.guarantor_address){
  newError.guarantor_address='client.guarantor_address_required'
}

    }

  if(currentStep===5){
    if(acceptterms===false){
      setacceptTermsmessage('Please accept terms & condition')
      return
    }
  }

    if(currentStep===6){
     if(!formData.cashier_name?.trim()){
      newError.cashier_name='client.loan_approved_by_cashier'
     }
 
     if(!formData.installment){
      newError.installment='client.daily_installment_required'
     }
     
    }



    seterrors(newError)

    if(Object.keys(newError).length>0){
      return
    }
    

  setCurrentStep((prev) => Math.min(prev + 1, totalSteps));


  } 

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const HandleChanges= (e)=>{
    const {name,value} =e.target;
     
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
    
    seterrors((prev)=>({...prev,[name]:''}))


  }

  const HandleImgChange=(e)=>{
    const file= e.target.files[0];
     if(!file) return 
      setSecPicture(file)
  
   
  }





 const HandleSelectedBorrowers= (borrower)=>{
  setFormData((prev)=>({
    ...prev,
    client_name:borrower.client_name ?? '',
    client_contact:borrower.phone ?? '',
    client_address:borrower.client_address ?? '',
    IdNumber:borrower.national_id ?? '',
    client_B_type:borrower.bussiness_type ?? '',
      client_B_location:borrower.bussiness_location ?? '', 
      payment_frequency:borrower.payment_frequency ?? 'Daily',
    intrest:borrower.interest_percentage ?? 0,
    clientId:borrower.client_id
  }))

 }



const FindCurrentBorrowers= async ()=>{
  try{

    setMessageKey({
      fethErrorMessagekey:null
    })

    const res= await api.get('/branch-borrowers');
      setCurrentBorrowersinfo(res.data);
    
  }
  catch(err){
   setisavailable(err.response?.data?.isavailable);
   setMessageKey({
    fethErrorMessagekey:err.response?.data?.messagekey,
    submitErrorMessagekey:null
   })

  } 

}




useEffect(()=>{
   
FindCurrentBorrowers();

},[])



const filterdborrowers= CurrentBorrowersInfo.filter((b)=>{
  return (
    b?.client_name.toLowerCase().includes(formData.client_name?? ''.toLowerCase().trim())
  )
})

const Handleretry= ()=>{
  FindCurrentBorrowers();
}



const HandleSubmitForm= async()=>{
    seterrors({})
    const data= new FormData();
    
    Object.entries(formData).forEach(([key,value])=>{
      if(value!==null && value!==undefined){
        data.append(key,value);
      }
    })

    

    if(SecPicture){
      data.append('secPicture',SecPicture)
    }

    

  try{
   const res=await api.post('/save_client_info',data,{
    headers:{
      "Content-Type":"multipart/form-data"
    }
   })
    if(res.data.hasRecord===true){
      setHasRecordModel(true);

      setLoanSummary({

      clientName:res.data.clientRecord.client_name,
      TotalAmountPaid:res.data.clientRecord.TotalAmountPaid,
      TotalExpectedTopay:res.data.clientRecord.TotalExpectedTopay,
      TotalUnpaidLoanAmount:res.data.clientRecord.TotalUnpaidLoanAmount,
      CrossPaymentRate:res.data.clientRecord.paymentRate,
      TotalLoan:res.data.clientRecord.TotalLoan
      })
      setClientLoan(res.data.clientRecord.loanInfo);
    }
   

  }
  catch(err){
    const data= err.response?.data
    if(data?.errors){ 
      seterrors(data?.errors)
      return
    }
  }



}


const closeopenRecordModel= ()=>{
  setHasRecordModel(false);
}


  const inputStyle = (field)=>`
  w-full mt-1 p-2.5 border  text-[14px] rounded-md focus:ring-1  focus:outline-none text-gray-800 bg-gray-50
    ${errors[field] ? 'border-red-500 focus:ring-red-400 bg-red-50':'border-gray-100 focus:ring-blue-500'}
  `;
  const labelStyle = "block text-sm font-semibold text-gray-700";
  const sectionGrid = "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3";

  const {t} = useTranslation();

      const amountInWords = convertToWords(formData.amount?? ''.replace(/[^0-9]/g, ''));





  return (
    <div className="fixed inset-0 z-50 flex items-center 
     justify-center p-4 bg-black/20 backdrop-blur-sm">
        
     {OpenHasRecord && (
  <div
    onClick={closeopenRecordModel}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 md:p-8"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex h-full w-full max-w-6xl flex-col 
      overflow-y-auto rounded-none bg-white shadow-sm"
    >
      <div className="border-b border-gray-100 px-6 py-3 sticky top-0 z-20 bg-gray-50">
        <h2 className="text-2xl font-extrabold uppercase text-gray-800">
          Review Client Profile
        </h2>
        <p className="mt-1 text-[15px] text-gray-800 italic">
          Previous client loan  information
        </p>
      </div>

      <div className="flex items-center justify-between border-b border-gray-100 mb-5 px-6 py-7">
        <h2 className="font-semibold text-[15px] text-gray-800">
          {clientLoanSummary.clientName}
        </h2>

        <p className="text-[12px] font-semibold uppercase text-gray-700 ">
          Total Loans:{" "}
          <span className="font-bold text-gray-900">
            {clientLoanSummary.TotalLoan}
          </span>
        </p>
      </div>

    
      <div className="mx-3 rounded-sm border border-gray-100 bg-gray-50 p-8">
        <div className='flex  justify-between items-center'>
           <h3 className="text-gray-800  font-extrabold text-[15px] uppercase">
          Client Loan Overview
        </h3>
        <span>
          <h2 className='uppercase font-semibold text-[14px] text-gray-800'>Payment Decision</h2>
          <span className={clientLoanSummary.TotalExpectedTopay>0 && clientLoanSummary.TotalUnpaidLoanAmount>0 && 
            clientLoanSummary.TotalAmountPaid===0 ? 'bg-red-500 px-5 rounded-full  text-[13px] uppercase text-white py-1 w-full':''}>
             {clientLoanSummary.TotalExpectedTopay>0 && clientLoanSummary.TotalUnpaidLoanAmount>0 && 
            clientLoanSummary.TotalAmountPaid===0 ? 'Poor payment':''}
            </span>
        </span>
        </div>
     

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className='p-4'>
            <h2 className="text-[12px] font-semibold uppercase text-gray-700">
              Total Expected To Pay
            </h2>
            <p className="mt-2 text-[18px]  font-semibold text-blue-600 uppercase">
              UG {clientLoanSummary.TotalExpectedTopay}
            </p>
          </div>

          <div className=" p-4">
            <h2 className="text-[12px] font-semibold uppercase text-gray-700">
              Total Unpaid
            </h2>
            <p className="mt-2 text-[18px] font-semibold text-red-600 uppercase">
            UG   {clientLoanSummary.TotalUnpaidLoanAmount}
            </p>
          </div>

          <div className="p-4 ">
            <h2 className="text-[12px] font-semibold uppercase text-gray-700">
              Total Paid
            </h2>
            <p className="mt-2 text-[18px] font-semibold text-green-600">
             UG {clientLoanSummary.TotalAmountPaid}
            </p>
          </div>
          
        </div>
        <div>
          <div className='flex justify-between items-center '>
          <h2 className='text-[15px] p-1 italic'>Repayment Progress </h2>
          <p className='text-[16px] italic'>{clientLoanSummary.CrossPaymentRate}%</p>
          </div>
        <div className='bg-gray-200 h-2 rounded-sm'>
          <div style={{width:clientLoanSummary.CrossPaymentRate ?
             clientLoanSummary.CrossPaymentRate:0}}
              className={`${clientLoanSummary.CrossPaymentRate>=60 
                &&clientLoanSummary.CrossPaymentRate<=70?
               'bg-yellow-400':
               clientLoanSummary.CrossPaymentRate<50 ?
                 'bg-red-500' :'bg-green-400'  } 
                h-2 rounded-sm`}></div>
        </div>
        </div>
       
      </div>
      <div className='px-5 mt-4 border m-3 border-gray-200 rounded-md py-3'>
        <div className='flex gap-2 items-center'>
         <span className='bg-blue-500 p-1 rounded-full text-white'>
          <Banknote/>
           </span>
         <h2 className='text-gray-800  font-extrabold text-[15px] uppercase'>Loan details</h2>
      </div>
      {ClientLoan.length>0 ?
        ClientLoan.map((loan,idx)=>{
        return <div className={`grid grid-cols-1 `}>
          <div  className='border mt-2  border-gray-300 rounded-md '>

         <div className='bg-gray-50 p-2 border-b border-gray-200'>
          <h2 className='text-[18px] font-semibold '>{loan.LoanId}</h2>
         </div>
         <div className='px-4'>
         <div className='flex  justify-between'>
          <div>
            <p className='text-[15px] capitalize'>Loan</p>
            <p className='text-[15px] capitalize'>paid</p>
            <p className='text-[15px] capitalize'>unpaid</p>
            <p className='text-[15px] capitalize '>unpaid days</p>
            <p className='text-[15px] capitalize'>overdue count</p>
            <p className='text-[15px] capitalize'>Partial payment count</p>
            
          </div>
          <div>
            <p className='text-[15px] '>{loan.LoanAmount}</p>
            <p className='text-[15px] '>{loan.TotalPaid}</p>
            <p className='text-[15px] '>{loan.TotalUnpaid}</p>
            <p className='text-[15px] '>{loan.unpaidDays}</p>
            <p className='text-[15px] '>{loan.TotalOverdueCount}</p>
            <p className='text-[15px] '>{loan.PartialPaymentCount}</p>
          </div>
         </div>
         </div>

          </div>
      </div>
        }):''
     
      
    }
      
         
      </div>
    </div>
  </div>
)}

     {
      MessageKey.fethErrorMessagekey &&
       <div className='fixed inset-0 z-50 flex  items-center  justify-center bg-black/50'>
        <div className=' bg-red-100 h-fit m-2 py-3 px-8 rounded-sm 
         flex items-center flex-col animate-bounce-once'>
        <span className='flex  items-center flex-col'>
          <CircleX size={40} className='text-red-500'/>
          <h2 className='text-2xl text-red-500'>{t('errors.errorTitle')}</h2>
          </span> 
        <p className='text-[15px] text-gray-700'>{t(MessageKey.fethErrorMessagekey)}</p>
          <button onClick={Handleretry} className='bg-green-600 px-8 py-1.5 rounded-sm capitalize text-[15px]
           italic text-white  m-2  cursor-pointer outline-0'>retry</button>
          </div>

      </div>
     }
      
      <div className="bg-white   rounded-lg  w-full max-w-4xl max-h-[95vh] overflow-y-auto shadow-2xl animate-fadeIn">

        <div className="bg-blue-400 p-6 text-white text-center">
         <div onClick={onClose} className='flex justify-end cursor-pointer'>
        <XIcon/>

      </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight uppercase">{t("loanApplicationPortal")}</h2>

          <div className="mt-4 flex items-center justify-center space-x-2 text-xs sm:text-sm text-blue-200">
            <span>{t("step")} {currentStep} of {totalSteps}</span>
            <div className="w-32 bg-blue-500 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-white h-full transition-all duration-100 ease-in" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>

            </div>

          </div>

        </div>

        <div className="p-6 sm:p-10">
          
          {currentStep === 1 && (
            <div className="space-y-4 ">
              <h3 className="text-xl font-bold text-gray-800 border-b  border-gray-200 pb-2">{t("particularApplicants")}</h3>
              <div className={sectionGrid}>
                <div className='relative'>
                  <label className={labelStyle}>{t("name")}:</label>
                  <input type="text" value={formData.client_name ?? ''}
                   name='client_name' onChange={HandleChanges} className={inputStyle('client_name')} placeholder='John Doe'/>
                    <span className='text-[14px] text-red-500'>{t(errors.client_name)}</span>

                    {formData.client_name &&filterdborrowers.length>0 &&
                     <div className='bg-gray-50 mt-1 py-3 px-5 w-full rounded-xs border border-gray-100
                      z-50 absolute  left-0 right-0  max-h-60 overflow-auto'>
                      
                        {filterdborrowers.map((b,idx)=>{
                      return <div key={idx}> 
                     <button className='text-[15px] text-gray-700 cursor-pointer'
                      onClick={()=>HandleSelectedBorrowers(b)}
                     >
                      <p>{b.client_name}</p>
                      
                     </button>
                     </div> 

                     
                  })}

                      </div>
                      
                      }
                      
                
                </div>

                <div>
                  <label className={labelStyle}>{t("contact")}:</label>
                  <input type="text" value={formData.client_contact?? ''}  name='client_contact' onChange={HandleChanges}
                   className={inputStyle('client_contact')} placeholder='07835456132'/>
                   <span className='text-[14px] text-red-500'>{t(errors.client_contact)}</span>

                </div>
                
              </div>
              <div className={sectionGrid}>
                <div>
                  <label className={labelStyle}>{t("address")}:</label>
                  <input type="text" value={formData.client_address?? ''} name='client_address'
                   onChange={HandleChanges} className={inputStyle('client_address')} placeholder='Kampala'/>
                    <span className='text-[14px] text-red-500'>{t(errors.client_address)}</span>

                </div>
                <div>
                  <label className={labelStyle}>{t("idNumber")}:</label>
                  <input type="text" value={formData.IdNumber?? ''} name='IdNumber' onChange={HandleChanges}
                   className={inputStyle('IdNumber')} placeholder='xxxxxxxxxxx'/>
                    <span className='text-[14px] text-red-500'>{t(errors.IdNumber)}</span>

                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">{t("businessDetails")}</h3>
              <div className={sectionGrid}>
                
                <div>
                  <label className={labelStyle}>{t("businessType")}:</label>
                  <input type="text" value={formData.client_B_type?? ''} name='client_B_type'
                   onChange={HandleChanges} className={inputStyle('client_B_type')}
                    placeholder={t("placeholderBusinessType")}/>
                    <span className='text-[14px] text-red-500'>{t(errors.client_B_type)}</span>

                </div>
                <div>
                  <label className={labelStyle}>{t("businessLocation")}:</label>
                  <input type="text" value={formData.client_B_location?? ''} name='client_B_location'
                   onChange={HandleChanges} className={inputStyle('client_B_location')}  
                   placeholder='Kampala'/>
                    <span className='text-[14px] text-red-500'>{t(errors.client_B_location)}</span>

                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">{t("loanDetails")}</h3>
              <div className={sectionGrid}>
                <div>
                  <label className={labelStyle}>{t("amountApplied")} (Digits):</label>
                  <input 
                    type="text" 
                    name='amount'
                    onChange={HandleChanges}
                    placeholder="150000" 
                    className={inputStyle('amount')} 
                  />
                    <span className='text-[14px] text-red-500'>{t(errors.amount)}</span>

                </div>
                <div>
                  <label className={labelStyle}>{t("amountWords")}:</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={amountInWords}
                    placeholder="One Hundred thousand shillings Only" 
                    className={`${inputStyle('amountinWord')} bg-gray-100 font-medium
                     text-blue-400 select-all`} 
                  />

                </div>
              </div>
              <div className={sectionGrid}>
                <div>
                  <label className={labelStyle}>{t("duration")}:</label>
                  <input type='text' name='payment_frequency' onChange={HandleChanges} 
                  value={formData.payment_frequency ?? ''} readOnly  className={inputStyle('payment_frequency')}>
                
                  </input>
                    <span className='text-[14px] text-red-500'>{t(errors.payment_frequency)}</span>

                </div>

                <div>
                  <label className={labelStyle}>{t("interest")}:</label>
                  <input value={formData.intrest?? ''} name='interest'
                   onChange={HandleChanges} readOnly type="text" placeholder="20%" 
                   className={inputStyle('intrest')} />
                    <span className='text-[14px] text-red-500'>{t(errors.intrest)}</span>

                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-3">{t("securityDetails")}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelStyle}>{t("securityName")}:</label>
                    <input type="text" name='security_name' onChange={HandleChanges}
                     className={inputStyle('security_name')} placeholder={t("placeholderSecurity")}/>
                    <span className='text-[14px] text-red-500'>{t(errors.security_name)}</span>

                  </div>
                  <div>
                    <label className={labelStyle}>{t("securityNumber")}:</label>
                    <input type="number" name='secNumber' onChange={HandleChanges} 
                    className={inputStyle('secNumber')} placeholder='1'/>
                    <span className='text-[14px] text-red-500'>{t(errors.secNumber)}</span>

                  </div>
                  <div>
                    <label className={`${labelStyle}`}>
                      {t("securityPicture")}:

                    </label>
                    {
                      SecPicture ? 
                      <div>
                        <input type="text" value={SecPicture.name??''} readOnly className={inputStyle('secPic')} />
                      </div>

                      :
                       <div className='p-2'>
                       <label className='text-blue-600'>
                      <ImagePlus size={35} className='cursor-pointer'/>
                      <input type='file' onChange={HandleImgChange} className='hidden'/>
                    </label>
                    </div>
                    }
                   
                
                  
               
                    
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-3">{t("guarantorDetails")}s</h3>
                <div className={sectionGrid}>
                  <div>
                    <label className={labelStyle}>{t("guarantorName")}:</label>
                    <input type="text"  name='guarantor_name' onChange={HandleChanges} 
                    className={inputStyle('guarantor_name')} placeholder='Jane Doe'/>
                    <span className='text-[14px] text-red-500'>{t(errors.guarantor_name)}</span>

                  </div>
                  <div>
                    <label className={labelStyle}>Contact:</label>
                    <input type="text"
                     name='guarantor_contact' 
                    onChange={HandleChanges} className={inputStyle('guarantor_contact')} 
                    placeholder='07865432546'/>
                    <span className='text-[14px] text-red-500'>{t(errors.guarantor_contact)}</span>


                  </div>
                  
                </div>
                 <div>
                    <label className={labelStyle}>Guarantor Location</label>
                    <input type="text"
                     name='guarantor_address' 
                    onChange={HandleChanges} className={inputStyle('guarantor_address')} 
                    placeholder='Hoima'/>
                    <span className='text-[14px] text-red-500'>{t(errors.guarantor_address)}</span>


                  </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-bold text-red-600 border-b border-gray-200 pb-2">{t("terms")}</h3>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-gray-700 space-y-3 max-h-60 overflow-y-auto leading-relaxed">
                <p><strong>1. </strong>{t("term1")}</p>
                <p><strong>2. </strong>{t("term2")} </p>
                <p><strong>3. </strong>{t("term3")}</p>
                <p><strong>4. </strong>{t("term4")} </p>
                <p><strong>5. </strong>{t("term5")} </p>
              </div>
              <div className="pt-4 mt-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input type="checkbox"
                   checked={acceptterms}
                   onChange={(e)=>{setaccepted(e.target.checked),setacceptTermsmessage(null)}}
                  className={`mt-1 h-4 w-4 rounded text-blue-600 border-gray-300`}/>
                  <span className="text-sm text-gray-600 font-medium">
                   {t("agreeTerms")}
                  </span>
                </label>
                {acceptTermsMessage && 
                 <div className='px-6 text-[15px] text-red-500'>{acceptTermsMessage}</div>
                }
               
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-xl font-bold text-green-700 border-b border-gray-200 pb-2 mb-3">{t("loanApproval")}</h3>
              <div className={sectionGrid}>
                <div>
                  <label className={labelStyle}>{t("loanApproval")}:</label>
                  <input type="text" name='cashier_name' onChange={HandleChanges} className={inputStyle('cashier_name')} placeholder="Cashier's Name"/>
                    <span className='text-[14px] text-red-500'>{t(errors.cashier_name)}</span>
                
                </div>
                <div>
                  <label className={`${labelStyle} capitalize`} >{t("installment")}:</label>
                  <input type="text" name='installment'
                   onChange={HandleChanges} className={`${inputStyle('installment')} uppercase`} 
                   placeholder='10000'/>
                    <span className='text-[14px] text-red-500'>{t(errors.installment)}</span>

                </div>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6  flex justify-between items-center">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-5 py-2 rounded-sm text-sm font-semibold transition-all ${
                currentStep === 1 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
              }`}
            >
              {t("previous")}
            </button>

            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={nextStep}
                className={`px-6 py-2 bg-blue-500  hover:bg-blue-600 cursor-pointer
                 text-white rounded-sm text-sm font-semibold transition-all shadow-md disabled:cursor-not-allowed`}
              >
                {t("nextStep")}
              </button>
            ) : (
              <button
                     
              onClick={HandleSubmitForm}
                type="submit"
                className="px-6 py-2 bg-green-600 hover:bg-green-700 cursor-pointer
                 text-white rounded-sm text-sm font-semibold transition-all shadow-md"
              >
                {t("submitForm")}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default New_client;




