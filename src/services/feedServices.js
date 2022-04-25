import axios from 'axios';
import { APIGETPOST_URL } from '../config';

export const loadPost = (page, limit, setPosts, setPageLoading) => {
  page === 0 && setPageLoading(true);
  axios
    .get(`${APIGETPOST_URL}?page=${page}&limit=${limit}`, {
      withCredentials: true,
    })
    .then((res) => {
      setPosts((prev) => [...prev, ...res.data]);
      setPageLoading(false);
    })
    .catch((err) => {
      console.log(err.message);
      setPageLoading(false);
    });
};

export const totalPosts = (
  loginID,
  myPostsCount,
  setPagination,
  setPageLoading
) => {
  axios
    .get(`${APIGETPOST_URL}?page=0&limit=10000000000000000`, {
      withCredentials: true,
    })
    .then((res) => {
      // counting the total number of post of login user
      const c = res.data.filter((el) => el.posted_by._id === loginID).length;
      myPostsCount(c);
      setPagination((pre) => ({ ...pre, total: res.data.length }));
      setPageLoading(false);
    })
    .catch((err) => {
      console.log(err.message);
      setPageLoading(false);
    });
};
