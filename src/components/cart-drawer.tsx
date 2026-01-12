'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';
import { Button } from '@/components/ui/button';

export default function CartDrawer() {
    const router = useRouter();
    const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/50 z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#FFF8F0] z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-[#1F2937]/10">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-6 h-6 text-[#D97706]" />
                                <h2 className="font-heading text-xl font-bold text-[#1F2937]">
                                    Your Cart
                                </h2>
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 text-[#1F2937] hover:text-[#D97706] transition-colors"
                                aria-label="Close Cart"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-24 h-24 bg-[#D97706]/10 rounded-full flex items-center justify-center mb-4"
                                    >
                                        <ShoppingBag className="w-12 h-12 text-[#D97706]" />
                                    </motion.div>
                                    <h3 className="font-heading text-lg font-semibold text-[#1F2937] mb-2">
                                        Your cart is empty
                                    </h3>
                                    <p className="text-[#374151]/70 text-sm mb-6">
                                        Add some premium products to get started!
                                    </p>
                                    <Button variant="primary" onClick={closeCart}>
                                        Continue Shopping
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            className="flex gap-4 p-4 bg-white rounded-xl shadow-sm"
                                        >
                                            {/* Product Image */}
                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#FEF3E2] flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="80px"
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-[#1F2937] line-clamp-1 mb-1">
                                                    {item.name}
                                                </h4>
                                                {item.weight && (
                                                    <p className="text-xs text-[#374151]/70">{item.weight}</p>
                                                )}
                                                <p className="text-[#D97706] font-bold mt-1">
                                                    ₹{item.price.toLocaleString('en-IN')}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-2 mt-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-7 h-7 rounded-full bg-[#1F2937]/10 hover:bg-[#D97706] hover:text-white flex items-center justify-center transition-colors"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="w-8 text-center font-medium text-[#1F2937]">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-7 h-7 rounded-full bg-[#1F2937]/10 hover:bg-[#D97706] hover:text-white flex items-center justify-center transition-colors"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="ml-auto p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Clear Cart Button */}
                                    {items.length > 0 && (
                                        <button
                                            onClick={clearCart}
                                            className="w-full py-2 text-sm text-red-500 hover:text-red-600 transition-colors"
                                        >
                                            Clear All Items
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer with Total and Checkout */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-[#1F2937]/10 bg-white">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[#374151]">Subtotal</span>
                                    <span className="text-xl font-semibold text-[#1F2937]">
                                        ₹{getTotalPrice().toLocaleString('en-IN')}
                                    </span>
                                </div>
                                <p className="text-xs text-[#374151]/70 mb-4">
                                    Shipping calculated at checkout
                                </p>
                                <Button
                                    variant="primary"
                                    fullWidth
                                    size="lg"
                                    onClick={() => {
                                        closeCart();
                                        router.push('/checkout');
                                    }}
                                >
                                    Proceed to Payment
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
