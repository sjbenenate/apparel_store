import { Header } from './components/header';
import { Footer } from './components/footer';
import Container from 'react-bootstrap/Container';
import { HomeView } from './views/home_view';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container className="py-3">
          <HomeView />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
