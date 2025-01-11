// Import necessary components and pages
import Home from './pages/Home';
import Resource from './pages/resource';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LogIn from './pages/login';
import Signup from './pages/signup';
import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<Resource />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/profile" element={<Profile />} />
            {/* Fallback Route for 404 */}
            <Route path="*" element={<div className="text-center py-16 text-red-600 text-xl">404 - Page Not Found</div>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
