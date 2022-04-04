import './App.css';
import Login from './components/Login';
import Feeds from './components/Feeds';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { API_URL } from './config';
import Navbar from './components/Navbar';
import Userprofile from './components/Userprofile';
import Selfprofile from './components/Selfprofile';
import Friends from './components/Friends';

function App() {
  useEffect(() => {
    axios
      .get(`${API_URL}/auth/login/success`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then(({ user, success }) => success && setUser(user))
      .catch((err) => console.log(err.message));
  }, []);

  const [user, setUser] = useState(false);
  user && console.log(user);

  return (
    <BrowserRouter>
      {user ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Feeds />} />
            <Route path="/profile" element={<Selfprofile />} />
            <Route path="/friends" element={<Friends user={user} />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
