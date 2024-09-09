import { useParams } from 'react-router-dom';

export const ProductView = () => {
  const routeParams = useParams();

  return (
    <div className="my-3 p-3">
      <p>This is a product page for product id = {routeParams.productId}</p>
    </div>
  );
};
