import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className='my-2 flex items-start justify-center'>
        <Outlet />
      </div>
    </>
  );
};

export default App;
