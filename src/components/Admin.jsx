import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";
export default function Admin(user) {
  const [post, allPost] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const { id } = useParams();
  useEffect(() => {
    console.log(post);
    axios
      .get(`${API_URL}/posts/allPost`)
      .then((res) => {
        allPost(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [refresh]);
  const delPost = (e, id) => {
    console.log(id);
    fetch(`${API_URL}/posts/delReport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    }).then((r) => {
      setRefresh(refresh + 1);
      console.log(r);
    });
  };
  return (
    <div className="container mt-5">
      <h1 className="text-center">Admin Panel</h1>
      <hr></hr>

      <div className="container ">
        <div className="row gy-5 ">
          {post.map((element, index) => {
            if (element.report.length > 0)
              return (
                <div className="col-4   ">
                  <div className="p-3 shadow-lg bg-body rounded bg-light ">
                    <div className="">
                      <div className="card-body">
                        <h5 className="card-title">Reported Post Details</h5>
                        <hr></hr>
                        <p className="card-text fw-bold">
                          {element.post_caption}
                        </p>

                        <p className="card-text">
                          {"post_url" in element ? (
                            <img
                              className="reportedPic"
                              src={element.post_url}
                            />
                          ) : (
                            <img
                              className="reportedPic"
                              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"
                            />
                          )}
                        </p>
                        <button
                          className="btn btn-danger"
                          onClick={(e) => delPost(e, element._id)}
                        >
                          Delete this post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}
