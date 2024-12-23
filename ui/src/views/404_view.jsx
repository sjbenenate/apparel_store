import { useRouteError } from 'react-router-dom';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

export const NotFoundView = () => {
    const routeError = useRouteError();
    console.error(routeError);

    return (
        <div>
            <Header />
            <div className="text-center">
                <h2 className="display-1">Status 404</h2>
                <p className="lead">
                    The page you are looking for could not be found!
                </p>
            </div>
            <Footer />
        </div>
    );
};
