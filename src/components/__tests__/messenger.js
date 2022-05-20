import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Messenger from '../Messenger';

const user = {
  friends: {
    myFriends: [],
    mySentRequests: [{}],
    myFriendRequests: [{ firstname: 'testing', lastname: 'testing' }],
  },
};

it('should render Messenger Panel', () => {
  const component = renderer.create(
    <BrowserRouter>
      <Messenger user={user} socket={[]} />
    </BrowserRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
