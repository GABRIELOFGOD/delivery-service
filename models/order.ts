// models/Order.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITrackingEvent {
  date: string;
  time: string;
  location: string;
  status: string;
  description: string;
}

// Interface for the document (includes _id and Mongoose methods)
export interface IOrder extends Document {
  _id: string;
  trackingNumber: string;
  status: 'pending' | 'in_transit' | 'out_for_delivery' | 'delivered';
  origin: string;
  destination: string;
  sender: string;
  recipient: string;
  weight: string;
  estimatedDelivery: string;
  events: ITrackingEvent[];
  createdAt: Date;
  updatedAt: Date;
}

const TrackingEventSchema = new Schema<ITrackingEvent>({
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const OrderSchema = new Schema<IOrder>(
  {
    trackingNumber: {
      type: String,
      required: [true, 'Please provide a tracking number'],
      unique: true,
      uppercase: true,
      trim: true
    },
    status: {
      type: String,
      enum: ['pending', 'in_transit', 'out_for_delivery', 'delivered'],
      default: 'pending'
    },
    origin: {
      type: String,
      required: [true, 'Please provide origin location']
    },
    destination: {
      type: String,
      required: [true, 'Please provide destination location']
    },
    sender: {
      type: String,
      required: [true, 'Please provide sender name']
    },
    recipient: {
      type: String,
      required: [true, 'Please provide recipient name']
    },
    weight: {
      type: String,
      required: [true, 'Please provide package weight']
    },
    estimatedDelivery: {
      type: String,
      required: [true, 'Please provide estimated delivery date']
    },
    events: {
      type: [TrackingEventSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
OrderSchema.index({ trackingNumber: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;