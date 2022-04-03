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

  return (
    // <BrowserRouter>
    //   <Routes>
    //     {user ? (          
    //       <Route path="/" element={<Feeds />} /> 
                    
    //     ) : (
    //       <Route path="/" element={<Login />} />
    //     )}       
    //     <Route path='/Userprofile' element={<Selfprofile />}></Route>        
    //   </Routes>
    // </BrowserRouter>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Feeds />} />      
      <Route path='/selfProfile' element={<Selfprofile />} /> 
    </Routes>
    </BrowserRouter>
  );
}

export default App;
