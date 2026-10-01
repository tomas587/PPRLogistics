import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import RoutesPage from './pages/RoutesPage';
import Contact from './pages/Contact';
import ServicesIndex from './pages/Services/ServicesIndex';
import RailTransport from './pages/Services/RailTransport';
import RoadTransport from './pages/Services/RoadTransport';

// Helper component to auto-scroll page to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-neutral-light font-sans text-gray-800">
        {/* Navigation Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<ServicesIndex />} />
            <Route path="/services/rail" element={<RailTransport />} />
            <Route path="/services/road" element={<RoadTransport />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}
