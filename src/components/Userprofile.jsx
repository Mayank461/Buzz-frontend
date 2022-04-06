import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import Navbar from './Navbar';

export default function Userprofile() {
  const [user,setUser] = useState({});
  useEffect(() => {
    axios
      .get(`${API_URL}/user/getUser`, { withCredentials: true })
      .then((res) => {setUser(res.data[0]);
        console.log(user)})
      .catch((err) => console.log(err.message));
  },[]);
  return (
    <div style={{ backgroundColor: "#F0F2F5" }}>
      <Navbar />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-9 bg-white">
            <div className="position-relative">
              <img
                src="https://images.unsplash.com/photo-1495277493816-4c359911b7f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80"
                className="coverpic"
              />
              <img
                src="https://wallpaperaccess.com/full/2213424.jpg"
                className="profilepic"
              />
            </div>
            <h1 className="mt-5">{user.firstname+ " " + user.lastname}</h1>
            <p>Mayank Jaggi is MEAN stack developer in TO THE NEW company. </p>
            <p>Kanpur . Uttper Pradesh . India . 234 Friend</p>
            <div className="d-flex">
              <button className="btn btn-primary me-3">
                <i>ADD FRIEND</i>
              </button>
              <button className="border boder-white">Visit Website</button>
            </div>
          </div>
          <div className="col-md-3 profile-sidebar">
            <div className=" border p-2 scroll bg-white shadow-lg p-3 bg-body rounded border-0">
              <div className="d-flex justify-content-between">
                <div>Sugesstion</div>
                <div>
                  <div className="d-flex align-items-center ms-2 round-img border rounded-circle icon-bg  p-2">
                    <i className="fa-solid fa-magnifying-glass-plus"></i>
                  </div>
                </div>
              </div>

              <div className="d-flex">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                    className="card-img-top small-round-pic me-2  round-img"
                    alt="..."
                  />
                </div>
                <div className="d-flex align-items-center">Mayank Jaggi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
