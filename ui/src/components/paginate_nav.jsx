import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const PaginateNav = ({ currentPage, pageCount, totalCount, baseUrl }) => {
    const totalPages = Math.ceil(totalCount / pageCount);

    let pageLinks = [];

    for (let i = 1; i <= totalPages; i++) {
        pageLinks.push(
            <LinkContainer key={i} to={`${baseUrl}/page/${i}/${pageCount}`}>
                <Pagination.Item active={currentPage === i}>
                    {i}
                </Pagination.Item>
            </LinkContainer>
        );
    }

    return <Pagination>{pageLinks}</Pagination>;
};

export default PaginateNav;
