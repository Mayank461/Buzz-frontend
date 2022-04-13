import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import UserlistWidget from "./UserlistWidget";
import { ToastContainer, toast } from "react-toastify";

export default function Login({ fetchUser }) {
  async function handleGAuth(e) {
    e.preventDefault();
    window.open(`${API_URL}/auth/google`, '_self');
  }
  const [inputs, setInputs] = useState({
    userEmail: '',
    userPassword: '',
  });
  const OnInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const postLoginData = async (e) => {
    e.preventDefault();
    const { userEmail, userPassword } = inputs;

    if (userEmail == '' || userPassword == '')
      return toast.warning('Please fill the login details');

    if (userEmail.split('@')[1] !== 'tothenew.com')
      return toast.error('Only ToTheNew email can be used');

    axios
      .post(
        `${API_URL}/auth/login`,
        {
          username: userEmail,
          password: userPassword,
        },
        { withCredentials: true }
      )
      .then(() => {
        fetchUser();
      })
      .catch((err) => toast.error("Invalid Credentials"));
  };

  return (
    <>
      <div className=''>

        <div className="container ">
          <div className="d-flex justify-content-center align-items-center vh-100">
            <div className=" d-flex justify-content-center align-items-center row shadow-lg p-3 mb-5 bg-body rounded p-5 w-100 h-75 ">
              <div className="col-md-6">
                <div className="p-3">
                  <div className="d-flex justify-content-center">
                    <img
                      className="logo"
                      alt="logo"
                      src="https://media-exp1.licdn.com/dms/image/C560BAQGjUZbDAenjbw/company-logo_200_200/0/1519888826511?e=2147483647&v=beta&t=sM05vxlPsnwreOwKwVd3W0Jd4RKx9NK7uJrUMVI2Rtw"
                    />
                  </div>
                  <div className="text-center mt-3  font-family fw-bolder">
                    <h3>Enter your details and Start</h3>
                  </div>
                  <div className="text-center font-family ">
                    <h3>your journey with us</h3>
                  </div>
                  <div className="text-center font-family mt-5 text-muted">
                    Dont't stop you're proud
                  </div>
                  <div className="text-center mt-5">
                    <button
                      onClick={handleGAuth}
                      className="btn btn-lg google-button-clr rounded-pill  bg-transparent font-family font-size fw-bolder "
                    >
                      Sign In with Google
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <form method="POST">
                  <div className="p-3">
                    <h3 className=" text-center font-family fw-bolder">
                      Login To Your Account
                    </h3>
                    <input
                      type="email"
                      name="userEmail"
                      className="form-control border-0 border-bottom  mt-5"
                      onChange={(e) => OnInputChange(e)}
                      id="exampleFormControlInput1"
                      placeholder="TTN Email"
                    />
                    <input
                      type="password"
                      className="form-control border-0 border-bottom   mt-5"
                      name="userPassword"
                      onChange={(e) => OnInputChange(e)}
                      id="exampleFormControlInput1"
                      placeholder="Password"
                    />

                    <div className="text-center d-grid gap-1 mt-3">
                      <button
                        type="submit"
                        onClick={postLoginData}
                        className="btn btn-lg px-5  mt-3 rounded-pill signup-btn-clr font-family fw-bolder font-size"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer theme="colored" />
    </>
  );
}
