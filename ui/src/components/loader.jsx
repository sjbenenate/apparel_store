import Spinner from 'react-bootstrap/Spinner';

const Loader = ({ variant = 'info', style }) => {
    const defaultStyle = {
        height: '100px',
        width: '100px',
        margin: '40px auto',
        display: 'block',
    };
    const customStyles = style ? style : {};
    return (
        <Spinner
            animation="border"
            variant={variant}
            style={{ ...defaultStyle, ...customStyles }}
        />
    );
};

export default Loader;
