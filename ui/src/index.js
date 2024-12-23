import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/bootstrap.min.css'; // Bootswatch.com solar theme
import './styles/custom.css';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import { HomeView } from './views/home_view';
import { NotFoundView } from './views/404_view';
import { ProductView } from './views/product_view';
import CartView from './views/cart_view';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<NotFoundView />}>
            <Route index path="/" element={<HomeView />} />
            <Route path="product/:productId" element={<ProductView />} />
            <Route path="cart" element={<CartView />} />
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
