import { useRef } from 'react';
import Slider from 'react-slick';
import { motion } from 'motion/react';

interface Slide {
    image: string;
    tagline: string;
    description: string;
}

const slides: Slide[] = [
    {
        image: '/hero-new-4.png',
        tagline: 'Elegância Atemporal',
        description: 'Design clássico para a mulher moderna e sofisticada.',
    },
    {
        image: '/hero-1.jpg',
        tagline: 'Artesanato que Inspira',
        description: 'Bolsas feitas à mão com os melhores couros.',
    },
];

export function HeroCarousel() {
    const sliderRef = useRef<Slider>(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
        pauseOnHover: false,
        arrows: false,
        appendDots: (dots: any) => (
            <div style={{ bottom: '30px' }}>
                <ul className="flex justify-center gap-2"> {dots} </ul>
            </div>
        ),
        customPaging: () => (
            <div className="w-3 h-3 bg-white/50 rounded-full hover:bg-white transition-all duration-300" />
        )
    };

    return (
        <section className="relative h-[80vh] w-full overflow-hidden bg-gray-900">
            <Slider ref={sliderRef} {...settings} className="h-full">
                {slides.map((slide, index) => (
                    <div key={index} className="relative h-[80vh]">
                        {/* Image with overlay */}
                        <div className="absolute inset-0">
                            <img
                                src={slide.image}
                                alt={slide.tagline}
                                className="h-full w-full object-cover scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                        </div>

                        {/* Content */}
                        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="max-w-3xl"
                            >
                                <h2 className="mb-6 text-5xl md:text-7xl font-serif text-white">
                                    {slide.tagline}
                                </h2>
                                <p className="mb-8 text-xl text-white/90 font-light max-w-2xl mx-auto">
                                    {slide.description}
                                </p>
                                <a
                                    href="#catalogo"
                                    className="inline-block bg-white text-gray-900 px-10 py-4 rounded-full font-medium hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-xl"
                                >
                                    Ver Coleção
                                </a>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
}
