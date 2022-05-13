import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import {Howl, Howler} from 'howler';
import io from 'socket.io-client';
import { getSpecificUser } from '../services/userservice';
const socket = io.connect('http://localhost:5000')
let room = "";
function Messenger({ user }) {

  const [refresh, setRefresh] = useState(true);
  const [messageInput, setMessageInput] = useState('');
  let [conversation, setConversation] = useState();
  const [userIndex, setUserIndex] = useState(0)
  const [changeUser, setChangeUser] = useState(false)
  const [personDetails, setPersonDetails] = useState({
    profile_pic: "",
    firstname: "",
    lastname: '',
    recieverId: ""
  });
  const toggleRefresh = () => setRefresh((p) => !p);

  // messenger tone setup 
  const tone = require('../tone/messenger.mp3');
   const callMySound =(src)=>{
     const sound= new Howl({
       src,
       html5:true,
     });
     sound.play();

   };

  //  selecting users in friends list  and joining room 
  const selectUser = (personId, userId, personPic, personFirstName, personLastName) => {
    
    let count = 0;
    user.conversations.map((element, index) => {
      if (element.recieverId === personId) {
        setChangeUser(true)
        setUserIndex(index)
      }
      else {
        count++;
      }
    })
    if (count === user.conversations.length) {
      setChangeUser(false)
    }
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

  // finding single user record 
  const findSingleUser =  async() => {
    let data =  await getSpecificUser(user._id);
    setConversation(data.data);
  }

  useEffect(() => {
    findSingleUser();
  },[])

  // this is for when user recieve new message
  socket.on("recieve_message", (data) => {
    if(data.senderId === user._id)
    {
     console.log("no");
    }
    else{
      console.log("yes");
      callMySound(tone);
    }
    findSingleUser();
    setMessageInput("")
    socket.off();
   
  })

  // for sending chat to anyone
  const sendChat = (e) => {
    e.preventDefault();
    let today = new Date();
    let hours = today.getHours();
    let min = today.getMinutes();
    let time = hours > 12 ? "PM" : "AM"
    if (hours > 12) {
      hours = hours - 12;
    }
    let current_time = hours + ":" + min + " " + time;
    socket.emit("send_message", { message: messageInput, room: room, senderId: user._id, recieverId: personDetails.recieverId, current_time: current_time, float: true });
    socket.off();
    toggleRefresh();
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
                          style={{ backgroundColor: '#F0F2F7'}}
                        ></i>
                      )}
                    </div>
                    <div className=" w-100 d-flex flex-column ">
                      <h5 className="m-0 ms-2 ">
                        {data.firstname + ' ' + data.lastname}
                      </h5>
                      <span className="my-1 ms-2">last message text</span>
                    </div>
                    <div>
                      <span className="font-weight-bolder">4:30pm</span>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-8 px-0 bg-light flex-column d-flex justify-content-between">

            <div
              className="chat"
              id='chatBox'
            >
              <div className='shadow-lg p-2 bg-body rounded'>
                {personDetails.firstname === "" ? "" :
                  <div className='d-flex '>
                    {personDetails.profile_pic === undefined ?
                      <i className="fa-solid fa-user fa-2x card-img-top medium-round-pic round-img bg-warning d-flex justify-content-center align-items-center"></i>
                      :
                      <img src={personDetails.profile_pic} alt="" className="card-img-top round-img medium-round-pic" />
                    }

                    <div className='d-flex align-items-center fw-bolder ms-2'>{personDetails.firstname + " " + personDetails.lastname}</div>

                  </div>
                }

              </div>
             
              {changeUser ?
               <ScrollToBottom className='scroll-bottom p-2'>
               { conversation.conversations[userIndex].chats.map((element) => {
                  return <ChatBubble
                    my={element.float}
                    message={element.message}
                    name={
                      element.float ? `${user.firstname} ${user.lastname}` : personDetails.firstname + " " + personDetails.lastname
                    }
                    time={element.time}
                    pic={
                      element.float ? user.picture_url : personDetails.profile_pic
                    }
                  />
                })}
                </ScrollToBottom>
                : ""}

            </div>
            <div className="chatinput p-0 m-0">
              <div className="input-group input-group-lg">
                <form className="d-flex  w-100">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your message.."
                    autoComplete="off"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                  <div className="input-group-append input-group-lg">
                    <button className="btn btn-outline-primary" type="submit" onClick={sendChat}>
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
