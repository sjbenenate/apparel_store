import { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import FormContainer from '../components/form_container';
import Message from '../components/message';
import { useRegisterMutation } from '../store/api_users';
import { useDispatch, useSelector } from 'react-redux';
import { setUserCredentials } from '../store/auth_slice';
import { selectAuthInfo } from '../store/auth_slice';

const RegisterView = () => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');

    const [registerQuery, registerStatus] = useRegisterMutation();

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await registerQuery({
                name: inputName,
                email: inputEmail,
                password: inputPassword,
            }).unwrap();
            dispatch(setUserCredentials({ ...res }));
        } catch (err) {
            console.error(err?.error || err?.data?.message);
        }
    };
    return (
        <Container>
            <FormContainer>
                <h1>Register</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="my-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            value={inputName}
                            onChange={(e) => setInputName(e.target.value)}
                        />
                    </Form.Group>
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
                        <Button type="submit" variant="info">
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
            </FormContainer>
        </Container>
    );
};

export default RegisterView;
