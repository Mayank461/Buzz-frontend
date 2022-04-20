import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function AdminLogin(count) {

    // useEffect(()=>{
    //     console.log(process.env.MONGO_URI);
    // })

    const [inputs, setInputs] = useState({
        adminEmail: '',
        adminPassword: '',
      });
      const OnInputChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
      };
    //  const adminLog=()=>{
    //      if(inputs.adminEmail==="prashant" && inputs.adminPassword==="prashant")
    //      {
              
       
    //      }
    //      else{
           
    //      }
    //  }
  return (
    <>
<div className='container '>
<div className="mb-3 mt-5">
  <label for="exampleFormControlInput1" className="form-label">Email address</label>
  <input type="email" className="form-control" name='adminEmail'  onChange={(e) => OnInputChange(e)} id="exampleFormControlInput1" placeholder="name@example.com"/>
</div>
<div className="mb-3">
  <label for="" className="form-label">Password</label>
  <input type="text" className="form-control" name='adminPassword'   onChange={(e) => OnInputChange(e)} id="" />
</div>
<div>
    <Link to="/admin" className='btn btn-danger'>Login</Link>
</div>
</div>

      
    </>
  )
}
