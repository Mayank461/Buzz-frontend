import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

export default function Navbar() {
    const [user,setUser] = useState({});
    useEffect(() => {
      axios
        .get(`${API_URL}/user/getUser`, { withCredentials: true })
        .then((res) => {setUser(res.data[0]);
          console.log(user)})
        .catch((err) => console.log(err.message));
    },[]);
  return (      
    <>
     <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <div>
                            <img className='logo' src='https://media-exp1.licdn.com/dms/image/C560BAQGjUZbDAenjbw/company-logo_200_200/0/1519888826511?e=2147483647&v=beta&t=sM05vxlPsnwreOwKwVd3W0Jd4RKx9NK7uJrUMVI2Rtw' />
                        </div>
                        <div className='d-flex position-relative'>
                            <div className=''>
                                <img src={user.picture_url}
                                className="card-img-top small-round-pic  round-img" alt="..." />

                            </div>
                            <div className='d-flex align-items-center ms-2'>{user.firstname+ " " + user.lastname}</div>
                            <div className='d-flex align-items-center ms-2 round-img border rounded-circle icon-bg text-dark p-2'><i className="fa-brands fa-facebook-messenger "></i></div>
                            <div className='d-flex align-items-center ms-2 round-img border rounded-circle icon-bg text-dark p-2 '>
                              <Link to="/selfProfile"><i className="fa-solid fa-user"></i></Link>  

                            </div>
                            <div className='round-img bg-danger p-1 text-white incoming position-absolute bottom-50 end-0'>1</div>
                        </div>
                    </div>
                </nav>
    </>
  )
}
