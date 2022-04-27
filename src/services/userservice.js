import axios from 'axios';
import { toast } from 'react-toastify';
import {
  APICONFIRMREQ_URL,
  APIDELETEREQ_URL,
  APISENTREQ_URL,
  APIUPDATEUSERDETAILS_URL,
  API_GETSUGGESTFRIENDS,
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

export const SendReq = (id, refresh) => {
  axios
    .get(`${APISENTREQ_URL}` + id, {
      withCredentials: true,
    })
    .then((res) => {
      refresh();
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

export const handleConfirmRequest = (id, refresh) => {
  axios
    .get(`${APICONFIRMREQ_URL}${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      refresh();
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

export const postData = async (uid, inputs) => {
  try {
    if (inputs.firstname === '' || inputs.lastname === '')
      throw new Error('First name and Last name are required');

    await axios.post(`${APIUPDATEUSERDETAILS_URL}/${uid}`, inputs, {
      withCredentials: true,
    });

    return { message: 'Profile Updated' };
  } catch (error) {
    return { error: true, message: error.message };
  }
};
