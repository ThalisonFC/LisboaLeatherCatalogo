import { ShoppingBag, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-rose-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-serif text-gray-900">Lisboa Leather</h1>
              <p className="text-xs text-rose-400 tracking-wider">SINCE 2020</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#catalogo" className="text-gray-700 hover:text-rose-500 transition-colors">
              Catálogo
            </a>
            <a href="#sobre" className="text-gray-700 hover:text-rose-500 transition-colors">
              Sobre
            </a>
            <a href="#contato" className="text-gray-700 hover:text-rose-500 transition-colors">
              Contato
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
