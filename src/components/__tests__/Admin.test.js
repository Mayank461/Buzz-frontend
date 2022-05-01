import {render,screen,cleanup} from '@testing-library/react';
import Admin from '../Admin';

test('should render Admin Panel', () => {
    const {debug} = render(<Admin/>)
    debug();
    const text = screen.queryByTestId('reportedPosts').innerHTML;
    expect(text).toBe("No any posts");
})
