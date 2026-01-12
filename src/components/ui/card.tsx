'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from './button';
import { useCartStore } from '@/store/cart-store';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    discountPrice?: number | null;
    image: string;
    weight?: string;
    description?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    price,
    discountPrice,
    image,
    weight,
    description,
}) => {
    const addItem = useCartStore((state) => state.addItem);
    const openCart = useCartStore((state) => state.openCart);

    // Use discountPrice if available, otherwise use regular price
    const effectivePrice = discountPrice || price;

    const handleAddToCart = () => {
        addItem({ id, name, price: effectivePrice, image, weight });
        openCart();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover-lift"
        >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-[#FEF3E2]">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Quick Add Overlay */}
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

            {/* Product Info */}
            <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-[#1F2937] mb-1 line-clamp-1">
                    {name}
                </h3>

                {weight && (
                    <p className="text-sm text-[#374151] mb-2">{weight}</p>
                )}

                {description && (
                    <p className="text-sm text-[#374151]/80 mb-3 line-clamp-2">{description}</p>
                )}

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {discountPrice ? (
                            <>
                                <span className="text-xl font-bold text-[#D97706]">
                                    ₹{discountPrice.toLocaleString('en-IN')}
                                </span>
                                <span className="text-sm text-[#374151]/60 line-through">
                                    ₹{price.toLocaleString('en-IN')}
                                </span>
                            </>
                        ) : (
                            <span className="text-xl font-bold text-[#D97706]">
                                ₹{price.toLocaleString('en-IN')}
                            </span>
                        )}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddToCart}
                        className="md:hidden"
                    >
                        <ShoppingCart className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
