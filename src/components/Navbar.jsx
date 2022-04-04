import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

export default function Navbar() {
  const [user, setUser] = useState({});
  useEffect(() => {
    axios
      .get(`${API_URL}/user/getUser`, { withCredentials: true })
      .then((res) => {
        setUser(res.data[0]);
        console.log(user);
      })
      .catch((err) => console.log(err.message));
  }, []);

  function handleLogout() {
    window.open(`${API_URL}/auth/logout`, '_self');
  }
  return (
    <>
      <nav className="navbar navbar-light bg-light p-0">
        <div className="container-fluid">
          <div>
            <Link to={'/'}>
              <img
                className="logo"
                src="https://mma.prnewswire.com/media/728150/TO_THE_NEW_Logo.jpg?p=facebook"
              />
            </Link>
          </div>
          <div className="d-flex position-relative">
            <Link to='/profile' className='nav-link text-dark'>
            <div className='d-flex'>
            <div className="">
              <img
                src={user.picture_url}
                className="card-img-top small-round-pic  round-img"
                alt="..."
              />
            </div>
            <div className="d-flex align-items-center ms-2">
              {user.firstname + ' ' + user.lastname}
            </div>
            </div>
            </Link>
          
            <div className="d-flex align-items-center ms-2 round-img border rounded-circle icon-bg text-dark p-2">
              <i className="fa-brands fa-facebook-messenger "></i>
            </div>
            <div className="position-relative d-flex">
              <div className="d-flex align-items-center ms-2 round-img border rounded-circle icon-bg text-dark p-2 ">
             
                  <i className="fa-solid fa-user"></i>
             
              </div>
              <div className="round-img bg-danger p-1 text-white incoming position-absolute bottom-50 end-0">
                1
              </div>
            </div>
            <div
              onClick={handleLogout}
              className="d-flex align-items-center ms-2 round-img border rounded-circle icon-bg text-dark p-2 pointer"
            >
              <i className="fa fa-sign-out "></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
