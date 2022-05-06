import { debounce } from 'lodash';
import { useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { handleLogout } from '../services/authServices';
import { searchUser } from '../services/userservice';

export default function Navbar({ user }) {
  const [SearchList, setSearchList] = useState([]);
  const searchref = useRef(null);
  const handleSearch = debounce(async (text) => {
    const res = await searchUser(text);
    !res.error && setSearchList(res.data);
  }, 500);

  return (
    <>
      <nav className="navbar  navbar-light bg-light p-0">
        <div className="container-fluid">
          <div className="col-4 d-flex">
            <Link to={'/'}>
              <img
                className="logo"
                alt="logo"
                src="https://mma.prnewswire.com/media/728150/TO_THE_NEW_Logo.jpg?p=facebook"
              />
            </Link>
            <div className="mx-3 w-100 align-self-center position-relative">
              <input
                type="search"
                className="caption px-4 py-2 bg-transparent w-100 border-0 border-bottom form-control"
                placeholder="Search by Name or Email"
                autocomplete="off"
                onChange={(e) => handleSearch(e.target.value)}
                ref={searchref}
              />
              <div
                className="dropdown-search w-100 position-absolute left-0"
                style={{ zIndex: 1 }}
              >
                <ul
                  className="list-group overflow-auto"
                  style={{ maxHeight: '300px' }}
                >
                  {SearchList.map((i) => (
                    <li className="list-group-item">
                      <Link
                        to={`/profile/${i._id}`}
                        className="text-decoration-none"
                        onClick={() => {
                          setSearchList([]);
                          searchref.current.value = '';
                        }}
                      >
                        <div className="row text-dark">
                          <div className="col-auto">
                            <img
                              src="https://res.cloudinary.com/buzz-social-app/image/upload/v1651815905/fzwayynsijb4hxpdf5gx.jpg"
                              alt=""
                              className="card-img-top small-round-pic round-img"
                              width={'100%'}
                            />
                          </div>
                          <div className="col-auto d-flex flex-column">
                            <h5 className="m-0">
                              {i.firstname} {i.lastname}
                            </h5>
                            <span>{i.email}</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="d-flex position-relative">
            <Link to="/profile" className="nav-link text-dark">
              <div className="d-flex">
                <div className="">
                  {'picture_url' in user ? (
                    <img
                      src={user.picture_url}
                      className="card-img-top small-round-pic  round-img"
                      alt="..."
                    />
                  ) : (
                    <i className="fa-solid fa-user fa-2x card-img-top small-round-pic  round-img bg-warning d-flex justify-content-center align-items-center"></i>
                  )}
                </div>
                <div
                  className=" align-items-center ms-2 resp-hide"
                  data-testid="userInfo"
                >
                  {'firstname' in user
                    ? user.firstname + ' ' + user.lastname
                    : 'Edit Profile'}
                </div>
              </div>
            </Link>

            <div className="d-flex align-items-center ms-2 round-img border rounded-circle icon-bg text-dark p-2">
              <Link to={'/'} className="text-dark">
                <i className="fa-solid fa-house"></i>
              </Link>
            </div>
            <div className="position-relative d-flex ">
              <Link
                to={'/friends'}
                className="d-flex align-items-center  ms-2 round-img border rounded-circle icon-bg text-dark p-2 "
              >
                <i className="fa-solid fa-user"></i>
              </Link>
              <div
                className="round-img bg-danger p-1 text-white incoming position-absolute bottom-50 end-0"
                title="friend_req_count"
              >
                {user.friends.myFriendRequests.length}
              </div>
            </div>
            <div
              title="logout-btn"
              onClick={handleLogout}
              className="d-flex align-items-center ms-2 me-3 round-img border rounded-circle icon-bg text-dark p-2 pointer"
            >
              <i className="fa fa-sign-out "></i>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
