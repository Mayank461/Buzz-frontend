import {render,screen,cleanup} from '@testing-library/react';
import Feeds from "../Feeds";
test('should render Feeds Panel', () => {
    const user={firstname:"nothing",lastname:"nothing",friends:{myFriends:[],mySentRequests:[{}]}};
    const SFriend =[];
   const {debug} = render(<Feeds user={user} suggestFriend={SFriend} />)
   const text = screen.queryByTestId('userProName').innerHTML;
   expect(text).toBe("nothing nothing");
  
})