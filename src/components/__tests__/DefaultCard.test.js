import {render,screen,cleanup} from '@testing-library/react';
import DefaultCard from "../DefaultCard";
test('should render DefaultCard Panel', () => {
    render(<DefaultCard/>);
})