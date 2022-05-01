import {render,screen,cleanup} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserlistWidget from "../UserlistWidget";

 

test('should render UserlistWidget Panel', () => {
    const user={friends:{myFriends:[],mySentRequests:[{}]},suggestFriend:[{firstname:"kumar",lastname:"kumar"}]};

    const toggleRefresh = () => setRefresh((p) => !p);
    const {debug}=render(<BrowserRouter> <UserlistWidget
        title={'Friends Sugesstions'}
        friendList={user.suggestFriend}
        ifEmpty="No Suggestions found"
      /> </BrowserRouter>)
      const text = screen.queryByTestId('friendName').innerHTML;
      expect(text).toBe("kumar kumar");
  
})