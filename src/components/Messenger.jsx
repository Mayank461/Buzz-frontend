import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { picChat } from '../services/userservice';
import { Howl } from 'howler';
import io from 'socket.io-client';
import { getSpecificUser } from '../services/userservice';
import { API_URL } from '../config';
import FullPageSpinner from './FullPageSpinner';
const socketURL = API_URL.split('/api');
const socket = io.connect(socketURL[0])
let room = "";
function Messenger({ user }) {

  const [messageInput, setMessageInput] = useState('');
  let [sendPic,setSendPic] = useState('');
  let [conversation, setConversation] = useState([]);
  const [changeUser, setChangeUser] = useState(true)
  const [box, setBox] = useState(false);
  const [lastMsg, setLastMsg] = useState([]);
  const [chk, setChk] = useState([]);
  const [loading, setLoading] = useState(false);
  const [personDetails, setPersonDetails] = useState({
    profile_pic: "",
    firstname: "",
    lastname: '',
    recieverId: ""
  });
  // messenger tone setup 
  const tone = require('../tone/messenger.mp3');
  const callMySound = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    });
    sound.play();
  };

  //  selecting users in friends list  and joining room 
  const selectUser = (personId, userId, personPic, personFirstName, personLastName) => {
    setBox(true);

    let count = 0;
    setLastMsg([])
    getSpecificUser(user._id).then(res => {
      setChk(res.data.conversations);
      res.data.conversations.map((element, index) => {
        if (element.recieverId === personId) {
          setChangeUser(true)
          setConversation(element.chats);
        }
        else {
          count++;
        }
        if (count === user.conversations.length) {
          setConversation([])
        }
      })
    })

    setPersonDetails({
      profile_pic: personPic,
      firstname: personFirstName,
      lastname: personLastName,
      recieverId: personId
    })
    if (personId > userId) {
      room = personId + "-" + userId;
    }
    else {
      room = userId + "-" + personId;
    }
    socket.emit('join_room', room);
  }
  // this is for when user recieve new message
  socket.on("recieve_message", (data, index) => {
    let duplicate = data;
    if (data.senderId === user._id) { }
    else {
      duplicate.float = false;
      callMySound(tone);
    }
    setLastMsg(data)
    setConversation([...conversation, duplicate])

    setMessageInput("")
    socket.off();
  })

  // for sending chat to anyone
  const sendChat = (e) => {
    e.preventDefault();
  
    let today = new Date();
    let hours = today.getHours();
    let min = today.getMinutes().toString();
    if (min.length === 1) min = "0" + today.getMinutes();

    let time = hours > 12 ? "PM" : "AM"
    if (hours > 12) {
      hours = hours - 12;
    }
    let current_time = hours + ":" + min + " " + time;
    if(sendPic==='')
    {
      socket.emit("send_message", { message: messageInput, room: room, senderId: user._id, recieverId: personDetails.recieverId, time: current_time, float: true });

    }
    else{
    socket.emit("send_message", { message: messageInput, pic: sendPic, room: room, senderId: user._id, recieverId: personDetails.recieverId, time: current_time, float: true });

    }
    setSendPic("")
    socket.off();

  }
  const inputpic = async (e) => {
    setLoading(true);
   
    const file = e.target.files[0];
    await picChat(user._id, file).then((res)=>{
      setSendPic(res.data.secure_url)
      setLoading(false);
    })
  };
  useEffect(() => {
    setChk(user.conversations)
  }, [])

  return (
    <div>
      {loading?<FullPageSpinner></FullPageSpinner>:""}
      <div className="container bg-white my-5">
        <div className="row">
          <div
            className="col-md-4 pt-5 px-0 shadow"
            style={{ borderRight: '5px solid #ecebeb' }}
          >
            <h2 className="mb-3 mx-4">Messages</h2>

            <div style={{ height: '70vh', overflow: 'auto' }}>
              {user.friends.myFriends.map((data) => (
                <div className="d-flex align-items-center my-1 border bg-light  py-3" onClick={() => { selectUser(data._id, user._id, data.picture_url, data.firstname, data.lastname) }}>
                  <div className="mx-4 d-flex   w-100" >
                    <div className='d-flex align-items-center'>
                      {data.picture_url ? (
                        <img
                          src={data.picture_url}
                          className="card-img-top medium-round-pic round-img "
                          alt="..."

                        />
                      ) : (
                        <i
                          className="fa-solid fa-user fa-2x  card-img-top medium-round-pic round-img round-img text-success d-flex justify-content-center align-items-center"
                          style={{ backgroundColor: '#F0F2F7' }}
                        ></i>
                      )}
                    </div>

                    <div className=" w-100 d-flex flex-column ">
                      <h5 className="m-0 ms-2 ">
                        {data.firstname + ' ' + data.lastname}
                      </h5>
                      <span className="my-1 ms-2">{
                        data._id === lastMsg.recieverId || data._id === lastMsg.senderId ? lastMsg.message :
                          chk.map((e) => {
                            if (data._id === e.recieverId) {
                              return e.chats[e.chats.length - 1].message
                            }
                          })}</span>
                    </div>

                    <span className="w-50 text-end">{
                      data._id === lastMsg.recieverId || data._id === lastMsg.senderId ? lastMsg.time :
                        chk.map((e) => {
                          if (data._id === e.recieverId) {
                            return e.chats[e.chats.length - 1].time
                          }
                        })}</span>


                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-8 px-0 bg-light flex-column d-flex justify-content-between position-relative">
            {box ?
              <>
                <div
                  className="chat"
                  id='chatBox'
                >
                  <div className='shadow-lg p-2 bg-body rounded head'>
                    {personDetails.firstname === "" ? "" :
                      <div className='d-flex '>
                        {personDetails.profile_pic === undefined ?
                          <i className="fa-solid fa-user fa-2x card-img-top medium-round-pic round-img bg-warning d-flex justify-content-center align-items-center"></i>
                          :
                          <img src={personDetails.profile_pic} alt="" className="card-img-top round-img medium-round-pic" />
                        }

                        <div className='d-flex align-items-center  fw-bolder ms-2'>{personDetails.firstname + " " + personDetails.lastname}</div>

                      </div>
                    }

                  </div>

                  {changeUser ?
                    <ScrollToBottom className='scroll-bottom p-2'>
                      {conversation.map((element) => {
                        return <ChatBubble
                          my={element.float}
                          message={element.message}
                          chatPic={'pic' in element ? element.pic:""}
                          name={
                            element.float ? `You` : personDetails.firstname + " " + personDetails.lastname
                          }
                          time={element.time}
                          pic={
                            element.float ? user.picture_url : personDetails.profile_pic
                          }

                        />
                      })}
                    </ScrollToBottom>
                    : ""
                  }
                </div>
                <div className="chatinput p-0 m-0">
                  <div className="input-group input-group-lg">


                    <div className="d-flex w-100 mb-2">
                      <div className='d-flex w-100 position-relative'>
                        <input
                          type="text"
                          className="form-control rounded-pill"
                          placeholder="Your message.."
                          autoComplete="off"
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                        />
                        <div className='d-flex align-items-center'>
                          {/* <i className="fa-solid fa-2x fa-image position-absolute end-0 me-2"></i> */}
                          <input
                            type="file"
                            className="gallery position-absolute end-0 me-2"
                            onChange={(e) => inputpic(e)}
                          />
                        </div>
                      </div>

                      <div className="input-group-append input-group-lg ms-2 rounded-circle bg-success d-flex justify-content-center p-1" style={{cursor:"pointer"}}>
                        <i className="fa-solid fa-2x fa-paper-plane text-white  round-img d-flex justify-content-center align-items-center p-2"  onClick={sendChat}></i>
                      </div>

                    </div>

                  </div>
                </div>
              </>
              : <div className='d-flex justify-content-center flex-column empty-conversation'>
                <img src='https://ssl.gstatic.com/dynamite/images/new_chat_room_1x.png' className='' />
                <h3>Select a conversation</h3>
              </div>}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;

function ChatBubble({ my, message,chatPic, name, time, pic }) {
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
        <div className="d-flex flex-column bubbletext">
          <p className="m-0">{message}</p>
          <div>{chatPic ===""?"":
         (<img 
          src={chatPic}
          alt="no pic"
          style={{
            width: '300px',
            height: '300px',
          }}
          />)
          }</div>
        
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
