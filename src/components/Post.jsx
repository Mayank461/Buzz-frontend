import React, { useState, useEffect } from "react";

export default function Post({ index, data, inclike, deslike, commentBox, userdata,reportPost }) {
  let { post_url, _id, like, dislike, comment, post_caption } = data;
  let { firstname, lastname, picture_url } = data.posted_by;
  const [commentmessage, setcommentmessage] = useState();
  // const [ownId,setOwnId] = useState("")
// const ownId= [];

  // const changeId = (pid)=>{
  //   // ownId=pid;
  //   // setOwnId(pid);
  //   ownId.push(pid)
  //   console.log(ownId);
  // }

  

  const oninputchange = (e) => {
    setcommentmessage({ ...commentmessage, [e.target.name]: e.target.value });
    
  };
  useEffect(() => {
    // console.log( _id);

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


            <div className="ms-2">{firstname + " " + lastname}</div>
          </div>


          {/* ========================================================Report System============================================================================== */}
          <div className="">
            <i className="fa-solid fa-ellipsis " id="dropdownMenuButton1" data-bs-toggle="dropdown"  >

            </i>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><div className="dropdown-item"  data-bs-target="#exampleModal" onClick={() => { reportPost(_id);}}>Report</div></li>

            </ul>
          </div>
          {/* ========================================================Report System============================================================================== */}


          {/* =============================================================Model============================================================================= */}
          {/* <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Report System</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Report Your Query</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-danger">Report</button>
                </div>
              </div>
            </div>
          </div> */}
          {/* ======================================================================== Model====================================================================================== */}







        </div>
        <div className="ms-2 mb-2">{post_caption}</div>
       {"post_url" in data? <img src={post_url} className="card-img-top rounded-3" alt="..." />:""}

        <div className="d-flex justify-content-between mt-2">
          <div className="d-flex">
            <div className="me-2">
              <i className="fa-solid fa-thumbs-up bg-primary round-img text-white p-1 me-2"></i>
              {like.length}
            </div>
            <div>
              <i className="fa-solid fa-thumbs-down bg-primary round-img text-white p-1 me-2"></i>
              {dislike.length}
            </div>
          </div>
          <div className="me-1">
            {comment.length} comments
          </div>
        </div>

        <div className="d-flex justify-content-between mt-3 border-top border-bottom p-2">
          <div className="pe-none"
            onClick={() => {
              inclike(_id);
            }}
          >
            <i className="fa-regular fa-thumbs-up me-2"></i>Like
          </div>
          <div
            onClick={() => {
              deslike(_id);
            }}
          >
            <i className="fa-regular fa-thumbs-down me-2"></i>Dislike
          </div>
          <div
            onClick={() => {
              commentBox(_id, commentmessage);
            }}
          >
            <i className="fa-regular fa-message me-2"></i>Comment
          </div>
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
