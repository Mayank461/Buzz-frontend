import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000')
let room = "";
function Messenger({ user }) {
  const [messageInput, setMessageInput] = useState('');
  const [conversation,setConversation] = useState([]);
  const [personDetails,setPersonDetails] = useState({
    profile_pic:"",
    firstname:"",
    lastname:''
  });
  const selectUser = (personId,userId,personPic,personFirstName,personLastName)=>{
    setPersonDetails({
      profile_pic:personPic,
      firstname:personFirstName,
      lastname:personLastName
    })
    if(personId>userId)
    {
      room= personId+ "-"+ userId;
    }
    else
    {
      room = userId+ "-"+ personId;
    }
    socket.emit('join_room',room);
  }
  useEffect(()=>{
    socket.on("recieve_message",(data)=>{
      setConversation([...conversation,{message:data.message,senderId:data.senderId,current_time:data.current_time}]);
      setMessageInput("") 
    })
  })
  const sendChat = (e)=>{
    e.preventDefault();
    let today = new Date();
    let hours = today.getHours();
    let min = today.getMinutes();
    let time = hours>12?"PM":"AM"
    if(hours>12){
      hours=hours-12;
    }
    let current_time = hours+":"+min+" "+time;
    socket.emit("send_message",{message:messageInput,room:room,senderId:user._id,current_time:current_time});   
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
                <div className="d-flex align-items-center my-1 bg-light py-3" onClick={()=>{selectUser(data._id,user._id,data.picture_url,data.firstname,data.lastname)}}>
                  <div className="mx-4 d-flex w-100" >
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
              id='chatBox'
              style={{ overflow: 'auto', maxHeight: '70vh' }}
            >
              <div className='border'>
              {personDetails.firstname === ""?"":
                <div className='d-flex '>
                {personDetails.profile_pic === undefined?
                  <i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
                :
                <img src={personDetails.profile_pic} alt="" className="card-img-top round-img"  style={{ width: '40px', height: '40px',}}/>
                }
                
                <div className='d-flex align-items-center ms-2'>{personDetails.firstname +" "+ personDetails.lastname}</div>

                </div>
              }
              
               

              </div>
              {}
              {conversation.map((element)=>{
                
               if(element.senderId == user._id)
               {
                return <ChatBubble
                my={true}
                message={element.message}
                name="You"
                time={element.current_time}
                pic={
                  user.picture_url
                }
              />
               }
               else{
                return <ChatBubble
                my={false}
                message={element.message}
                name={personDetails.firstname +" "+ personDetails.lastname}
                time={element.current_time}
                pic={
                  personDetails.profile_pic
                }
              />
               }
              })}
            </div>
            <div className="chatinput p-0 m-0">
              <div className="input-group input-group-lg mb-3">
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
