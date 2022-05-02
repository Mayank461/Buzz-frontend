import { render, screen} from '@testing-library/react';
import Admin from '../Admin';

test('should render Admin Panel', () => {
    render(<Admin />)
    const text = screen.queryByTestId('reportedPosts').innerHTML;
    expect(text).toBe("No any posts");
})
