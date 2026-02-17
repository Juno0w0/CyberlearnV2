import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';

function App() {
  return (
    <Router>
      <div className="wrapper body-index">
        <Header />
        <main className='main-content'>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

         {/*Rutas del dashboard*/}
          <Route path="/courses" element={<Courses />} />
        </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
