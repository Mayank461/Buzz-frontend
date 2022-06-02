import { render, screen, waitFor } from '@testing-library/react';
import CallNotify from '../CallNotify';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import SocketMock from 'socket.io-mock';

jest.mock('socket.io-client');

describe('Testing connection', () => {
  let socket = new SocketMock();

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

  it('Should not disply ~ No notification', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <CallNotify user={user} socket={socket} />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should display ~ New Calling Notification', async () => {
    render(
      <BrowserRouter>
        <CallNotify user={user} socket={socket} />
      </BrowserRouter>
    );
    socket.socketClient.emit('CallNotify', 123, data);

    await new Promise((r) => setTimeout(r, 100));

    const name = screen.queryByTestId('name-field');
    expect(name).toBeTruthy();
    expect(name).toHaveTextContent(data.name);

    const accept_btn = screen.queryByTestId('accept-btn');
    expect(accept_btn).toBeTruthy();

    const reject_btn = screen.queryByTestId('reject-btn');
    expect(reject_btn).toBeTruthy();
  });
});
