import axios from 'axios';
import { toast } from 'react-toastify';
import { socket } from '../App';
import {
  APICONFIRMREQ_URL,
  APIDELETEREQ_URL,
  APISENTREQ_URL,
  APIUPDATEUSERDETAILS_URL,
  API_GETSUGGESTFRIENDS,
  API_PROFILE_UPLOAD,
  API_SEARCH_USER,
} from '../config';

export const getSuggestFriends = async () => {
  try {
    let res = await axios.get(`${API_GETSUGGESTFRIENDS}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

export const SendReq = (id, refresh, notifymsg) => {
  axios
    .get(`${APISENTREQ_URL}` + id, {
      withCredentials: true,
    })
    .then((res) => {
      refresh();
      socket.emit('notification', id, notifymsg);
    })
    .catch((err) => console.log(err.message));
};

export const DeleteFriend = (id, refresh) => {
  axios
    .get(`${APIDELETEREQ_URL}` + id, {
      withCredentials: true,
    })
    .then((res) => {
      refresh();
    })
    .catch((err) => console.log(err.message));
};

export const handleConfirmRequest = (id, refresh, notifymsg) => {
  axios
    .get(`${APICONFIRMREQ_URL}${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      refresh();
      socket.emit('notification', id, notifymsg);
      toast.success('Friend added');
    })
    .catch((err) => console.log(err.message));
};

export const handleDeleteRequest = (id, refresh) => {
  axios
    .get(`${APIDELETEREQ_URL}${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      refresh();
      toast.success('Friend request cancelled');
    })
    .catch((err) => console.log(err.message));
};

export const postData = async (uid, inputs, refresh) => {
  try {
    if (inputs.firstname === '' || inputs.lastname === '')
      throw new Error('First name and Last name are required');

    await axios.post(`${APIUPDATEUSERDETAILS_URL}/${uid}`, inputs, {
      withCredentials: true,
    });
    refresh();
    toast.success('Profile Updated');
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const profilePicChange = async (user_id, file, refresh) => {
  try {
    if (!user_id) throw new Error('cant find user id');

    const fd = new FormData();
    fd.append('file', file);
    fd.append('upload_preset', 'ml_default');
    fd.append('cloud_name', 'buzzz-social-app');
    const result = await axios.post(API_PROFILE_UPLOAD, fd);

    await axios.post(
      `${APIUPDATEUSERDETAILS_URL}/${user_id}`,
      { pic_url: result.data.secure_url },
      { withCredentials: true }
    );
    refresh();

    return { message: 'Picture change successfully' };
  } catch (error) {
    return { error: true, message: error.message };
  }
};

export const searchUser = async (searchText) => {
  try {
    if (searchText.length <= 1) return { data: [] };
    return await axios.get(`${API_SEARCH_USER}`, {
      params: {
        query: searchText,
      },
    });
  } catch (error) {
    return { error: true, message: error.message };
  }
};
