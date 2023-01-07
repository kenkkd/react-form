import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/admin/login';
import UserRegistration from './pages/admin/user-registration';
import ContactAdmin from './pages/admin/contact';
import Contact from './pages/contact';
import Home from './pages';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <div className="App">
      <SnackbarProvider>
        <Routes>
          <Route path="admin/login" element={<Login />} />
          <Route
            path="admin/user-registration"
            element={<UserRegistration />}
          />
          <Route path="admin/contact" element={<ContactAdmin />} />
          <Route path="" element={<Home />} />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </SnackbarProvider>
    </div>
  );
}

export default App;
