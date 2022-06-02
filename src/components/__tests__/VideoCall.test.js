import VideoCall from '../VideoCall';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

const user = {
  _id: 1,
  firstname: 'Test',
  lastname: 'User',
  friends: { myFriends: [], mySentRequests: [{}] },
};

describe('layout test', () => {
  it('Snapshot match', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <VideoCall user={user} />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
