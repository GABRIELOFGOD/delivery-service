"use client";

import { FormEvent, useState } from 'react';
import { Truck, Search, Clock, MapPin, Shield, Zap } from 'lucide-react';
// import { Package, Truck, CheckCircle, Search, Clock, MapPin, Shield, Zap } from 'lucide-react';

export default function LandingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleTrack = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (trackingId.trim()) {
      // Navigate to order status page with tracking ID
      console.log('Tracking:', trackingId);
      alert(`Tracking order: ${trackingId}\n\nIn a real app, this would navigate to the order status page.`);
    }
  };

  const features = [
    { icon: Zap, title: 'Lightning Fast', desc: 'Same-day delivery available' },
    { icon: Shield, title: 'Secure Handling', desc: 'Your packages are safe with us' },
    { icon: Clock, title: 'Real-time Tracking', desc: 'Track every step of the way' },
    { icon: MapPin, title: 'Wide Coverage', desc: 'Delivering to 100+ cities' }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Truck className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-white">SwiftShip</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition">Services</a>
            <a href="#" className="text-gray-300 hover:text-white transition">Pricing</a>
            <a href="#" className="text-gray-300 hover:text-white transition">About</a>
            <a href="#" className="text-gray-300 hover:text-white transition">Contact</a>
          </div>
          <button className="px-6 py-2 bg-white text-purple-900 rounded-lg font-semibold hover:bg-gray-100 transition">
            Admin Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Delivery Made
            <span className="block bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Simple & Fast
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Track your packages in real-time with our cutting-edge delivery service. 
            Fast, reliable, and secure shipping for all your needs.
          </p>

          {/* Tracking Form */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleTrack} className="relative">
              <div 
                className={`relative transition-all duration-300 ${isHovered ? 'transform scale-105' : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-blue-500 rounded-2xl blur-lg opacity-50"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                  <div className="flex items-center p-2">
                    <Search className="ml-4 text-gray-400" size={24} />
                    <input
                      type="text"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      placeholder="Enter your tracking ID (e.g., TRK123456)"
                      className="flex-1 px-4 py-4 text-lg outline-none text-gray-800"
                    />
                    <button
                      type="submit"
                      className="mx-2 px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <p className="mt-4 text-sm text-gray-400">
              Don&apos;t have a tracking ID? Contact our support team.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">1M+</div>
              <div className="text-gray-300">Deliveries Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-gray-300">On-Time Delivery</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300">Customer Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Why Choose SwiftShip?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
            >
              <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                <feature.icon className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-linear-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to ship with us?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of satisfied customers today
          </p>
          <button className="px-8 py-4 bg-white text-purple-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition transform hover:scale-105">
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  );
}