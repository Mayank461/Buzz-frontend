import './App.css';
import Login from './components/Login';
import Feeds from './components/Feeds';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { API_URL } from './config';
import Navbar from './components/Navbar';
import Userprofile from './components/Userprofile';
import Selfprofile from './components/Selfprofile';
import Friends from './components/Friends';
import Admin from './components/Admin';
import AdminLogin from './components/AdminLogin';

function App() {
  const [user, setUser] = useState(false);
  const [SFriend, setSFriend] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [admin,setAdmin] = useState(false);


  useEffect(() => {
    fetchUser();
    
  }, [refresh]);

  const toggleRefresh = () => setRefresh((p) => !p);

  function fetchUser() {
    axios
      .get(`${API_URL}/auth/login/success`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then(({ user, success }) => {
      
        success && setUser(user);
        user &&
          axios
            .get(`${API_URL}/users/friends/suggestions`, {
              withCredentials: true,
            })
            .then((res) => setSFriend([...res.data]))
            .catch((err) => console.log(err.message));
      })
      .catch((err) => console.log(err));

    console.log(SFriend);
  }

  return (
    <BrowserRouter>
      {user ? (
        <>
          <Navbar user={user}  />
          <Routes>
            <Route
              path="/"
              element={<Feeds user={user} suggestFriend={SFriend} />}
            />
            <Route
              path="/profile"
              element={<Selfprofile user={user} refresh={toggleRefresh} suggestFriend={SFriend} />}
            />
            <Route
              exact
              path="/friends"
              element={<Friends user={user} refresh={toggleRefresh} />}
            />
            <Route
              exact
              path="/profile/:id/"
              element={
                <Userprofile
                  myData={user}
                  suggestFriend={SFriend}
                  refresh={toggleRefresh}
                />
              }
            />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route path="*" element={<Login fetchUser={fetchUser} />} />
            {/* <Route exact path="/admin" element={<Admin user={user}/>} /> */}
            <Route exact path="/adminLog" element={<AdminLogin/>} />
            <Route exact path="/admin" element={<Admin/>} />

          </Routes>
        </>
      )}


      {/* {admin?(<>
      <Routes>
      <Route exact path="/adminLog" element={<AdminLogin/>} />
      </Routes>
      </>):(<>
        <Routes>
        <Route exact path="/admin" element={<Admin/>} />
        </Routes>
      </>)} */}

 
    </BrowserRouter>
  );
}

export default App;
