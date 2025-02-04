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
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import store from './store/store';
import App from './App';
import { HomeView } from './views/home_view';
import { NotFoundView } from './views/404_view';
import { ProductView } from './views/product_view';
import CartView from './views/cart_view';
import AuthView from './views/auth_view';
import ProfileView from './views/profile_view';
import ShippingView from './views/shipping_view';
import PrivateRoute from './components/private_route';
import PaymentView from './views/payment_view';
import OrderConfirmationView from './views/order_confirmation_view';
import OrderView from './views/order_view';
import ProfileEditView from './views/profile_edit_view';
import AdminRoute from './components/admin_route';
import OrdersListView from './views/admin/orders_list_view';
import ProductsListView from './views/admin/products_list_view';
import ProductCreateView from './views/admin/product_create_view';
import ProductEditView from './views/admin/product_edit_view';
import UsersListView from './views/admin/users_list_view';
import { ACCESS_LEVELS } from './constants';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<NotFoundView />}>
            <Route index path="/" element={<HomeView />} />
            <Route path="product/:productId" element={<ProductView />} />
            <Route path="cart" element={<CartView />} />
            <Route path="login" element={<AuthView signInType="login" />} />
            <Route
                path="register"
                element={<AuthView signInType="register" />}
            />
            <Route element={<PrivateRoute />}>
                <Route path="shipping" element={<ShippingView />} />
                <Route path="payment" element={<PaymentView />} />
                <Route
                    path="orderConfirmation"
                    element={<OrderConfirmationView />}
                />
                <Route path="order/:orderId" element={<OrderView />} />
                <Route path="profile" element={<ProfileView />} />
                <Route path="profile/edit" element={<ProfileEditView />} />
            </Route>
            <Route
                element={<AdminRoute accessLevel={ACCESS_LEVELS.MAINTAINER} />}
            >
                <Route path="admin/orders/list" element={<OrdersListView />} />
                <Route
                    path="admin/products/list"
                    element={<ProductsListView />}
                />
                <Route
                    path="admin/products/new"
                    element={<ProductCreateView />}
                />
                <Route
                    path="admin/products/edit/:productId"
                    element={<ProductEditView />}
                />
            </Route>
            <Route element={<AdminRoute accessLevel={ACCESS_LEVELS.ADMIN} />}>
                <Route path="admin/users/list" element={<UsersListView />} />
            </Route>
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PayPalScriptProvider>
                <RouterProvider router={router} />
            </PayPalScriptProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
