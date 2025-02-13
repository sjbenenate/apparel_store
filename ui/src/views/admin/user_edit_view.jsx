import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, ListGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import FormContainer from '../../components/form_container';
import {
    useGetUserInfoQuery,
    useUpdateUserMutation,
} from '../../store/api_users';
import Message from '../../components/message';
import { localTimeString } from '../../utils';
import Loader from '../../components/loader';
import { ToastContainer, toast } from 'react-toastify';

const inputSpacing = 'my-2';

const UserEditView = () => {
    const userId = useParams()?.userId;
    const {
        data: user,
        isLoading: userLoading,
        isError: userError,
        error: userErrorData,
    } = useGetUserInfoQuery(userId);

    const [updateUser, updateUserStatus] = useUpdateUserMutation();

    const [inputName, setInputName] = useState('');
    const [email, setEmail] = useState('');
    const [accessLevel, setAccessLevel] = useState('');

    const [alertMsg, setAlertMessage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user?._id) {
            setAlertMessage('No user found');
            return;
        }
        setAlertMessage(null);
        setInputName(user.name);
        setEmail(user?.email || '');
        setAccessLevel(user?.accessLevel || 0);
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`updating user`);
        try {
            setAlertMessage(null);
            const res = await updateUser({
                userId,
                name: inputName,
                email,
                accessLevel,
            }).unwrap();
            if (res._id) {
                navigate(`/admin/users/list`);
            } else {
                toast.error(res?.data?.message || res?.error?.error);
            }
        } catch (err) {
            setAlertMessage(err?.data?.message || err?.error);
        }
    };

    const getForm = () => {
        return (
            <Form onSubmit={handleSubmit}>
                <FormGroup controlId="name" className={inputSpacing}>
                    <Form.Label>Name: </Form.Label>
                    <Form.Control
                        type="text"
                        value={inputName}
                        placeholder="User Name"
                        autoComplete="name"
                        onChange={(e) => setInputName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="email" className={inputSpacing}>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                        type="text"
                        value={email}
                        placeholder="Email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="access-level" className={inputSpacing}>
                    <Form.Label>Access Level: </Form.Label>
                    <Form.Control
                        type="dropdown"
                        placeholder={user.accessLevel}
                        value={accessLevel}
                        onChange={(e) => setAccessLevel(e.target.value)}
                    />
                </FormGroup>

                <Form.Group className="my-4 d-flex justify-content-between">
                    <LinkContainer to="/admin/products/list">
                        <Button variant="light">Cancel</Button>
                    </LinkContainer>
                    <Button type="submit" variant="info" autoFocus={true}>
                        Save
                    </Button>
                </Form.Group>
            </Form>
        );
    };

    const metaInfo = () => {
        return (
            <ListGroup>
                <ListGroup.Item>
                    <strong>ID: </strong>
                    {user?._id}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Last modified on: </strong>
                    {localTimeString(user?.updatedAt)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Created on: </strong>
                    {localTimeString(user?.createdAt)}
                </ListGroup.Item>
            </ListGroup>
        );
    };

    return (
        <FormContainer>
            <ToastContainer />
            <h1>Edit User</h1>
            {alertMsg ? <Message variant="danger">{alertMsg}</Message> : null}
            {userError ? (
                <Message variant="danger">{userErrorData}</Message>
            ) : null}
            {userLoading ? (
                <Loader />
            ) : (
                <>
                    {metaInfo()}
                    {getForm()}
                </>
            )}
        </FormContainer>
    );
};

export default UserEditView;
