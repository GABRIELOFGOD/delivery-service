"use client";

import React, { useState } from 'react';
import {
  Package, Plus, Search, Filter, Edit2, Trash2,
  Eye, Truck, Clock, CheckCircle, Users, TrendingUp,
  X
} from 'lucide-react';
// import {
//   Package, Plus, Search, Filter, MoreVertical, Edit2, Trash2,
//   Eye, Truck, Clock, CheckCircle, XCircle, Users, TrendingUp,
//   Calendar, MapPin, Phone, X
// } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [orders, setOrders] = useState([
    {
      id: 'TRK123456',
      recipient: 'John Doe',
      destination: 'Victoria Island, Lagos',
      status: 'In Transit',
      created: '2025-11-09',
      estimated: '2025-11-12',
      weight: '2.5 kg'
    },
    {
      id: 'TRK123457',
      recipient: 'Jane Smith',
      destination: 'Ikeja, Lagos',
      status: 'Delivered',
      created: '2025-11-08',
      estimated: '2025-11-10',
      weight: '1.2 kg'
    },
    {
      id: 'TRK123458',
      recipient: 'Mike Johnson',
      destination: 'Lekki, Lagos',
      status: 'Pending',
      created: '2025-11-11',
      estimated: '2025-11-13',
      weight: '3.8 kg'
    },
    {
      id: 'TRK123459',
      recipient: 'Sarah Williams',
      destination: 'Surulere, Lagos',
      status: 'Out for Delivery',
      created: '2025-11-10',
      estimated: '2025-11-11',
      weight: '0.8 kg'
    }
  ]);

  const [newOrder, setNewOrder] = useState({
    recipient: '',
    phone: '',
    email: '',
    destination: '',
    weight: '',
    dimensions: '',
    description: ''
  });

  const stats = [
    { label: 'Total Orders', value: '1,234', icon: Package, color: 'from-blue-500 to-purple-500', change: '+12%' },
    { label: 'In Transit', value: '456', icon: Truck, color: 'from-purple-500 to-pink-500', change: '+8%' },
    { label: 'Delivered', value: '890', icon: CheckCircle, color: 'from-green-500 to-emerald-500', change: '+15%' },
    { label: 'Pending', value: '78', icon: Clock, color: 'from-orange-500 to-red-500', change: '-3%' }
  ];

  const statusColors = {
    'Pending': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'In Transit': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Out for Delivery': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Delivered': 'bg-green-500/20 text-green-300 border-green-500/30',
    'Cancelled': 'bg-red-500/20 text-red-300 border-red-500/30'
  };

  const handleCreateOrder = () => {
    const trackingId = `TRK${Math.floor(100000 + Math.random() * 900000)}`;
    const order = {
      id: trackingId,
      recipient: newOrder.recipient,
      destination: newOrder.destination,
      status: 'Pending',
      created: new Date().toISOString().split('T')[0],
      estimated: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      weight: newOrder.weight
    };
    setOrders([order, ...orders]);
    setShowCreateModal(false);
    setNewOrder({
      recipient: '',
      phone: '',
      email: '',
      destination: '',
      weight: '',
      dimensions: '',
      description: ''
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 z-20">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Truck className="text-white" size={24} />
            </div>
            <div>
              <span className="text-xl font-bold text-white block">SwiftShip</span>
              <span className="text-xs text-gray-400">Admin Panel</span>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'orders' 
                  ? 'bg-linear-to-r from-purple-500 to-blue-500 text-white' 
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <Package size={20} />
              <span>Orders</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'analytics' 
                  ? 'bg-linear-to-r from-purple-500 to-blue-500 text-white' 
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <TrendingUp size={20} />
              <span>Analytics</span>
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition ${
                activeTab === 'customers' 
                  ? 'bg-linear-to-r from-purple-500 to-blue-500 text-white' 
                  : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              <Users size={20} />
              <span>Customers</span>
            </button>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Admin User</p>
                <p className="text-gray-400 text-xs">admin@swiftship.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 relative z-10">
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Order Management</h1>
              <p className="text-gray-400">Manage and track all your deliveries</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-linear-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition transform hover:scale-105"
            >
              <Plus size={20} />
              <span>Create Order</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition group">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-linear-to-br ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <span className={`text-sm font-semibold ${
                    stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Orders Table */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden">
            {/* Table Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by tracking ID or recipient..."
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 transition"
                  >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition">
                    <Filter className="text-gray-400" size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Tracking ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Recipient</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Destination</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Created</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Weight</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/5 transition">
                      <td className="px-6 py-4">
                        <span className="text-white font-mono font-semibold">{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white">{order.recipient}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 text-sm">{order.destination}</span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${statusColors[order.status]} bg-transparent focus:outline-none`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-400 text-sm">{order.created}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 text-sm">{order.weight}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 hover:bg-white/10 rounded-lg transition" title="View Details">
                            <Eye className="text-gray-400" size={18} />
                          </button>
                          <button className="p-2 hover:bg-white/10 rounded-lg transition" title="Edit">
                            <Edit2 className="text-gray-400" size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg transition"
                            title="Delete"
                          >
                            <Trash2 className="text-red-400" size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="p-12 text-center">
                <Package className="mx-auto text-gray-500 mb-4" size={48} />
                <p className="text-gray-400">No orders found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Order Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-3xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-slate-900">
              <h2 className="text-2xl font-bold text-white">Create New Order</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <X className="text-gray-400" size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Recipient Name</label>
                  <input
                    type="text"
                    value={newOrder.recipient}
                    onChange={(e) => setNewOrder({...newOrder, recipient: e.target.value})}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={newOrder.phone}
                    onChange={(e) => setNewOrder({...newOrder, phone: e.target.value})}
                    placeholder="+234 123 456 7890"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Email Address</label>
                <input
                  type="email"
                  value={newOrder.email}
                  onChange={(e) => setNewOrder({...newOrder, email: e.target.value})}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Destination Address</label>
                <input
                  type="text"
                  value={newOrder.destination}
                  onChange={(e) => setNewOrder({...newOrder, destination: e.target.value})}
                  placeholder="15 Marina Road, Victoria Island, Lagos"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Weight</label>
                  <input
                    type="text"
                    value={newOrder.weight}
                    onChange={(e) => setNewOrder({...newOrder, weight: e.target.value})}
                    placeholder="2.5 kg"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Dimensions</label>
                  <input
                    type="text"
                    value={newOrder.dimensions}
                    onChange={(e) => setNewOrder({...newOrder, dimensions: e.target.value})}
                    placeholder="30 x 20 x 15 cm"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Package Description</label>
                <textarea
                  value={newOrder.description}
                  onChange={(e) => setNewOrder({...newOrder, description: e.target.value})}
                  placeholder="Electronics Package"
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition resize-none"
                />
              </div>
            </div>

            <div className="p-6 border-t border-white/10 flex justify-end space-x-3 sticky bottom-0 bg-slate-900">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-6 py-3 bg-white/5 text-white rounded-xl font-semibold hover:bg-white/10 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateOrder}
                className="px-6 py-3 bg-linear-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition"
              >
                Create Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}