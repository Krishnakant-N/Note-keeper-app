import { React } from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateNote from './pages/CreateNote';
import Notes from './pages/Notes';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import toast styles

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/create-note" element={<CreateNote />} />
      </Routes>

      {/* Add ToastContainer here */}
      <ToastContainer autoClose={3000} hideProgressBar={false} />
    </>
  );
}

export default App;
