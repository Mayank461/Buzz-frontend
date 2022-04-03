import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import Navbar from './Navbar';

export default function Feeds() {
  const [user,setUser] = useState({});
  useEffect(() => {
    axios
      .get(`${API_URL}/user/getUser`, { withCredentials: true })
      .then((res) => {setUser(res.data[0]);
        console.log(user)})
      .catch((err) => console.log(err.message));
  },[]);
  function logout() {
    axios
      .get(`${API_URL}/auth/logout`, { withCredentials: true })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  }
  return (
    <>
      <div style={{ backgroundColor: '#F0F2F5' }}>
        <div className="container mt-2">
          <div className="row">
            {/* column 1st  */}
            <div className="col-md-3 ">
              <div className="card p-5 shadow-lg p-3 mb-5 bg-body rounded border-0">
                <div className="d-flex justify-content-center">
                  <img
                    src={user.picture_url}
                    className="card-img-top profile-pic  round-img"
                    alt="..."
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title text-center">{user.firstname+ " " +user.lastname}</h5>
                  <p className="card-text text-center">Newly Recruit at TTN</p>
                  <div className="d-flex justify-content-between mt-4">
                    <div>
                      <div className="text-center">234</div>
                      <div>Profile Views</div>
                    </div>
                    <div className="vr border"></div>
                    <div>
                      <div className="text-center">10</div>
                      <div>Post</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* column 2nd  */}
            <div className="col-md-6  scroll-mid ">
              <div className="card p-3 mb-3 shadow p-3 mb-5 bg-body rounded border-0">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="">
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic  round-img"
                      alt="..."
                    />
                  </div>
                  <div>
                    <div className="d-flex align-items-center ms-2 round-img border rounded-circle icon-bg text-dark p-2">
                      <i className="fa-solid fa-ellipsis"></i>
                    </div>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1511370235399-1802cae1d32f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1455&q=80"
                  className="card-img-top rounded-3"
                  alt="..."
                />
                <div className="">
                  <div className="d-flex justify-content-between mt-2">
                    <div className="d-flex">
                      <div>
                        <i className="fa-solid fa-thumbs-up bg-primary round-img text-white p-1 me-2"></i>
                        266
                      </div>
                      <div>
                        <i className="fa-solid fa-heart bg-danger text-white round-img p-1 ms-2 me-2 "></i>
                        306
                      </div>
                    </div>
                    <div>1 commment</div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-3 border-top border-bottom p-2">
                  <div>
                    <i className="fa-regular fa-thumbs-up me-2"></i>Like
                  </div>
                  <div>
                    <i className="fa-regular fa-thumbs-down me-2"></i>Dislike
                  </div>
                  <div>
                    <i className="fa-regular fa-message me-2"></i>Comment
                  </div>
                </div>
                <div className="d-flex mt-3">
                  <img
                    src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                    className="card-img-top small-round-pic me-2  round-img"
                    alt="..."
                  />

                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id=""
                    placeholder="Write a comment..."
                  />
                </div>
              </div>

              <div className="card p-3 shadow p-3 mb-5 bg-body rounded border-0">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="">
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic  round-img"
                      alt="..."
                    />
                  </div>
                  <div>
                    <div className="d-flex align-items-center ms-2 round-img border rounded-circle icon-bg text-dark p-2">
                      <i className="fa-solid fa-ellipsis"></i>
                    </div>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1511370235399-1802cae1d32f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1455&q=80"
                  className="card-img-top rounded-3"
                  alt="..."
                />
                <div className="">
                  <div className="d-flex justify-content-between mt-2">
                    <div className="d-flex">
                      <div>
                        <i className="fa-solid fa-thumbs-up bg-primary round-img text-white p-1 me-2"></i>
                        266
                      </div>
                      <div>
                        <i className="fa-solid fa-heart bg-danger text-white round-img p-1 ms-2 me-2 "></i>
                        306
                      </div>
                    </div>
                    <div>1 commment</div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-3 border-top border-bottom p-2">
                  <div>
                    <i className="fa-regular fa-thumbs-up me-2"></i>Like
                  </div>
                  <div>
                    <i className="fa-regular fa-thumbs-down me-2"></i>Dislike
                  </div>
                  <div>
                    <i className="fa-regular fa-message me-2"></i>Comment
                  </div>
                </div>
                <div className="d-flex mt-3">
                  <img
                    src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                    className="card-img-top small-round-pic me-2  round-img"
                    alt="..."
                  />

                  <input
                    type="text"
                    className="form-control rounded-pill"
                    id=""
                    placeholder="Write a comment..."
                  />
                </div>
              </div>
            </div>
            {/* column 3rd  */}
            <div className="col-md-3 side-height">
              <div className=" border p-2 scroll bg-white shadow-lg p-3 bg-body rounded border-0">
                <div className="d-flex justify-content-between">
                  <div>Contacts</div>
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
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>
              </div>

              <div className=" border p-2 scroll mt-3 bg-white shadow-lg p-3  bg-body rounded border-0">
                <div className="d-flex justify-content-between">
                  <div>Contacts</div>
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
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>

                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1507438222021-237ff73669b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80"
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    Prashant Mishra
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
