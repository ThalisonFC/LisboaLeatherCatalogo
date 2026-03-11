import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setShowSuccess(true);
            (e.target as HTMLFormElement).reset();
            setTimeout(() => setShowSuccess(false), 5000);
        }, 1500);
    };

    return (
        <section id="contato" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-gray-900 mb-4">Entre em Contato</h2>
                        <p className="text-gray-600">Envie uma mensagem para pedidos personalizados ou dúvidas sobre nossa coleção.</p>
                    </div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-rose-50/50 p-8 rounded-2xl relative"
                    >
                        <AnimatePresence>
                            {showSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-2xl p-6 text-center"
                                >
                                    <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                    <h3 className="text-xl font-serif text-gray-900 mb-2">Mensagem Enviada!</h3>
                                    <p className="text-gray-600">Obrigado pelo seu interesse. Retornaremos o contato em breve.</p>
                                    <button
                                        onClick={() => setShowSuccess(false)}
                                        className="mt-6 text-rose-500 font-medium hover:underline"
                                    >
                                        Enviar outra mensagem
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-400 outline-none bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-400 outline-none bg-white"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-400 outline-none bg-white"
                                ></textarea>
                            </div>
                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="w-full bg-gradient-to-r from-rose-400 to-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                                {!isSubmitting && <Send className="h-4 w-4" />}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
