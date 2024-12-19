import Alert from 'react-bootstrap/Alert';

const Message = ({ variant = 'info', children }) => {
    // variant options: 'primary', secondary', 'success',' danger', 'warning', 'info', 'light', 'dark'
    if (!children) {
        return null;
    }

    return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
