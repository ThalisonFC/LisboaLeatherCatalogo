import { Mail, Instagram, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-rose-50 to-pink-50 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif text-gray-900 mb-3">Lisboa Leather</h3>
            <p className="text-gray-600 leading-relaxed">
              Bolsas artesanais em couro genuíno. Elegância e qualidade que atravessam gerações.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Contato</h4>
            <div className="space-y-3">
              <a
                href="mailto:contato@lisbonleather.com"
                className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors"
              >
                <Mail className="h-4 w-4" />
                contato@lisbonleather.com
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-gray-600 hover:text-rose-500 transition-colors"
              >
                <Instagram className="h-4 w-4" />
                @lisbonleather
              </a>
              <div className="flex items-start gap-2 text-gray-600">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Rua Augusta, 123<br />Lisboa, Portugal</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">Informações</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-rose-500 transition-colors">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-rose-500 transition-colors">
                  Cuidados com Couro
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-rose-500 transition-colors">
                  Envios
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-rose-500 transition-colors">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-rose-200 text-center text-gray-600">
          <p>&copy; 2026 Lisboa Leather. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
