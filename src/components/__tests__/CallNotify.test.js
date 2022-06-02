import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import socketIOClient from 'socket.io-client';
import MockedSocket from 'socket.io-mock';
import CallNotify from '../CallNotify';
import renderer, { act } from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

jest.mock('socket.io-client');

describe('Testing connection', () => {
  let socket;

  beforeEach(() => {
    socket = new MockedSocket();
    socketIOClient.mockReturnValue(socket);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('Should not disply ~ No notification', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <CallNotify />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should disply ~ New Calling Notification', async () => {
    const user = {
      _id: 1,
      firstname: 'Test',
      lastname: 'User',
      friends: { myFriends: [], mySentRequests: [{}] },
    };

    render(
      <BrowserRouter>
        <CallNotify user={user} socket={socket} />
      </BrowserRouter>
    );

    const data = {
      id: user?._id,
      picture_url: user?.picture_url,
      name: 'abc',
    };

    socket.socketClient.emit('CallNotify', 123, data);
    // socket.socketClient.on('CallNotify', 123, (data) => console.log(data));
    // await new Promise((r) => setTimeout(r, 2000));

    const accept_btn = screen.queryByTestId('accept-btn');
    const reject_btn = screen.queryByTestId('reject-btn');
    const name = screen.queryByTestId('name-field');
    // expect(accept_btn).toBeTruthy();
    // expect(reject_btn).toBeTruthy();
    expect(name).toBeTruthy();
    // console.log(accept_btn);
  });
});
