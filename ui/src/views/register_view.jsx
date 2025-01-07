import { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/form_container';
import Message from '../components/message';

const RegisterView = () => {
    const [inputEmail, setInputEmail] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('registering user...');
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
                                <Link to="/login">Login</Link>
                            </span>
                        </div>
                    </Form.Group>
                </Form>
            </FormContainer>
        </Container>
    );
};

export default RegisterView;
