import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormContainer from '../components/form_container';
import { useLoginMutation } from '../store/api_users';
import { selectAuthInfo, setUserCredentials } from '../store/auth_slice';
import Message from '../components/message';
import { MongoServerClosedError } from 'mongodb';

const LoginView = () => {
    const dispatch = useDispatch();
    const navigate = useDispatch();

    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState(``);
    const [alertMessage, setAlertMessage] = useState(null);
    const [login, loginStatus] = useLoginMutation();
    const userInfo = useSelector(selectAuthInfo);

    if (userInfo) {
        navigate('/profile');
    }

    const location = useLocation();
    console.debug(location);
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect') || '/';

    const submitHandle = async (e) => {
        e.preventDefault();
        console.log(`logging in`);
        try {
            const res = await login({
                email: inputEmail,
                password: inputPassword,
            }).unwrap();
            setAlertMessage(null);
            dispatch(setUserCredentials(res));
        } catch (err) {
            if (err.status === 401) {
                const msg = err.data.message || err.error;
                setAlertMessage(msg);
                console.warn(MongoServerClosedError);
            } else {
                console.error(err);
            }
        }
    };

    return (
        <Container>
            <FormContainer>
                <h1>Sign In</h1>
                {alertMessage ? (
                    <Message variant="danger">{alertMessage}</Message>
                ) : null}
                <Form onSubmit={submitHandle}>
                    <Form.Group className="my-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={inputEmail}
                            onChange={(e) => setInputEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="my-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={inputPassword}
                            onChange={(e) => setInputPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex flex-wrap justify-content-between">
                        <Button
                            disabled={loginStatus.isLoading}
                            type="submit"
                            variant="info"
                        >
                            Submit
                        </Button>
                        <div className="d-inline-block pt-2">
                            New Customer?{' '}
                            <span>
                                <Link to="/register">Register</Link>
                            </span>
                        </div>
                    </Form.Group>
                </Form>
            </FormContainer>
        </Container>
    );
};

export default LoginView;
