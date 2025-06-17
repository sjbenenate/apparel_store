import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAddReviewMutation } from '../store/api_products';
import Loader from './loader';
import Message from './message';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthInfo } from '../store/auth_slice';

const ReviewForm = ({ productId }) => {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    const [alertMsg, setAlertMsg] = useState(null);

    const [addReview, { isLoading: addReviewLoading }] = useAddReviewMutation();

    const userInfo = useSelector(selectAuthInfo);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === '') {
            setAlertMsg('Rating is required');
            return;
        }
        try {
            setAlertMsg(null);
            const result = await addReview({ productId, rating, comment });
            if (result?.error) {
                setAlertMsg(result?.error?.data?.message);
            } else {
                clearForm();
            }
        } catch (err) {
            setAlertMsg(err?.data?.message || err?.error);
        }
    };

    const clearForm = () => {
        setComment('');
        setRating('');
        setAlertMsg(null);
    };

    return (
        <>
            <h2>Add Product Review</h2>
            {!userInfo ? (
                <div>
                    <Link to="/login">Sign in</Link> to write a review.
                </div>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="comment" className="my-2">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                            type="text"
                            value={comment}
                            placeholder="review comments"
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="rating" className="my-2">
                        <Form.Label>Rating</Form.Label>
                        <Form.Select
                            value={rating}
                            placeholder="select rating"
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option value="">Select rating</option>
                            <option value={5}>5</option>
                            <option value={4}>4</option>
                            <option value={3}>3</option>
                            <option value={2}>2</option>
                            <option value={1}>1</option>
                            <option value={0}>0</option>
                        </Form.Select>
                    </Form.Group>
                    {alertMsg && <Message variant="danger">{alertMsg}</Message>}
                    <div>
                        <Button
                            type="button"
                            variant="light"
                            className="my-2"
                            onClick={clearForm}
                            disabled={addReviewLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="info"
                            className="my-2 mx-4"
                            disabled={addReviewLoading}
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            )}
            {addReviewLoading && <Loader />}
        </>
    );
};

export default ReviewForm;
