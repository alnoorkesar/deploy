'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart-store';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';
import productData from '../../client/products.json';

// Get products from JSON
const products = productData.products;

export default function BestSellers() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const x = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

    return (
        <section ref={containerRef} className="py-20 overflow-hidden bg-[#FFF8F0]">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
                >
                    <div>
                        <span className="text-[#D97706] font-medium text-sm tracking-widest uppercase">
                            Customer Favorites
                        </span>
                        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2937] mt-4">
                            Best Sellers
                        </h2>
                    </div>
                    <a
                        href="/shop"
                        className="inline-flex items-center gap-2 text-[#D97706] font-medium hover:gap-4 transition-all duration-300"
                    >
                        View All Products
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </motion.div>
            </div>

            {/* Horizontal Scroll Carousel */}
            <motion.div style={{ x }} className="relative">
                <div className="flex gap-6 px-4 sm:px-6 lg:px-8 pb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}

                    {/* View All Card */}
                    <motion.a
                        href="/shop"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: products.length * 0.1, duration: 0.5 }}
                        className="flex-shrink-0 w-72 sm:w-80 snap-start flex flex-col items-center justify-center bg-gradient-to-br from-[#D97706] to-[#B45309] rounded-2xl p-8 text-white hover:scale-105 transition-transform duration-300"
                    >
                        <ArrowRight className="w-12 h-12 mb-4" />
                        <span className="font-heading text-xl font-bold text-center">
                            Explore All Products
                        </span>
                    </motion.a>
                </div>
            </motion.div>

            {/* Custom scrollbar hide CSS */}
            <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </section>
    );
}

interface ProductCardProps {
    product: typeof products[0];
    index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);
    const openCart = useCartStore((state) => state.openCart);

    const handleAddToCart = () => {
        // Use discountPrice if available, otherwise use regular price
        const effectivePrice = product.discountPrice || product.price;
        addItem({
            id: product.id,
            name: product.name,
            price: effectivePrice,
            image: product.image,
            weight: product.weight,
        });
        openCart();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex-shrink-0 w-72 sm:w-80 snap-start group"
        >
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover-lift">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-[#FEF3E2]">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="320px"
                    />

                    {/* Badge */}
                    {product.badge && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-[#4C1D95] text-white text-xs font-medium rounded-full">
                            {product.badge}
                        </span>
                    )}

                    {/* Quick Add */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <Button
                            variant="primary"
                            size="sm"
                            onClick={handleAddToCart}
                            className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-[#D97706] text-[#D97706]" />
                        <span className="text-sm font-medium text-[#1F2937]">{product.rating}</span>
                        <span className="text-sm text-[#374151]/70">({product.reviews})</span>
                    </div>

                    <h3 className="font-heading text-lg font-semibold text-[#1F2937] mb-1">
                        {product.name}
                    </h3>

                    <p className="text-sm text-[#374151]/70 mb-3">
                        {product.weight}
                    </p>

                    <div className="flex items-center gap-2">
                        {product.discountPrice ? (
                            <>
                                <span className="text-xl font-bold text-[#D97706]">
                                    ₹{product.discountPrice.toLocaleString('en-IN')}
                                </span>
                                <span className="text-sm text-[#374151]/60 line-through">
                                    ₹{product.price.toLocaleString('en-IN')}
                                </span>
                            </>
                        ) : (
                            <span className="text-xl font-bold text-[#D97706]">
                                ₹{product.price.toLocaleString('en-IN')}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
