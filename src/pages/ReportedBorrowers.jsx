import { ChevronDown, ChevronLeft, ChevronRight, CircleX, Funnel, ShieldAlertIcon, ShieldCheck,XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import api from '../api';
import SkeletonCellLoader from './SkeletonCellLoader';
import NetworkError from './NetworkError';
function ReportedBorrowers() {

    const [data,setdata]=useState([]);
    const [messagekey,setmessakey]=useState(null);
    const [size,setsize]=useState(null)
    const [Loading,setLoading]=useState(null);
    const [networkError,setnetworkError]=useState(null);
    const [ismodelopen,setismodelopen]=useState({
      RejectModel:false,
      approvemodel:false
    });
    const [success,setsuccess]=useState(null);
    const [message,setmessage]=useState(null);
    const closemodel= ()=>setismodelopen({RejectModel:false,
        approvemodel:false
    })
   

 

  const FetchBorrowersFlaged =async()=>{
    setnetworkError(null)
    setmessakey(null)
    setLoading(true)
    try{  
        const res=await api.get('/client-flag');
         setdata(res?.data);

    }
    catch(err){
        if(!err.response){
            setnetworkError(true)
        }
        
     setmessakey(err.response?.data?.messagekey)
     setsize(err.response?.data?.size)

     
    }
    finally{
        setLoading(false)
    }
  }

  const handleretry= ()=>{
    FetchBorrowersFlaged();
  }



  useEffect(()=>{
    FetchBorrowersFlaged();

  },[])

  const Formatdate= (date)=>{
        if(!date) return null;

        return date.split('T')[0].split('-').reverse().join('-')

    }


    const [selectedDate, setSelectedDate] = useState('');

    const filteredData = data.filter(d => {
        return selectedDate === '' || Formatdate(d.date) === selectedDate;
    });


       const BorrowersPerpage=10;
    const [pages,setpages]=useState(1);
    const start= (pages-1)*BorrowersPerpage;
    const end= start+BorrowersPerpage
    const totalpages=Math.ceil(filteredData?.length/BorrowersPerpage)
    const peginateddata=filteredData?.slice(start,end); 
  

    const HandleNext= ()=>{
      if(pages<totalpages){
        setpages(pages+1)
      }
    }

    const HandlePrevious= ()=>{
      if(pages>1){
        setpages(pages-1)
      }
    }

    const RejectRequest= async (client_name)=>{
     try{
     const res= await api.put(`/reject-req/${client_name}`);
     if(res?.data?.success){
        setismodelopen({
            RejectModel:true,
            approvemodel:false
        });
        setmessage(res.data.messagekey);
        setsuccess(res.data.success);
        setsize(res.data.size);
     }     

     }
     catch(err){
        if(err.response){
             setmessage(err.response?.data.messagekey)
        setismodelopen({
            RejectModel:true,
            approvemodel:false
        })
        setsize(err.response.data?.size)
        setsuccess(err.response?.data?.success)
        }
      
        
        
     }
    }



    const HandlerequestApproval= async(client_name)=>{
        try{
       const res= await api.put(`request-approval/${client_name}`);

       if(res?.data?.success){
        setismodelopen({
            approvemodel:true,
            RejectModel:false
        })
        setmessage(res.data.messagekey)
        setsize(res.data.size);
        setsuccess(res.data.success)
       }

        }
        catch(err){
            setismodelopen({
                approvemodel:true,
                RejectModel:false
            })
         setmessage(err.response?.data?.messagekey)
        setsize(err.response?.data?.size);
        setsuccess(err.response?.data?.success)
        }
    }

    

    

    const {t}=useTranslation()

    function RejectToast({size,success,message,Onclose}) {
         
        return (
    
        <div className={`w-100 shadow-lg  ${success ? 'bg-white border-green-600':'bg-red-50 border-red-500'}   animate-bounce-once
        border p rounded-md px-2 py-5 top-2 right-6  z-100 fixed flex flex-col justify-end`}>
        <div className="flex gap-1 ">
          <span>
            <div className="p-3 rounded-full bg-red-600"></div>
          </span>
          <span>
             <h2 className={`font-bold text-[14px] uppercase text-red-600 `}>
              {success ?  t('rptb.reject_.success'):t('rptb.reject_.failed')}</h2>
          <p className={`text-[15px] text-gray-800 ${success ? 'italic':'italic'}`}>{t(message)}</p>
          </span>
        
        </div>
        <button onClick={closemodel} className="flex justify-end outline-none"> 
          <XIcon size={18}  className="text-red-500 cursor-pointer"/>
          </button>
    
        </div>
    
        )
    
        
      }


       function ApproveRequestModel({size,success,message,Onclose}) {
         
        return (
    
        <div className={`w-100 shadow-lg  ${success ? 'bg-white border-green-600':'bg-red-50 border-red-500'}   animate-bounce-once
        border p rounded-md px-2 py-5 top-2 right-6  z-100 fixed flex flex-col justify-end`}>
        <div className="flex gap-1 ">
          <span>
            {success ? <div className="p-3 rounded-full bg-green-500"></div>:
            <div className="p-3 rounded-full bg-red-500"></div>}
          </span>
          <span>
             <h2 className={`font-bold text-[14px] uppercase ${success ? 'text-green-600':'text-red-600'} `}>
              {success ? t('rptb.aprove.success'):t('rptb.aprove.failed')}</h2>
          <p className={`text-[15px] text-gray-800 ${success ? 'italic':'italic'}`}>{t(message)}</p>
          </span>
        
        </div>
        <button  onClick={closemodel} className="flex justify-end outline-none"> 
          <XIcon size={18}  className="text-red-500 cursor-pointer"/>
          </button>
    
        </div>
    
        )
    
        
      }


    return (
    <div className='min-h-screen'>
        <div className='sticky top-20 z-50 flex flex-col sm:flex-row p-4 justify-between
         gap-4 sm:gap-2 items-start sm:items-center bg-white'>
            <div className='flex gap-2 items-center'>
                <span className='bg-red-100  items-center text-red-600 rounded-md p-2'><ShieldAlertIcon size={40}/></span>
                <span>
                <h2 className=' text-lg md:text-xl lg:text-2xl font-extrabold uppercase text-gray-800'>{t('rptb.reportedBorrowers')}</h2>
                 <h2 className='text-[15px] text-gray-700 font-semibold'>{t('rptb.decisionTitle')}</h2>
                 </span>
            </div>
          
            <div className='flex flex-col sm:flex-row gap-2 items-stretch sm:items-center w-full sm:w-auto'>
               
                
                <span className='relative flex border items-center p-2 rounded-sm text-sm border-gray-200 w-full sm:w-auto bg-white'>
                    <Funnel size={15}/> 
                    <p className='ml-1 mr-1 text-gray-700'>
                        {selectedDate ? selectedDate :t('rptb.filter')}
                    </p> 
                    <ChevronDown size={15} className='ml-auto' />
                    
                    <select 
                        value={selectedDate}
                        disabled={messagekey||networkError}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className='absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed'
                    >
                        <option value="">{t('rptb.all')}</option>

                        {data.map((d,_idx)=>(
                        <option key={_idx} value={Formatdate(d.date)} >{Formatdate(d.date)}</option>
                        ))}
                        
                    </select>
                </span>
            </div>
        </div>
        <div className='m-1'>
            {networkError && <NetworkError HandleRetry={handleretry}/>}
            {ismodelopen.RejectModel&&  <RejectToast success={success} size={size}  message={message} Onclose={ismodelopen.RejectModel}/>}
            {ismodelopen.approvemodel&&<ApproveRequestModel success={success} size={size} message={message} Onclose={ismodelopen.approvemodel}/>}
        </div>
         {messagekey&&size===0 ? 
         <div className='flex items-center flex-col h-70 justify-center'>
            <span className='bg-blue-400 p-2 rounded-full'>
                <ShieldCheck size={60} className='text-white' />
            </span>
             <div className='flex flex-col items-center space-x-2'>     
             <h2 className='text-xl font-bold text-gray-800 '>{t(messagekey)}</h2> 
              <p className='text-[15px] mt-2' >{t('errors.flaged_borrowers_desc')}</p>
            </div>
 

         </div> :
         
         messagekey&&size===1 ? <div>
         <div className='bg-rose-50 border-red-500 border p-4 rounded-sm m-1'>
            <span>
                <CircleX size={45} className='text-red-500'/>
            </span>
            <h2 className='text-2xl text-red-500'>{t('errors.errorTitle')}</h2>
            <p className='text-[15px] italic'>{t(messagekey)}</p>
            <p className='text-[15px] italic'>{t('errors.error_desc')}</p>
              <div className='p-2 flex justify-end'>
            <button onClick={handleretry} className='bg-green-600 px-6 py-1.5 rounded-sm outline-none text-[15px] italic text-white
            cursor-pointer'>{t('errors.retry')}</button>
         </div>
         </div>
       
         </div>:
        <div className="mt-6 overflow-x-auto w-full">
          <table className="w-full border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 text-left text-gray-600 uppercase text-[11px] border-b border-gray-200">
                <th className="p-3">No</th>
                <th className="p-3">{t('rptb.borrowerNames')}</th>
                <th className="p-3">{t('rptb.reportedBy')}</th>
                <th className="p-3">{t('rptb.reason')}</th>
                <th className="p-3">{t('rptb.reportedDate')}</th>
                <th className="p-3">{t('rptb.status')}</th>
                <th className="p-3">{t('rptb.decision')}</th>
              </tr>
            </thead>

            <tbody>
                {Loading||networkError ? Array.from({length:5}).map((_,idx)=>(
                    <tr key={idx}>
                        <td className='p-3'><SkeletonCellLoader/></td>
                        <td className='p-3'><SkeletonCellLoader/></td>
                        <td className='p-3'><SkeletonCellLoader/></td>
                        <td className='p-3'><SkeletonCellLoader/></td>
                        <td className='p-3'><SkeletonCellLoader/></td>
                        <td className='p-3'><SkeletonCellLoader/></td>
                        <td className='p-3'><SkeletonCellLoader/></td>

                    </tr>
                )) :peginateddata.map((d, idx) => {
                    return <tr key={idx} className="border-t border-gray-100 cursor-pointer hover:bg-gray-50 transition">
                 <td className="p-3 text-gray-700 text-sm">
                    {idx + 1} 
                </td>
                <td className="p-3 text-gray-700 text-sm capitalize">
                {d.client_name}
                </td>
                <td className="p-3 capitalize text-gray-700 text-[14px]">
                    {d.reported_by}
                </td>
                <td className="p-3 first-letter:uppercase text-gray-700 text-[14px]">
                    {d.reason}
                </td>
                 <td className="p-3 text-gray-500 text-sm">
                    {Formatdate(d.date)}
                </td>
                <td className="p-3">
                  <span className={`${d.status==='pending' ? 'bg-yellow-300'
                     :d.status==='approved' ? 'bg-green-400':d.status==='rejected' ? 'bg-red-400':'bg-gray-100'} text-white 
                     capitalize  px-3 py-1 rounded-md text-xs font-medium`}>
                  {t(`rptb.${d.status}`)}
                  </span>
                </td>
                 <td className="p-3 flex items-center gap-2 text-white text-xs">
                   
                   <button onClick={(client_name)=>HandlerequestApproval(d.client_name)} 
                   disabled={d.status==='approved'||d.status==='rejected'}
                    className={`${d.status==='approved'|| d.status==='rejected' ? 'bg-gray-400  outline-none  cursor-not-allowed':'bg-blue-400 cursor-pointer'} 
                    p-1 px-2 rounded-sm outline-none  capitalize`}>{t('rptb.approve')}</button>
                  
                   <button
                   disabled={d.status.toLowerCase()==='approved'||d.status.toLowerCase()==='rejected'}
                   onClick={(client_name)=>RejectRequest(d.client_name)}  
                   className={`${d.status==='approved'
                   ||d.status==='rejected' ? 'bg-gray-400  outline-none cursor-not-allowed':'bg-red-400 cursor-pointer'}
                    p-1 px-2  rounded-sm  capitalize outline-none`}>{t('rptb.reject')}</button>
                </td>
              </tr>
                })}
            </tbody>
                    
          </table>
          
        </div>
         }
          <div className={`${filteredData?.length!==BorrowersPerpage ? 'hidden':'visible'} p-2 bg-white border border-gray-200 flex justify-between`}>
               <button
                disabled={pages===1}
               onClick={HandlePrevious} className='bg-gray-200 p-1 disabled:cursor-not-allowed rounded-sm text-gray-700 outline-none cursor-pointer border-gray-300 border'><ChevronLeft/></button> 
               <button disabled={pages===totalpages}
                onClick={HandleNext} className='bg-gray-200 p-1 disabled:cursor-not-allowed rounded-sm text-gray-700 outline-none cursor-pointer border-gray-300 border'><ChevronRight/></button> 

            </div>

    </div>
  )
}

export default ReportedBorrowers