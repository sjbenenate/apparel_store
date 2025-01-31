import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthInfo } from '../store/auth_slice';
import { useProfileUpdateMutation } from '../store/api_users';
import Message from '../components/message';
import FormContainer from '../components/form_container';
import { RouteButton } from '../components/controls';
import { setUserCredentials } from '../store/auth_slice';
import { useNavigate } from 'react-router-dom';

const ProfileEditView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userInfo = useSelector(selectAuthInfo);

    const [inputEmail, setInputEmail] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);

    const [updateProfile, profileUpdateStatus] = useProfileUpdateMutation();

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        console.log('update submit handler');
        try {
            const res = await updateProfile({
                _id: userInfo._id,
                name: inputName,
                email: inputEmail,
                password: inputPassword,
            }).unwrap();
            dispatch(setUserCredentials(res));
            navigate('/profile');
        } catch (err) {
            setAlertMessage(err?.error || err?.data?.message);
        }
    };

    const inputClassName = 'my-2';

    return (
        <FormContainer>
            <h1>Edit Profile</h1>
            {alertMessage ? (
                <Message variant="danger">{alertMessage}</Message>
            ) : null}
            <Form onSubmit={handleProfileUpdate}>
                <Form.Group controlId="name" className={inputClassName}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder={userInfo?.name}
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="email" className={inputClassName}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder={userInfo?.email}
                        value={inputEmail}
                        onChange={(e) => setInputEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="my-3" controlId="password">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        autoComplete="new-password"
                        value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="my-3" controlId="confirm-password">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                        type="password"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <div className="d-flex justify-content-between flex-wrap">
                    <RouteButton to="/profile" text="Cancel" />
                    <Button
                        type="submit"
                        variant="info"
                        style={{ minWidth: '6em' }}
                        disabled={profileUpdateStatus.isLoading}
                    >
                        Save
                    </Button>
                </div>
            </Form>
        </FormContainer>
    );
};

export default ProfileEditView;
