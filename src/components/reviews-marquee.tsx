'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

// Hardcoded reviews praising authenticity, aroma, and fast delivery
const reviews = [
    {
        id: 2,
        name: 'Shahbaz Ahmad',
        location: 'Delhi',
        rating: 4,
        text: 'Nice place to buy dryfruits and kesar , friendly owner and fair prices.',
        avatar: 'SA',
    },
    {
        id: 3,
        name: 'Sameer Chaudhary',
        location: 'Mumbai',
        rating: 5,
        text: 'Superb shop for dry fruits in this areas.',
        avatar: 'SC',
    },
    {
        id: 7,
        name: 'Javaid Bhat',
        location: 'Hyderabad',
        rating: 5,
        text: 'Superb Kesar Shop',
        avatar: 'JB',
    },
    {
        id: 4,
        name: 'Noorani Kesar',
        location: 'Bangalore',
        rating: 5,
        text: 'good saffron',
        avatar: 'NK',
    },
    {
        id: 5,
        name: 'Arjun Singh',
        location: 'Ahmedabad',
        rating: 5,
        text: ' Such a unique earthy flavor!',
        avatar: 'AS',
    },
    {
        id: 6,
        name: 'Kawsar Jan',
        location: 'Jaipur',
        rating: 5,
        text: 'Highly recommended!',
        avatar: 'KJ',
    },
    {
        id: 1,
        name: 'Vishal Limbani',
        location: 'Mumbai',
        rating: 5,
        text: 'If you are looking for 100% authentic products, Alnoor is the place to go. there is noor kesar as well but this place is authentic and real.I shopped offline and was really impressed with the quality and the reasonable pricing. I picked up a whole variety of items including Shilajit, Kesar, Kesar oil, Kahwa, and dry fruits like Pista and Walnuts. Everything tastes fresh and genuine. Highly recommended!',
        avatar: 'VL',
    },
    {
        id: 8,
        name: 'Mohammad Ali',
        location: 'Lucknow',
        rating: 5,
        text: 'Exceptional aroma and taste. This is the real Pampore saffron experience.',
        avatar: 'MA',
    },
    {
        id: 9,
        name: 'Anjali Gupta',
        location: 'Kolkata',
        rating: 5,
        text: 'Gift-packed beautifully. Perfect for festivals and special occasions.',
        avatar: 'AG',
    },
    {
        id: 10,
        name: 'Karthik Iyer',
        location: 'Pune',
        rating: 5,
        text: 'Super fast delivery within 3 days! The saffron quality exceeded expectations.',
        avatar: 'KI',
    },
    {
        id: 11,
        name: 'Nadia Hussain',
        location: 'Srinagar',
        rating: 5,
        text: 'Being from Kashmir, I can vouch for the authenticity. This is the real deal!',
        avatar: 'NH',
    },
    {
        id: 12,
        name: 'Suresh Kumar',
        location: 'Chandigarh',
        rating: 5,
        text: 'The best offline purchase I\'ve made. Pure, aromatic, and premium quality.',
        avatar: 'SK',
    },
];

export default function ReviewsMarquee() {
    // Double the reviews for seamless infinite scroll
    const duplicatedReviews = [...reviews, ...reviews];

    return (
        <section className="py-20 bg-[#4C1D95] overflow-hidden">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <span className="text-[#D97706] font-medium text-sm tracking-widest uppercase">
                        Trusted by Thousands
                    </span>
                    <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
                        What Our Customers Say
                    </h2>
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 fill-[#D97706] text-[#D97706]" />
                            ))}
                        </div>
                        <span className="text-white/90 text-lg">
                            4.8/5 based on 100+ views
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Marquee Row 1 - Left to Right */}
            <div className="relative mb-6">
                <div className="animate-marquee flex gap-6 whitespace-nowrap">
                    {duplicatedReviews.slice(0, 12).map((review, index) => (
                        <ReviewCard key={`row1-${review.id}-${index}`} review={review} />
                    ))}
                </div>
            </div>

            {/* Marquee Row 2 - Right to Left */}
            <div className="relative">
                <div
                    className="flex gap-6 whitespace-nowrap"
                    style={{
                        animation: 'marquee 30s linear infinite reverse',
                    }}
                >
                    {duplicatedReviews.slice(12, 24).map((review, index) => (
                        <ReviewCard key={`row2-${review.id}-${index}`} review={review} />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface ReviewCardProps {
    review: typeof reviews[0];
}

function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="flex-shrink-0 w-80 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/15 transition-colors duration-300">
            {/* Quote Icon */}
            <Quote className="w-8 h-8 text-[#D97706] mb-4 opacity-50" />

            {/* Review Text */}
            <p className="text-white/90 text-sm leading-relaxed mb-4 whitespace-normal">
                &ldquo;{review.text}&rdquo;
            </p>

            {/* Reviewer Info */}
            <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-[#D97706] flex items-center justify-center text-white font-bold text-sm">
                    {review.avatar}
                </div>

                <div>
                    <p className="text-white font-medium text-sm">{review.name}</p>
                    <p className="text-white/60 text-xs">{review.location}</p>
                </div>

                {/* Rating */}
                <div className="ml-auto flex">
                    {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#D97706] text-[#D97706]" />
                    ))}
                </div>
            </div>
        </div>
    );
}
