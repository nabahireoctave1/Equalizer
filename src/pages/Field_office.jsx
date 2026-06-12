import { Eye, UserCog } from 'lucide-react'
import { Ban, Pencil, Trash } from "lucide-react";
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Field_officers_Activity from './Field_officers_Activity';

function Field_office() {

  const [openactivity,setOpenactivity]=useState(false)

  const [selectedOfficer,setSelectedOfficer]=useState(null)


  const openactivitymodel=(officer)=>{
    setSelectedOfficer(officer)
    setOpenactivity(true)
  }


  const closeactivity=()=>{
    setOpenactivity(false)
    setSelectedOfficer(null)
  }


  const {t}=useTranslation()



  const [data,setData]=useState([
    {names:'John Doe',location:'Bunyoro',phone:'250 788 000 000',branch:'Rubavu live stock Hub',status:'active'},
    {names:'Alice Smith',location:'hoyima',phone:'250 789 000 000',branch:'akea service',status:'suspended'},
    {names:'cyusa Eddy',location:'kampala',phone:'26078453566467',branch:'kigali tech',status:'active'},
    {names:'steven lorence',location:'mubende',phone:'26078596564754',branch:'Alpha tech01',status:'active'},
  ])



  const [editIndex,setEditIndex]=useState(null)

  const [editData,setEditData]=useState({})



  const statusbadge=(status)=>{

    switch(status){

      case 'active':
        return 'bg-blue-500 text-white';

      case 'suspended':
        return 'bg-red-500 text-white';

      default:
        return 'bg-gray-100 text-gray-700'

    }

  }




  const editRow=(index)=>{

    setEditIndex(index)

    setEditData(data[index])

  }




  const handleChange=(e)=>{

    setEditData({

      ...editData,

      [e.target.name]:e.target.value

    })

  }




  const saveEdit=()=>{

    const updated=[...data]

    updated[editIndex]=editData

    setData(updated)

    setEditIndex(null)

  }




return (

<div className='bg-gray-50 h-full'>


<div className='bg-white p-2 border-b border-gray-200'>


<div className='flex gap-2 items-center'>


<span className='bg-blue-400 p-2 rounded-full'>

<UserCog size={30} className='text-white'/>

</span>


<h2 className='text-2xl uppercase font-extrabold text-gray-800'>

{t('c.field_officers')}

</h2>


</div>


</div>





<div className="mt-6 px-4 overflow-x-auto w-full">


<table className="w-full border-collapse whitespace-nowrap">



<thead>

<tr className="bg-gray-50 text-left text-gray-600 uppercase text-[11px] border-b border-gray-200">

<th className="p-3">{t('c.no')}</th>
<th className="p-3">{t('c.names')}</th>
<th className="p-3">{t('location')}</th>
<th className="p-3">{t('c.phone')}</th>
<th className="p-3">{t('c.branch')}</th>
<th className="p-3">{t('c.status')}</th>
<th className="p-3">{t('c.activity')}</th>
<th className="p-3">{t('c.manage')}</th>

</tr>

</thead>





<tbody>


{data.map((c,idx)=>(


<tr 
key={idx}
className="border-t  text-sm border-gray-100 hover:bg-gray-50 transition"
>


<td className="p-3">
{idx+1}
</td>




<td className="p-3 capitalize">


{
editIndex===idx ?

<input
name="names"
value={editData.names}
onChange={handleChange}
className="border border-gray-200 rounded p-2"
/>

:

c.names

}


</td>






<td className="p-3">


{
editIndex===idx ?

<input
name="location"
value={editData.location}
onChange={handleChange}
className="border border-gray-200 rounded p-2"
/>

:

c.location

}


</td>






<td className="p-3">


{
editIndex===idx ?

<input
name="phone"
value={editData.phone}
onChange={handleChange}
className="border border-gray-200 rounded p-2"
/>

:

c.phone

}


</td>






<td className="p-3">


{
editIndex===idx ?

<input
name="branch"
value={editData.branch}
onChange={handleChange}
className="border border-gray-200 rounded p-2"
/>

:

c.branch

}


</td>






<td className="p-3">


<span className={`${statusbadge(c.status)} px-3 py-1 rounded text-xs`}>

{t(`c.${c.status}`)}

</span>


</td>






<td className="p-3">


<button className='mx-5 cursor-pointer'

onClick={()=>openactivitymodel(c)}

>

<Eye size={18} className="text-gray-700 hover:text-blue-400"/>

</button>


</td>






<td className="p-3 flex gap-2">



{

editIndex===idx ?


<button

onClick={saveEdit}

className="bg-green-500 cursor-pointer text-white px-4 py-1 rounded"

>

Save

</button>



:


<button

onClick={()=>editRow(idx)}

className="p-1 cursor-pointer bg-blue-50 rounded"

>

<Pencil size={18} className="text-blue-400"/>

</button>


}




<button className='cursor-pointer'>

<Ban size={18}/>

</button>



<button className='cursor-pointer'>

<Trash size={18}/>

</button>



</td>




</tr>


))}


</tbody>



</table>


</div>





{
openactivity && selectedOfficer &&

<div className="fixed inset-0 z-50 w-full h-screen p-2 md:p-4 lg:p-8   bg-black/90 dropblur-sm">

<Field_officers_Activity

Onclose={closeactivity}

name={selectedOfficer.names}

branch={selectedOfficer.branch}

/>


</div>

}



</div>


)

}


export default Field_office