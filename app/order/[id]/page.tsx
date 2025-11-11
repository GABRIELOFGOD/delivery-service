/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from 'react';
import { Package, MapPin, CheckCircle, Clock, Truck, Home, ArrowLeft, Phone, Mail, Copy, Check } from 'lucide-react';

export default function OrderStatusPage() {
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState(2);

  const resetStep = () => {
    if (activeStep === 2) {
      setActiveStep(2);
    }
  }

  useEffect(() => {
    resetStep();
  }, []);
  
  // Mock order data - in real app, this would come from API based on tracking ID
  const orderData = {
    trackingId: 'TRK123456',
    status: 'In Transit',
    estimatedDelivery: 'Nov 12, 2025 by 6:00 PM',
    currentLocation: 'Distribution Center, Lagos',
    origin: 'Lagos Warehouse',
    destination: '15 Marina Road, Victoria Island, Lagos',
    recipient: {
      name: 'John Doe',
      phone: '+234 123 456 7890',
      email: 'john.doe@email.com'
    },
    package: {
      weight: '2.5 kg',
      dimensions: '30 x 20 x 15 cm',
      description: 'Electronics Package'
    },
    timeline: [
      { status: 'Order Placed', time: 'Nov 09, 10:30 AM', location: 'Lagos Warehouse', completed: true },
      { status: 'Package Picked Up', time: 'Nov 09, 2:45 PM', location: 'Lagos Warehouse', completed: true },
      { status: 'In Transit', time: 'Nov 10, 8:00 AM', location: 'Distribution Center', completed: true },
      { status: 'Out for Delivery', time: 'Expected Nov 12, 9:00 AM', location: 'Local Hub', completed: false },
      { status: 'Delivered', time: 'Expected Nov 12, 6:00 PM', location: 'Recipient Address', completed: false }
    ]
  };

  const copyTrackingId = () => {
    navigator.clipboard.writeText(orderData.trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statusColors = {
    completed: 'from-green-500 to-emerald-500',
    active: 'from-blue-500 to-purple-500',
    pending: 'from-gray-400 to-gray-500'
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button className="flex items-center space-x-2 text-white hover:text-gray-300 transition">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Truck className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold text-white">SwiftShip</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Status Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Tracking Your Package</h1>
              <div className="flex items-center space-x-2">
                <span className="text-gray-300">Tracking ID:</span>
                <span className="text-white font-mono font-semibold">{orderData.trackingId}</span>
                <button 
                  onClick={copyTrackingId}
                  className="p-1 hover:bg-white/10 rounded transition"
                >
                  {copied ? (
                    <Check size={16} className="text-green-400" />
                  ) : (
                    <Copy size={16} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-blue-500 to-purple-500 rounded-full">
                <Truck className="text-white animate-pulse" size={20} />
                <span className="text-white font-semibold">{orderData.status}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-2xl p-4">
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <Clock size={18} />
                <span className="text-sm">Estimated Delivery</span>
              </div>
              <div className="text-white font-semibold">{orderData.estimatedDelivery}</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4">
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <MapPin size={18} />
                <span className="text-sm">Current Location</span>
              </div>
              <div className="text-white font-semibold">{orderData.currentLocation}</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4">
              <div className="flex items-center space-x-2 text-gray-400 mb-2">
                <Home size={18} />
                <span className="text-sm">Destination</span>
              </div>
              <div className="text-white font-semibold truncate">{orderData.destination}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-8">Delivery Timeline</h2>
              
              <div className="space-y-6">
                {orderData.timeline.map((event, idx) => (
                  <div key={idx} className="relative flex items-start space-x-4">
                    {/* Timeline line */}
                    {idx < orderData.timeline.length - 1 && (
                      <div className={`absolute left-5 top-12 w-0.5 h-full ${
                        event.completed ? 'bg-linear-to-b from-green-500 to-blue-500' : 'bg-gray-600'
                      }`}></div>
                    )}
                    
                    {/* Icon */}
                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-br ${
                      event.completed ? statusColors.completed : 
                      idx === activeStep ? statusColors.active : 
                      statusColors.pending
                    } ${idx === activeStep ? 'animate-pulse' : ''}`}>
                      {event.completed ? (
                        <CheckCircle className="text-white" size={20} />
                      ) : idx === activeStep ? (
                        <Truck className="text-white" size={20} />
                      ) : (
                        <Clock className="text-white" size={20} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <div className="bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition">
                        <h3 className={`font-semibold mb-1 ${
                          event.completed || idx === activeStep ? 'text-white' : 'text-gray-400'
                        }`}>
                          {event.status}
                        </h3>
                        <p className="text-sm text-gray-400 mb-1">{event.time}</p>
                        <p className="text-sm text-gray-500">{event.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recipient Info */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Recipient Details</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Package className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="text-white font-semibold">{orderData.recipient.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-white font-semibold">{orderData.recipient.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white font-semibold text-sm">{orderData.recipient.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Package Info */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Package Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Description</p>
                  <p className="text-white font-semibold">{orderData.package.description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Weight</p>
                  <p className="text-white font-semibold">{orderData.package.weight}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Dimensions</p>
                  <p className="text-white font-semibold">{orderData.package.dimensions}</p>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-linear-to-br from-purple-600 to-blue-600 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-white mb-2">Need Help?</h3>
              <p className="text-white/90 text-sm mb-4">
                Our support team is available 24/7 to assist you with your delivery.
              </p>
              <button className="w-full px-4 py-3 bg-white text-purple-900 rounded-xl font-semibold hover:bg-gray-100 transition">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}