import Image from 'next/image';
import HeroSlider from '@/components/hero-slider';
import ParallaxSection from '@/components/parallax-section';
import BestSellers from '@/components/best-sellers';
import ReviewsMarquee from '@/components/reviews-marquee';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Section - Full Screen Slider */}
      <HeroSlider />

      {/* The Farm Parallax Section */}
      <ParallaxSection />

      {/* Best Sellers Carousel */}
      <BestSellers />

      {/* Customer Reviews Marquee */}
      <ReviewsMarquee />

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-[#D97706] to-[#B45309] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Experience the Gold of Kashmir?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of satisfied customers who have discovered the authentic taste of premium Kashmiri saffron and dry fruits.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#D97706] font-bold rounded-lg hover:bg-[#FFF8F0] transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#D97706] transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1F2937] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/logo.png"
                  alt="Al-Noor Kesar"
                  width={100}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Premium Kashmiri Saffron and Dry Fruits. Bringing the authentic taste of Kashmir to your doorstep.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'Shop', 'About', 'Contact'].map((link) => (
                  <li key={link}>
                    <a
                      href={`/${link.toLowerCase() === 'home' ? '' : link.toLowerCase()}`}
                      className="text-white/70 hover:text-[#D97706] transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="font-heading font-bold mb-4">Products</h4>
              <ul className="space-y-2">
                {['Kashmiri Saffron', 'Kesar Kahwa', 'Saffron Oil', 'Himalayan Shilajit'].map((product) => (
                  <li key={product}>
                    <a
                      href="/shop"
                      className="text-white/90 hover:text-[#D97706] transition-colors duration-300"
                    >
                      {product}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-bold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">
                    LETHAPORA, NH 44, Pampore, Kashmir
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#D97706] flex-shrink-0" />
                  <a
                    href="tel:+919697499557"
                    className="text-white/70 hover:text-[#D97706] transition-colors duration-300 text-sm"
                  >
                    +91 96974 99557
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#D97706] flex-shrink-0" />
                  <a
                    href="mailto:alnoorkesar@gmail.com"
                    className="text-white/70 hover:text-[#D97706] transition-colors duration-300 text-sm"
                  >
                    alnoorkesar@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © 2024 Al-Noor Kesar. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Shipping Policy'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/50 hover:text-[#D97706] transition-colors duration-300 text-sm"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
