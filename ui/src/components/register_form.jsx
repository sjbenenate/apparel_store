import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/message';
import { useRegisterMutation } from '../store/api_users';
import { useDispatch } from 'react-redux';
import { setUserCredentials } from '../store/auth_slice';

const MIN_PW_LENGTH = 8;

const RegisterForm = ({ redirect }) => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);

    const [registerQuery, registerStatus] = useRegisterMutation();

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputPassword !== confirmPassword) {
            setAlertMessage('Passwords to not match!');
            return;
        }
        if (inputPassword.length < MIN_PW_LENGTH) {
            setAlertMessage(`The minimum password length is ${MIN_PW_LENGTH}`);
            return;
        }
        try {
            const res = await registerQuery({
                name: inputName,
                email: inputEmail,
                password: inputPassword,
            }).unwrap();
            setAlertMessage(null);
            dispatch(setUserCredentials({ ...res }));
        } catch (err) {
            const msg = err?.data?.message || err?.error;
            setAlertMessage(msg);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Register</h1>
            {alertMessage ? (
                <Message variant="danger">{alertMessage}</Message>
            ) : null}
            <Form.Group className="my-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="name"
                    autoComplete="name"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="my-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    autoComplete="email"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="my-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    autoComplete="new-password"
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="my-3" controlId="confirm-password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </Form.Group>
            <Form.Group className="d-flex flex-wrap justify-content-between">
                <Button
                    type="submit"
                    variant="info"
                    disabled={registerStatus.isLoading}
                >
                    Submit
                </Button>
                <div className="d-inline-block pt-2">
                    Already registered?{' '}
                    <span>
                        <Link
                            to={
                                redirect
                                    ? `/login?redirect=${redirect}`
                                    : '/login'
                            }
                        >
                            Login
                        </Link>
                    </span>
                </div>
            </Form.Group>
        </Form>
    );
};

export default RegisterForm;
