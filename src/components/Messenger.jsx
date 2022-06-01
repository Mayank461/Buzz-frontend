import React, { useState } from 'react';

function Messenger({ user }) {
  const [messageInput, setMessageInput] = useState('');

  function fireMessage(e) {
    e.preventDefault();
    alert(messageInput);
    setMessageInput('');
  }
  return (
    <div>
      <div className="container bg-white my-5">
        <div className="row">
          <div
            className="col-md-4 pt-5 px-0 shadow"
            style={{ borderRight: '5px solid #ecebeb' }}
          >
            <h2 className="mb-3 mx-4">Messages</h2>

            <div style={{ height: '70vh', overflow: 'auto' }}>
              {user.friends.myFriends.map((data) => (
                <div className="d-flex align-items-center my-1 bg-light py-3">
                  <div className="mx-4 d-flex w-100">
                    {data.picture_url ? (
                      <img
                        src={data.picture_url}
                        className="card-img-top round-img"
                        alt="..."
                        style={{
                          width: '80px',
                        }}
                      />
                    ) : (
                      <i
                        className="fa-solid fa-user card-img-top  round-img text-success d-flex justify-content-center align-items-center"
                        style={{ backgroundColor: '#F0F2F5', width: '80px' }}
                      ></i>
                    )}
                    <div className="d-flex w-100 flex-column">
                      <div className="d-flex justify-content-between">
                        <h5 className="m-0">
                          {data.firstname + ' ' + data.lastname}
                        </h5>
                        <span className="font-weight-bolder">4:30pm</span>
                      </div>
                      <span className="my-1">last message text</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-8 bg-light flex-column d-flex justify-content-between">
            <div
              className="chat p-2"
              style={{ overflow: 'auto', maxHeight: '70vh' }}
            >
              <ChatBubble
                my={true}
                message="Hello"
                name="Person 1"
                time="9:00am"
                pic={
                  'https://res.cloudinary.com/buzz-social-app/image/upload/v1651815905/fzwayynsijb4hxpdf5gx.jpg'
                }
              />
              <ChatBubble
                my={false}
                message="Hi There !"
                name="John Doe"
                time="9:10am"
                pic={undefined}
              />
              <ChatBubble
                my={true}
                message="Hi There ! Hi There !Hi There !Hi There !Hi There !Hi There !Hi There !Hi There !"
                name="Person 1"
                time="9:00am"
                pic={
                  'https://res.cloudinary.com/buzz-social-app/image/upload/v1651815905/fzwayynsijb4hxpdf5gx.jpg'
                }
              />
            </div>
            <div className="chatinput p-0 m-0">
              <div className="input-group input-group-lg mb-3">
                <form onSubmit={fireMessage} className="d-flex  w-100">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your message.."
                    autoComplete="off"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <div className="input-group-append input-group-lg">
                    <button className="btn btn-outline-primary" type="submit">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;

function ChatBubble({ my, message, name, time, pic }) {
  if (!pic) {
    pic = require('../images/blank-profile.png');
  }
  return (
    <div className={`d-flex my-2 chatbubble ${my && 'myMessage'}`}>
      {!my && (
        <img
          src={pic}
          className="card-img-top round-img"
          alt="pic"
          style={{
            width: '40px',
            height: '40px',
          }}
        />
      )}
      <div className="flex-column px-2 my-1">
        <div className="d-flex rowalign">
          {!my && <h6 className="mb-2">{name}</h6>}
          <span className="time">{time}</span>
          {my && <h6 className="mb-2">{name}</h6>}
        </div>
        <div className="d-flex bubbletext">
          <p className="m-0">{message}</p>
        </div>
      </div>
      {my && (
        <img
          src={pic}
          className="card-img-top round-img"
          alt="pic"
          style={{
            width: '40px',
            height: '40px',
          }}
        />
      )}
    </div>
  );
}
