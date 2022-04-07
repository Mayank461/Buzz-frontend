import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { API_URL } from '../config';

const reducer = (state, action) => {
  switch (action.type) {
    case "increment": return state + 1;

    default:
      return state;
  }
};
export default function Feeds(user) {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const [userData, setUserData] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [posts, setPosts] = useState([]);


  const [todos, dispatch] = useReducer(reducer, 0);

  useEffect(() => {
    console.log("render")

    loaduser();

    // console.log(user.user.posts)
    axios
      .get(`${API_URL}/user/getUser`, { withCredentials: true })
      .then((res) => { setAllUsers(res.data); })
      .catch((err) => console.log(err.message));
  }, [todos]);

  const loaduser = () => {
    setUserData(user.user);
    // const reverseArray = (user.user.posts).concat().reverse();
    setPosts((user.user.posts).concat().reverse());

    setFriendList(user.user.friends.myFriends);
  }
  function logout() {
    axios
      .get(`${API_URL}/auth/logout`, { withCredentials: true })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  }


  const postDetails = async () => {
    // console.log(title)
    // if(url === "" && title === "")
    // {
    //       alert("Sorry shaktimaan");
    // }
    console.log(posts)
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'buzz-app')
    data.append('cloud_name', 'buzz-social-app')
    await fetch('https://api.cloudinary.com/v1_1/buzz-social-app/image/upload', {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        setUrl(data.url)
        console.log(data);

        fetch(`${API_URL}/posts/userPost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            pic_url: data.url,
            caption: title,
            user_id: userData._id
          })
        })

      })
      .catch(err => {
        console.log(err)
      })

    dispatch({ type: "increment" })

  }
  return (
    <>
      <div style={{ backgroundColor: '#F0F2F5' }}>
        <div className="container">
          <div className="row">
            {/* ================================================================== column 1st  ====================================================================*/}
            <div className="col-md-3 mt-3">
              <div className="card p-5 shadow-lg p-3 mb-5 bg-body rounded border-0">
                <div className="d-flex justify-content-center">
                {('picture_url' in userData)?<img src={userData.picture_url} className="card-img-top small-round-pic  round-img" alt="..." />:<i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>}

                  
                </div>
                <div className="card-body">
                  <h5 className="card-title text-center">{userData.firstname + " " + userData.lastname}</h5>
                  <p className="card-text text-center">Newly Recruit at TTN {todos} </p>
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
            {/* =======================================================================column 2nd ======================================================================== */}
            <div className="col-md-6  scroll-mid mt-3 ">
              <div className='shadow p-3 mb-4 bg-body rounded'>

                <div className='d-flex align-items-center'>
                  <div className=''>
                {('picture_url' in userData)?<img src={userData.picture_url} className="card-img-top small-round-pic  round-img" alt="..." />:<i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>}
                    
                    {/* <img
                      src={userData.picture_url}
                      className="card-img-top small-round-pic me-2  round-img"
                      alt="..."
                    /> */}
                  </div>
                  <div className='w-100'>
                    <input
                      type="text"
                      className='caption p-2 rounded-pill form-control'
                      placeholder="Write Something in your mind"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                </div>
                <div className='text-center mt-2'>
                  <input
                    type="file" className='' onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className='text-center mt-2'>
                  <button className="btn btn-danger"
                    onClick={() => postDetails()}

                  >Submit
                  </button>

                </div>
              </div>

              {(posts.length === 0) ? "" : posts.map((element, index) => {
                return (

                  <div key={element._id} className="card p-3 mb-3 shadow p-3 mb-5 bg-body rounded border-0">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div className="d-flex align-items-center">
                {('picture_url' in userData)?<img src={userData.picture_url} className="card-img-top small-round-pic  round-img" alt="..." />:<i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>}

                        {/* <img
                          src={userData.picture_url}
                          className="card-img-top small-round-pic  round-img"
                          alt="..."
                        /> */}

                        <div className='ms-2'>{userData.firstname + " " + userData.lastname}
                        </div>
                      </div>



                      <div className="d-flex align-items-center ms-2 round-img border rounded-circle icon-bg text-dark p-2">
                        <i className="fa-solid fa-ellipsis"></i>
                      </div>

                    </div>
                    <div className='ms-2 mb-2'>{element.post_caption}</div>
                    <img
                      src={element.post_url}
                      className="card-img-top rounded-3"
                      alt="..."
                    />


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

                )
              })}



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


            {/* =============================================================================== column 3rd ================================================================================================== */}
            <div className="col-md-3 side-height mt-3">
              {/*========================================================================= Contacts ============================================================================== */}

              <div className=" border p-2 scroll bg-white shadow-lg p-3 bg-body rounded border-0">
                <div className="d-flex justify-content-between">
                  <div>Contacts</div>
                  <div>
                    <div className="d-flex align-items-center ms-2 round-img border rounded-circle icon-bg  p-2">
                      <i className="fa-solid fa-magnifying-glass-plus"></i>
                    </div>
                  </div>
                </div>

                {(friendList.length === 0) ? <div className='text-center'>You have no friends</div>:
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
                }





              </div>
              {/*============================================================================ Suggestuons ================================================================================== */}
              <div className=" border p-2 scroll mt-3 bg-white shadow-lg p-3  bg-body rounded border-0">
                <div className="d-flex justify-content-between">
                  <div>Suggestions</div>
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

              </div>
            </div> {/* closing 3rd column  */}


          </div>  {/* Closing row  */}

        </div>
      </div>
    </>
  );
}
