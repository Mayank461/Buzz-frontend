import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';

export default function Selfprofile() {
    const [inputs,setInputs] = useState({
        firstname:"",
        lastname:"",
        designation:"",
        mywebsite:"",
        gender:"",
        birthday:"",        
        city:"",
        state:"",
        zip:""
    });
    const OnInputChange = e=>{       
        setInputs({...inputs,[e.target.name]:e.target.value})  
 
     }; 
    const onSub = async (e) => {
        e.preventDefault();
        await axios.post(`${API_URL}/user/updateUser`, inputs)    

    }
    const [user,setUser] = useState({});
    //data fatch
  useEffect(() => {
    axios
      .get(`${API_URL}/user/getUser`, { withCredentials: true })
      .then((res) => {setUser(res.data[0]);
        console.log(user)})
      .catch((err) => console.log(err.message));
  },[]);
  return (
    <div style={{backgroundColor:"#F0F2F5"}}>
      
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-9 bg-white">
              <div className="position-relative">
              <img src="https://images.unsplash.com/photo-1495277493816-4c359911b7f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80" className="coverpic" />            
              <img src={user.picture_url} className="profilepic"/>                
         
              </div>  
              <h1 className="mt-5">{user.firstname+ " " + user.lastname}</h1>          
            <div>
                <form onSubmit={e=>onSub(e)}>
             <div className="d-flex mt-5">
                 <div className="me-5">
                 <label htmlFor="floatingInput">First Name</label>
                 <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='firstname' placeholder="First Name" onChange={(e)=>OnInputChange(e)} />
                 </div>
                 <div>
                 <label htmlFor="floatingInput">Last Name</label>
                 <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='lastname' placeholder="Last Name" onChange={(e)=>OnInputChange(e)}/>
                 </div>                 
             </div>
             <div className="d-flex mt-3 ">
                     <div className="col-md-3 me-5">
                     <label htmlFor="floatingInput">Designation</label><br />
                     <select name="cars" id="cars" className="form-control">
                      <option value="volvo">select</option>
                      <option value="saab">Co-Founder</option>
                     <option value="mercedes">Software-Developer</option>
                     <option value="audi">Tech Support</option>
                     <option value="audi">HR-Depatment</option>
                </select>
                     </div>
                     <div className="ms-2">
                     <label htmlFor="floatingInput">My Website</label>
                     <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='mywebsite' placeholder="website" onChange={(e)=>OnInputChange(e)}/>
                     </div>
                 </div>
                 <div className="d-flex mt-3">
                 <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                   <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off" />
                   <label className="btn btn-outline-primary" htmlFor="btnradio1">Male</label>
                   <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
                   <label className="btn btn-outline-primary" htmlFor="btnradio2">Female</label> 
                  </div>                    
                     <div className="col-md-3 ms-5">
                     <label htmlFor="floatingInput">Birthday</label>
                     <input type="date" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                     </div>
                 </div>
                 <div className="d-flex mt-3">
                     <div className="me-5">
                     <label htmlFor="floatingInput">City</label>
                     <input type="text" className="form-control" id="exampleInputEmail1" name='city' aria-describedby="emailHelp" placeholder="City" onChange={(e)=>OnInputChange(e)}/>
                     </div>
                     <div className="d-flex w-25">
                     <div className="col-md-5">
                     <label htmlFor="floatingInput">state</label>
                     <select name="cars" id="cars" className="form-control">
                      <option value="volvo">Select</option>
                      <option value="saab">New Delhi</option>
                     <option value="mercedes">Utter-Pradesh</option>
                     <option value="audi">Bihar</option>
                </select>
                     </div>
                     <div className="ms-5">
                     <label htmlFor="floatingInput">Zip</label>
                     <input type="text" className="form-control" id="exampleInputEmail1" name='zip' aria-describedby="emailHelp" placeholder="Zip" onChange={(e)=>OnInputChange(e)} />
                     </div>
                     </div>                     
                 </div>  
                 <div className="d-flex mt-5">
                    <button type='submit' className="btn btn-primary me-3">Save</button>
                    <button className="btn border border-primary ">ResetAll</button> 
                    </div>       
                    </form>           
            </div>
          </div>
          {/**part for suggestion */}
          <div className="col-md-3 profile-sidebar">
          <div className=" border p-2 scroll bg-white shadow-lg p-3 bg-body rounded border-0">
                                <div className='d-flex justify-content-between'>
                                    <div>Sugesstion</div>
                                    <div>
                                        <div className='d-flex align-items-center ms-2 round-img border rounded-circle icon-bg  p-2'><i className="fa-solid fa-magnifying-glass-plus"></i></div>
                                    </div>
                                </div>

                                <div className='d-flex'>
                                    <div>
                                        <img src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" className="card-img-top small-round-pic me-2  round-img" alt="..." />
                                    </div>
                                    <div className='d-flex align-items-center'>Mayank Jaggi</div>
                                </div>

                                <div className='d-flex mt-2'>
                                    <div>
                                        <img src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" className="card-img-top small-round-pic me-2  round-img" alt="..." />
                                    </div>
                                    <div className='d-flex align-items-center'>Mayank Jaggi</div>
                                </div>
                                <div className='d-flex mt-2'>
                                    <div>
                                        <img src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" className="card-img-top small-round-pic me-2  round-img" alt="..." />
                                    </div>
                                    <div className='d-flex align-items-center'>Mayank Jaggi</div>
                                </div>
                                <div className='d-flex mt-2'>
                                    <div>
                                        <img src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" className="card-img-top small-round-pic me-2  round-img" alt="..." />
                                    </div>
                                    <div className='d-flex align-items-center'>Mayank Jaggi</div>
                                </div>

                                <div className='d-flex mt-2'>
                                    <div>
                                        <img src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" className="card-img-top small-round-pic me-2  round-img" alt="..." />
                                    </div>
                                    <div className='d-flex align-items-center'>Mayank Jaggi</div>
                                </div>
                                <div className='d-flex mt-2'>
                                    <div>
                                        <img src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" className="card-img-top small-round-pic me-2  round-img" alt="..." />
                                    </div>
                                    <div className='d-flex align-items-center'>Mayank Jaggi</div>
                                </div>
                                <div className='d-flex mt-2'>
                                    <div>
                                        <img src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" className="card-img-top small-round-pic me-2  round-img" alt="..." />
                                    </div>
                                    <div className='d-flex align-items-center'>Mayank Jaggi</div>
                                </div>
                                <div className='d-flex mt-2'>
                                    <div>
                                        <img src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" className="card-img-top small-round-pic me-2  round-img" alt="..." />
                                    </div>
                                    <div className='d-flex align-items-center'>Mayank Jaggi</div>
                                </div>
                                <div className='d-flex mt-2'>
                                    <div>
                                        <img src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" className="card-img-top small-round-pic me-2  round-img" alt="..." />
                                    </div>
                                    <div className='d-flex align-items-center'>Mayank Jaggi</div>
                                </div>


                                <div className='d-flex mt-2'>
                                    <div>
                                        <img src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" className="card-img-top small-round-pic me-2  round-img" alt="..." />
                                    </div>
                                    <div className='d-flex align-items-center'>Mayank Jaggi</div>
                                </div>


                                <div className='d-flex mt-2'>
                                    <div>
                                        <img src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" className="card-img-top small-round-pic me-2  round-img" alt="..." />
                                    </div>
                                    <div className='d-flex align-items-center'>Mayank Jaggi</div>
                                </div>
                                <div className='d-flex mt-2'>
                                    <div>
                                        <img src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80" className="card-img-top small-round-pic me-2  round-img" alt="..." />
                                    </div>
                                    <div className='d-flex align-items-center'>Mayank Jaggi</div>
                                </div>



                            </div>
            </div>          
        </div>
      </div>
    </div>
  );
}
