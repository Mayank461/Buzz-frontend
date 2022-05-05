
import React, { useEffect, useState } from 'react'

export default function Comment({ data,postId,index,senderPic,postComment ,userdata,userDetails,commentLike}) {

  const [loadmore, setloadmore] = useState(false);

  const [reply, setReply] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [commentmessage, setcommentmessage] = useState();
  const replyTo = () => {
    setloadmore(false)

    if (toggle) {
      setReply(true);
      setToggle(false);
    }
    else {
      setReply(false);
      setToggle(true);
    }

  }
  useEffect(()=>{
    console.log(userDetails.posted_by._id);
  },[])
  const oninputchange = (e) => {
    setcommentmessage({ ...commentmessage, [e.target.name]: e.target.value });
  };
  const replyComment= document.getElementById('replyComment');
  return (
    <>
      <div className="d-flex w-100 bg-light mt-1 align-items-center">
        <div className="">
          {data.picture_url ? (
            <div className="">
              <img
                data-testid='userCommentPic'
                src={data.picture_url}
                className=" mt-2 small-round-pic me-2  round-img "
                alt="..."
              />
            </div>
          ) : (
            <i className="mt-2 me-2 fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
          )}
        </div>
       
        <div data-testid='cmnt' className='text-comment && border && form-control rounded-pill' >{data.message}</div>      
      </div>






      <div className='d-flex justify-content-between'>
        <div className='d-flex'>
        <div className='seemore' onClick={()=>{commentLike(data,commentmessage,postId,data._id,senderPic,index,replyComment,userDetails.posted_by._id)}} style={{marginLeft:"65px", cursor:"pointer"}}>Like</div>
        <div className='seemore' onClick={replyTo} >reply</div>

        </div>
        <div
          className="seemore"
          onClick={() => {
            setloadmore((p) => !p);
            setReply(false);
            setToggle(true);
          }}
        > { data.replyBy.length>0 ? "see more":""}
        </div>
      </div>
      
      {reply ?

        <div className="form-control d-flex align-items-center border-0 w-75 float-end position-relative ">
         <i className="fa-solid fa-reply fa-rotate-180"></i>

          <div className="ms-2">
            {userdata.picture_url ? (
              <div className="">
                <img
                  data-testid='userCommentPic'
                  src={userdata.picture_url}
                  className=" mt-2 small-round-pic me-2  round-img "
                  alt="..."
                 
                />
              </div>
            ) : (
              <i className="mt-2 me-2 fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
            )}
          </div>
          <input
            type="text"
            id='replyComment'
            className="form-control  rounded-pill"
            placeholder="Reply to..."
            name="message"
            onChange={(e) => oninputchange(e)}
          />
          <div className="d-flex align-items-center pointer justify-content-center position-absolute end-0 me-3 rounded-circle   p-2">
            <i className="fa-solid  fa-paper-plane text-success circle p-1" onClick={()=>{postComment(data,commentmessage,postId,data._id,senderPic,index,replyComment)}}  ></i>
          </div>
        </div> :
        ""} 



  {/* reply comment section  */}
    {loadmore?
    <>
       <div className='container ms-4 '>
       {data.replyBy.map((element)=>{
         return  <> 

         <div className="d-flex align-items-center">
         <i className="fa-solid fa-reply fa-rotate-180 me-2"></i>

         {data.picture_url ? (
           <div className="">
             <img
               data-testid='userCommentPic'
               src={element.senderPic}
               className=" mt-2 small-round-pic me-2  round-img "
               alt="..."
             />
           </div>
         ) : (
           <i className="mt-2 me-2 fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
         )}
         <div data-testid='cmnt' className='text-comment && border && form-control rounded-pill' >{element.repliedMessage}</div> 
       </div>

       </>
       })}
      
       </div>

       </>
       :""}
   

  {/* reply comment section  */}

    </>
  );
}
