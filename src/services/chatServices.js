import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CHAT_SENDMSG, API_CHAT_GETCHAT } from '../config';

export const sendMessage = (roomID, message) => {
  axios
    .post(`${API_CHAT_SENDMSG}`, { roomID, message }, { withCredentials: true })
    .then((res) => {
      if (res.data.status === 200) return;
      toast.warn(res.data.message);
    })
    .catch((err) => toast.warn(err.message));
};

export const getChatByRoom = async (roomID) => {
  try {
    let res = await axios.get(`${API_CHAT_GETCHAT}/${roomID}`, {
      withCredentials: true,
    });
    if (res.data.status === 200) return res.data.message;
    toast.warn(res.data.message);
  } catch (error) {
    toast.warn(error.message);
  }
};
