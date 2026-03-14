import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6">
              Elegância em Couro
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Descubra nossa coleção exclusiva de bolsas de couro artesanais.
              Cada peça é cuidadosamente elaborada para refletir sofisticação e estilo atemporal.
            </p>
            <a
              href="#catalogo"
              className="inline-block bg-gradient-to-r from-rose-400 to-pink-500 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-rose-300/50 transition-all"
            >
              Explore a Coleção
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-rose-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl" />
    </section>
  );
}
