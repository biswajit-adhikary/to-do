import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home';
import ForgotPassword from './Pages/LoginSystem/ForgotPassword/ForgotPassword';
import Login from './Pages/LoginSystem/Login/Login';
import Register from './Pages/LoginSystem/Register/Register';
import RequireAuth from './Pages/LoginSystem/RequireAuth/RequireAuth';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
