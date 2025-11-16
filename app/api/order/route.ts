// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb'; // You'll create this
import Order from '@/models/Order';

// Generate tracking number
function generateTrackingNumber(): string {
  const prefix = 'GX';
  const randomNum = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
  const countryCodes = ['US', 'CA', 'UK', 'FR', 'DE', 'AU', 'JP', 'CN'];
  const suffix = countryCodes[Math.floor(Math.random() * countryCodes.length)];
  return `${prefix}${randomNum}${suffix}`;
}

// GET - Fetch all orders
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const trackingNumber = searchParams.get('trackingNumber');
    const status = searchParams.get('status');
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};
    
    if (trackingNumber) {
      query.trackingNumber = { $regex: trackingNumber, $options: 'i' };
    }
    
    if (status) {
      query.status = status;
    }
    
    const orders = await Order.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      count: orders.length,
      data: orders
    }, { status: 200 });
    
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch orders',
      message: error instanceof Error ? error.message : "Something went wrong"
    }, { status: 500 });
  }
}

// POST - Create new order
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Generate tracking number automatically
    const trackingNumber = generateTrackingNumber();
    
    // Create order with tracking number
    const orderData = {
      ...body,
      trackingNumber,
      events: body.events || [{
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        location: body.origin || 'Origin facility',
        status: 'Order created',
        description: 'Package information received'
      }]
    };
    
    const order = await Order.create(orderData);
    
    return NextResponse.json({
      success: true,
      data: order,
      message: 'Order created successfully'
    }, { status: 201 });
    
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      error: 'Failed to create order',
      message: error instanceof Error ? error.message : "Unknown error occured"
    }, { status: 400 });
  }
}