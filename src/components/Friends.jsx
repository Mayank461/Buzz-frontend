import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';

function Friends({ user }) {
  function handleConfirmRequest(confirmID) {
    axios
      .get(`${API_URL}/user/confirmRequest/${confirmID}`, {
        withCredentials: true,
      })
      .then((res) => {
        alert('added to friend list');
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div>
      <div className="row justify-content-center pt-5">
        <div className="col-10 card border-0 p-4">
          <h3 className="mt-2 mb-4">Friend Requests</h3>

          <div className="row">
            {/* card start */}
            <div class="col-12 col-md-6 ">
              <div class="d-flex friend-req justify-content-between">
                <div className="d-flex align-items-center">
                  <img
                    src={user.picture_url}
                    className="card-img-top small-round-pic  round-img"
                    alt="..."
                  />
                  <div class="px-3">
                    <h5 class="my-1">{user.firstname + ' ' + user.lastname}</h5>
                    <p class="card-text">Delhi, India</p>
                  </div>
                </div>
                <div className="d-flex align-items-center controls">
                  <div
                    class="btn btn-primary mx-1"
                    onClick={() => handleConfirmRequest()}
                  >
                    Confirm
                  </div>
                  <div class="btn btn-outline-danger mx-1">Delete</div>
                </div>
              </div>
            </div>

            {/* card end */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Friends;
