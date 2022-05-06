import { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleLogout } from '../services/authServices';

export default function Navbar({ user }) {
  const [searchValue, setSearchValue] = useState('');
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
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
              <div
                className="dropdown-search w-100 position-absolute left-0"
                style={{ zIndex: 1 }}
              >
                <ul
                  className="list-group overflow-auto"
                  style={{ maxHeight: '300px' }}
                >
                  {[1, 2, 3, 4].map((i) => (
                    <li className="list-group-item">
                      <Link to={'/'} className="text-decoration-none">
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
                            <h5 className="m-0">Mahir Asrani</h5>
                            <span>mahir.asrani@tothenew.com</span>
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
