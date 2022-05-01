import {render,screen,cleanup} from '@testing-library/react';
import Login from "../Login";
test('should render Login Panel', () => {
  const {debug} =   render(<Login/>)
})