import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminTours from './pages/AdminTours';
import ScrollToTop from './components/ScrollToTop';
import './styles/tailwind.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/tours" element={<AdminTours />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
