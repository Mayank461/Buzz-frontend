import { render, screen, fireEvent } from '@testing-library/react';
import Login from "../Login";
test('should render Login Panel', () => {
  render(<Login />)
  const email_input = screen.queryByTitle('email-id');
  const pass_input = screen.queryByTitle('password');
  const loginBtn = screen.queryByTitle('login-btn');
  const gAuthBtn = screen.queryByTitle('gAuthBtn');
  expect(gAuthBtn).toBeTruthy();
  expect(email_input).toBeTruthy();
  expect(pass_input).toBeTruthy();
  expect(loginBtn).toBeTruthy();
})
describe('Change login Fields Inputs', () => {
  it('onChange', () => {
    render(<Login />);
    const email_input = screen.queryByTitle('email-id');
    const pass_input = screen.queryByTitle('password');
    fireEvent.change(email_input, { target: { value: 'abc@tothenew.com' } });
    fireEvent.change(pass_input, { target: { value: 'abc123@com' } });
    expect(email_input.value).toBe('abc@tothenew.com');
    expect(pass_input.value).toBe('abc123@com');
  });
});