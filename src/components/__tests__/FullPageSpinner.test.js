import {render,screen,cleanup} from '@testing-library/react';
import FullPageSpinner from "../FullPageSpinner";
test('should render FullPageSpinner Panel', () => {
    render(<FullPageSpinner/>)
})