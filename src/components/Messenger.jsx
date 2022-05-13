import React, { useEffect, useRef, useState } from 'react';

function Messenger({ user, socket }) {
  const [messageInput, setMessageInput] = useState('');
  const [ChatRoom, setChatRoom] = useState({
    roomID: undefined,
    senderName: undefined,
    receiverName: undefined,
    receiverPic: undefined,
    status: 'Offline',
  });
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    if (ChatRoom.roomID) {
      const recID = ChatRoom.roomID.split('-').find((id) => id !== user._id);
      let status = user.friends.myFriends.find(
        ({ _id }) => _id === recID
      ).online;

      setChatRoom((prev) => ({
        ...prev,
        status: status ? 'Online' : 'Offline',
      }));
    }
  }, [ChatRoom.roomID, user._id, user.friends.myFriends]);

  useEffect(() => {
    socket.on('receive-message', (data) => {
      setConversation((prev) => [...prev, data]);
    });
  }, [socket]);

  function fireMessage(e) {
    e.preventDefault();
    const messageData = {
      timestamp: Date.now(),
      message: messageInput,
      sentBy: user._id,
    };
    socket.emit('send-message', messageData, ChatRoom.roomID);
    setConversation((prev) => [...prev, messageData]);
    setMessageInput('');
  }

  function openChatRoom(myID, userID, receiverName, receiverPic) {
    let roomID;

    if (myID > userID) {
      roomID = `${myID}-${userID}`;
    } else {
      roomID = `${userID}-${myID}`;
    }

    if (ChatRoom.roomID === roomID) return;
    socket.emit('join', roomID);
    setChatRoom({
      roomID,
      senderName: user.firstname + ' ' + user.lastname,
      receiverName,
      receiverPic,
    });
    setConversation([]);
  }

  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  return (
    <div>
      <div className="container bg-white my-4">
        <div className="row shadow">
          <div
            className="col-md-4 pt-4 px-0"
            style={{ borderRight: '5px solid #ecebeb' }}
          >
            <h2 className="mb-3 mx-4">Messages</h2>

            <div style={{ height: '70vh', overflow: 'auto' }}>
              {user.friends.myFriends.map((data) => (
                <div
                  key={data._id}
                  className="d-flex align-items-center my-1 bg-light py-3 pointer"
                  onClick={() =>
                    openChatRoom(
                      user._id,
                      data._id,
                      `${data.firstname} ${data.lastname}`,
                      data.picture_url
                    )
                  }
                >
                  <div className="mx-4 d-flex w-100">
                    <div className="img-state">
                      <div
                        className={`${data.online ? 'online' : 'offline'}`}
                      ></div>
                      <img
                        src={
                          data.picture_url
                            ? data.picture_url
                            : require('../images/blank-profile.png')
                        }
                        className="card-img-top round-img"
                        alt="..."
                        style={{
                          width: '60px',
                          height: '60px',
                        }}
                      />
                    </div>

                    <div className="d-flex w-100 flex-column justify-content-center">
                      <div className="d-flex justify-content-between">
                        <h5 className="m-0">
                          {data.firstname + ' ' + data.lastname}
                        </h5>
                        {/* <span className="font-weight-bolder">4:30pm</span> */}
                      </div>
                      <span className="my-1">
                        {data.online ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-8 bg-light p-0 flex-column d-flex justify-content-between">
            {ChatRoom.roomID && (
              <>
                <div className="col-12 bg-white px-4 py-2 d-flex align-items-center snackbar">
                  <img
                    src={
                      ChatRoom.receiverPic
                        ? ChatRoom.receiverPic
                        : require('../images/blank-profile.png')
                    }
                    className="card-img-top round-img"
                    alt="..."
                    style={{
                      width: '40px',
                      height: '40px',
                      marginRight: '15px',
                    }}
                  />
                  <div className="d-flex flex-column">
                    <h5 className="m-0">{ChatRoom.receiverName}</h5>
                    <p className="m-0">{ChatRoom.status}</p>
                  </div>
                </div>
                <div className="px-4">
                  <div
                    className="chat p-2"
                    style={{ overflow: 'auto', maxHeight: 'calc(70vh - 55px)' }}
                  >
                    {conversation.map((msg) => {
                      let time = new Date(msg.timestamp).toLocaleTimeString(
                        [],
                        {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                        }
                      );
                      if (msg.sentBy === user._id)
                        return (
                          <ChatBubble
                            key={msg.timestamp}
                            my={true}
                            message={msg.message}
                            name={ChatRoom.senderName}
                            picture_url={user.picture_url}
                            time={time}
                          />
                        );
                      else
                        return (
                          <ChatBubble
                            key={msg.timestamp}
                            my={false}
                            message={msg.message}
                            name={ChatRoom.receiverName}
                            picture_url={ChatRoom.receiverPic}
                            time={time}
                          />
                        );
                    })}

                    <div ref={scrollRef} />
                  </div>
                  <div className="chatinput p-0 m-0">
                    <div className="input-group input-group-lg mb-3">
                      <form onSubmit={fireMessage} className="d-flex  w-100">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your message.."
                          value={messageInput}
                          autoComplete="off"
                          onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <div className="input-group-append input-group-lg">
                          <button
                            className="btn btn-outline-primary"
                            type="submit"
                          >
                            Send
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;

function ChatBubble({ my, message, name, picture_url, time }) {
  if (!picture_url) picture_url = require('../images/blank-profile.png');

  return (
    <div className={`d-flex my-2 chatbubble ${my && 'myMessage'}`}>
      {!my && (
        <img
          src={picture_url}
          className="card-img-top round-img"
          alt="pic"
          style={{
            width: '40px',
            height: '40px',
          }}
        />
      )}
      <div className="flex-column px-2 my-1 w-100">
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
          src={picture_url}
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
