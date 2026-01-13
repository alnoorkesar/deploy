'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const sections = [
    {
        id: 1,
        image: '/journey/fields.jpg',
        title: 'Our Fields',
        description: 'Nestled in the pristine valleys of Pampore, our saffron fields stretch across the Karewa highlands, blessed by the pure Himalayan air.',
        stats: 'Large Fields',
    },
    {
        id: 2,
        image: '/journey/harvest.jpg',
        title: 'The Harvest',
        description: 'Each autumn, before dawn breaks, skilled hands delicately pick the crocus flowers. Three stigmas per flower—pure, crimson gold.',
        stats: '150,000+ Flowers',
    },
    {
        id: 3,
        image: '/journey/processing.jpg',
        title: 'Processing',
        description: 'Dried traditionally over low heat, our saffron retains its potent aroma, vibrant color, and therapeutic properties.',
        stats: '100% Pure',
    },
];

export default function ParallaxSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    return (
        <section ref={containerRef} className="py-20 bg-[#FEF3E2]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#D97706] font-medium text-sm tracking-widest uppercase">
                        Farm to Table
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2937] mt-4 mb-6">
                        The Journey of Authenticity
                    </h2>
                    <p className="max-w-2xl mx-auto text-[#374151] text-lg">
                        From the misty fields of Kashmir to your kitchen, every step is a testament to quality and tradition.
                    </p>
                </motion.div>

                {/* Parallax Grid */}
                <div className="space-y-24 md:space-y-32">
                    {sections.map((section, index) => (
                        <ParallaxCard
                            key={section.id}
                            section={section}
                            index={index}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface ParallaxCardProps {
    section: typeof sections[0];
    index: number;
    scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

function ParallaxCard({ section, index }: ParallaxCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'end start'],
    });

    // Different parallax speeds for variety
    const imageY = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 100 : -100, index % 2 === 0 ? -100 : 100]);
    const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

    const isReversed = index % 2 !== 0;

    return (
        <motion.div
            ref={cardRef}
            style={{ opacity }}
            className={`
        flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} 
        items-center gap-8 md:gap-12 lg:gap-20
      `}
        >
            {/* Image */}
            <motion.div
                style={{ y: imageY }}
                className="w-full md:w-1/2 relative"
            >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2937]/30 to-transparent" />

                    {/* Floating stat badge */}
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        className={`
              absolute bottom-4 ${isReversed ? 'left-4' : 'right-4'}
              px-4 py-2 bg-[#D97706] text-white rounded-lg font-bold shadow-lg
            `}
                    >
                        {section.stats}
                    </motion.div>
                </div>
            </motion.div>

            {/* Content */}
            <motion.div
                style={{ y: textY }}
                className="w-full md:w-1/2"
            >
                <motion.div
                    initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Step number */}
                    <span className="inline-block text-7xl sm:text-8xl font-heading font-bold text-[#D97706]/20 mb-2">
                        0{index + 1}
                    </span>

                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#1F2937] mb-4">
                        {section.title}
                    </h3>

                    <p className="text-[#374151] text-lg leading-relaxed">
                        {section.description}
                    </p>

                    {/* Decorative line */}
                    <div className="mt-6 w-16 h-1 bg-[#D97706] rounded-full" />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
