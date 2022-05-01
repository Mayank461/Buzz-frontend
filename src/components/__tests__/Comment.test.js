import {render,screen,cleanup} from '@testing-library/react';
import Comment from '../Comment';
test('should render Comment Panel', () => {
    const data = {
        picture_url:"no pic",
        message:'no msg'
    }
    const {debug} = render(<Comment data={data}/>)
    const text = screen.queryByTestId('userCommentPic').src;
    const text1 = screen.queryByTestId('cmnt').innerHTML;
    expect(text).toBe("http://localhost/no%20pic");
    expect(text1).toBe("no msg");
})
