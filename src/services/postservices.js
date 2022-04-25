import axios from "axios";
import { toast } from "react-toastify";
import {
  APICOMMENT_URL,
  APILIKE_URL,
  APIREPORT_URL,
  APIUNLIKE_URL,
  APIUSER_URL,
} from "../config";

export const Inlike = (id, setPosts, posts) => {
  axios
    .post(
      `${APILIKE_URL}`,
      {
        post_id: id,
      },
      { withCredentials: true }
    )
    .then((res) => {
      setPosts(posts.map((p) => (p._id === res.data._id ? res.data : p)));
    })
    .catch((err) => console.log(err.message));
};

export const unlike = (id, setPosts, posts) => {
  axios
    .post(
      `${APIUNLIKE_URL}`,
      {
        post_id: id,
      },
      { withCredentials: true }
    )
    .then((res) =>
      setPosts(posts.map((p) => (p._id === res.data._id ? res.data : p)))
    )
    .catch((err) => console.log(err.message));
};

export const commentBox = (
  id,
  message,
  commentInput,
  setcommentmessage,
  setPosts,
  posts
) => {
  if (message === undefined || message === "") {
    toast.warn("Comment box is empty... write something");
  } else {
    axios
      .post(
        `${APICOMMENT_URL}`,
        {
          post_id: id,
          comment: message,
        },
        { withCredentials: true }
      )
      .then((res) => {
        commentInput.current.value = "";
        setcommentmessage("");

        setPosts(posts.map((p) => (p._id === res.data._id ? res.data : p)));
      })
      .catch((err) => console.log(err.message));
  }
};

export const reportPost = (id, setPosts, posts) => {
  axios
    .post(
      `${APIREPORT_URL}`,
      {
        post_id: id,
      },
      { withCredentials: true }
    )
    .then((res) => {
      setPosts(posts.map((p) => (p._id === res.data._id ? res.data : p)));
      toast.success("Reported Successfully");
    })
    .catch((err) => console.log(err.message));
};

// export const postDetails = (id,posts,setPosts,commentBox,file,loading,setLoading) => {
//     // const commentBox = document.getElementById('comment-box').value;
//     // const file = document.getElementById('file').value;

//     // checking validation in post field
//     if (commentBox === '' && file === '') {
//       toast.warn('Please give atleast one input');
//     }
//     else if (commentBox !== '') {
//       fetch(`${APIUSER_URL}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           caption: title,
//           user_id: userData._id,
//         }),
//       }).then((r) => { setRefresh(refresh + 1) });

//       setPosts([]);
//       loadPost();
//       setLoading(false);
//       toast.success('Your post uplaoded successfully');
//       setTitle('');
//       document.getElementById('file').value = '';
//     }
//     else if(file !== ''){
//       setLoading(true);
//         const data = new FormData();
//         data.append('file', image);
//         data.append('upload_preset', 'buzz-app');
//         data.append('cloud_name', 'buzz-social-app');
//         fetch('https://api.cloudinary.com/v1_1/buzz-social-app/image/upload', {
//           method: 'post',
//           body: data,
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             fetch(`${APIUSER_URL}`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                 pic_url: data.url,
//                 user_id: userData._id,
//               }),
//             }).then((r) => {
//               setRefresh(refresh + 1)
//               setPosts([]);
//               loadPost();
//             });
//             setLoading(false);
//             toast.success('Post uploaded successfully');
//             setTitle('');
//             document.getElementById('file').value = '';
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//         }
//         else{
//           setLoading(true);
//           const data = new FormData();
//           data.append('file', image);
//           data.append('upload_preset', 'buzz-app');
//           data.append('cloud_name', 'buzz-social-app');
//           fetch('https://api.cloudinary.com/v1_1/buzz-social-app/image/upload', {
//             method: 'post',
//             body: data,
//           })
//             .then((res) => res.json())
//             .then((data) => {
//               fetch(`${APIUSER_URL}`, {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                   pic_url: data.url,
//                   caption: title,
//                   user_id: userData._id,
//                 }),
//               }).then((r) => {
//                 setRefresh(refresh + 1)
//                 setPosts([]);
//                 loadPost();
//               });
//               setLoading(false);
//               toast.success('Your post uplaoded successfully');

//               setTitle('');
//               document.getElementById('file').value = '';
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         }
//   }
