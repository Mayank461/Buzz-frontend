import React from 'react';
import { Link } from 'react-router-dom';

function UserlistWidget({ title, friendList }) {
  return (
    <div className=" border p-2 scroll bg-white shadow-lg p-3 mb-4 bg-body rounded border-0 mt-3">
      <div className="d-flex justify-content-between">
        <h6>{title}</h6>
        <div>
          <div className="d-flex align-items-center ms-2 round-img border rounded-circle icon-bg  p-2">
            <i className="fa-solid fa-magnifying-glass-plus"></i>
          </div>
        </div>
      </div>

      {friendList.map((friend) => (
        <Link
          to={'/profile/' + friend._id}
          className="d-flex mt-2 text-decoration-none "
        >
          <div>
            <img
              src={friend.picture_url || require('../images/blank-profile.png')}
              className="card-img-top small-round-pic me-2  round-img"
              alt="..."
            />
          </div>
          <div className="d-flex align-items-center text-dark">
            {friend.firstname + ' ' + friend.lastname}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default UserlistWidget;