import React, { useState } from 'react';

export default function Comment({ data }) {
  const [loadmore, setloadmore] = useState(true);
  return (
    <>
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

        <div
          data-testid="cmnt"
          className={` align-self-center ${loadmore && 'text-comment'}`}
        >
          {data.message}
        </div>
      </div>
      {data?.message?.length > 335 && (
        <div
          className="seemore"
          onClick={() => {
            setloadmore((p) => !p);
          }}
        >
          {loadmore ? 'Show More' : 'Show less'}
        </div>
      )}
    </>
  );
}
