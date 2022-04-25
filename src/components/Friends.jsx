import React from 'react';
import UserlistWidget from './UserlistWidget';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { handleConfirmRequest, handleDeleteRequest } from '../services/userservice';

function Friends({ user, refresh }) {
  const confirmReq = (id) => handleConfirmRequest(id,refresh);
  const delReq = (id) => handleDeleteRequest(id,refresh);

  return (
    <>
    <div>
      <div className="row justify-content-center pt-5">
        <div className="col-8">
          <div className="col-12 card border-0 p-4 mb-3">
            <h3 className="mt-2 mb-4">Friend Requests</h3>
            <div className="row">
              {user && user.friends.myFriendRequests.length === 0 && (
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
                          onClick={() => confirmReq(friend._id)}
                        >
                          Confirm
                        </div>
                        <div
                          class="btn btn-outline-danger mx-1"
                          onClick={() => delReq(friend._id)}
                        >
                          Delete
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="col-12 card border-0 p-4 mb-3">
            <h3 className="mt-2 mb-4">Pending Requests</h3>

            <div className="row">
              {user && user.friends.mySentRequests.length === 0 && (
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
                          onClick={() => delReq(friend._id)}
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
        <div className="col-2">
          <UserlistWidget
            title="My Friend"
            friendList={user.friends.myFriends}
          />
        </div>
      </div>
    </div>
    <ToastContainer theme="colored" />
</>
  );
}

export default Friends;
