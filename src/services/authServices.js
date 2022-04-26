import axios from 'axios';
import { API_CHECKAUTH } from '../config';

export const checkAuth = async () => {
  let res = await axios.get(`${API_CHECKAUTH}`, { withCredentials: true });
  return res.data;
};
