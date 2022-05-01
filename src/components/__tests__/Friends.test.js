import {render,screen,cleanup} from '@testing-library/react';
import Friends from "../Friends";
test('should render Friends Panel', () => {
    const user={friends:{myFriends:[],mySentRequests:[{}],myFriendRequests:[{firstname:"testing",lastname:"testing"}]}};
    const toggleRefresh = () => setRefresh((p) => !p);
    const {debug} = render(<Friends user={user} refresh={toggleRefresh} />)
    const text = screen.queryByTestId('friendRequestUser').innerHTML;
    expect(text).toBe("testing testing");
})