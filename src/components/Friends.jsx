import axios from 'axios';
import React from 'react';
import { API_URL } from '../config';

function Friends({ user }) {
  function handleConfirmRequest(id) {
    axios
      .get(`${API_URL}/users/confirmRequest/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        alert('Friend added');
      })
      .catch((err) => console.log(err.message));
  }
  function handleDeleteRequest(id) {
    axios
      .get(`${API_URL}/users/deleteRequest/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        alert('Request cancelled');
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div>
      <div className="row justify-content-center pt-5">
        <div className="col-10 card border-0 p-4">
          <h3 className="mt-2 mb-4">Friend Requests</h3>

          <div className="row">
            {user && user.friends.myFriendRequests.length == 0 && (
              <p>No pending friend requests </p>
            )}
            {user &&
              user.friends.myFriendRequests.map((friend) => (
                <div class="col-12 col-md-6 ">
                  <div class="d-flex friend-req justify-content-between">
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          friend.picture_url ||
                          require('../images/blank-profile.png')
                        }
                        className="card-img-top small-round-pic  round-img"
                        alt="..."
                      />
                      <div class="px-3">
                        <h5 class="my-1">
                          {friend.firstname + ' ' + friend.lastname}
                        </h5>
                        <p class="card-text">Delhi, India</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center controls">
                      <div
                        class="btn btn-primary mx-1"
                        onClick={() => handleConfirmRequest(friend._id)}
                      >
                        Confirm
                      </div>
                      <div
                        class="btn btn-outline-danger mx-1"
                        onClick={() => handleDeleteRequest(friend._id)}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="row justify-content-center pt-5">
        <div className="col-10 card border-0 p-4">
          <h3 className="mt-2 mb-4">Pending Requests</h3>

          <div className="row">
            {user && user.friends.mySentRequests.length == 0 && (
              <p>No pending friend requests </p>
            )}
            {user &&
              user.friends.mySentRequests.map((friend) => (
                <div class="col-12 col-md-6 ">
                  <div class="d-flex friend-req justify-content-between">
                    <div className="d-flex align-items-center">
                      <img
                        src={
                          friend.picture_url ||
                          require('../images/blank-profile.png')
                        }
                        className="card-img-top small-round-pic  round-img"
                        alt="..."
                      />
                      <div class="px-3">
                        <h5 class="my-1">
                          {friend.firstname + ' ' + friend.lastname}
                        </h5>
                        <p class="card-text">Delhi, India</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center controls">
                      <div
                        class="btn btn-outline-danger mx-1"
                        onClick={() => handleDeleteRequest(friend._id)}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friends;
