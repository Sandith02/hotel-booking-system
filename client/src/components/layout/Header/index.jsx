import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-primary">SriStays</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
          <Link to="/hotels" className="text-gray-700 hover:text-primary">Hotels</Link>
          <Link to="/about" className="text-gray-700 hover:text-primary">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-primary">Contact</Link>
        </nav>
        
        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-gray-700 hover:text-primary">Login</Link>
          <Link to="/register" className="btn btn-primary">Sign Up</Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow-md">
          <Link to="/" className="block py-2 text-gray-700">Home</Link>
          <Link to="/hotels" className="block py-2 text-gray-700">Hotels</Link>
          <Link to="/about" className="block py-2 text-gray-700">About</Link>
          <Link to="/contact" className="block py-2 text-gray-700">Contact</Link>
          <div className="flex flex-col py-2">
            <Link to="/login" className="py-2 text-gray-700">Login</Link>
            <Link to="/register" className="py-2 btn btn-primary inline-block text-center">Sign Up</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;