import React, { useState } from 'react';
import { postCommentReply } from '../services/postservices';

export default function Comment({ data, postId, commentIndex, user }) {
  const [loadmore, setloadmore] = useState(true);
  const [reply, openReply] = useState(false);
  const [replyMsg, setReplyMsg] = useState('');

  async function pushReply(e) {
    e.preventDefault();
    if (replyMsg === '') return;
    await postCommentReply(postId, commentIndex, replyMsg);
    data.reply.push({
      user_id: {
        firstname: user.firstname,
        lastname: user.lastname,
        picture_url: user.picture_url,
        timestamp: Date.now(),
        likes: [],
      },
      message: replyMsg,
    });
    setReplyMsg('');
  }

  return (
    <div className="mb-3">
      <div className="d-flex container">
        {data.picture_url ? (
          <img
            data-testid="userCommentPic"
            src={data.picture_url}
            className=" mt-2 small-round-pic me-2  round-img "
            alt="..."
          />
        ) : (
          <i className="mt-2 me-2 fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
        )}
        <div className="d-flex flex-column w-100 mt-2">
          <div
            data-testid="cmnt"
            className={` align-self-start ${loadmore && 'text-comment'}`}
          >
            {data?.message?.length > 130 && loadmore
              ? data.message.substring(0, 130) + ' . . . '
              : data.message}
          </div>
          {!reply && (
            <div className="mb-3 replyTo" onClick={() => openReply(true)}>
              Reply
            </div>
          )}

          {data?.message?.length > 130 && (
            <div
              className="seemore"
              onClick={() => {
                setloadmore((p) => !p);
              }}
            >
              {loadmore ? 'Show More' : 'Show less'}
            </div>
          )}

          {data?.reply?.map((x) => (
            <div className="d-flex my-2">
              {x.user_id.picture_url ? (
                <img
                  data-testid="userCommentPic "
                  src={x.user_id.picture_url}
                  className=" small-round-pic round-img "
                  alt="..."
                />
              ) : (
                <i className="mt-2 me-2 fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
              )}
              <div data-testid="cmnt" className={` align-self-start ms-1`}>
                <p className="p-0 m-0">
                  {x.user_id.firstname + ' ' + x.user_id.lastname}
                </p>
                <p className="p-0 m-0">{x.message}</p>
              </div>
            </div>
          ))}

          {reply && (
            // <div className="d-flex align-items-center">
            <form
              onSubmit={pushReply}
              className="d-flex align-items-center"
              autoComplete="off"
            >
              <input
                type="text"
                id="replyComment"
                className="form-control  rounded-pill"
                placeholder="Reply message..."
                name="message"
                value={replyMsg}
                onChange={(e) => setReplyMsg(e.target.value)}
                required
              />

              <i
                className="fa-solid  fa-paper-plane text-success circle p-2 pointer"
                onClick={pushReply}
              ></i>
              <i
                className="fa-solid  fa-close text-danger circle p-2 pointer"
                onClick={() => openReply(false)}
              ></i>
            </form>
            // </div>
          )}
        </div>
      </div>
    </div>
  );
}
