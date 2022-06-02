import { render, screen } from '@testing-library/react';
import Messenger, { ChatBubble } from '../Messenger';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import SocketMock from 'socket.io-mock';

jest.mock('socket.io-client');

describe('Testing Layout', () => {
  let socket = new SocketMock();

  const user = {
    _id: 1,
    firstname: 'Test',
    lastname: 'User',
    friends: { myFriends: [], mySentRequests: [{}] },
  };

  // const data = {
  //   id: user?._id,
  //   picture_url: user?.picture_url,
  //   name: user.firstname + ' ' + user.lastname,
  // };

  it('Snapshot test', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Messenger user={user} socket={socket} />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Snapshot Test Chat Bubble', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <ChatBubble
            my="1"
            message="Hi!"
            name="Test User"
            picture_url={undefined}
            time="8:00"
            seen={true}
            file="image.png"
          />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render file type picture', async () => {
    render(
      <BrowserRouter>
        <ChatBubble
          my="1"
          message="Hi!"
          name="Test User"
          picture_url={undefined}
          time="8:00"
          seen={true}
          file="image.png"
        />
      </BrowserRouter>
    );

    const file = screen.queryByTestId('file-picture');
    expect(file).toBeTruthy();
  });
  it('Should render file type video', async () => {
    render(
      <BrowserRouter>
        <ChatBubble
          my="1"
          message="Hi!"
          name="Test User"
          picture_url={undefined}
          time="8:00"
          seen={true}
          file="image.mp4"
        />
      </BrowserRouter>
    );

    const file = screen.queryByTestId('file-video');
    expect(file).toBeTruthy();
  });
  it('Should render file type other', async () => {
    render(
      <BrowserRouter>
        <ChatBubble
          my="1"
          message="Hi!"
          name="Test User"
          picture_url={undefined}
          time="8:00"
          seen={true}
          file="file.exe"
        />
      </BrowserRouter>
    );

    const file = screen.queryByTestId('file-other');
    expect(file).toBeTruthy();
  });
});
