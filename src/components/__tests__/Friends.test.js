import { render, screen } from '@testing-library/react';
import Friends from "../Friends";
test('should render Friends Panel', () => {
    const user = { friends: { myFriends: [], mySentRequests: [{}], myFriendRequests: [{ firstname: "testing", lastname: "testing" }] } };
    const toggleRefresh = () => setRefresh((p) => !p);
    render(<Friends user={user} refresh={toggleRefresh} />)
    const text = screen.queryByTestId('friendRequestUser').innerHTML;
    expect(text).toBe("testing testing");
})