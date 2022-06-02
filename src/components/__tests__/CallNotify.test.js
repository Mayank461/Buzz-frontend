import { render, screen } from '@testing-library/react';
import CallNotify from '../CallNotify';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import SocketMock from 'socket.io-mock';

jest.mock('socket.io-client');

describe('Testing connection', () => {
  let socket = new SocketMock();

  it('Should disply ~ New Calling Notification', async () => {
    const user = {
      _id: 1,
      firstname: 'Test',
      lastname: 'User',
      friends: { myFriends: [], mySentRequests: [{}] },
    };
    const data = {
      id: user?._id,
      picture_url: user?.picture_url,
      name: user.firstname + ' ' + user.lastname,
    };

    render(
      <BrowserRouter>
        <CallNotify user={user} socket={socket} />
      </BrowserRouter>
    );
    socket.socketClient.emit('CallNotify', 123, data);

    await new Promise((r) => setTimeout(r, 2000));

    const name = screen.queryByTestId('name-field');
    expect(name).toBeTruthy();

    const accept_btn = screen.queryByTestId('accept-btn');
    expect(accept_btn).toBeTruthy();

    const reject_btn = screen.queryByTestId('reject-btn');
    expect(reject_btn).toBeTruthy();
  });
});
