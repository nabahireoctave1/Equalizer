8

const Add_Pictures =()=>{
    return(
        <div className="">
            <div className="flex flex-col">
                <span>Names</span>
                <input type="text" placeholder="Webale precious" />

            </div>
            <div className="">
                <span>Client Picture</span>
                <input type="file" name="" id="" placeholder="Client Picture"/>
                
            </div>
            <div className="">
                <span>Guarantor Picture</span>
                <input type="file" name="" id="" placeholder="Guarator Picture"/>
                
            </div>
            <div className="">
                <span>security Picture</span>
                <input type="file" name="" id="" placeholder="Security Picture"/>
                
            </div>
            <div className="">
                <button className="bg-blue-500 px-5 py-2 rounded-md">Save</button>
            </div>
 
        </div>
    )

}
export default Add_Pictures;