import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { API_URL } from "../config";
import Post from "./Post";
import UserlistWidget from "./UserlistWidget";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Feeds(user) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [userData, setUserData] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    console.log(userData.picture_url)
    loaduser();
    // console.log(user.user.friends.myFriends);
    axios
      .get(`${API_URL}/posts/getPost`, { withCredentials: true })
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [refresh]);

  const loaduser = () => {
    setUserData(user.user);

    setFriendList(user.user.friends.myFriends);
  };
  function logout() {
    axios
      .get(`${API_URL}/auth/logout`, { withCredentials: true })
      .then((res) => console.log(res.data[1]))
      .catch((err) => console.log(err.message));
  }

  const Inlike = (id) => {
    axios
      .post(
        `${API_URL}/posts/like`,
        {
          post_id: id,
        },
        { withCredentials: true }
      )
      .then((res) => setRefresh(refresh + 1))
      .catch((err) => console.log(err.message));
  };
  const unlike = (id) => {
    axios
      .post(
        `${API_URL}/posts/unlike`,
        {
          post_id: id,
        },
        { withCredentials: true }
      )
      .then((res) => setRefresh(refresh + 1))
      .catch((err) => console.log(err.message));
  };
  const commentBox = (id, message) => {
    axios
      .post(
        `${API_URL}/posts/comment`,
        {
          post_id: id,
          comment: message,
        },
        { withCredentials: true }
      )
      .then((res) => setRefresh(refresh + 1))
      .catch((err) => console.log(err.message));
  };
  const reportPost = (id) => {
    // console.log(id)
    axios
      .post(
        `${API_URL}/posts/report`,
        {
          post_id: id,

        },
        { withCredentials: true }
      )
      .then((res) => {
        setRefresh(refresh + 1)
        toast("Reported Successfully");
      })
      .catch((err) => console.log(err.message));
  };
  const postDetails = () => {
    const commentBox = document.getElementById('comment-box').value
    const file = document.getElementById('file').value

    // checking validation in post field 
    if (commentBox === "" && file === "") {
   
      toast.warn('Please give atleast one input');
    }
    // checking atleast one input is given or not 
    else if (commentBox === "" || file === "") {
      //  if only caption is given from user 
      if (commentBox !== "") {
        fetch(`${API_URL}/posts/userPost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({

            caption: title,
            user_id: userData._id,
          }),
        }).then((r) => setRefresh(refresh + 1));
        toast.success("Your post uplaoded successfully");
      }
      // if only picture is given from user side 
      else {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "buzz-app");
        data.append("cloud_name", "buzz-social-app");
        fetch("https://api.cloudinary.com/v1_1/buzz-social-app/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            fetch(`${API_URL}/posts/userPost`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                pic_url: data.url,
                user_id: userData._id,
              }),
            }).then((r) => setRefresh(refresh + 1));
            toast.success('Post uploaded successfully')
            // setCheck([...check, { post_url: url, post_caption: title }]);
            setTitle("");
            document.getElementById("file").value = "";
          })
          .catch((err) => {
            console.log(err);
          });
      }

    }

    // if both caption and picture  inputs are given in post
    else {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "buzz-app");
      data.append("cloud_name", "buzz-social-app");
      fetch("https://api.cloudinary.com/v1_1/buzz-social-app/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch(`${API_URL}/posts/userPost`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pic_url: data.url,
              caption: title,
              user_id: userData._id,
            }),
          }).then((r) => setRefresh(refresh + 1));
          // alert("Your post uplaoded successfully");
          toast.success("Your post uplaoded successfully");
          // setCheck([...check, { post_url: url, post_caption: title }]);
          setTitle("");
          document.getElementById("file").value = "";
        })
        .catch((err) => {
          console.log(err);
        });
    }

  };
  return (
    <>
      <div style={{ backgroundColor: "#F0F2F5" }}>
        <div className="container">
          <div className="row">
            {/* ================================================================== column 1st  ====================================================================*/}
            <div className="col-md-3 mt-3">
              <div className="card p-5 shadow-lg p-3 mb-5 bg-body rounded border-0">
                <div className="d-flex justify-content-center">
                  {"picture_url" in userData ? (
                    <img
                      src={userData.picture_url}
                      className="card-img-top small-round-pic  round-img"
                      alt="..."
                    />
                  ) : (
                    <i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
                  )}
                </div>
                <div className="card-body">
                  <h5 className="card-title text-center">
                    {userData.firstname + " " + userData.lastname}
                  </h5>
                  <p className="card-text text-center">Newly Recruit at TTN </p>
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
              <div>
                <div className="card">
                  <img
                    src="https://images.unsplash.com/photo-1649374982881-752d262c113b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                    className="card-img-top"
                    alt="..."
                  />
                </div>
              </div>
            </div>
            {/* =======================================================================column 2nd ======================================================================== */}
            <div className="col-md-6  scroll-mid mt-3 ">
              <div className="shadow p-3 mb-4 bg-body rounded">
                <div className="d-flex align-items-center">
                  <div className="">
                    {"picture_url" in userData ? (
                      <img
                        src={userData.picture_url}
                        className="card-img-top small-round-pic  round-img"
                        alt="..."
                      />
                    ) : (
                      <i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
                    )}
                  </div>
                  <div className="w-100 ms-2">
                    <input
                      type="text"
                      id="comment-box"
                      className="caption p-2 rounded-pill form-control"
                      placeholder="Write Something in your mind"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                </div>
                <div className="text-center mt-2">
                  <input
                    type="file"
                    className=""
                    id="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div className="text-center mt-2">
                  <button
                    className="btn btn-danger"
                    onClick={() => postDetails()}
                  >
                    Submit
                  </button>
                </div>
              </div>

              {posts
                .map((element, index) => {
                  return (
                    <Post
                      index={index}
                      data={element}
                      inclike={Inlike}
                      deslike={unlike}
                      commentBox={commentBox}
                      userdata={userData}
                      reportPost={reportPost}
                    />
                  );
                })
                .reverse()}
            </div>
            {/* =============================================================================== column 3rd ================================================================================================== */}
            <div className="col-md-3 side-height mt-3 ">
              {/*========================================================================= Contacts ============================================================================== */}
              <div className=" border p-2 scroll bg-white shadow-lg p-3 mb-4 bg-body rounded border-0">
                <div className="d-flex justify-content-between">
                  <div>Contacts</div>
                  <div>
                    <div className="d-flex align-items-center ms-2 round-img border rounded-circle icon-bg  p-2">
                      <i className="fa-solid fa-magnifying-glass-plus"></i>
                    </div>
                  </div>
                </div>

                {friendList.length === 0 ? (
                  <div className="text-center">You have no friends</div>
                ) : (
                  <div className="d-flex">
                    <div>
                      {friendList.map((element, index) => {
                        return (
                          <div className="d-flex " key={index}>
                            <div>
                              {element.picture_url ? (
                                <img
                                  src={element.picture_url}
                                  className="card-img-top small-round-pic  round-img"
                                  alt="..."
                                />
                              ) : (
                                <i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
                              )}
                            </div>
                            <div className="ms-2 d-flex align-items-center">
                              {element.firstname + " " + element.lastname}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              {/*============================================================================ Suggestuons ================================================================================== */}
              <UserlistWidget
                title={"Friends Sugesstions"}
                friendList={user.suggestFriend}
              />
            </div>{" "}
            {/* closing 3rd column  */}
          </div>{" "}
          {/* Closing row  */}
        </div>
      
      </div>
      <ToastContainer theme="colored"/>
    </>
  );
}