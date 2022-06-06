import axios from 'axios';
import { toast } from 'react-toastify';
import { socket } from '../App';
import {
  APICOMMENT_REPLY_URL,
  APICOMMENT_URL,
  APILIKE_URL,
  APINEWPOST,
  APIREPORT_URL,
  APIUNLIKE_URL,
  API_FEEDFILE_UPLOAD,
} from '../config';

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
  if (message === undefined || message === '') {
    toast.warn('Comment box is empty... write something');
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
        commentInput.current.value = '';
        setcommentmessage('');

        setPosts(posts.map((p) => (p._id === res.data._id ? res.data : p)));
      })
      .catch((err) => console.log(err.message));
  }
};

export const reportPost = (data, setPosts, posts) => {
  axios
    .post(
      `${APIREPORT_URL}`,
      {
        data: data,
      },
      { withCredentials: true }
    )
    .then((res) => {
      setPosts(posts.map((p) => (p._id === res.data._id ? res.data : p)));
      toast.success('Reported Successfully');
    })
    .catch((err) => console.log(err.message));
};

export const publishPost = async (
  user_id,
  data,
  notifyToList = [],
  myname = ''
) => {
  try {
    if (!user_id) throw new Error('cant find user id');
    if (!data.files && data.title === '')
      throw new Error('Image or Message required to post');

    let result;
    if (data.files) {
      const fd = new FormData();
      fd.append('file', data.files);
      fd.append('upload_preset', 'ml_default');
      fd.append('cloud_name', 'buzzz-social-app');
      result = await axios.post(`${API_FEEDFILE_UPLOAD}`, fd);
      result = result.data.secure_url;
    }
    const newPost = { pic_url: result, caption: data.title, user_id };
    !result && delete newPost['pic_url'];
    data.title === '' && delete newPost['caption'];

    const resData = await axios.post(APINEWPOST, newPost, {
      withCredentials: true,
    });
    notifyToList && socket.emit('notification_newPost', notifyToList, myname);

    return { success: 'done', data: resData.data.data };
  } catch (error) {
    return { error: error.message };
  }
};

export const postCommentReply = async (post_id, commentIndex, message) => {
  try {
    const res = await axios.post(
      `${APICOMMENT_REPLY_URL}`,
      {
        post_id,
        commentIndex,
        message,
      },
      { withCredentials: true }
    );

    return res.data;
  } catch (error) {
    return { error: error.message };
  }
};
