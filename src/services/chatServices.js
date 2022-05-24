import axios from 'axios';
import { toast } from 'react-toastify';
import { API_CHAT_SENDMSG, API_CHAT_GETROOMS } from '../config';

export const sendMessage = (roomID, message) => {
  axios
    .post(`${API_CHAT_SENDMSG}`, { roomID, message }, { withCredentials: true })
    .then((res) => {
      if (res.data.status === 200) return;
      toast.warn(res.data.message);
    })
    .catch((err) => toast.warn(err.message));
};

export const getMyRooms = async () => {
  try {
    let res = await axios.get(`${API_CHAT_GETROOMS}`, {
      withCredentials: true,
    });
    if (res.data.status === 200) return res.data.message;
    throw Error(res.data.message);
  } catch (error) {
    toast.warn(error.message);
  }
};
