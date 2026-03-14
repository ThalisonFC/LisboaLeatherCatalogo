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

const bags: Bag[] = [
  {
    id: 1,
    name: 'Bella Rosa',
    description: 'Uma bolsa tiracolo elegante que combina sofisticação e praticidade para o dia a dia.',
    material: 'Couro legítimo italiano',
    dimensions: '28cm x 20cm x 8cm',
    details: [
      'Fecho magnético premium',
      'Forro em suede rosa',
      'Alça ajustável em corrente dourada',
      'Bolso interno com zíper',
    ],
    image: 'https://images.unsplash.com/photo-1635865933730-e5817b5680cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWlnZSUyMGxlYXRoZXIlMjBwdXJzZSUyMG1pbmltYWx8ZW58MXx8fHwxNzcyMjI2NjUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'Rosa Claro',
  },
  {
    id: 2,
    name: 'Clássica Lisboa',
    description: 'Design atemporal inspirado nas ruas charmosas de Lisboa. Perfeita para todas as ocasiões.',
    material: 'Couro natural português',
    dimensions: '35cm x 30cm x 12cm',
    details: [
      'Compartimentos organizadores',
      'Fecho com zíper duplo',
      'Alças reforçadas em couro',
      'Base com pés metálicos protetores',
    ],
    image: 'https://images.unsplash.com/photo-1760624294514-ca40aafe3d96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGxlYXRoZXIlMjBjcm9zc2JvZHklMjBiYWd8ZW58MXx8fHwxNzcyMjI2NjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'Caramelo',
  },
  {
    id: 3,
    name: 'Mademoiselle',
    description: 'Sofisticação francesa em cada detalhe. Uma bolsa que expressa feminilidade e requinte.',
    material: 'Couro premium aveludado',
    dimensions: '32cm x 25cm x 10cm',
    details: [
      'Acabamento em ouro rosé',
      'Forro em tecido jacquard',
      'Alça de mão e tiracolo incluídas',
      'Porta-cartões integrado',
    ],
    image: 'https://images.unsplash.com/photo-1682745230951-8a5aa9a474a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhbSUyMGxlYXRoZXIlMjBoYW5kYmFnJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzIyMjY2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'Creme',
  },
];

export function Catalog() {
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
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
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
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full">
                    <span className="text-sm font-medium text-rose-500">{bag.color}</span>
                  </div>
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
                <button className="mt-6 bg-gradient-to-r from-rose-400 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-rose-300/50 transition-all">
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
