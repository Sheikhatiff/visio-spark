import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'glassmorphism shadow-lg' : 'bg-transparent'}`}>
      <style>{`
        .glassmorphism {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .shine {
          position: relative;
          overflow: hidden;
        }

        .shine::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s;
        }

        .shine:hover::before {
          left: 100%;
        }
      `}</style>
      
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">AI Platform</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => navigate('/')} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Home</button>
            <button onClick={() => navigate('/features')} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Features</button>
            <button onClick={() => navigate('/howitworks')} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">How It Works</button>
            <button onClick={() => navigate('/contact')} className="text-gray-700 hover:text-emerald-600 transition-colors font-medium">Contact</button>
            <button onClick={handleSignUp} className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium shine">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-900">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <button onClick={() => { navigate('/'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-emerald-600 transition-colors font-medium">Home</button>
            <button onClick={() => { navigate('/features'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-emerald-600 transition-colors font-medium">Features</button>
            <button onClick={() => { navigate('/howitworks'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-emerald-600 transition-colors font-medium">How It Works</button>
            <button onClick={() => { navigate('/contact'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-emerald-600 transition-colors font-medium">Contact</button>
            <button onClick={() => { handleSignUp(); setIsMenuOpen(false); }} className="w-full bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
              Get Started
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;