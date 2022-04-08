import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react';
import { API_URL } from '../config';
import Post from './Post';
import UserlistWidget from './UserlistWidget';

export default function Feeds(user) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [userData, setUserData] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [friendList, setFriendList] = useState([]);
  const [refresh, setRefresh] = useState(0);
  // const reverseArray = (user.user.posts).concat().reverse();
  const [posts, setPosts] = useState([]);
  // const [check, setCheck] = useState(reverseArray)

  useEffect(() => {
    loaduser();
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

  const postDetails = () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'buzz-app');
    data.append('cloud_name', 'buzz-social-app');
    fetch('https://api.cloudinary.com/v1_1/buzz-social-app/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(`${API_URL}/posts/userPost`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pic_url: data.url,
            caption: title,
            user_id: userData._id,
          }),
        }).then((r) => setRefresh(refresh + 1));
        alert('Your post uplaoded successfully');
        // setCheck([...check, { post_url: url, post_caption: title }]);
        setTitle('');
        document.getElementById('file').value = '';
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div style={{ backgroundColor: '#F0F2F5' }}>
        <div className="container">
          <div className="row">
            {/* ================================================================== column 1st  ====================================================================*/}
            <div className="col-md-3 mt-3">
              <div className="card p-5 shadow-lg p-3 mb-5 bg-body rounded border-0">
                <div className="d-flex justify-content-center">
                  {'picture_url' in userData ? (
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
                    {userData.firstname + ' ' + userData.lastname}
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
            </div>
            {/* =======================================================================column 2nd ======================================================================== */}
            <div className="col-md-6  scroll-mid mt-3 ">
              <div className="shadow p-3 mb-4 bg-body rounded">
                <div className="d-flex align-items-center">
                  <div className="">
                    {'picture_url' in userData ? (
                      <img
                        src={userData.picture_url}
                        className="card-img-top small-round-pic  round-img"
                        alt="..."
                      />
                    ) : (
                      <i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
                    )}
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
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
                )}
              </div>
              {/*============================================================================ Suggestuons ================================================================================== */}
              <UserlistWidget
                title={'Friends Sugesstions'}
                friendList={user.suggestFriend}
              />
            </div>{' '}
            {/* closing 3rd column  */}
          </div>{' '}
          {/* Closing row  */}
        </div>
      </div>
    </>
  );
}
