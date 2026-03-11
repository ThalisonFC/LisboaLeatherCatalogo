import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shield, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Bag {
  id: number;
  name: string;
  description: string;
  material: string;
  dimensions: string;
  details: string[];
  image: string;
  color: string;
}

interface CatalogProps {
  onRequestInfo: () => void;
}

export function Catalog({ onRequestInfo }: CatalogProps) {
  const [bags, setBags] = useState<Bag[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setBags(data))
      .catch(err => console.error('Erro ao carregar catálogo:', err));
  }, []);
  return (
    <section id="catalogo" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
              Nossa Coleção
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Peças exclusivas que celebram a arte do couro genuíno
            </p>
          </motion.div>
        </div>

        {/* Bags Grid */}
        <div className="space-y-24">
          {bags.map((bag, index) => (
            <motion.div
              key={bag.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-12 items-center`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                  <ImageWithFallback
                    src={bag.image}
                    alt={bag.name}
                    className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div>
                  <h3 className="text-3xl font-serif text-gray-900 mb-3">{bag.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{bag.description}</p>
                </div>

                {/* Material & Dimensions */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 bg-rose-50 px-4 py-2 rounded-full">
                    <Sparkles className="h-4 w-4 text-rose-500" />
                    <span className="text-sm text-gray-700">{bag.material}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full">
                    <Shield className="h-4 w-4 text-pink-500" />
                    <span className="text-sm text-gray-700">{bag.dimensions}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-rose-400" />
                    Detalhes Especiais
                  </h4>
                  <ul className="space-y-2">
                    {bag.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-600">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={onRequestInfo}
                  className="mt-6 bg-gradient-to-r from-rose-400 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-rose-300/50 transition-all text-center"
                >
                  Solicitar Informações
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
