import { useState } from 'react';
import { Form, Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

const defaultCountOptions = [1, 2, 3, 4, 5, 10, 15, 20];

const PaginateNav = ({
    currentPage,
    initialPageCount,
    totalCount,
    baseUrl,
    countOptions = defaultCountOptions,
}) => {
    const navigate = useNavigate();
    const [pageCount, setPageCount] = useState(Number(initialPageCount));
    const totalPages = Math.ceil(totalCount / pageCount);

    let pageLinks = [];

    for (let i = 1; i <= totalPages; i++) {
        pageLinks.push(
            <LinkContainer key={i} to={`${baseUrl}/page/${i}/${pageCount}`}>
                <Pagination.Item active={Number(currentPage) === i}>
                    {i}
                </Pagination.Item>
            </LinkContainer>
        );
    }

    const handleCountDropdown = (e) => {
        setPageCount(e.target.value);
        navigate(`${baseUrl}/page/1/${pageCount}`, { replace: true });
    };

    return (
        <div className="d-flex flex-wrap">
            <Pagination>{pageLinks}</Pagination>
            <div style={{ width: '80px', marginLeft: '1em' }}>
                <Form.Select value={pageCount} onChange={handleCountDropdown}>
                    {countOptions.map((count) => (
                        <option key={count} value={count}>
                            {count}
                        </option>
                    ))}
                </Form.Select>
            </div>
        </div>
    );
};

export default PaginateNav;
