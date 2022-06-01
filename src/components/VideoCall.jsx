import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { socket } from '../App';
import Peer from 'peerjs';

const VideoCall = ({ user }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [myPeerId, setMyPeerId] = useState('');
  const [disconnected, setDisconnected] = useState(false);
  const [remotePeerID, setRemotePeerId] = useState(null);
  const [recipientData, setRecipientData] = useState(null);
  const currentUserVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerInstance = useRef(null);
  const remoteuserID = useRef(null);

  useEffect(() => {
    const peer = new Peer();
    const recipient = searchParams.get('recipient');
    remoteuserID.current = recipient;
    setRemotePeerId(searchParams.get('rpeerid'));

    peer.on('open', (id) => {
      setMyPeerId(id);

      if (!searchParams.get('rpeerid')) {
        socket.emit('CallNotify', recipient, {
          id: user._id,
          peerid: id,
          picture_url: user.picture_url,
          name: user.firstname + ' ' + user.lastname,
        });
      }
    });

    peer.on('call', (call) => {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        call.answer(mediaStream);
        call.on('stream', function (remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });
      });
    });

    peerInstance.current = peer;

    call(remotePeerID);
  }, [searchParams]);

  useEffect(() => {
    setTimeout(() => {
      document.querySelector('#fireByAccepter').click();
    }, 3000);
  }, []);

  socket.on('disconnect-call', (data) => {
    setRecipientData(data);
    setDisconnected(true);
    currentUserVideoRef.current.srcObject.getTracks().forEach((s) => s.stop());
    remoteVideoRef.current.srcObject.getTracks().forEach((s) => s.stop());
    currentUserVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;
  });

  socket.on('camToggle', (val) => (remoteVideoRef.current.style.display = val));

  function myCamOffOn() {
    if (currentUserVideoRef.current.style.display === 'none') {
      currentUserVideoRef.current.style.display = 'block';
      socket.emit('camToggle', remoteuserID.current, 'block');
    } else {
      currentUserVideoRef.current.style.display = 'none';
      socket.emit('camToggle', remoteuserID.current, 'none');
    }
  }

  function endCall() {
    setDisconnected(true);
    currentUserVideoRef.current.srcObject.getTracks().forEach((s) => s.stop());
    remoteVideoRef.current.srcObject.getTracks().forEach((s) => s.stop());
    currentUserVideoRef.current.srcObject = null;
    socket.emit('disconnect-call', remoteuserID.current, {
      id: user._id,
      picture_url: user.picture_url,
      name: user.firstname + ' ' + user.lastname,
    });
  }

  const call = (rPeerId) => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true, audio: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(rPeerId, mediaStream);

      call.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
  };

  if (disconnected) {
    return (
      <div className="position-relative vh-100 bg-dark vc-dc">
        <div className="">
          <h1 className="mb-5">Call Ended</h1>
          <img
            src={
              recipientData?.picture_url ||
              require('../images/blank-profile.png')
            }
            className="profile"
            alt="pic"
            width={'200px'}
          />
          <h2>{recipientData?.name} </h2>
          <div onClick={() => navigate('/chat')}>
            <p className="pointer h6">Go back to Chat</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="position-relative parent-vc">
      <div
        className="hidden"
        id="fireByAccepter"
        onClick={() => call(remotePeerID)}
      ></div>
      <video ref={currentUserVideoRef} muted className="myvideoScreen" />
      <video ref={remoteVideoRef} className="remoteVideoScreen" />
      <div className="vcdock d-flex justify-content-center">
        <div className={`icon-roundbox  `} onClick={myCamOffOn}>
          <i className="fa fa-video-camera" aria-hidden="true"></i>
        </div>
        <div className="icon-roundbox bg-danger" onClick={endCall}>
          <i className="fa fa-phone" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
