import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Container className='my-2 max-w-sm flex items-start justify-center'>
        <Outlet />
      </Container>
    </>
  );
};

export default App;
