import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AboutMe from './AboutMe';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className={`font-bold text-2xl ${scrolled ? 'text-yellow-500' : 'text-yellow-400'}`}>
              MM Masáže
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-medium ${
                scrolled ? 'text-gray-700 hover:text-yellow-500' : 'text-white hover:text-yellow-400'
              }`}
            >
              Domů
            </Link>
            <Link 
              to="/sluzby" 
              className={`font-medium ${
                scrolled ? 'text-gray-700 hover:text-yellow-500' : 'text-white hover:text-yellow-400'
              }`}
            >
              Služby
            </Link>
            <Link 
              to="/cenik" 
              className={`font-medium ${
                scrolled ? 'text-gray-700 hover:text-yellow-500' : 'text-white hover:text-yellow-400'
              }`}
            >
              Ceník
            </Link>
            <Link 
              to="/kontakt" 
              className={`font-medium ${
                scrolled ? 'text-gray-700 hover:text-yellow-500' : 'text-white hover:text-yellow-400'
              }`}
            >
              Kontakt
            </Link>
            <AboutMe />
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-yellow-400"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="font-medium text-white hover:text-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Domů
              </Link>
              <Link
                to="/sluzby"
                className="font-medium text-white hover:text-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Služby
              </Link>
              <Link
                to="/cenik"
                className="font-medium text-white hover:text-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Ceník
              </Link>
              <Link
                to="/kontakt"
                className="font-medium text-white hover:text-yellow-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontakt
              </Link>
              <AboutMe />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;i