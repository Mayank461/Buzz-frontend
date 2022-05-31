import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { socket } from '../App';
import Peer from 'peerjs';

function genRoomID(id, id2) {
  if (id > id2) return `${id}-${id2}`;
  return `${id2}-${id}`;
}

const VideoCall = ({ user }) => {
  const [searchParams] = useSearchParams();

  const [myPeerId, setMyPeerId] = useState('');
  const [remotePeerID, setRemotePeerId] = useState(null);
  const currentUserVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerInstance = useRef(null);

  const myStream = useRef(null);
  const remoteStream = useRef(null);

  useEffect(() => {
    const peer = new Peer();
    const recipient = searchParams.get('recipient');
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

    return unmount;
  }, []);

  function unmount() {
    currentUserVideoRef.current.srcObject.getTracks().forEach((s) => s.stop());
    remoteVideoRef.current.srcObject.getTracks().forEach((s) => s.stop());
  }

  const call = (rPeerId) => {
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;
      currentUserVideoRef.current.play();

      const call = peerInstance.current.call(rPeerId, mediaStream);

      call.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
        remoteVideoRef.current.play();
      });
    });
  };

  return (
    <div className="position-relative">
      <button
        onClick={() => {
          call(remotePeerID);
        }}
      >
        click me
      </button>
      <button
        onClick={() => {
          unmount();
        }}
      >
        off cam
      </button>
      <video ref={currentUserVideoRef} className="myvideoScreen" />
      <video ref={remoteVideoRef} className="remoteVideoScreen" />
    </div>
  );
};

export default VideoCall;
