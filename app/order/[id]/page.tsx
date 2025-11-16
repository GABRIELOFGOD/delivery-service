"use client";

import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import { initialOrders } from "@/data/orders";
import { Order } from "@/types/order";
import { CheckCircle, Clock, MapPin, Package, Truck } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TrackingPage = () => {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const params = useParams<{ id: string }>(); // Specify the type of your dynamic segment
  const { id } = params;
  
  useEffect(() => {
    const order = initialOrders.find((o) => o.trackingNumber === id);
    if (order) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentOrder(order);
    }
  }, [id]);
  

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600';
      case 'in_transit': return 'text-blue-600';
      case 'out_for_delivery': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-5 h-5" />;
      case 'in_transit': return <Truck className="w-5 h-5" />;
      case 'out_for_delivery': return <MapPin className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  return(
    <div className="min-h-screen bg-gray-50">
      <Header />
      {currentOrder ? (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                <p className="text-2xl font-bold text-gray-900">{currentOrder.trackingNumber}</p>
              </div>
              <div className={`flex items-center gap-2 mt-4 md:mt-0 ${getStatusColor(currentOrder.status)}`}>
                {getStatusIcon(currentOrder.status)}
                <span className="text-lg font-semibold capitalize">{currentOrder.status.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-3 font-semibold">Shipment Details</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Origin:</span>
                    <span className="font-medium text-gray-900">{currentOrder.origin}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Destination:</span>
                    <span className="font-medium text-gray-900">{currentOrder.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium text-gray-900">{currentOrder.weight}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-3 font-semibold">Contact Information</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sender:</span>
                    <span className="font-medium text-gray-900">{currentOrder.sender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Recipient:</span>
                    <span className="font-medium text-gray-900">{currentOrder.recipient}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Est. Delivery:</span>
                    <span className="font-medium text-gray-900">{currentOrder.estimatedDelivery}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Tracking History</h2>
            <div className="space-y-6">
              {currentOrder.events.map((event, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    {idx < currentOrder.events.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-300 mt-1"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <p className="font-semibold text-gray-900">{event.status}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1 sm:mt-0">
                        <Clock className="w-4 h-4" />
                        <span>{event.date} at {event.time}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{event.description}</p>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ): (
        <div className="w-full h-[500px] gap-5 flex flex-col justify-center items-center">
          <p className="text-center text-gray-400 font-semibold text-4xl">Tracking number <span className="font-bold text-black">{id}</span> not found</p>
          <p className="text-center text-xl font-medium">Plaese check your tracking ID and try again</p>
          <Button>
            <Link href={"/"}>
              Go back home
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
export default TrackingPage;