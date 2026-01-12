'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleCart = useCartStore((state) => state.toggleCart);
    const totalItems = useCartStore((state) => state.getTotalItems());

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          bg-[#F4B41A] backdrop-blur-md
          ${isScrolled
                        ? 'py-2 shadow-lg'
                        : 'py-2'
                    }
        `}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2 group">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative"
                            >
                                <Image
                                    src="/menulogo1.png"
                                    alt="Al-Noor Kesar"
                                    width={280}
                                    height={116}
                                    className="h-16 md:h-12 lg:h-14 w-auto"
                                    priority
                                />
                            </motion.div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="relative text-[#1F2937] font-bold hover:text-[#D97706] transition-colors duration-300 group"
                                    style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D97706] transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        {/* Right Side: Cart + Mobile Menu */}
                        <div className="flex items-center gap-2">
                            {/* Cart Button */}
                            <button
                                onClick={toggleCart}
                                className="relative p-2 text-[#1F2937] hover:text-[#D97706] transition-colors duration-300"
                                aria-label="Shopping Cart"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {totalItems > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 w-5 h-5 bg-[#9333EA] text-white text-xs font-bold rounded-full flex items-center justify-center"
                                    >
                                        {totalItems > 99 ? '99+' : totalItems}
                                    </motion.span>
                                )}
                            </button>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 text-[#1F2937] hover:text-[#D97706] transition-colors duration-300"
                                aria-label="Toggle Menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-80 max-w-full bg-[#FFF8F0] z-50 md:hidden shadow-2xl"
                        >
                            <div className="flex flex-col h-full p-6 pt-20">
                                {/* Close Button */}
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="absolute top-6 right-6 p-2 text-[#1F2937] hover:text-[#D97706]"
                                    aria-label="Close Menu"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                {/* Navigation Links */}
                                <nav className="flex flex-col gap-4 mt-8">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="block py-3 px-4 text-lg font-medium text-[#1F2937] hover:text-[#D97706] hover:bg-[#D97706]/10 rounded-lg transition-all duration-300"
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>

                                {/* Bottom Decoration */}
                                <div className="mt-auto pt-8 border-t border-[#1F2937]/10">
                                    <p className="text-sm text-[#374151]/70 text-center">
                                        Premium Kashmiri Saffron & Dry Fruits
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
