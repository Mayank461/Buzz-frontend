import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../config";

export default function Selfprofile(user) {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    designation: "",
    website: "",
    gender: "",
    birthday: "",
    city: "",
    state: "",
    zip: "",
  });
  const OnInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    // console.log(e.target.value)
  };

  // const [user, setUser] = useState({});

  useEffect(() => {
    // axios
    //     .get(`${API_URL}/user/getUser`, { withCredentials: true })
    //     .then((res) => {
    //         setUser(res.data[0]);
    //         console.log(user)
    //     })
    //     .catch((err) => console.log(err.message));

    console.log(user.user);
  }, []);

  const postData = async (e) => {
    e.preventDefault();
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
    const res = await fetch(`${API_URL}/users/updateUser/${user.user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    });
    const result = await res.json();
    if (result.status === 422 || !result) {
      console.log("success");
    } else {
      console.log("failed");
    }
  };

  const maleToggle = () => {
    document.getElementById("female").checked = false;
    document.getElementById("male").checked = true;
    document.getElementById("labelMale").className += " bg-success";
    document.getElementById("labelFemale").classList.remove("bg-success");
    const setMale = "Male";
    setInputs({ ...inputs, gender: setMale });
  };
  const femaleToggle = () => {
    document.getElementById("male").checked = false;
    document.getElementById("female").checked = true;
    document.getElementById("labelFemale").className += " bg-success";
    document.getElementById("labelMale").classList.remove("bg-success");
    const setFemale = "Female";
    setInputs({ ...inputs, gender: setFemale });
  };
  return (
    <div style={{ backgroundColor: "#F0F2F5" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-9 bg-white mt-3 p-2">
            <div className="position-relative">
              <img
                src="https://images.unsplash.com/photo-1495277493816-4c359911b7f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80"
                className="coverpic"
              />

              {"picture_url" in user.user ? (
                <img src={user.user.picture_url} className="profilepic" />
              ) : (
                <i className="fa-solid fa-user fa-5x profilepic  d-flex justify-content-center align-items-center bg-warning"></i>
              )}
            </div>
            <h1 className="mt-5">
              {user.user.firstname + " " + user.user.lastname}
            </h1>
            <div>
              <form method="POST">
                {/* 1st Row  */}
                <div className="row mt-4">
                  <div className="col-md-4 ">
                    <label htmlFor="floatingInput">First Name</label>
                    <input
                      type="text"
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
                      onChange={(e) => OnInputChange(e)}
                      className="form-control mt-2"
                    >
                      <option value="" disabled="true" selected="true">
                        Select Designation
                      </option>
                      <option value="Co-Founder">Co-Founder</option>
                      <option value="Software-Developer">
                        Software-Developer
                      </option>
                      <option value="Tech Support">Tech Support</option>
                      <option value="HR-Depatment">HR-Depatment</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="floatingInput">My Website</label>
                    <input
                      type="text"
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
                        onChange={(e) => OnInputChange(e)}
                        className="form-control mt-2"
                      >
                        <option value="" disabled="true" selected="true">
                          Select State
                        </option>
                        <option value="New Delhi">New Delhi</option>
                        <option value="Uttar Pradesh">Utter Pradesh</option>
                        <option value="Bihar">Bihar</option>
                      </select>
                    </div>
                    <div className="col">
                      <label htmlFor="floatingInput">Zip</label>
                      <input
                        type="text"
                        className="form-control mt-2"
                        id="exampleInputEmail1"
                        name="zip"
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
                    className="btn btn-primary me-3"
                    onClick={postData}
                  >
                    Save
                  </button>
                  <button className="btn border border-primary ">
                    ResetAll
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/**part for suggestion */}
          <div className="col-md-3 profile-sidebar mt-3">
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

              <div className="d-flex mt-2">
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
  );
}
