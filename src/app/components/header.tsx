import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onContactClick: () => void;
}

export function Header({ onContactClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-[#F5E6E6] border-b border-[#ebd2d2]">
      <div className="container mx-auto px-6 py-1 relative">
        <div className="flex items-center justify-center">
          {/* Brand - Centered */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:opacity-80 transition-opacity z-10"
          >
            <h1 className="text-2xl md:text-3xl font-serif text-gray-900 font-extralight">Lisboa Leather</h1>
          </a>

          {/* Navigation - Hidden on mobile, positioned relative to center brand */}
          <nav className="hidden md:flex items-center gap-12 absolute left-6 top-1/2 -translate-y-1/2">
            <a href="#sobre" className="text-sm font-medium uppercase tracking-widest text-gray-600 hover:text-rose-500 transition-colors">
              Sobre
            </a>
          </nav>

          <nav className="hidden md:flex items-center absolute right-6 top-1/2 -translate-y-1/2">
            <button
              onClick={onContactClick}
              className="text-sm font-medium uppercase tracking-widest text-gray-600 hover:text-rose-500 transition-colors"
            >
              Contato
            </button>
          </nav>

          {/* Mobile Menu Button - Absolute right on mobile */}
          <button className="md:hidden text-gray-700 p-2 absolute right-6 top-1/2 -translate-y-1/2" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-rose-100 absolute w-full left-0 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col p-6 space-y-4">
            <a
              href="#sobre"
              className="text-lg text-gray-700 hover:text-rose-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </a>
            <button
              className="text-lg text-left text-gray-700 hover:text-rose-500"
              onClick={() => {
                setIsMenuOpen(false);
                onContactClick();
              }}
            >
              Contato
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
