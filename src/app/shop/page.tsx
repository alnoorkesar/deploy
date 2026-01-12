'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ui/card';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import productData from '../../../client/products.json';

// Get products and categories from JSON
const products = productData.products;
const categories = productData.categories;

export default function ShopPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showFilters, setShowFilters] = useState(false);

    // Filter products
    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[#FFF8F0] pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-6 md:mb-12"
                >
                    <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
                        Our Products
                    </h1>
                    <p className="text-[#374151] text-lg max-w-2xl mx-auto">
                        Discover our curated selection of premium Kashmiri saffron, dry fruits, and wellness products.
                    </p>
                </motion.div>

                {/* Search and Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mb-4 md:mb-8"
                >
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        {/* Search Bar */}
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#374151]/50" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border-2 border-[#1F2937]/10 focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all duration-300"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#374151]/50 hover:text-[#1F2937]"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="sm:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-[#1F2937]/10 rounded-lg"
                        >
                            <SlidersHorizontal className="w-5 h-5" />
                            Filters
                        </button>
                    </div>

                    {/* Category Filters */}
                    <div className={`flex flex-wrap gap-2 ${showFilters ? 'block' : 'hidden sm:flex'}`}>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedCategory === category
                                        ? 'bg-[#D97706] text-white'
                                        : 'bg-white text-[#374151] hover:bg-[#D97706]/10'
                                    }
                `}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.4 }}
                            >
                                <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    discountPrice={product.discountPrice}
                                    image={product.image}
                                    weight={product.weight}
                                    description={product.description}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-[#374151] text-lg mb-4">
                            No products found matching your criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('All');
                            }}
                            className="text-[#D97706] font-medium hover:underline"
                        >
                            Clear filters
                        </button>
                    </motion.div>
                )}

                {/* Product Count */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-12 text-[#374151]/70"
                >
                    Showing {filteredProducts.length} of {products.length} products
                </motion.p>
            </div>
        </div>
    );
}
