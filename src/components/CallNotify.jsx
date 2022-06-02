import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CallNotify = ({ user, socket }) => {
  const [ShowID, setShow] = useState(false);
  const [from, setFrom] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('CallNotify', (id, from) => {
      setFrom(from);
      setShow(id);
    });
  }, []);

  function accept() {
    setShow(false);
    navigate(`/call?recipient=${from.id}&rpeerid=${from.peerid}`);
  }
  function reject() {
    socket.emit('disconnect-call', from.id, {
      id: user._id,
      picture_url: user.picture_url,
      name: user.firstname + ' ' + user.lastname,
    });
    setShow(false);
  }
  if (ShowID && from)
    return (
      <div className="callNotify d-flex justify-content-around align-items-center">
        <img
          src={from.picture_url || require('../images/blank-profile.png')}
          className="img-fluid"
          alt="pic"
        />
        <div className="col d-flex flex-column">
          <h3 className="mx-2 my-0" data-testid="name-field">
            {from.name}
          </h3>
          <div className="d-flex">
            <div
              className="btn callbtn accept"
              data-testid="accept-btn"
              onClick={accept}
            >
              <i className="fa fa-phone"></i>
              Accept
            </div>
            <div
              className="btn callbtn reject"
              data-testid="reject-btn"
              onClick={reject}
            >
              <i className="fa fa-times"></i>
              Reject
            </div>
          </div>
        </div>
      </div>
    );
};

export default CallNotify;
