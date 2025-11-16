"use client";

import React, { useState } from 'react';
import { Search, Truck, MapPin, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/ui/header';

const App: React.FC = () => {
  const [trackingInput, setTrackingInput] = useState('');

  const router = useRouter();

  const trackOrder = () => {
    router.push(`/order/${trackingInput}`);
  };

  return  (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Track Your Shipment
          </h1>
          <p className="text-lg text-gray-600">
            Enter your tracking number to get real-time updates
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter tracking number (e.g., GX7849562103US)"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && trackOrder()}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={() => trackOrder()}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Track
              </button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <Truck className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Express shipping to over 200 countries worldwide</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <MapPin className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Real-Time Tracking</h3>
              <p className="text-sm text-gray-600">Monitor your package every step of the way</p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <CheckCircle className="w-10 h-10 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Reliable Service</h3>
              <p className="text-sm text-gray-600">99.9% on-time delivery guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;