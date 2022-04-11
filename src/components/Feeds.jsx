import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../config";
import Post from "./Post";
import UserlistWidget from "./UserlistWidget";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import DefaultCard from "./DefaultCard";

export default function Feeds(user) {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [userData, setUserData] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0)
  // let count = 0

  useEffect(() => {
    console.log(userData);
    loaduser();
    axios
      .get(`${API_URL}/posts/getPost`, { withCredentials: true })
      .then((res) => {
        setPosts(res.data);
        // counting the total number of post of login user 
        let a = 0;
        const c = res.data.map((element) => {

          if (element.posted_by._id === user.user._id) {
            a++
          }
        })
        setCount(a)
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
    if(message=== undefined || message ==='')
    {
      toast.warn("Comment box is empty... write something")
    }
    else{
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

    }


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
        setRefresh(refresh + 1);
        toast.success("Reported Successfully");
      })
      .catch((err) => console.log(err.message));
  };
  const postDetails = () => {
    const commentBox = document.getElementById("comment-box").value;
    const file = document.getElementById("file").value;

    // checking validation in post field
    if (commentBox === "" && file === "") {
      toast.warn("Please give atleast one input");
    }
    // checking atleast one input is given or not
    else if (commentBox === "" || file === "") {
      setLoading(true);
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
        setLoading(false);
        toast.success("Your post uplaoded successfully");
      }
      // if only picture is given from user side
      else {
        setLoading(true);
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
            setLoading(false);
            toast.success("Post uploaded successfully");
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
      setLoading(true);
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
          setLoading(false);
          toast.success("Your post uplaoded successfully");

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
              <div className="card p-5 shadow-lg p-3 mb-2 bg-body rounded border-0">
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
                      <div className="text-center">{user.user.friends.myFriends.length}</div>
                      <div>Friends</div>
                    </div>
                    <div className="vr border"></div>
                    <div>
                      <div className="text-center">{count}</div>
                      <div>Post</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="card ">
                  <img
                    src="https://media-s3-us-east-1.ceros.com/abbott/images/2020/06/18/5003c26bb33afd98eb9dc65ba64e18d0/asset-1.png?imageOpt=1"
                    className="card-img-top position-relative"
                    alt="..."
                  />
                  <div className="position-abs">
                    <img
                      className=" p-5  "
                      src="https://static1.tothenew.com/blog/wp-content/themes/ttn/images/social-logo.png"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
            {/* =======================================================================column 2nd ======================================================================== */}
            <div className="col-md-6  scroll-mid mt-3  position-relative">
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
                  <div className="w-100 ms-2 me-2">
                    <input
                      type="text"
                      id="comment-box"
                      className="caption p-2 rounded-pill form-control"
                      placeholder={`What's on your mind ${userData.firstname} ${userData.lastname} ?`}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="text-center  ">

                    <input
                      type="file"
                      className="myFile"
                      id="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                </div>

                <div className="text-center d-flex justify-content-center d-grid gap-2  mt-5 text-center mt-2">
                  
                  <button
                    className="btn btn-success rounded-pill w-75 "
                    onClick={() => postDetails()}
                  >
                    Uplaod
                  </button>
                </div>
                {loading ? <Spinner /> : ""}
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

                <DefaultCard/>
                            </div>
            {/* =============================================================================== column 3rd ================================================================================================== */}
            <div className="col-md-3 side-height mt-3 ">
              {/*========================================================================= Contacts ============================================================================== */}
              <div className=" border p-2 scroll bg-white shadow-lg p-3 mb-2 bg-body rounded border-0">
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
                          <Link className="d-flex text-decoration-none mt-2 " key={index} to={'/profile/' + element._id}>
                            <div>
                              {element.picture_url ? (
                                <img
                                  src={element.picture_url}
                                  className="card-img-top small-round-pic  round-img"
                                  alt="..."
                                />
                              ) : (
                                <i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img text-success d-flex justify-content-center align-items-center" style={{ backgroundColor: "#F0F2F5" }}></i>
                              )}
                            </div>
                            <div className="ms-2 d-flex align-items-center text-dark">
                              {element.firstname + " " + element.lastname}
                            </div>
                          </Link>
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
      <ToastContainer theme="colored" />
    </>
  );
}
