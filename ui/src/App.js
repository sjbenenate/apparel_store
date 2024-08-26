import { Header } from './components/header';
import { Footer } from './components/footer';
import Container from 'react-bootstrap/Container';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container className="py-3 bg-color-tertiary">
          <h1>Apparel Shop</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
