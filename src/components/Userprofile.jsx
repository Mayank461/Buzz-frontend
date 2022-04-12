import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config';
import UserlistWidget from './UserlistWidget';

export default function Userprofile({ suggestFriend, myData, refresh }) {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [friendStatus, setFriendStatus] = useState('ADD FRIEND');

  let isFriend = myData.friends.myFriends
    .map(({ _id }) => _id === id)
    .includes(true);

  let isPending =
    myData.friends.mySentRequests.map(({ _id }) => _id === id).includes(true) ||
    myData.friends.myFriendRequests.map(({ _id }) => _id === id).includes(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/users/` + id, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  function SendReq() {
    axios
      .get(`${API_URL}/users/sendRequest/` + id, {
        withCredentials: true,
      })
      .then((res) => {
        refresh();
        // alert(res.data.message);
      })
      .catch((err) => console.log(err.message));
  }

  function DeleteFriend() {
    axios
      .get(`${API_URL}/users/deleteRequest/` + id, {
        withCredentials: true,
      })
      .then((res) => {
        refresh();
        // alert(res.data.message);
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-9 bg-white">
          <div className="position-relative">
            <img
              src="https://images.unsplash.com/photo-1495277493816-4c359911b7f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80"
              className="coverpic"
            />
            <img
              src={user.picture_url || require('../images/blank-profile.png')}
              className="size"
            />
          </div>
          <div className="mx-4 ">
            <h1 className="mt-5"> {"firstname" in user?user.firstname + ' ' + user.lastname:"Unknown User"}</h1>
            <p>{user.bio} </p>
            <p>
              {`${user?.city} , ${user?.state} , India | ${user?.friends?.myFriends?.length}  Friend`}
            </p>
            <div className="d-flex">
              {/* {console.log(myData?.friends?.myFriends[0], id)} */}
              {/* {console.log(myData.friends.myFriends[0])} */}

              {isFriend ? (
                <div onClick={DeleteFriend} className="btn btn-danger me-3">
                  REMOVE FRIEND
                </div>
              ) : isPending ? (
                <div className="btn btn-dark me-3">Request Pending</div>
              ) : (
                <div onClick={SendReq} className="btn btn-primary me-3">
                  {friendStatus}
                </div>
              )}
              <button className="border boder-white">Visit Website</button>
            </div>
          </div>
        </div>
        <div className="col-md-3 profile-sidebar">
          <UserlistWidget
            title="Friend Suggestions"
            friendList={suggestFriend}
          />
        </div>
      </div>
    </div>
  );
}
