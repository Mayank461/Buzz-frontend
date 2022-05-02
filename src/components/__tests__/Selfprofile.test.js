import { render, screen } from '@testing-library/react';
import Selfprofile from "../Selfprofile";
test('should render Selfprofile Panel', () => {
  const user = { firstname: "Hritik", lastname: "Raushan", friends: { myFriends: [], mySentRequests: [{}] } };
  const toggleRefresh = () => setRefresh((p) => !p);
  const SFriend = []
  render(<Selfprofile
    user={user}
    refresh={toggleRefresh}
    suggestFriend={SFriend}
  />)
  const text = screen.queryByTestId('userProfileName').innerHTML;
  expect(text).toBe("Hritik Raushan");
})