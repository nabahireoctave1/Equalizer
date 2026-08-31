import React from 'react'
function Loader1() {
  return (
     <div className="border bg-white  flex flex-col sm:flex-row
        md:justify-between p-4 rounded-xs border-gray-100 m-1">
          <div className="flex gap-1 items-center">
            <div>
              <div className='p-3 bg-gray-200 rounded-full w-fit animate-pulse'></div>
            </div>
            <div className='space-y-1'>
               <div className="flex bg-gray-200 py-2 h-2 w-80 animate-pulse rounded-sm"></div>
             <div className="flex bg-gray-200 py-2 h-2 w-50 animate-pulse rounded-sm"></div>
           </div>

        </div>
        <div className="flex justify-center items-center pt-3 gap-2">
         {[1,2,3,4].map((i)=>{
          return <div key={i} >
          <div className="border py-3.5 px-7 rounded-xs border-gray-100 bg-gray-100 animate-pulse "></div>
          </div>
         })}
        </div>
          
        </div>
  )
}

export default Loader1