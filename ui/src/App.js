import { Outlet } from 'react-router-dom';
import { Header } from './components/header';
import { Footer } from './components/footer';
import Container from 'react-bootstrap/Container';

const App = () => {
    return (
        <>
            <Header />
            <main>
                <Container className="py-3">
                    <Outlet />
                </Container>
            </main>
            <Footer />
        </>
    );
};

export default App;
