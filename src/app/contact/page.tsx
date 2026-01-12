'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input, TextArea } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { submitContactForm, ContactFormData } from '@/app/actions';
import { MapPin, Phone, Mail, Clock, CheckCircle, X } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState<{ show: boolean; success: boolean; message: string }>({
        show: false,
        success: false,
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Format message for WhatsApp
        const message = `🔔 *New Contact Form Submission*

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}

💬 *Message:*
${formData.message}`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);

        // Open WhatsApp with pre-filled message
        window.open(`https://wa.me/919697499557?text=${encodedMessage}`, '_blank');

        // Reset form
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-[#FFF8F0] pt-24 pb-20">
            {/* Toast Notification */}
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: -50, x: '-50%' }}
                        className={`
              fixed top-24 left-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg
              ${toast.success ? 'bg-green-500' : 'bg-red-500'} text-white
            `}
                    >
                        <CheckCircle className="w-5 h-5" />
                        <span>{toast.message}</span>
                        <button
                            onClick={() => setToast((prev) => ({ ...prev, show: false }))}
                            className="ml-2 hover:bg-white/20 rounded-full p-1"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#D97706] font-medium text-sm tracking-widest uppercase">
                        Get in Touch
                    </span>
                    <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1F2937] mt-4 mb-6">
                        Contact Us
                    </h1>
                    <p className="text-[#374151] text-lg max-w-2xl mx-auto">
                        Have questions about our products? Want to place a bulk order? We&apos;d love to hear from you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Full Name"
                                name="name"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="your.email@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <Input
                                label="Phone Number"
                                name="phone"
                                type="tel"
                                placeholder="+91 96974 99557/+91 94190 33761"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                            <TextArea
                                label="Your Message"
                                name="message"
                                placeholder="Tell us how we can help you..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                fullWidth
                                isLoading={isSubmitting}
                            >
                                Send Message
                            </Button>
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="space-y-8"
                    >
                        {/* Address Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="font-heading text-xl font-bold text-[#1F2937] mb-6">
                                Visit Our Store
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#D97706]/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-6 h-6 text-[#D97706]" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#1F2937]">Address</p>
                                        <p className="text-[#374151]">LETHAPORA, NH 44</p>
                                        <p className="text-[#374151]">Pampore, Kashmir - 192122</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#D97706]/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-6 h-6 text-[#D97706]" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#1F2937]">Phone</p>
                                        <a
                                            href="tel:+919697499557"
                                            className="text-[#374151] hover:text-[#D97706] transition-colors"
                                        >
                                            +91 96974 99557
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#D97706]/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-6 h-6 text-[#D97706]" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#1F2937]">Email</p>
                                        <a
                                            href="mailto:alnoorkesar@yahoo.com"
                                            className="text-[#374151] hover:text-[#D97706] transition-colors"
                                        >
                                            alnoorkesar@yahoo.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#D97706]/10 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-6 h-6 text-[#D97706]" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-[#1F2937]">Business Hours</p>
                                        <p className="text-[#374151]">Mon - Sat: 9:00 AM - 7:00 PM</p>
                                        <p className="text-[#374151]">Sunday: 10:00 AM - 4:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="font-heading text-xl font-bold text-[#1F2937] mb-4">
                                Find Us on Map
                            </h3>
                            <a
                                href="https://maps.app.goo.gl/agfte3NRa94RpPL36"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block aspect-video rounded-xl overflow-hidden bg-[#FEF3E2] relative group cursor-pointer"
                            >
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.496189682675!2d74.93168287551205!3d34.13072817314982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1cd36fb020c63%3A0x58ee98e95587fe15!2sAL-NOOR%20KESAR!5e0!3m2!1sen!2sin!4v1736686886000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, pointerEvents: 'none' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Al-Noor Kesar Location"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                                    <span className="opacity-0 group-hover:opacity-100 bg-white px-4 py-2 rounded-lg font-semibold text-[#D97706] transition-all">
                                        📍 Open in Google Maps
                                    </span>
                                </div>
                            </a>

                            {/* Google Reviews Button */}
                            <a
                                href="https://maps.app.goo.gl/agfte3NRa94RpPL36"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D97706] text-white font-semibold rounded-lg hover:bg-[#B45309] transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                                ⭐ See Our Google Reviews
                            </a>
                        </div>

                        {/* Quick Info */}
                        <div className="bg-gradient-to-br from-[#4C1D95] to-[#3B0764] rounded-2xl p-6 text-white">
                            <h3 className="font-heading text-xl font-bold mb-4">
                                Why Choose Us?
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#D97706] flex-shrink-0" />
                                    <span>100% Authentic Kashmiri Products</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#D97706] flex-shrink-0" />
                                    <span>Direct from Farm to Your Doorstep</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#D97706] flex-shrink-0" />
                                    <span>Fast Pan-India Delivery</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle className="w-5 h-5 text-[#D97706] flex-shrink-0" />
                                    <span>Secure Payment Options</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
