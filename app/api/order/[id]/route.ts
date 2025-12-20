
// app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/order';

// GET - Fetch single order by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const order = await Order.findById(params.id);
    
    if (!order) {
      return NextResponse.json({
        success: false,
        error: 'Order not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: order
    }, { status: 200 });
    
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch order',
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

// PUT - Update order
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    const order = await Order.findByIdAndUpdate(
      params.id,
      body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!order) {
      return NextResponse.json({
        success: false,
        error: 'Order not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: order,
      message: 'Order updated successfully'
    }, { status: 200 });
    
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      error: 'Failed to update order',
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 400 });
  }
}

// PATCH - Partial update (for status updates, adding events, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // If adding a new event
    if (body.newEvent) {
      const order = await Order.findById(params.id);
      
      if (!order) {
        return NextResponse.json({
          success: false,
          error: 'Order not found'
        }, { status: 404 });
      }
      
      order.events.unshift(body.newEvent); // Add to beginning
      if (body.newEvent.status) {
        order.status = body.status || order.status;
      }
      
      await order.save();
      
      return NextResponse.json({
        success: true,
        data: order,
        message: 'Event added successfully'
      }, { status: 200 });
    }
    
    // Regular partial update
    const order = await Order.findByIdAndUpdate(
      params.id,
      { $set: body },
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!order) {
      return NextResponse.json({
        success: false,
        error: 'Order not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: order,
      message: 'Order updated successfully'
    }, { status: 200 });
    
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      error: 'Failed to update order',
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 400 });
  }
}

// DELETE - Delete order
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const order = await Order.findByIdAndDelete(params.id);
    
    if (!order) {
      return NextResponse.json({
        success: false,
        error: 'Order not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      data: {},
      message: 'Order deleted successfully'
    }, { status: 200 });
    
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      error: 'Failed to delete order',
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

