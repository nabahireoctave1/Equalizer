const Expenses =()=>{
    return (
        <>
        <div className="">
            <div className="">
                <div className="">
               <span>These Are the Expenses List</span>
               <p>Import Expense Done Today</p>

                </div>
                <div className="">
                    {/* click On Add New To record Expese*/}
                    <span>Click on Add New To Record New Expenses</span>
                    {/* Add By looping when Clicked */}
                    <button>Add New</button>
                    <div className="">
                       <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                            </tr>
                            <tbody>
                                <tr>
                                    <td>Salary</td>
                                    <td>250000</td>
                                    <td>1/6/2026</td>
                                </tr>
                                 <tr>
                                    <td>Salary</td>
                                    <td>250000</td>
                                    <td>1/6/2026</td>
                                </tr>
                            
                                <tr>
                                    <td>Total</td>
                                    <td>9000000</td>
                                    <td>1/6/2026</td>
                                </tr>
                            </tbody>
                        </thead>
                       </table>
                    </div>
                </div>
            </div>
             
        </div>
        </>
    )
}
export default Expenses;