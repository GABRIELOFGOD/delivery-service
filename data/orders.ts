import { Order } from "@/types/order";

export const initialOrders: Order[] = [
  {
    id: '1',
    trackingNumber: 'GX7849562103US',
    status: 'in_transit',
    origin: 'New York, NY, USA',
    destination: 'London, UK',
    sender: 'John Smith',
    recipient: 'Emma Wilson',
    weight: '2.5 kg',
    estimatedDelivery: '2025-11-18',
    events: [
      { date: '2025-11-15', time: '14:30', location: 'New York, NY', status: 'Picked up', description: 'Package picked up from sender' },
      { date: '2025-11-15', time: '18:45', location: 'New York Hub', status: 'In transit', description: 'Departed facility' },
      { date: '2025-11-16', time: '06:20', location: 'International Hub', status: 'In transit', description: 'Customs clearance processing' }
    ]
  },
  {
    id: '2',
    trackingNumber: 'GX9821473056CA',
    status: 'delivered',
    origin: 'Toronto, ON, Canada',
    destination: 'Paris, France',
    sender: 'Sarah Johnson',
    recipient: 'Pierre Dubois',
    weight: '1.2 kg',
    estimatedDelivery: '2025-11-14',
    events: [
      { date: '2025-11-12', time: '09:15', location: 'Toronto, ON', status: 'Picked up', description: 'Package picked up from sender' },
      { date: '2025-11-13', time: '11:30', location: 'Paris Hub', status: 'In transit', description: 'Arrived at destination facility' },
      { date: '2025-11-14', time: '15:20', location: 'Paris, France', status: 'Delivered', description: 'Delivered to recipient' }
    ]
  }
];