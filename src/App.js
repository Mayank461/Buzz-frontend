import './App.css';
import Login from './components/Login';
import Feeds from './components/Feeds';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Userprofile from './components/Userprofile';
import Selfprofile from './components/Selfprofile';
import Friends from './components/Friends';
import Admin from './components/Admin';
import { checkAuth } from './services/authServices';
import { getSuggestFriends } from './services/userservice';
import FullPageSpinner from './components/FullPageSpinner';
import Messenger from './components/Messenger';
import { io } from 'socket.io-client';
import { SERVER_URL } from './config';
import { toast } from 'react-toastify';
import CallNotify from './components/CallNotify';
import VideoCall from './components/VideoCall';
export const socket = io(SERVER_URL);

function App() {
  const [user, setUser] = useState(false);
  const [SFriend, setSFriend] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(user);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const toggleRefresh = () => setRefresh((p) => !p);

  useEffect(() => {
    socket.on('notification', (data) => {
      toast(data);
      toggleRefresh();
    });
  }, []);

  async function fetchUser(userState) {
    if (!userState) setLoading(true);
    let { success, user } = await checkAuth();
    success && setUser(user);
    if (user) {
      let friends = await getSuggestFriends();
      setSFriend([...friends]);
      socket.emit('login', user._id);

      // manage activity
      socket.on('onlineList', (ids) => {
        const friendlist_with_status = user.friends.myFriends.map((data) => {
          if (ids.includes(data._id)) data['online'] = true;
          return data;
        });

        setUser((prev) => ({
          ...prev,
          friends: { ...prev.friends, myFriends: friendlist_with_status },
        }));
      });

      setChangeState('online', user, setUser);
      setChangeState('offline', user, setUser);

      function setChangeState(state, user, setUser) {
        socket.on(state, (id) => {
          if (user.friends.myFriends.some(({ _id }) => _id === id)) {
            const friendlist_with_status = user.friends.myFriends.map(
              (data) => {
                let bool = state === 'online' ? true : false;
                if (data._id === id) data['online'] = bool;
                return data;
              }
            );

            setUser((prev) => ({
              ...prev,
              friends: { ...prev.friends, myFriends: friendlist_with_status },
            }));
          }
        });
      }
    }
    setLoading(false);
  }

  if (loading) {
    return <FullPageSpinner />;
  }

  return (
    <BrowserRouter>
      {user ? (
        <>
          <Navbar user={user} />
          <CallNotify user={user} socket={socket} />
          <Routes>
            <Route
              path="/"
              element={
                <Feeds
                  user={user}
                  suggestFriend={SFriend}
                  refresh={toggleRefresh}
                />
              }
            />

            <Route
              path="/chat"
              element={<Messenger user={user} socket={socket} />}
            />

            <Route
              path="/call"
              element={<VideoCall socket={socket} user={user} />}
            />

            <Route
              path="/profile"
              element={
                <Selfprofile
                  user={user}
                  refresh={toggleRefresh}
                  suggestFriend={SFriend}
                />
              }
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
            <Route exact path="/admin" element={<Admin user={user} />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
