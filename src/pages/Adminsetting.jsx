import { ActivityIcon, Bell, BellDot, CircleCheck, 
  SaveIcon, Edit2, PlusCircle, Settings, ToggleLeft,
   ToggleRight, Save, CreditCard, Clock, Calendar1, Languages, AlertCircle, MonitorCog, 
   TriangleAlert,X,
   LoaderCircle} from 'lucide-react'
import React, { useEffect, useState} from 'react'
import EditCompany_info_model from './EditCompany_info_model'
import { useTranslation } from 'react-i18next'
import api from '../api'
import HandleErrormodel from './HandleErrormodel'
import Loader1 from './Loader1'
function AdminSetting() {
    const [isAutoNotifOpen, setIsAutoNotifOpen] = useState(true)
    const [isofficechargeopen, setisofficechargeopen] = useState(null)
    const [SelectofficeId,setofficeId]=useState(null);
    
    let [iscompanyinfoopened, setiscompanyinfoopen] = useState(false)
    const [Error, setErrors] = useState(null);
    const [ErrorTitle, setErrorTitle] = useState(null)
    const [officechargemessage,setofficechargemessage]=useState(null);
    const [officechargeError,setofficechargeError]=useState(null);
    const [office,setoffice]=useState([]);
    const [officeError,setofficeError]=useState(null);
    const [settingMessage,setsettingMessage]=useState(null)
const [title,settitle]=useState(null);
const [success,setsuccess]=useState(null);
const [skeletonloader,setskeletonloader]=useState(true)
    const [inputs, setinputs] = useState([
      { branch_id:'',branch_name:'', start_up: '', ending: '', office_interest: ''}
    ])
    
    let opencompanyinfomodel = (e) => { e.preventDefault(); setiscompanyinfoopen(true) }
    let closecompanyinfomodel = () => setiscompanyinfoopen(false)
    const [Loading,setLoading]=useState(false)
    const [validationError,setvalidationError]=useState({});
    const [ismodelopen,setismodelopen]=useState(false)
    const closemodel= ()=>{setismodelopen(false)};
    const { t } = useTranslation();
    
    const [setting, setsetting] = useState({
        grace_period: '',
        interest_percentage: '',
        overdue: '',
        payment_frequency: '',
        reminder: '',
        report_generetion_time: '',
        isenable:false,
        officeId:isofficechargeopen ? SelectofficeId:null
    })

    const HandleNewInputs = () => {
      if(inputs.length < 3){
        setinputs([...inputs, { start_up: '', ending: '', office_interest: '' }])
      }
    }

    const HandleRemoveInput = (index) => {
  setinputs((prevInputs) =>
    prevInputs.filter((_, i) => i !== index)
  );

  setvalidationError((prev) => {
    const newErrors = { ...prev };

    Object.keys(newErrors).forEach((key) => {
      if (key.startsWith(`officecharge[${index}]`)) {
        delete newErrors[key];
      }
    });

    return newErrors;
  });
};
    const HandleSettingChange = (e) => {
      const { name, value } = e.target;
      setsetting((prev) => ({
        ...prev,
        [name]: value
      }))

      setvalidationError((prev) => ({
        ...prev,
        [`setting.${name}`]: '' 
      }));
    }

    const HandleChange = (index, e) => {
      const { name, value } = e.target;
      setinputs((prevInputs) =>
        prevInputs.map((item, i) => i === index ? { ...item, [name]: value } : item)
      );
      setvalidationError((prev) => ({
        ...prev,
        [`officecharge[${index}].${name}`]: ''
      }));
    };

    const FetchCurrentSetting = async () => {
        try {
          const res = await api.get('/company-current-setting'); 
          let data = res.data;
        setinputs(
            data.map((item) => ({
                branch_id:item.branch_id,
                office_name:item.office_name,
                start_up: item.startup_amount,
                ending: item.end_amount,
                office_interest: item.office_interest
            }))
        );
          setsetting({
              disableloanapp: data[0].disable_loan_app,
              grace_period: data[0].grace_period,
              interest_percentage: data[0].interest_percentage,
              overdue: data[0].overdue,
              payment_frequency: data[0].payment_frequency,
              reminder: data[0].reminder,
              report_generetion_time: data[0].report_generetion_time,
              isenable: isofficechargeopen,
              officeId:SelectofficeId
              

          })

       setisofficechargeopen(data[0].isofficechargeenabled === 1);

        
          
        } catch (err) {
          setErrorTitle(err.response?.data?.title)
          setErrors(err.response?.data?.message);
        }finally{
          setskeletonloader(false)
        }
    }



    const ShowCompanyBranch= async()=>{
      try{
       const response= await api.get('/current-branch');
       setoffice(response.data);
if (response.data.length > 0) {
      setofficeId(response.data[0].branch_id);
    }


     
      }
      catch(err){
       setofficeError(err.response?.data?.message)
      }
    }

    

    useEffect(() => {
   FetchCurrentSetting();
  ShowCompanyBranch();

    }, [])


    useEffect(()=>{
   
       

      setsetting(prev=>({
        ...prev,
          isenable: isofficechargeopen,
          officeId:SelectofficeId

      }))

    },[isofficechargeopen,SelectofficeId])
    

    const HandleSaveALL = async () => {
        setLoading(true)
        setvalidationError({})

        const payload = {
            setting:setting,
            ...(isofficechargeopen ? { officecharge: inputs } : {officecharge: [] })
        }

        try {  
            const res = await api.post('/save-company-settings', payload);
            if(res.data.success===true){
              settitle(res.data.title);
              setsettingMessage(res.data.message)
              setsuccess(res.data.success);
              setismodelopen(true);
            }
        } catch (err) {
            const data = err.response?.data
            if (data?.errors) {
                setvalidationError(data.errors)
                return
            }
            setsettingMessage(err.response?.data?.message||err.message);
            setismodelopen(true);
        } finally {
            setLoading(false)
        }
    }



    const HandleofficechargeToggle=async()=>{
      const newvalue=!isofficechargeopen;
      setofficechargeError(null);
      setofficechargemessage(null);
      setisofficechargeopen(newvalue);

      try{
        const res= await api.put('/Handle-toggle-on-off-office-setting',{isofficechargeopen:newvalue});
        if(res.data.success){

        setofficechargemessage(res.data.message);

        setTimeout(() => {
          setofficechargemessage(null)
        },4000);

        }

      }
      catch(err){
        setofficechargeError(err.response.data.message||err.message);
        setisofficechargeopen(!newvalue);

      }
    }

    const iconSize = 27
    const cardStyle =`bg-white border border-gray-200 p-6 rounded-lg mb-6 transition-all hover:border-blue-300`
    
    const inputStyle = (field, isOfficeCharge = false, index = null) => {
      let hasError = false;
      if (isOfficeCharge && index !== null) {
        const errorKey = `officecharge[${index}].${field}`;
        const currentValue = inputs[index]?.[field];
        const hasBackendError = !!validationError[errorKey] && validationError[errorKey] !== '';
        const isEmpty = currentValue === undefined || currentValue === null || currentValue === '';
        hasError = hasBackendError || isEmpty;
      } else {
        const errorKey = `setting.${field}`;
        const currentValue = setting[field];
        const hasBackendError = !!validationError[errorKey] && validationError[errorKey] !== '';
        const isEmpty = currentValue === undefined || currentValue === null || currentValue === '';
        hasError = hasBackendError || isEmpty;
      }

      return `
        ${hasError
          ? 'border border-red-500 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100'
          : 'border-gray-200 outline-none focus:border-blue-400'}
        w-full bg-white border rounded-sm p-2 text-sm text-gray-700 transition-all
      `;
    };

    const manualymessageinput=`w-full bg-white border border-blue-400 focus:ring-1 outline-none  rounded-sm
     p-2 text-sm text-gray-700 transition-all `;
    const sectionHeading = 'flex items-center gap-3 text-lg font-extrabold text-gray-700'

    return (
        <div className='min-h-screen bg-gray-50 text-gray-700 pb-12'>
          
      { skeletonloader? 
     
 <Loader1/>
          :Error && (
                <div className='bg-orange-100 border p-3 border-red-300'>
                  <div className='sm:flex-row lg:flex gap-2 items-center'>
                    <span><TriangleAlert size={40} className=' text-red-600'/></span>
                    <span>
                      <h2 className='text-xl text-red-500 font-bold'>{ErrorTitle}</h2>
                      <p className='text-sm'>{Error}</p>
                    </span>
                  </div>
                </div>
             )}

            <div className='max-w-6xl mx-auto mt-10 px-6'>
                
                <div className={ cardStyle }>
                    <div className='mb-6'>
                        <h2 className={sectionHeading}>
                            <ActivityIcon size={iconSize} className="text-blue-400" />
                            {t('ads.manage_company_activity')}
                        </h2>
                    </div>

                    <div className='grid md:grid-cols-2 gap-6'>
                        <div className='space-y-4'>
                            <div className='p-3 rounded-lg border border-gray-100'>
                                <p className='text-[12px] uppercase flex items-center gap-2 text-gray-600'>
                                    <CircleCheck size={18} className="text-blue-300" />
                                     {setting.disableloanapp===0 ? t('ads.loan_is_disabled') : t('ads.disable_loans_application')}
                                </p>
                               <button className={`${setting.disableloanapp == 1 ? 'bg-rose-600': 'bg-blue-500'} 
                               px-3 py-1 w-45 mt-2 text-white rounded-sm font-semibold mx-6 cursor-pointer`}>
                                   {setting.disableloanapp ==1 ? t('ads.disable') : t('ads.enable')}
                          </button>
                            </div>
                        </div>

                        <div className='border-2 border-gray-50 p-4 rounded-xl flex justify-between items-center '>
                            <div>
                                <span className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>{t('ads.company_entity')}</span>
                                <p className='text-lg font-extrabold text-gray-800 uppercase'>Akea Finance</p>
                            </div>
                            <div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                                <Edit2 size={22} onClick={opencompanyinfomodel} className='text-blue-400 cursor-pointer' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='grid md:grid-cols-2 gap-6 mb-6'>
                    <div className={cardStyle}>
                        <h2 className='flex items-center gap-3 font-extrabold text-gray-700 mb-6 capitalize'>
                            <MonitorCog className='text-blue-400'/> {t('ads.workspace_configuration')}
                        </h2>
                        <div className='space-y-1 pb-2'>
                            <h2 className='font-bold uppercase text-xs'>{t('ads.report_generation_time')}</h2>
                            <input type='text' name='report_generetion_time' onChange={HandleSettingChange} placeholder='6:00 AM' value={setting.report_generetion_time} className={inputStyle('report_generetion_time')}/>
                               {validationError['setting.report_generetion_time'] ? 
                               (<p className='text-[13px]  text-red-400'>{validationError['setting.report_generetion_time']}
                               </p>) : (!setting.report_generetion_time && <p className='text-[12px] text-red-400'>
                                 Report generation time need to be configured !</p>)}
                        </div>
                       
                        <div className='space-y-1 py-6'>
                            <h2 className='font-bold uppercase text-xs'>{t('ads.add_branch')}</h2>
                               <button className='bg-blue-400 w-30 flex gap-2 text-sm cursor-pointer text-white rounded-md p-2'>
                                <PlusCircle size={17}/> {t('ads.branch')}
                               </button>
                        </div>
                    </div>

                    <div className={cardStyle}>
                        <h2 className='flex items-center gap-3 font-extrabold text-gray-700 mb-6'>
                            <Clock size={iconSize} className="text-blue-400" /> {t('ads.terms_penalties')}
                        </h2>
                        <div className='space-y-4'>
                            <div>
                                <label className='text-[12px] font-semibold text-gray-700 uppercase block mb-1.5'>{t('ads.default_interest_rate')}</label>
                                <input type="text" name='interest_percentage' onChange={HandleSettingChange} value={setting.interest_percentage} placeholder="0.00" className={inputStyle('interest_percentage')} />
                                {validationError['setting.interest_percentage'] ? 
                               (<p className='text-[13px]  text-red-400'>{validationError['setting.interest_percentage']}
                               </p>) : (!setting.interest_percentage && <p className='text-[12px] text-red-400'>
                                 Default interest rate need to be configured !</p>)}
                            </div>

                            <div>
                                <label className='text-[10px] font-black text-gray-700 uppercase block mb-1.5'>{t('ads.grace_period')}</label>
                                <input type="text" name='grace_period' onChange={HandleSettingChange} value={setting.grace_period} placeholder="5" className={inputStyle('grace_period')} />
                               {validationError['setting.grace_period'] ? 
                               (<p className='text-[13px] text-red-400'>{validationError['setting.grace_period']}
                               </p>) : (!setting.grace_period && <p className='text-[12px] text-red-400'>
                                 Grace period need to be configured !</p>)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cardStyle}>
                    <div className='flex  items-start mb-6'>
                        <h2 className={sectionHeading}>
                            <BellDot size={iconSize} className="text-blue-400" /> {t('ads.notifications')}
                        </h2>
                       
                    </div>

                    <div className='flex justify-between items-center p-4 border border-gray-100 rounded-xl mb-6 bg-gray-50/50'>
                        <h3 className='flex items-center gap-2 font-black text-gray-700'>
                            <Bell size={22} className="text-blue-400" />{t('ads.auto_notify')}
                        </h3>
                        
                        <button onClick={() => setIsAutoNotifOpen(!isAutoNotifOpen)}>
                            {isAutoNotifOpen ? <ToggleRight size={30} className="text-blue-400" /> 
                            : <ToggleLeft size={30} className="text-gray-300" />}
                        </button>
                    </div>

                    <div className='grid md:grid-cols-2 gap-4'>
                        {isAutoNotifOpen ? (
                            <>
                                <div>
                                    <label className='text-[10px] font-black text-gray-700 uppercase block mb-1.5'>{t('ads.reminder_message')}</label>
                                    <textarea name='reminder' onChange={HandleSettingChange} value={setting.reminder} className={`${inputStyle('reminder')} h-28 resize-none p-3`} placeholder={t('ads.reminder_message')}></textarea>
                                   {validationError['setting.reminder'] ? 
                               (<p className='text-[13px] text-red-400'>{validationError['setting.reminder']}
                               </p>) : (!setting.reminder && <p className='text-[12px] text-red-400'>
                                 Reminder message need to be configured !</p>)}
                                </div>
                                <div>
                                    <label className='text-[10px] font-black text-gray-700 uppercase block mb-1.5'>{t('ads.overdue_message')}</label>
                                    <textarea name='overdue' onChange={HandleSettingChange} value={setting.overdue}  className={`${inputStyle('overdue')} h-28 resize-none p-3`} placeholder={t('ads.overdue_message')}></textarea>
                                    {validationError['setting.overdue'] ? 
                               (<p className='text-[13px] text-red-400'>{validationError['setting.overdue']}
                               </p>) : (!setting.overdue && <p className='text-[12px] text-red-400'>
                                 Overdue message need to be configured !</p>)}
                                </div>
                            </>
                        ) : (
                            <div className='col-span-2'>
                                <label className='text-[10px] font-black text-gray-700 uppercase block mb-1.5'>{t('ads.manual_notify')}</label>
                                <textarea className={`${manualymessageinput} h-28 resize-none p-3`} 
                                placeholder={`${t('ads.enter_text')}`}></textarea>
                                 <div className='flex justify-between mt-2 '>
                                     <button className='bg-blue-400 py-2 rounded-sm 
                                     text-sm text-white px-4 first-letter:uppercase'>{t('ads.send_all')}</button>
                                     <div className='flex gap-2 text-sm'>
                                         <button className='bg-blue-400 py-2 rounded-sm text-sm text-white px-4 first-letter:uppercase'>{t('ads.specific_user')}</button>
                                         <select className='border border-gray-200 px-2 rounded-sm focus:ring-1 focus:ring-gray-300'>
                                             <option value="">james</option>
                                             <option value="">Keza jes</option>
                                             <option value="">john</option>
                                         </select>
                                     </div>
                                 </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className={`${cardStyle} mt-4 border border-gray-200 rounded-2xl p-5 bg-white shadow-sm`}>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div>
                      <h2 className="font-black uppercase tracking-tight text-gray-800 ">
                        {t('ads.set_office_charge')}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {t('ads.configure_office_charge_ranges')}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-500">{t('ads.off')}</span>
                      <button
                        onClick={HandleofficechargeToggle}
                        className={`transition-all cursor-pointer ${isofficechargeopen ? "text-blue-400" : "text-gray-400"}`}
                      >
                        {isofficechargeopen ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                      </button>
                      <span className="text-lg font-medium text-blue-500">{t('ads.on')}</span>
                    </div>
                   
                  </div>
                  <div className='flex items-center justify-center'>
                      {officechargemessage&&<p className='text-sm text-green-500'>
                      {officechargemessage}</p>}
                  </div>
                   <div className='flex items-center justify-center'>
                      {officechargeError&&
                      <p className='text-lg font-extrabold text-red-500'>
                      {officechargeError}</p>
             }
                  </div>
                  
                    
                  {isofficechargeopen ? (
                    <div className="space-y-6 mt-4">
                      <div className="mt-3">
                            <label className="block text-[13px] text-gray-700 mb-2">{t('ads.choose_branch')}</label>
                            <select 
                                  name='officeId'
                              value={setting.officeId}
                              onChange={(e) => {setofficeId(e.target.value)}}
                              className={inputStyle('officeId', true)} 
                            >
                            {office.length>0 ? 
                            office.map((off)=>{
                              return <option value={off.branch_id}>{off.branch_name}</option>
                            })
                            
                            :<option value={officeError}>{officeError}</option> 
                          }
                            </select>
                            {validationError[`setting.officeId`] ? (
                            <p className='text-[13px] text-red-400'>{validationError[`setting.officeId`]}</p>) 
                            : ( !setting.officeId && <p className='text-[12px] text-red-400'>No office choosen</p>)}
                          </div>
                      {Array.isArray(inputs) && inputs.map((item, index) => (
                        <div key={index} >
                          <div className='flex justify-between items-center'>

                          {index > 0 && <p className="text-xs font-bold text-blue-500 mb-2">Configuration
                          {''} {index + 1}</p>}
                            {index > 0 && (
                              <button type="button" onClick={() => HandleRemoveInput(index)}
                            className="p-1 rounded-full text-red-400 hover:bg-red-50
                             hover:text-red-600 transition-colors cursor-pointer"><X size={16} /></button>
)}
                          </div>

                          {(index===0||inputs[index-1]?.branch_id)&&(
                            <div>
                            <label className="block text-[14px] font-bold uppercase   text-gray-700 ">Branch name</label>

                            <input type="text" value={item?.office_name ? item.office_name :'No branch has configured office charge'} 
                            readOnly className="w-full first-letter:capitalized bg-gray-100/50 border
                             border-gray-300 rounded-sm p-2 text-sm text-gray-700 outline-none cursor-not-allowed"
        />
                            </div>
                          )}
                          
                          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          
                            <div>

                              <label className="block text-[13px] text-gray-700 mb-2">
                                {t('ads.startup_cash')}
                              </label>
                              <input
                                type="text"
                                placeholder="1000"
                                name='start_up'
                                value={item.start_up}
                                onChange={(e) => HandleChange(index,e)}
                                className={inputStyle('start_up', true, index)}
                              />
                              
                             {validationError[`officecharge[${index}].start_up`] ? (<p className='text-[13px] text-red-400'>{validationError[`officecharge[${index}].start_up`]}</p>) 
                             : (!item.start_up && <p className='text-[12px] text-red-400'>Start up cash need to be configured !</p>)}
                             </div>

                            <div>
                              <label className="block text-[13px] font-medium text-gray-700 mb-2">
                                {t('ads.ending_cash')}
                              </label>
                              <input
                                type="number"
                                placeholder="10000"
                                name='ending'
                                value={item.ending}
                                onChange={(e) => HandleChange(index,e)}
                                className={inputStyle('ending', true, index)}
                              />
                             {validationError[`officecharge[${index}].ending`] ? ( <p className='text-[13px] text-red-400'>{validationError[`officecharge[${index}].ending`]}</p>)
                              : (!item.ending && <p className='text-[12px] text-red-400'>Ending cash need to be configured !</p>)}
                            </div>
                          </div>

                          <div className="mt-3">
                            <label className="block text-[13px] text-gray-700 mb-2 uppercase">Office Interest %</label>
                            <input 
                              type="text" 
                              placeholder='10%'
                              name='office_interest'
                              value={item.office_interest}
                              onChange={(e) => HandleChange(index, e)}
                              className={inputStyle('office_interest', true, index)} 
                            />
                            {validationError[`officecharge[${index}].office_interest`] ? (
                            <p className='text-[13px] text-red-400'>{validationError[`officecharge[${index}].office_interest`]}</p>) 
                            : ( !item.office_interest && <p className='text-[12px] text-red-400'>Office interest need to be configured !</p>)}
                          </div>
                        </div>
                      ))}
                    
                      <div className="flex justify-end gap-3 pt-1">
                        <button
                          type="button"
                          onClick={HandleNewInputs}
                          className="px-5 py-1 rounded-md border text-sm cursor-pointer border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                        >
                           {t('ads.new')}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-5 bg-gray-50 border-gray-300 rounded-sm p-6 text-center">
                      <p className="text-sm text-red-400">
                        {t('ads.office_charge_disabled')}
                      </p>
                    </div>
                  )}
                </div>

                <div className={`${cardStyle} flex flex-col sm:flex-row
                 items-center justify-between bg-white `}>
                    <div className='flex gap-2' >
                      <span>     <Calendar1 className='text-blue-500'/></span>
                      <span>
                        <p className='font-black uppercase tracking-tight text-gray-800 '>
                       {t('ads.payment_frequency')}</p>
                        <p className='text-xs text-gray-700 tracking-wide'>{t('ads.set_payment_frequency')}</p>
                    </span>
                    </div>

                    <div>
                        <select name='payment_frequency' onChange={HandleSettingChange} 
                        value={setting.payment_frequency} className={`${!setting.payment_frequency ? 'border-red-400':'border-gray-300'} bg-white w-full md:w-50 text-gray-700 border  p-2 text-xs m-2 rounded-md outline-none cursor-pointer`}>
                            <option>{t('ads.daily')}</option>
                            <option>{t('ads.weekly')}</option>
                            <option>{t('ads.monthly')}</option>
                        </select>
                        {validationError[`setting.payment_frequency`] ? (<p className='text-[13px] text-red-400 mx-3'>{validationError[`setting.payment_frequency`]}</p>) 
                        : (!setting.payment_frequency && <p className='text-[12px] text-red-400 mx-3'>Please choose payment frequency </p>)}
                    </div>
                </div>

                <div className='flex justify-end p-4'>
                    <button onClick={HandleSaveALL} className='bg-blue-400 py-2 px-4
                     text-white cursor-pointer text-sm flex gap-2 rounded-sm outline-none'>
                 {Loading ? <span className='flex items-center justify-center gap-2'>
                          <LoaderCircle size={20} className='animate-spin'/>{t('ads.saving')}</span>:<span className='flex items-center justify-center gap-2'><SaveIcon size={20}/> {t('ads.save_all')} </span>}
                    </button>
                </div>
            </div>

             {iscompanyinfoopened && (
                <div className='fixed inset-0 z-50 '>
                   <EditCompany_info_model onclose={closecompanyinfomodel}/> 
                </div>
             )}
             {ismodelopen &&<HandleErrormodel success={success}  onClose={closemodel} message={settingMessage}/>}
        </div>
    )
}

export default AdminSetting;