import { render, screen } from '@testing-library/react';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';



test('should render Navbar Panel', () => {
    const user = { firstname: "John", lastname: "Doe", friends: { myFriends: [], mySentRequests: [{}], myFriendRequests: [{}] } };
    render(<BrowserRouter> <Navbar user={user} /> </BrowserRouter>)
    const text = screen.queryByTestId('userInfo').innerHTML;
    expect(text).toBe("John Doe");
})