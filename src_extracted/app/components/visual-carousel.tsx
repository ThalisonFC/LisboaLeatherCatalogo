import { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { motion } from 'motion/react';

interface Slide {
  image: string;
  tagline: string;
  description: string;
}

const slides: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjB0ZWFtd29ya3xlbnwxfHx8fDE3NzIxOTIyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tagline: 'Collaborate Seamlessly',
    description: 'Work together with your team in real-time, no matter where you are',
  },
  {
    image: 'https://images.unsplash.com/photo-1758599543110-f9cf3903a2ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN1Y2Nlc3MlMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzIxOTc2NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tagline: 'Achieve Your Goals',
    description: 'Turn your vision into reality with powerful tools and insights',
  },
  {
    image: 'https://images.unsplash.com/photo-1573757056004-065ad36e2cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwaW5ub3ZhdGlvbiUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyMTE0Mzg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    tagline: 'Innovation at Your Fingertips',
    description: 'Stay ahead with cutting-edge technology designed for modern teams',
  },
];

export function VisualCarousel() {
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
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-purple-600 to-blue-600">
      <Slider ref={sliderRef} {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-screen">
            {/* Image with overlay */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.tagline}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-blue-900/80" />
            </div>

            {/* Content */}
            <div className="relative flex h-full flex-col items-center justify-center px-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-xl"
              >
                <h2 className="mb-4 text-5xl font-bold text-white">
                  {slide.tagline}
                </h2>
                <p className="text-xl text-white/90">{slide.description}</p>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Brand Logo */}
      <div className="absolute left-8 top-8 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-2xl text-white font-bold">W</span>
          </div>
          <span className="text-2xl font-semibold text-white">Workspace</span>
        </motion.div>
      </div>
    </div>
  );
}
