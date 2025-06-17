import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import FormContainer from '../components/form_container';
import { selectAuthInfo } from '../store/auth_slice';
import LoginForm from '../components/login_form';
import RegisterForm from '../components/register_form';
import Metadata from '../components/metadata.jsx';

const AuthView = ({ signInType }) => {
    const navigate = useNavigate();

    const userInfo = useSelector(selectAuthInfo);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');

    useEffect(() => {
        if (userInfo && redirect) {
            navigate(redirect);
        } else if (userInfo) {
            navigate('/profile');
        }
    }, [userInfo, redirect]);

    const FormComponent = signInType === 'login' ? LoginForm : RegisterForm;

    return (
        <Container>
            <Metadata title={`Peacock Apparel - ${signInType}`} />
            <FormContainer>
                <FormComponent redirect={redirect} />
            </FormContainer>
        </Container>
    );
};

export default AuthView;
