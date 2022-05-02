import { render, screen } from '@testing-library/react';
import Userprofile from "../Userprofile";



test('should render Userprofile Panel', () => {
  const user = { firstname: "kumar", lastname: "prashant", friends: { myFriends: [], mySentRequests: [{}] } };
  const SFriend = [];
  const toggleRefresh = () => setRefresh((p) => !p);
  render(<Userprofile
    myData={user}
    suggestFriend={SFriend}
    refresh={toggleRefresh}
  />)
  const text = screen.queryByTestId('userfullname').innerHTML;
  expect(text).toBe("Unknown User");
})