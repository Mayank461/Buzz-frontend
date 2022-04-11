import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import UserlistWidget from './UserlistWidget';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './Spinner';

export default function Selfprofile({ user, suggestFriend }) {
  const [toogle,setToogle] = useState(false);
  const [userdata,setUserData] = useState("");
  const [Refresh,setRfresh] = useState(0);
  const [inputs, setInputs] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    designation: user.designation,
    website: user.website,
    gender: user.gender,
    birthday: user.birthday,
    city: user.city,
    state: user.state,
    zip: user.zip,
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/users/${user._id}`, { withCredentials: true })
      .then((res) => {
        // console.log(res.data[0].posted_by.picture_url);
        setUserData(res.data.picture_url);  
        // console.log(res.data.picture_url);     
      })
      .catch((err) => console.log(err.message));
  },[Refresh]);

  const OnInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const postData = async (e) => {
    e.preventDefault();
    if(inputs.firstname== undefined || inputs.lastname=== undefined || inputs.gender=== undefined || inputs.birthday=== undefined)
    {
      toast.warn("Please fill the details");
    }
    else if(inputs.firstname== '' || inputs.lastname=== '' || inputs.gender=== '' || inputs.birthday=== '')
    {
      toast.warn("Please fill the details");
    }
    else{
      const {
        firstname,
        lastname,
        designation,
        website,
        gender,
        birthday,
        city,
        state,
        zip,
      } = inputs;
      console.log(inputs);
      const res = await fetch(`${API_URL}/users/updateUser/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          designation,
          website,
          gender,
          birthday,
          city,
          state,
          zip,
        }),
      }).then((res)=>{toast.success("data updated successfully")
    setRfresh(Refresh+1)
    }).catch((err)=>{toast.error('Something wents wrong!!!')})
      
      const result = await res.json();
      if (result.status === 422 || !result) {
        console.log('success');
      } else {
        console.log('failed');
      }
    }
   
  };

  const maleToggle = () => {
    document.getElementById('female').checked = false;
    document.getElementById('male').checked = true;
    document.getElementById('labelMale').className += ' bg-success';
    document.getElementById('labelFemale').classList.remove('bg-success');
    const setMale = 'Male';
    setInputs({ ...inputs, gender: setMale });
  };
  const femaleToggle = () => {
    document.getElementById('male').checked = false;
    document.getElementById('female').checked = true;
    document.getElementById('labelFemale').className += ' bg-success';
    document.getElementById('labelMale').classList.remove('bg-success');
    const setFemale = 'Female';
    setInputs({ ...inputs, gender: setFemale });


  };
  const reset = () => {
    setInputs({
      firstname: '',
      lastname: '',
      designation: '',
      website: '',
      gender: '',
      birthday: '',
      city: '',
      state: '',
      zip: '',
    })
  }
  const inputpic =(e) =>{
    // setImage(e.target.files[0]);  
    // console.log(image);
    setToogle(true); 
        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("upload_preset", "buzz-app-pic");
        data.append("cloud_name", "buzz-social-app");
        fetch("https://api.cloudinary.com/v1_1/buzz-social-app/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            fetch(`${API_URL}/posts/changeprofile`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                pic_url: data.url,
                user_id: user._id                
              }),
            }).then((r) => setRfresh(Refresh+1));
              
            toast.success("Picture change successfully"); 
            setToogle(false);
            
          })
          .catch((err) => {
            console.log(err);
          });
  }
  return (
    <>
    <div style={{ backgroundColor: '#F0F2F5' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-9 bg-white mt-3 p-2 shadow-lg  bg-body rounded">
          <div className="">
                <div className=''>
                <img
                  src="https://images.unsplash.com/photo-1495277493816-4c359911b7f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80"
                  className="coverpic"
                />
                </div>
                <div className='position-relative profilepic mid'>
                  <div className=''>
                  {'picture_url' in user ? (
                    <img src={userdata} className="profilepic" />
                  ) : (
                    <i className="fa-solid fa-user fa-5x profilepic d-flex justify-content-center align-items-center bg-warning"></i>
                  )}               
                  
                  </div>
                  
               <div className='position-absolute bottom-0 end-0'>
               {/* <i className="fa-solid fa-2x fa-camera me-1"></i> */}
               <input type='file' className='camera' onChange={(e) => {inputpic(e)}} />
               </div>
                
                </div>
                

              </div>
              <div className='d-flex '> 
                <div>
                <h1 className="mt-2">{user.firstname + ' ' + user.lastname}</h1>
                  </div> 
                  <div className='d-flex align-items-center'>
                  {toogle ? <Spinner></Spinner> : '' }
                    </div>         
              
             
              </div>
            
            
            <div>
              <form method="POST">
                {/* 1st Row  */}
                <div className="row mt-4">
                  <div className="col-md-4 ">
                    <label htmlFor="floatingInput">First Name</label>
                    <input
                      type="text"
                      value={inputs.firstname}
                      className="form-control mt-2"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="firstname"
                      placeholder="First Name"
                      onChange={(e) => OnInputChange(e)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="floatingInput">Last Name</label>
                    <input
                      type="text"
                      value={inputs.lastname}
                      className="form-control mt-2"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="lastname"
                      placeholder="Last Name"
                      onChange={(e) => OnInputChange(e)}
                    />
                  </div>
                </div>

                {/* 2nd Row  */}

                <div className="row mt-4">
                  <div className="col-md-4">
                    <label htmlFor="floatingInput">Designation</label>
                    <br />
                    <select
                      name="designation"
                      value={inputs.designation}
                      onChange={(e) => OnInputChange(e)}
                      className="form-control mt-2"
                    >
                      <option value="" disabled="true" selected="true">
                        Select Designation
                      </option>
                      <option value="Co-Founder">1.Co-Founder</option>
                      <option value="Co-Founder">2.Cheif-Technical-Officer</option>
                      <option value="Co-Founder">3.Cheif-finecial-officer</option>
                      <option value="Software-Developer">4.Software-Developer</option>
                      <option value="Tech Support">5.Tech Support</option>
                      <option value="HR-Depatment">6.HR-Depatment</option>
                      <option value="Account-Department">7.Account-Department</option>
                      <option value="Sales-Department">8.Sales-Department</option>
                      <option value="OTT-Department">9.OTT-Department</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="floatingInput">My Website</label>
                    <input
                      type="text"
                      value={inputs.website}
                      className="form-control mt-2"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="website"
                      placeholder="www.domain.com"
                      onChange={(e) => OnInputChange(e)}
                    />
                  </div>
                </div>

                {/* 3rd Row  */}
                <div className="row mt-4">
                  <div className="col-md-4">
                    <label htmlFor="floatingInput">Gender</label>
                    <div className="border p-1 mt-2">
                      <input
                        type="radio"

                        className="btn-check"
                        name="gender"
                        id="male"
                        onChange={(e) => OnInputChange(e)}
                        value="Male"
                      />
                      <label
                        className="btn border-success w-50 "
                        id="labelMale"
                        value="Male"
                        onClick={maleToggle}
                      >
                        Male
                      </label>

                      <input
                        type="radio"
                        className="btn-check"
                        name="gender"
                        id="female"
                        onChange={(e) => OnInputChange(e)}
                        value="Female"
                      />
                      <label
                        className="btn border-success w-50"
                        id="labelFemale"
                        value="Female"
                        onClick={femaleToggle}
                      >
                        Female
                      </label>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="floatingInput">Birthday</label>

                    <input
                      type="date"
                      className="form-control mt-2"
                      value={inputs.birthday}
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="birthday"
                      placeholder="website"
                      onChange={(e) => OnInputChange(e)}
                    />
                  </div>
                </div>

                {/* 4th Row  */}
                <div className="row mt-4">
                  <div className="col-md-4">
                    <label htmlFor="floatingInput">City</label>
                    <input
                      type="text"
                      value={inputs.city}
                      className="form-control mt-2"
                      id="exampleInputEmail1"
                      name="city"
                      aria-describedby="emailHelp"
                      placeholder="City"
                      onChange={(e) => OnInputChange(e)}
                    />
                  </div>
                  <div className=" d-flex col-md-4">
                    <div className="col">
                      <label htmlFor="floatingInput">state</label>
                      <select
                        name="state"
                        id="state"
                        value={inputs.state}
                        onChange={(e) => OnInputChange(e)}
                        className="form-control mt-2"
                      >
                        <option value="" disabled="true" selected="true">
                          Select State
                        </option>                        
                        <option value="Andaman and Nicobar (UT)">1.Andaman and Nicobar (UT)</option>
                        <option value="Andhra Pradesh">2.Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">3.Arunachal Pradesh</option>
                        <option value="Assam">4.Assam</option>
                        <option value="Chandigarh (UT)">5.Chandigarh (UT)</option>
                        <option value="Chhattisgarh">6.Chhattisgarh</option>
                        <option value="Dadra and Nagar Haveli (UT)">7.Dadra and Nagar Haveli (UT)</option>
                        <option value="Bihar">8.Bihar</option>
                        <option value="Daman and Diu (UT)">9.Daman and Diu (UT)</option>
                        <option value="Delhi">10.Delhi</option>
                        <option value="Goa">11.Goa</option>
                        <option value="Gujarat">12.Gujarat</option>
                        <option value="Haryana">13.Haryana</option>
                        <option value="Himachal Pradesh">14.Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">15.Jammu and Kashmir</option>
                        <option value="Jharkhand">16.Jharkhand</option>
                        <option value="Karnataka">17.Karnataka</option>
                        <option value="Kerala">18.Kerala</option>
                        <option value="Lakshadweep (UT)">19.Lakshadweep (UT)</option>
                        <option value="Madhya Pradesh">20.Madhya Pradesh</option>
                        <option value="Maharashtra">21.Maharashtra</option>
                        <option value="Manipur">22.Manipur</option>
                        <option value="Meghalaya">23.Meghalaya</option>
                        <option value="Mizoram">24.Mizoram</option>
                        <option value="Nagaland">25.Nagaland</option>
                        <option value="Orissa">26.Orissa</option>
                        <option value="Puducherry (UT)">27.Puducherry (UT)</option>
                        <option value="Punjab">28.Punjab</option>
                        <option value="Rajasthan">29.Rajasthan</option>
                        <option value="Sikkim">30.Sikkim</option>
                        <option value="Tamil Nadu">31.Tamil Nadu</option>
                        <option value="Telangana">32.Telangana</option>
                        <option value="Tripura">33.Tripura</option>
                        <option value="Uttar Pradesh">34.Uttar Pradesh</option>
                        <option value="Uttarakhand">35.Uttarakhand</option>
                        <option value="West Bengal">36.West Bengal</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="floatingInput">Zip</label>
                      <input
                        type="text"
                        className="form-control mt-2"
                        id="exampleInputEmail1"
                        name="zip"
                        value={inputs.zip}
                        aria-describedby="emailHelp"
                        placeholder="Zip"
                        onChange={(e) => OnInputChange(e)}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex mt-5">
                  <button
                    type="submit"
                    className="btn btn-success me-3"
                    onClick={postData}
                  >
                    Save
                  </button>
                  <div className="btn border border-primary " onClick={reset}>
                ResetAll
              </div>
                </div>
              </form>
             
            </div>
          </div>
          {/**part for suggestion */}
          <div className="col-md-3 profile-sidebar mt-0">
            <UserlistWidget
              title="Friends Sugesstion"
              friendList={suggestFriend}
            />
          </div>
        </div>
      </div>
    </div>
    <ToastContainer theme="colored" />
    </>
  );
}
