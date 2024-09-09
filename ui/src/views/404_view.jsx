import { useRouteError } from 'react-router-dom';

export const NotFoundView = () => {
  const routeError = useRouteError();
  console.error(routeError);

  return (
    <div className="text-center">
      <h2 className="display-1">Status 404</h2>
      <p className="lead">The page you are looking for could not be found!</p>
    </div>
  );
};
