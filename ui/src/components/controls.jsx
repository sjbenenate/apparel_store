import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const RouteButton = ({ to = '/', text = 'Back', className = '', children }) => {
    return (
        <Link className={`btn btn-outline-light ${className}`} to={to}>
            {text || children}
        </Link>
    );
};

const QtySelect = ({ currentQty, qtyInStock, onChange }) => {
    if (!qtyInStock) return;
    return (
        <Form.Select
            value={currentQty}
            disabled={!qtyInStock}
            onChange={onChange}
        >
            {[...Array(qtyInStock).keys()].map((i) => {
                const v = i + 1;
                return (
                    <option key={v} value={v}>
                        {v}
                    </option>
                );
            })}
        </Form.Select>
    );
};

export { RouteButton, QtySelect };
