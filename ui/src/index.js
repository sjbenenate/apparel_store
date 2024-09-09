import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/bootstrap.min.css'; // Bootswatch.com solar theme
import './styles/custom.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import { NotFoundView } from './views/404_view';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundView />,
    index: true,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
