import React, { useState, useEffect } from "react";

export default function Post({ index, data, inclike, deslike, commentBox, userdata }) {
  let { post_url, _id, like, dislike, comment, post_caption } = data;
  let { firstname, lastname, picture_url } = data.posted_by;
  const [commentmessage, setcommentmessage] = useState();
  const oninputchange = (e) => {
    setcommentmessage({ ...commentmessage, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    console.log(userdata.picture_url);

  });

  return (
    <>
      <div
        key={index}
        className="card p-3 mb-3 shadow p-3 mb-5 bg-body rounded border-0"
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center">
            {picture_url ? (
              <img
                src={picture_url}
                className="card-img-top small-round-pic  round-img"
                alt="..."
              />
            ) : (
              <i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
            )}

            {/* <img
                          src={.picture_url}
                          className="card-img-top small-round-pic  round-img"
                          alt="..."
                        /> */}

            <div className="ms-2">{firstname + " " + lastname}</div>
          </div>

          <div className="d-flex align-items-center ms-2 round-img border rounded-circle icon-bg text-dark p-2">
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        </div>
        <div className="ms-2 mb-2">{post_caption}</div>
        <img src={post_url} className="card-img-top rounded-3" alt="..." />

        <div className="d-flex justify-content-between mt-2">
          <div className="d-flex">
            <div>
              <i className="fa-solid fa-thumbs-up bg-primary round-img text-white p-1 me-2"></i>
              {like.length}
            </div>
            <div>
              <i className="fa-solid fa-thumbs-down bg-primary round-img text-white p-1 me-2"></i>
              {dislike.length}
            </div>
          </div>
          <div>1 commment</div>
        </div>

        <div className="d-flex justify-content-between mt-3 border-top border-bottom p-2">
          <button
            onClick={() => {
              inclike(_id);
            }}
          >
            <i className="fa-regular fa-thumbs-up me-2"></i>Like
          </button>
          <button
            onClick={() => {
              deslike(_id);
            }}
          >
            <i className="fa-regular fa-thumbs-down me-2"></i>Dislike
          </button>
          <button
            onClick={() => {
              commentBox(_id, commentmessage);
            }}
          >
            <i className="fa-regular fa-message me-2"></i>Comment
          </button>
        </div>
        <div className="d-flex mt-3">
        {userdata.picture_url ? (
                  <img
                    src={userdata.picture_url}
                    className="card-img-top small-round-pic me-2  round-img"
                    alt="..."
                  />
                ) : (
                  <i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
                )}
          <input
            type="text"
            className="form-control rounded-pill"
            id="comment-box"
            placeholder="Write a comment..."
            onChange={(e) => oninputchange(e)}
            name="message"
          />
        </div>
        {comment.map((element) => {
          return (
            <div className="d-flex align-items-center">
              <div>
                {element.picture_url ? (
                  <img
                    src={element.picture_url}
                    className="card-img-top small-round-pic me-2  round-img"
                    alt="..."
                  />
                ) : (
                  <i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
                )}
              </div>
              <div>{element.message}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
