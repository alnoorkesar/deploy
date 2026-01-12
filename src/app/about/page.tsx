'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Heart, Leaf, Award, Users } from 'lucide-react';

const values = [
    {
        icon: Leaf,
        title: 'Authenticity',
        description: 'Every product is sourced directly from the valleys of Kashmir, ensuring 100% purity and authenticity.',
    },
    {
        icon: Heart,
        title: 'Passion',
        description: 'We are passionate about preserving and sharing the rich heritage of Kashmiri produce with the world.',
    },
    {
        icon: Award,
        title: 'Quality',
        description: 'Our rigorous quality control ensures that only the finest products reach your doorstep.',
    },
    {
        icon: Users,
        title: 'Community',
        description: 'We support local farmers and artisans, helping sustain traditional practices and livelihoods.',
    },
];

const team = [
    {
        name: 'Shabir',
        role: 'Founder',
        image: '',
    },
    {
        name: 'Ishfaq',
        role: 'Offline support',
        image: '',
    },
    {
        name: 'Vishal',
        role: 'Online support',
        image: '',
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#FFF8F0] pt-24 pb-20">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="text-[#D97706] font-medium text-sm tracking-widest uppercase">
                                Our Story
                            </span>
                            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2937] mt-4 mb-6">
                                Bringing Kashmir&apos;s Treasures to Your Home
                            </h1>
                            <p className="text-[#374151] text-lg leading-relaxed mb-6">
                                Founded with a vision to share the authentic flavors of Kashmir with the world, Al-Noor Kesar is more than just a brand—it&apos;s a bridge between the pristine valleys of Kashmir and your kitchen.
                            </p>
                            <p className="text-[#374151] text-lg leading-relaxed">
                                Our journey began in the saffron fields of Pampore, where generations of farmers have cultivated the world&apos;s finest saffron. Today, we continue this legacy while embracing modern practices to ensure quality and sustainability.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="relative"
                        >
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                                {/* TODO: Replace with actual farm/team image */}
                                <Image
                                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
                                    alt="Kashmir Saffron Fields"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                            {/* Floating Stats */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: 'spring' }}
                                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl"
                            >
                                <p className="text-3xl font-bold text-[#D97706]">10+</p>
                                <p className="text-[#374151] text-sm">Years of Excellence</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-[#FEF3E2]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="text-[#D97706] font-medium text-sm tracking-widest uppercase">
                            What Drives Us
                        </span>
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1F2937] mt-4">
                            Our Values
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-white p-6 rounded-2xl shadow-lg hover-lift text-center"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D97706]/10 flex items-center justify-center">
                                    <value.icon className="w-8 h-8 text-[#D97706]" />
                                </div>
                                <h3 className="font-heading text-xl font-bold text-[#1F2937] mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-[#374151] text-sm">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="text-[#D97706] font-medium text-sm tracking-widest uppercase">
                            Meet the People
                        </span>
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#1F2937] mt-4">
                            Our Team
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="text-center group"
                            >
                                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="192px"
                                    />
                                </div>
                                <h3 className="font-heading text-xl font-bold text-[#1F2937]">
                                    {member.name}
                                </h3>
                                <p className="text-[#D97706]">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Banner */}
            <section className="py-20 bg-gradient-to-r from-[#4C1D95] to-[#3B0764] text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
                            Our Mission
                        </h2>
                        <p className="text-xl text-white/90 leading-relaxed">
                            &ldquo;To preserve the rich agricultural heritage of Kashmir while empowering local farmers and delivering the purest, most authentic products to conscious consumers worldwide.&rdquo;
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
