'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        image: '/hero/slide1.jpg',
        isVideo: false,
        title: 'The Gold of Kashmir',
        subtitle: 'Premium Saffron from the Heart of Pampore',
        description: 'Discover the world\'s finest saffron, handpicked from the valleys of Kashmir',
        duration: 5000, // 5 seconds
    },
    {
        id: 2,
        image: '/hero/slide2.jpg',
        isVideo: false,
        title: 'Harvested by Young Thoughtful Minds',
        subtitle: 'Supporting Local Communities',
        description: 'Every strand tells a story of dedication and pure craftsmanship',
        duration: 5000, // 5 seconds
    },
    {
        id: 3,
        image: '/hero/slide3.mp4',
        isVideo: true,
        title: 'Pure. Authentic. Premium.',
        subtitle: 'From Our Fields to Your Table',
        description: 'Experience the true essence of Kashmiri flavors',
        duration: 15000, // 15 seconds
    },
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    // Auto-advance slides with dynamic timing
    useEffect(() => {
        const timer = setTimeout(() => {
            nextSlide();
        }, slides[currentSlide].duration);

        return () => clearTimeout(timer);
    }, [currentSlide, nextSlide]);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction > 0 ? '-100%' : '100%',
            opacity: 0,
        }),
    };

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Slides */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { duration: 0.1 },
                        opacity: { duration: 0.1 },
                    }}
                    className="absolute inset-0"
                >
                    {/* Background Image/Video with Ken Burns Effect */}
                    <div className="absolute inset-0 ken-burns">
                        {slides[currentSlide].isVideo ? (
                            <video
                                key={currentSlide}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src={slides[currentSlide].image} type="video/mp4" />
                            </video>
                        ) : (
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                            />
                        )}
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Content */}
                    <div className="relative h-full flex items-center">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="max-w-2xl"
                            >
                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-white font-medium text-sm sm:text-base tracking-widest uppercase mb-4"
                                >
                                    {slides[currentSlide].subtitle}
                                </motion.p>

                                {/* Title */}
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className={`font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight ${currentSlide === 0
                                        ? 'bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#F4B41A] bg-clip-text text-transparent'
                                        : 'text-white'
                                        }`}
                                >
                                    {slides[currentSlide].title}
                                </motion.h1>

                                {/* Description */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="text-white/80 text-lg sm:text-xl mb-8 max-w-lg"
                                >
                                    {slides[currentSlide].description}
                                </motion.p>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="flex flex-wrap gap-4"
                                >
                                    <a
                                        href="/shop"
                                        className="inline-flex items-center px-8 py-4 bg-[#D97706] hover:bg-[#B45309] text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                                    >
                                        Shop Now
                                    </a>
                                    <a
                                        href="/about"
                                        className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#1F2937] font-medium rounded-lg transition-all duration-300"
                                    >
                                        Our Story
                                    </a>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
                <button
                    onClick={prevSlide}
                    className="pointer-events-auto p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all duration-300 hover:scale-110 opacity-30 md:opacity-100 hover:opacity-100"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="pointer-events-auto p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all duration-300 hover:scale-110 opacity-30 md:opacity-100 hover:opacity-100"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentSlide ? 1 : -1);
                            setCurrentSlide(index);
                        }}
                        className={`
              h-2 rounded-full transition-all duration-300
              ${index === currentSlide
                                ? 'w-12 bg-[#D97706]'
                                : 'w-2 bg-white/50 hover:bg-white/80'
                            }
            `}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 text-white/70"
            >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-px h-8 bg-gradient-to-b from-white/70 to-transparent"
                />
            </motion.div>
        </section>
    );
}
