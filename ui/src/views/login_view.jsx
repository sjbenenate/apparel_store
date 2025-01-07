import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/form_container';
import { login } from '../store/api_users';

const LoginView = () => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState(``);

    const dispatch = useDispatch();
    const submitHandle = (e) => {
        dispatch(login({ email: inputEmail, password: inputPassword }));
    };

    return (
        <Container>
            <FormContainer>
                <h1>Sign In</h1>
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
                        <Button type="submit" variant="info">
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
