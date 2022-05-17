import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App';
import { ToastContainer } from 'react-toastify';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <>
    <App />
    <ToastContainer />
  </>
);
