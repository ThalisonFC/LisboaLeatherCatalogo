import { Phone, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer id="footer" className="bg-gradient-to-br from-rose-50 to-pink-50 py-12">
      <div className="container mx-auto px-6">

        <div className="flex flex-col items-center text-center space-y-12">
          {/* Brand & Socials */}
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-3xl font-serif text-gray-900">Lisboa Leather</h3>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Bolsas artesanais em couro genuíno. Elegância e qualidade que atravessam gerações.
              </p>
            </div>

            <div className="flex items-center justify-center gap-8">
              <a
                href="https://wa.me/5516993213368"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 text-gray-600 hover:text-rose-500 transition-all"
              >
                <div className="h-12 w-12 rounded-full border border-rose-200 flex items-center justify-center group-hover:bg-rose-50 group-hover:border-rose-300 transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium uppercase tracking-widest">WhatsApp</span>
              </a>
              <a
                href="https://www.instagram.com/lisboa_leather/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 text-gray-600 hover:text-rose-500 transition-all"
              >
                <div className="h-12 w-12 rounded-full border border-rose-200 flex items-center justify-center group-hover:bg-rose-50 group-hover:border-rose-300 transition-colors">
                  <Instagram className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium uppercase tracking-widest">Instagram</span>
              </a>
            </div>
          </div>

          {/* Info Links removidos a pedido do cliente */}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-rose-200 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2026 Lisboa Leather. Todos os direitos reservados.</p>
          <Link to="/admin" className="hover:text-rose-500 transition-colors">Acesso Administrativo</Link>
        </div>
      </div>
    </footer>
  );
}
