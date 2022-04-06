import './App.css';
import Login from './components/Login';
import Feeds from './components/Feeds';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_URL } from './config';
import Navbar from './components/Navbar';
import Userprofile from './components/Userprofile';
import Selfprofile from './components/Selfprofile';
import Friends from './components/Friends';

function App() {
  const [user, setUser] = useState(false);
  const [SFriend, setSFriend] = useState([]);
  useEffect(() => {
    fetchUser();
  }, []);

  function fetchUser() {
    axios
      .get(`${API_URL}/auth/login/success`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then(({ user, success }) => {
        success && setUser(user);
        axios
          .get(`${API_URL}/users/suggestions/${user._id}`, {
            withCredentials: true,
          })
          .then((res) => setSFriend([...res.data]))
          .catch((err) => console.log(err.message));
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <BrowserRouter>
      {user ? (
        <>
          <Navbar user={user} />
          <Routes>
            <Route
              path="/"
              element={<Feeds user={user} suggestFriend={SFriend} />}
            />
            <Route
              path="/profile"
              element={<Selfprofile user={user} suggestFriend={SFriend} />}
            />
            <Route path="/friends" element={<Friends user={user} />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="*" element={<Login fetchUser={fetchUser} />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
