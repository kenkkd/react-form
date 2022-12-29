import './App.css';
import { Routes, Route } from 'react-router-dom';
import ContactAdmin from './pages/admin/contact';
import Contact from './pages/contact';
import Home from './pages';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <Routes>
          <Route path="admin/contact" element={<ContactAdmin />} />
          <Route path="" element={<Home />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </SnackbarProvider>
    </div>
  );
}

export default App;
