import renderer from 'react-test-renderer';
import FullPageSpinner from '../FullPageSpinner';
test('should render FullPageSpinner Panel', () => {
  const tree = renderer.create(<FullPageSpinner />).toJSON();
  expect(tree).toMatchSnapshot();
});
