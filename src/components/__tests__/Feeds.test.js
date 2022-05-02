import { render, screen } from '@testing-library/react';
import Feeds from "../Feeds";
test('should render Feeds Panel', () => {
    const user = { firstname: "nothing", lastname: "nothing", friends: { myFriends: [], mySentRequests: [{}] } };
    const SFriend = [];
    render(<Feeds user={user} suggestFriend={SFriend} />)
    const text = screen.queryByTestId('userProName').innerHTML;
    expect(text).toBe("nothing nothing");

})