import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLoginMutation } from '../store/api_users';
import { setUserCredentials } from '../store/auth_slice';
import Message from '../components/message';
import Loader from '../components/loader';

const LoginForm = ({ redirect }) => {
    const dispatch = useDispatch();

    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState(``);
    const [alertMessage, setAlertMessage] = useState(null);
    const [login, loginStatus] = useLoginMutation();

    const submitHandle = async (e) => {
        e.preventDefault();
        console.log(`logging in`);
        try {
            const res = await login({
                email: inputEmail,
                password: inputPassword,
            }).unwrap();
            setAlertMessage(null);
            dispatch(setUserCredentials({ ...res }));
            // navigate in useEffect for simple code
        } catch (err) {
            const msg = err?.data?.message || err?.error;
            setAlertMessage(msg);
        }
    };

    return (
        <Form onSubmit={submitHandle}>
            <h1>Sign In</h1>
            {alertMessage ? (
                <Message variant="danger">{alertMessage}</Message>
            ) : null}
            <Form.Group className="my-3" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    autoComplete="email username"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="my-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    autoComplete="current-password"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="d-flex flex-wrap justify-content-between">
                <Button
                    disabled={loginStatus.isLoading}
                    type="submit"
                    variant="info"
                    style={{
                        width: '5em',
                        height: '2.3em',
                    }}
                >
                    Submit
                </Button>

                <div className="d-inline-block pt-2">
                    New Customer?{' '}
                    <span>
                        <Link
                            to={
                                redirect
                                    ? `/register?redirect=${redirect}`
                                    : '/register'
                            }
                        >
                            Register
                        </Link>
                    </span>
                </div>
            </Form.Group>
            {loginStatus.isLoading ? (
                <Loader style={{ margin: 0, height: '2em', width: '2em' }} />
            ) : null}
        </Form>
    );
};

export default LoginForm;
