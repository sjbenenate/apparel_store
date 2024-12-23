import { Link } from 'react-router-dom';

const RouteButton = ({ route = '/', text = 'Back' }) => {
    return (
        <Link className="btn btn-outline-light my-3" to={route}>
            {text}
        </Link>
    );
};

export { RouteButton };
