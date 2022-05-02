import { render, screen } from '@testing-library/react';
import Post from "../Post";
test('should render Post Panel', () => {
  const index = "";
  const element = { posted_by: { firstname: "Mayank", lastname: "Jaggi" }, like: [{}], dislike: [{}], comment: [{}] };
  const like = "";
  const dislike = "";
  const commentBox = "";
  const userData = { _id: "56789" };
  const report = "";
  render(<Post
    index={index}
    data={element}
    inclike={like}
    deslike={dislike}
    commentBox={commentBox}
    userdata={userData}
    reportPost={report}
    uid={userData._id}
  />)
  const text = screen.queryByTestId('whoPosted').innerHTML;
  expect(text).toBe("Mayank Jaggi");

})