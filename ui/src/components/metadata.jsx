import { Helmet } from 'react-helmet-async';

const Metadata = ({
    title = 'Peacock Apparel',
    description = 'New and used clothing for sale and great prices for the fashion minded.',
    keywords = 'clothing, retail',
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    );
};

export default Metadata;
