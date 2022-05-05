import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadPost({ userpic, name, onPublish }) {
  const pickFile = useRef(null);
  const [newPost, setNewPost] = useState({ title: '', files: undefined });

  return (
    <div className="shadow p-3 mb-4 bg-body rounded">
      <div className="d-sm-flex align-items-center">
        <div className="">
          {userpic ? (
            <img
              src={userpic}
              className="d-none d-sm-block card-img-top small-round-pic  round-img"
              alt="..."
            />
          ) : (
            <i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
          )}
        </div>
        <div className="w-100 ms-2 me-2">
          <input
            type="text"
            id="comment-box"
            className="caption p-2 rounded-pill form-control"
            placeholder={`What's on your mind ${name} ?`}
            value={newPost.title}
            onChange={(e) =>
              setNewPost((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
          />
        </div>

        <div className="text-center d-flex align-items-center">
          <div
            className="btn d-flex pickFile"
            onClick={() => pickFile.current?.click()}
          >
            <i className="fa-solid fa-photo-film"></i> Photo/video
          </div>
          <input
            ref={pickFile}
            type="file"
            accept=".jpg, .png, .mp4"
            className="d-none"
            id="file"
            onChange={(e) => {
              if (e.target.files[0].size > 10 * 1000000) {
                setNewPost((prev) => ({
                  ...prev,
                  files: undefined,
                }));
                toast.error('file size should be less than 10MB');
                return;
              }

              setNewPost((prev) => ({
                ...prev,
                files: e.target.files[0],
              }));
            }}
          />
        </div>
      </div>

      <div className="my-3 d-flex align-items-center">
        {newPost.files &&
          (newPost.files.type === 'video/mp4' ? (
            <video
              controls
              width="100%"
              src={URL.createObjectURL(newPost.files)}
            >
              Your browser does not support the video.
            </video>
          ) : (
            <img
              src={URL.createObjectURL(newPost.files)}
              className="card-img-top rounded-3"
              alt="..."
            />
          ))}
      </div>

      <div className="text-center d-grid gap-2 w-100 mt-2 text-center mt-2">
        <button
          className="btn btn-success rounded-pill"
          onClick={() => {
            onPublish(newPost);
            setNewPost({ title: '', files: undefined });
          }}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadPost;
