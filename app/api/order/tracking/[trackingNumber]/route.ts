

// app/api/orders/tracking/[trackingNumber]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/order';

// GET - Track order by tracking number
export async function GET(
  request: NextRequest,
  { params }: { params: { trackingNumber: string } }
) {
  try {
    await connectDB();
    
    const order = await Order.findOne({ 
      trackingNumber: params.trackingNumber.toUpperCase() 
    });
    
    if (!order) {
      return NextResponse.json({
        success: false,
        error: 'Tracking number not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: order
    }, { status: 200 });
    
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      error: 'Failed to track order',
      message: error instanceof Error ? error.message : "Something went wrong"
    }, { status: 500 });
  }
}
