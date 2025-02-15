import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Search = ({ baseUrl, searchKey = 'name' }) => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('search submit');
        navigate(`${baseUrl}/search/${searchKey}:${searchInput}`);
    };

    return (
        <Form className="d-flex" onSubmit={submitHandler}>
            <Form.Group controlId="search" className="d-inline-block">
                <Form.Control
                    type="text"
                    placeholder="type search here"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </Form.Group>
            <Button type="submit" variant="info">
                <FaSearch />
            </Button>
        </Form>
    );
};

export default Search;
