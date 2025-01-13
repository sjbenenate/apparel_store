import { useSelector } from 'react-redux';
import { selectAuthInfo } from '../store/auth_slice';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    const userInfo = useSelector(selectAuthInfo);

    if (!userInfo) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
