import { motion } from 'motion/react';

export function About() {
    return (
        <section id="sobre" className="py-20 bg-rose-50/30">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2"
                    >
                        <img
                            src="/about-image-2.jpg"
                            alt="Equipamentos e couros de marroquinaria"
                            className="rounded-2xl shadow-2xl"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 space-y-6"
                    >
                        <h2 className="text-4xl font-serif text-gray-900">Nossa História</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Nossa marca nasceu da paixão por criar bolsas com couros de alta qualidade, unindo elegância, durabilidade e cuidado em cada detalhe. Trabalhamos sempre com dedicação e carinho em cada peça, pensando em oferecer estilo e confiança para o seu dia a dia.
                        </p>
                        <div className="grid grid-cols-2 gap-6 pt-4">
                            <div>
                                <h4 className="text-2xl font-serif text-rose-500">100%</h4>
                                <p className="text-sm text-gray-500 uppercase tracking-wider">Couro Genuíno</p>
                            </div>
                            <div>
                                <h4 className="text-2xl font-serif text-rose-500">Artesanal</h4>
                                <p className="text-sm text-gray-500 uppercase tracking-wider">Feito à Mão</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
