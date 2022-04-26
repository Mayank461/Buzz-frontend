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

export const postData = async (
  e,
  inputs,
  user,
  refresh,
  setRfresh,
  Refresh
) => {
  e.preventDefault();
  if (
    inputs.firstname == undefined ||
    inputs.lastname === undefined ||
    inputs.gender === undefined ||
    inputs.birthday === undefined
  ) {
    toast.warn('Please fill the details');
  } else if (
    inputs.firstname == '' ||
    inputs.lastname === '' ||
    inputs.gender === '' ||
    inputs.birthday === ''
  ) {
    toast.warn('Please fill the details');
  } else {
    const {
      firstname,
      lastname,
      designation,
      website,
      gender,
      birthday,
      city,
      state,
      zip,
    } = inputs;
    console.log(inputs);
    const res = await fetch(`${APIUPDATEUSERDETAILS_URL}${user._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        designation,
        website,
        gender,
        birthday,
        city,
        state,
        zip,
      }),
    })
      .then((res) => {
        toast.success('data updated successfully');
        setRfresh(Refresh + 1);
        refresh();
      })
      .catch((err) => {
        toast.error('Something wents wrong!!!');
      });

    const result = await res.json();
    if (result.status === 422 || !result) {
      console.log('success');
    } else {
      console.log('failed');
    }
  }
};
