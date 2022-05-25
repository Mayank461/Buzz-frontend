import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getMyRooms } from '../services/chatServices';

function Messenger({ user, socket }) {
  const [messageInput, setMessageInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [onlineUsersList, setOnlineUsersList] = useState([]);
  const [search, setSearch] = useState('');
  const [rooms, setRooms] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const inRoom = useRef();

  useEffect(() => {
    paramsCheckData();

    return () => {
      socket.emit('leave', inRoom.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    conversation._id && socket.emit('join', conversation._id, user._id);
    inRoom.current = conversation._id;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation._id, socket]);

  async function getallrooms() {
    const data = await getMyRooms();
    setRooms(data);
    return data;
  }

  function genRoomID(id, id2) {
    if (id > id2) return `${id}-${id2}`;
    return `${id2}-${id}`;
  }

  async function paramsCheckData() {
    const rooms = await getallrooms();
    setRooms(rooms);

    const recipient = searchParams.get('recipient');
    if (!recipient || recipient === user._id) return;
    if (conversation?._id?.includes(recipient)) return;

    const roomID = genRoomID(user._id, recipient);

    if (rooms.length > 0) {
      const chatObj = rooms.find(({ _id }) => _id === roomID);
      if (chatObj) return setConversation(chatObj);
    }

    const myFriends = user.friends.myFriends;
    if (myFriends.length > 0) {
      const RDetail = myFriends.find(({ _id }) => _id === recipient);
      const { _id, firstname, lastname, picture_url } = RDetail;
      return setConversation({
        _id: roomID,
        users: [
          {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            picture_url: user.picture_url,
          },
          { _id, firstname, lastname, picture_url },
        ],
        conversation: [],
      });
    }
  }

  useEffect(() => {
    const onlineList = user.friends.myFriends
      .map((x) => x.online === true && x._id)
      .filter(Boolean);
    setOnlineUsersList(onlineList);
  }, [user.friends.myFriends]);

  useEffect(() => {
    socket.on('receive-message', (data) => {
      setConversation((p) => ({
        ...p,
        conversation: [...p.conversation, data],
      }));
    });
    socket.on('seen', (id) => {
      setConversation((p) => ({
        ...p,
        conversation: [
          ...p.conversation.map((x) => ({
            ...x,
            seen: id === user._id ? id === user._id : x.seen,
          })),
        ],
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    const updateData =
      rooms &&
      rooms.map((r) => {
        if (conversation._id === r._id) {
          return {
            ...r,
            conversation: conversation.conversation,
            updatedAt:
              conversation.conversation[conversation.conversation.length - 1]
                .timestamp,
          };
        }
        return r;
      });

    setRooms(updateData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation.conversation]);

  function fireMessage(e) {
    e.preventDefault();
    const messageData = {
      timestamp: Date.now(),
      message: messageInput,
      sentBy: user._id,
      seen: false,
    };
    socket.emit('send-message', messageData, conversation._id);
    // sendMessage(conversation._id, messageInput);

    // setConversation((p) => ({
    //   ...p,
    //   conversation: [...p.conversation, messageData],
    // }));

    setMessageInput('');
  }

  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  function toTime(date) {
    let todayData = new Date()
      .toLocaleTimeString([], {
        day: '2-digit',
        month: 'short',
      })
      .substring(0, 8);
    let data = new Date(date).toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      day: '2-digit',
      month: 'short',
    });

    return data.split(todayData).join('');
  }

  return (
    <div>
      <div className="container bg-white my-4">
        <div className="row shadow">
          <div
            className="col-md-4 pt-4 px-0"
            style={{ borderRight: '5px solid #ecebeb' }}
          >
            <h2 className="mb-3 mx-4">Messenger</h2>
            <div className="mx-4">
              <div className="form-group iconIninput mb-2">
                <input
                  type="text"
                  className="form-control "
                  placeholder="Search your friends"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className="fa fa-search"></i>
              </div>
            </div>
            <div style={{ height: '70vh', overflow: 'auto' }}>
              {rooms &&
                rooms
                  .filter(
                    ({ users }) =>
                      users.filter(({ _id, firstname, lastname }) => {
                        if (_id === user._id) return false;
                        let name = firstname + lastname;
                        return name
                          .toLowerCase()
                          .replaceAll(' ', '')
                          .includes(search.replaceAll(' ', '').toLowerCase());
                      }).length !== 0
                  )
                  .map((Rdata) => (
                    <div
                      key={Rdata._id}
                      className={`d-flex align-items-center my-1 py-3 pointer ${
                        conversation._id === Rdata._id && 'bg-light'
                      }`}
                      onClick={() => {
                        navigate({
                          pathname: '/chat',
                          search: `?recipient=${
                            Rdata.users.find((x) => x._id !== user._id)._id
                          }`,
                        });
                      }}
                    >
                      <div className="mx-4 d-flex w-100 align-items-center">
                        <div className="img-state">
                          <div
                            className={`${
                              onlineUsersList.includes(
                                Rdata._id
                                  .split('-')
                                  .find((x) => x !== user._id)
                                  .toString()
                              )
                                ? 'online'
                                : 'offline'
                            }`}
                          ></div>
                          <img
                            src={
                              Rdata.users.find(({ _id }) => _id !== user._id)
                                .picture_url ||
                              require('../images/blank-profile.png')
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
                              {Rdata.users.find(({ _id }) => _id !== user._id)
                                .firstname +
                                ' ' +
                                Rdata.users.find(({ _id }) => _id !== user._id)
                                  .lastname}
                            </h5>
                            <span className="font-weight-bolder">
                              {toTime(Rdata.updatedAt)}
                            </span>
                          </div>
                          <span className="my-1">
                            {Rdata.conversation[Rdata.conversation.length - 1]
                              .message || '--'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

              {rooms &&
                user.friends.myFriends
                  .filter(({ _id, firstname, lastname }) => {
                    if (!rooms.find((r) => r._id.includes(_id))) {
                      let name = firstname + lastname;
                      return name
                        .toLowerCase()
                        .replaceAll(' ', '')
                        .includes(search.replaceAll(' ', '').toLowerCase());
                    }
                    return false;
                  })
                  .map((Fdata) => (
                    <div
                      key={Fdata._id}
                      className={`d-flex align-items-center my-1 py-3 pointer ${
                        conversation?._id?.includes(Fdata._id) && 'bg-light'
                      }`}
                      onClick={() => {
                        navigate({
                          pathname: '/chat',
                          search: `?recipient=${Fdata._id}`,
                        });
                      }}
                    >
                      <div className="mx-4 d-flex w-100 align-items-center">
                        <div className="img-state">
                          <div
                            className={`${
                              onlineUsersList.includes(Fdata._id)
                                ? 'online'
                                : 'offline'
                            }`}
                          ></div>
                          <img
                            src={
                              Fdata.picture_url ||
                              require('../images/blank-profile.png')
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
                              {Fdata.firstname + ' ' + Fdata.lastname}
                            </h5>
                            <span className="font-weight-bolder">
                              {/* {toTime(Fdata.updatedAt)} */}
                            </span>
                          </div>
                          <span className="my-1">Start chat </span>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          <div
            className="col-md-8 bg-light p-0 flex-column d-flex justify-content-between"
            style={{ minHeight: '80vh' }}
          >
            {conversation._id && (
              <>
                <div className="col-12 bg-white px-4 py-2 d-flex align-'items-center snackbar">
                  <img
                    src={
                      conversation.users.find(({ _id }) => _id !== user._id)
                        .picture_url || require('../images/blank-profile.png')
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
                    <h5 className="m-0">
                      {conversation.users.find(({ _id }) => _id !== user._id)
                        .firstname +
                        ' ' +
                        conversation.users.find(({ _id }) => _id !== user._id)
                          .lastname}
                    </h5>
                    <p className="m-0">
                      {onlineUsersList.includes(
                        conversation.users.find(({ _id }) => _id !== user._id)
                          ._id
                      )
                        ? 'Online'
                        : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="px-4">
                  <div
                    className="chat p-2"
                    style={{ overflow: 'auto', maxHeight: 'calc(70vh - 55px)' }}
                  >
                    {conversation.conversation.map((msg) => {
                      let time = new Date(msg.timestamp).toLocaleTimeString(
                        [],
                        {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                          day: '2-digit',
                          month: 'short',
                        }
                      );

                      return (
                        <ChatBubble
                          key={msg.timestamp}
                          my={msg.sentBy === user._id}
                          message={msg.message}
                          name={
                            conversation.users.find(
                              ({ _id }) => _id === msg.sentBy
                            )?.firstname
                          }
                          picture_url={
                            conversation.users.find(
                              ({ _id }) => _id === msg.sentBy
                            )?.picture_url
                          }
                          time={time}
                          seen={msg.seen}
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

function ChatBubble({ my, message, name, picture_url, time, seen }) {
  if (!picture_url) picture_url = require('../images/blank-profile.png');

  return (
    <>
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
          {seen && (
            <p className={`seen ${!my && 'd-none'}`}>
              seen
              <i className="fa fa-check ms-2" aria-hidden="true"></i>
            </p>
          )}
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
    </>
  );
}
