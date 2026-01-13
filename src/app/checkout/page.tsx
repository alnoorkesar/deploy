'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart-store';
import { CreditCard, Smartphone, Truck, MapPin, User, Phone, Mail } from 'lucide-react';
import Image from 'next/image';

const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getTotalPrice, clearCart } = useCartStore();
    const [selectedPayment, setSelectedPayment] = useState<'upi' | 'card' | 'cod'>('upi');
    const [showQR, setShowQR] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pinCode: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePaymentSelect = (method: 'upi' | 'card' | 'cod') => {
        if (method === 'card' || method === 'cod') {
            // Check if form is valid before redirecting to WhatsApp
            if (!isFormValid()) {
                alert(getValidationError());
                return;
            }
            // Redirect to WhatsApp with shipping details
            window.open('https://wa.me/919697499557', '_blank');
        } else {
            // UPI - no validation required, just show QR
            setSelectedPayment(method);
            setShowQR(true);
        }
    };

    const getValidationError = (): string | null => {
        if (!formData.fullName.trim()) {
            return 'Please fill Full Name field to enable payment method';
        }
        if (!formData.phone.trim()) {
            return 'Please fill Phone Number field to enable payment method';
        }
        if (formData.phone.length !== 10 || !/^[0-9]{10}$/.test(formData.phone)) {
            return 'Please enter a valid 10-digit Phone Number';
        }
        if (!formData.email.trim()) {
            return 'Please fill Email Address field to enable payment method';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            return 'Please enter a valid Email Address';
        }
        if (!formData.addressLine1.trim()) {
            return 'Please fill Address Line 1 field to enable payment method';
        }
        if (!formData.city.trim()) {
            return 'Please fill City field to enable payment method';
        }
        if (!formData.state) {
            return 'Please fill State field to enable payment method';
        }
        if (!formData.pinCode.trim()) {
            return 'Please fill PIN Code field to enable payment method';
        }
        if (formData.pinCode.length !== 6 || !/^[0-9]{6}$/.test(formData.pinCode)) {
            return 'Please enter a valid 6-digit PIN Code';
        }
        return null; // All valid
    };

    const isFormValid = () => getValidationError() === null;

    const sendOrderToWhatsApp = () => {
        // Validate form first
        if (!isFormValid()) {
            alert(getValidationError());
            return;
        }

        // Format order items
        const itemsList = items.map(item =>
            `• ${item.name} (${item.weight || ''}) x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString('en-IN')}`
        ).join('\n');

        // Format order message
        const orderMessage = `🛒 *New Order from Al-Noor Kesar*

📋 *Order Details*
${itemsList}
*Total: ₹${getTotalPrice().toLocaleString('en-IN')}*

👤 *Customer Information*
Name: ${formData.fullName}
Phone: ${formData.phone}
Email: ${formData.email}

📍 *Shipping Address*
${formData.addressLine1}
${formData.addressLine2 ? formData.addressLine2 + '\n' : ''}${formData.city}, ${formData.state} - ${formData.pinCode}

💳 *Payment Method*
${selectedPayment === 'upi' ? 'UPI Payment (Will share screenshot)' : selectedPayment === 'card' ? 'Debit/Credit Card' : 'Cash on Delivery'}`;

        // Encode and open WhatsApp
        const encodedMessage = encodeURIComponent(orderMessage);
        window.open(`https://wa.me/919697499557?text=${encodedMessage}`, '_blank');
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[#FFF8F0] pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl font-bold text-[#1F2937] mb-4">Your cart is empty</h1>
                    <button
                        onClick={() => router.push('/shop')}
                        className="px-6 py-3 bg-[#D97706] text-white rounded-lg hover:bg-[#B45309]"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFF8F0] pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-bold text-[#1F2937] mb-8"
                >
                    Checkout
                </motion.h1>

                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8">
                    {/* Shipping Details - Right on Desktop, Bottom on Mobile */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-xl p-6 md:p-8 shadow-lg lg:order-2"
                    >
                        <h2 className="text-2xl font-bold text-[#1F2937] mb-6 flex items-center gap-2">
                            <MapPin className="w-6 h-6 text-[#D97706]" />
                            Shipping Details
                        </h2>

                        <form className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-[#374151] mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#374151]/50" />
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 border-2 border-[#1F2937]/10 rounded-lg focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-[#374151] mb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#374151]/50" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        pattern="[0-9]{10}"
                                        className="w-full pl-12 pr-4 py-3 border-2 border-[#1F2937]/10 rounded-lg focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                                        placeholder="10-digit mobile number"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-[#374151] mb-2">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#374151]/50" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 border-2 border-[#1F2937]/10 rounded-lg focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            {/* Address Line 1 */}
                            <div>
                                <label className="block text-sm font-medium text-[#374151] mb-2">
                                    Address Line 1 <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="addressLine1"
                                    value={formData.addressLine1}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border-2 border-[#1F2937]/10 rounded-lg focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                                    placeholder="House No., Building Name"
                                />
                            </div>

                            {/* Address Line 2 */}
                            <div>
                                <label className="block text-sm font-medium text-[#374151] mb-2">
                                    Address Line 2 (Optional)
                                </label>
                                <input
                                    type="text"
                                    name="addressLine2"
                                    value={formData.addressLine2}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border-2 border-[#1F2937]/10 rounded-lg focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                                    placeholder="Road Name, Area, Colony"
                                />
                            </div>

                            {/* City and State */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#374151] mb-2">
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-[#1F2937]/10 rounded-lg focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                                        placeholder="City"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#374151] mb-2">
                                        State <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border-2 border-[#1F2937]/10 rounded-lg focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                                    >
                                        <option value="">Select State</option>
                                        {INDIAN_STATES.map((state) => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* PIN Code */}
                            <div>
                                <label className="block text-sm font-medium text-[#374151] mb-2">
                                    PIN Code <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="pinCode"
                                    value={formData.pinCode}
                                    onChange={handleInputChange}
                                    required
                                    pattern="[0-9]{6}"
                                    maxLength={6}
                                    className="w-full px-4 py-3 border-2 border-[#1F2937]/10 rounded-lg focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all"
                                    placeholder="6-digit PIN code"
                                />
                            </div>
                        </form>
                    </motion.div>

                    {/* Order Summary & Payment - Left on Desktop, Top on Mobile */}
                    <div className="space-y-6 lg:order-1">
                        {/* Order Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-xl p-6 md:p-8 shadow-lg"
                        >
                            <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-[#1F2937]">{item.name}</h3>
                                            <p className="text-sm text-[#374151]">Qty: {item.quantity}</p>
                                            <p className="font-semibold text-[#D97706]">₹{item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-[#1F2937]/10 pt-4">
                                <div className="flex justify-between text-lg font-bold text-[#1F2937]">
                                    <span>Total</span>
                                    <span>₹{getTotalPrice()}</span>
                                </div>
                                <p className="text-sm text-[#374151] mt-2">Shipping calculated at checkout</p>
                            </div>
                        </motion.div>

                        {/* Payment Options */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-xl p-6 md:p-8 shadow-lg"
                        >
                            <h2 className="text-2xl font-bold text-[#1F2937] mb-6">Payment Method</h2>

                            {/* Validation Error Message */}
                            {!isFormValid() && (
                                <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                                    <p className="text-sm text-red-600 font-medium">
                                        {getValidationError()}
                                    </p>
                                </div>
                            )}

                            <div className="space-y-4">
                                {/* UPI Payment */}
                                <button
                                    onClick={() => handlePaymentSelect('upi')}
                                    className={`w-full p-4 border-2 rounded-lg transition-all text-left ${selectedPayment === 'upi' && showQR
                                        ? 'border-[#D97706] bg-[#D97706]/5'
                                        : 'border-[#1F2937]/10 hover:border-[#D97706]/50'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Smartphone className="w-6 h-6 text-[#D97706]" />
                                            <div>
                                                <p className="font-semibold text-[#1F2937]">UPI Payment</p>
                                                <p className="text-sm text-[#374151]">Pay using UPI apps</p>
                                            </div>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 ${selectedPayment === 'upi' && showQR
                                            ? 'border-[#D97706] bg-[#D97706]'
                                            : 'border-[#374151]'
                                            }`}>
                                            {selectedPayment === 'upi' && showQR && (
                                                <div className="w-full h-full rounded-full bg-white scale-50" />
                                            )}
                                        </div>
                                    </div>
                                </button>

                                {/* Show QR Code */}
                                {selectedPayment === 'upi' && showQR && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="bg-[#FFF8F0] p-6 rounded-lg text-center"
                                    >
                                        <p className="text-sm text-[#374151] mb-4">Scan QR Code to Pay</p>
                                        <div className="bg-white p-4 rounded-lg inline-block shadow-md">
                                            {/* UPI QR Code */}
                                            <Image
                                                src="/upi-qr.png"
                                                alt="UPI Payment QR Code"
                                                width={250}
                                                height={250}
                                                className="mx-auto"
                                            />
                                        </div>
                                        <p className="text-xs text-[#374151] mt-4">
                                            After payment, WhatsApp us the screenshot at<br />
                                            <a href="https://wa.me/919697499557" className="text-[#D97706] font-medium">
                                                +91 96974 99557
                                            </a>
                                        </p>
                                    </motion.div>
                                )}

                                {/* Card Payment - Disabled */}
                                <button
                                    onClick={() => handlePaymentSelect('card')}
                                    className="w-full p-4 border-2 border-[#1F2937]/10 rounded-lg text-left opacity-60 cursor-pointer hover:bg-gray-50 transition-all"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <CreditCard className="w-6 h-6 text-[#374151]" />
                                            <div>
                                                <p className="font-semibold text-[#1F2937]">Debit/Credit Card</p>
                                                <p className="text-sm text-[#374151]">Visa, Mastercard, RuPay</p>
                                            </div>
                                        </div>
                                        <span className="text-xs bg-gray-200 px-3 py-1 rounded-full text-[#374151]">
                                            Coming Soon
                                        </span>
                                    </div>
                                </button>

                                {/* COD - Disabled */}
                                <button
                                    onClick={() => handlePaymentSelect('cod')}
                                    className="w-full p-4 border-2 border-[#1F2937]/10 rounded-lg text-left opacity-60 cursor-pointer hover:bg-gray-50 transition-all"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Truck className="w-6 h-6 text-[#374151]" />
                                            <div>
                                                <p className="font-semibold text-[#1F2937]">Cash on Delivery</p>
                                                <p className="text-sm text-[#374151]">Pay when you receive</p>
                                            </div>
                                        </div>
                                        <span className="text-xs bg-gray-200 px-3 py-1 rounded-full text-[#374151]">
                                            Coming Soon
                                        </span>
                                    </div>
                                </button>
                            </div>

                            {/* Complete Order Button */}
                            <button
                                onClick={sendOrderToWhatsApp}
                                className="w-full mt-6 py-4 bg-gradient-to-r from-[#D97706] to-[#B45309] text-white font-bold rounded-lg hover:from-[#B45309] hover:to-[#92400E] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                            >
                                📱 Complete Order via WhatsApp
                            </button>

                            <p className="text-xs text-center text-[#374151] mt-3">
                                {selectedPayment === 'upi'
                                    ? "After payment, share the screenshot on WhatsApp"
                                    : "Click to send your order details to us"}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
