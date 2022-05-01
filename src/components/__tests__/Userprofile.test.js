import {render,screen,cleanup} from '@testing-library/react';
import { useState } from 'react';
import Userprofile from "../Userprofile";

 

test('should render Userprofile Panel', () => {
    const user={firstname:"kumar",lastname:"prashant",friends:{myFriends:[],mySentRequests:[{}]}};
    const SFriend =[];
    const toggleRefresh = () => setRefresh((p) => !p);
   const {debug}= render( <Userprofile
        myData={user}
        suggestFriend={SFriend}
        refresh={toggleRefresh}
      />)
      const text = screen.queryByTestId('userfullname').innerHTML;
      expect(text).toBe("Unknown User");
})