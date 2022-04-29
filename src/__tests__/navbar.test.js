import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import { MemoryRouter as Router } from 'react-router-dom';

describe('Navbar test', () => {
  it('Navbar render with user data', () => {
    const user = {
      picture_url: 'https://user.com/img.png',
      firstname: 'John',
      lastname: 'Doe',
      friends: { myFriendRequests: [0, 0, 0] },
    };

    render(
      <Router>
        <Navbar user={user} />
      </Router>
    );

    expect(screen.queryByTitle('displayname')).toHaveTextContent(
      user.firstname + ' ' + user.lastname
    );
    expect(screen.getByTitle('friend_req_count')).toHaveTextContent(
      user.friends.myFriendRequests.length
    );
    expect(screen.getByTitle('logout-btn')).toBeTruthy();
  });

  it('Navbar render without user data', () => {
    const user = {
      friends: { myFriendRequests: [] },
    };

    render(
      <Router>
        <Navbar user={user} />
      </Router>
    );

    expect(screen.queryByTitle('displayname')).toHaveTextContent(
      'Edit Profile'
    );
    expect(screen.getByTitle('friend_req_count')).toHaveTextContent(
      user.friends.myFriendRequests.length
    );
    expect(screen.getByTitle('logout-btn')).toBeTruthy();
  });
});
