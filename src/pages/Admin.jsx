import React, { useState, useEffect } from 'react';
import { 
  Shield, Inbox, Image as ImageIcon, CheckCircle, Clock, Trash2, Plus, 
  RefreshCw, Filter, AlertCircle, Eye, ChevronDown 
} from 'lucide-react';
import SEO from '../components/SEO';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('enquiries');
  const [stats, setStats] = useState({ totalEnquiries: 0, newEnquiries: 0, galleryCount: 0, servicesCount: 3 });
  const [enquiries, setEnquiries] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [notification, setNotification] = useState('');

  // Add Gallery Form State
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    category: 'Brand Videos',
    imageUrl: '',
    description: ''
  });
  const [showAddGalleryModal, setShowAddGalleryModal] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, enqRes, galRes] = await Promise.all([
        fetch('/api/stats').then(r => r.json()),
        fetch('/api/enquiries').then(r => r.json()),
        fetch('/api/gallery').then(r => r.json())
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (enqRes.success) setEnquiries(enqRes.data);
      if (galRes.success) setGalleryItems(galRes.data);
    } catch (err) {
      console.error('Admin data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  const handleUpdateStatus = async (id, newStatus) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/enquiries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
        showToast(`Enquiry status updated to "${newStatus}"`);
        // Refresh stats
        fetch('/api/stats').then(r => r.json()).then(d => d.success && setStats(d.stats));
      }
    } catch (err) {
      console.error('Status update error:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this client enquiry?')) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setEnquiries(prev => prev.filter(item => item.id !== id));
        showToast('Enquiry record deleted.');
        fetch('/api/stats').then(r => r.json()).then(d => d.success && setStats(d.stats));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleAddGallerySubmit = async (e) => {
    e.preventDefault();
    if (!newGalleryItem.title || !newGalleryItem.imageUrl) return;

    setActionLoading(true);
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGalleryItem)
      });
      const data = await res.json();
      if (data.success) {
        setGalleryItems(prev => [data.data, ...prev]);
        setShowAddGalleryModal(false);
        setNewGalleryItem({ title: '', category: 'Brand Videos', imageUrl: '', description: '' });
        showToast('New gallery media added successfully!');
        fetch('/api/stats').then(r => r.json()).then(d => d.success && setStats(d.stats));
      }
    } catch (err) {
      console.error('Gallery add error:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    if (!window.confirm('Delete this gallery item from public showcase?')) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setGalleryItems(prev => prev.filter(item => item.id !== id));
        showToast('Gallery item removed.');
        fetch('/api/stats').then(r => r.json()).then(d => d.success && setStats(d.stats));
      }
    } catch (err) {
      console.error('Delete gallery item error:', err);
    }
  };

  const filteredEnquiries = statusFilter === 'All'
    ? enquiries
    : enquiries.filter(e => e.status === statusFilter);

  return (
    <>
      <SEO 
        title="Admin Staff Dashboard | Grey Area"
        description="Internal management dashboard for Grey Area staff to manage client enquiries and dynamic gallery media."
      />

      {/* Header Banner */}
      <section className="bg-grey-nav text-white py-12 border-b border-grey-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Agency Internal Portal</span>
            </div>
            <h1 className="font-heading font-black text-3xl text-white">
              Grey Area Management Dashboard
            </h1>
          </div>

          <button
            onClick={fetchDashboardData}
            className="inline-flex items-center space-x-2 bg-grey-card hover:bg-grey-border border border-grey-border text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white min-h-[700px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Notification Toast */}
          {notification && (
            <div className="p-4 bg-black text-white rounded-xl shadow-xl flex items-center justify-between text-sm font-medium animate-fade-in">
              <span>{notification}</span>
              <button onClick={() => setNotification('')} className="text-gray-400 hover:text-white">✕</button>
            </div>
          )}

          {/* Key Metrics Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-grey-subtle p-6 rounded-2xl border border-gray-200">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                Total Client Enquiries
              </div>
              <div className="font-heading font-black text-3xl text-black">
                {stats.totalEnquiries}
              </div>
              <div className="text-xs text-gray-500 mt-1">Submitted through contact form</div>
            </div>

            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-200">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                New Actionable Enquiries
              </div>
              <div className="font-heading font-black text-3xl text-emerald-900">
                {stats.newEnquiries}
              </div>
              <div className="text-xs text-emerald-700 mt-1">Pending review / follow up</div>
            </div>

            <div className="bg-grey-subtle p-6 rounded-2xl border border-gray-200">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
                Gallery Showcase Items
              </div>
              <div className="font-heading font-black text-3xl text-black">
                {stats.galleryCount}
              </div>
              <div className="text-xs text-gray-500 mt-1">Managed dynamically</div>
            </div>

            <div className="bg-grey-nav text-white p-6 rounded-2xl border border-grey-border">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                Active Service Pillars
              </div>
              <div className="font-heading font-black text-3xl text-white">
                3
              </div>
              <div className="text-xs text-gray-300 mt-1">Brand Video, Marketing, Events</div>
            </div>

          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center space-x-2 sm:space-x-4 border-b border-gray-200 pb-2 overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('enquiries')}
              className={`flex items-center space-x-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-bold transition shrink-0 ${
                activeTab === 'enquiries'
                  ? 'bg-grey-nav text-white shadow'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Enquiries ({enquiries.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center space-x-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-bold transition shrink-0 ${
                activeTab === 'gallery'
                  ? 'bg-grey-nav text-white shadow'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Gallery ({galleryItems.length})</span>
            </button>
          </div>

          {/* TAB 1: Enquiries Table */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              
              {/* Status Filters */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-gray-500 uppercase">Filter Status:</span>
                  {['All', 'New', 'Contacted', 'In Progress', 'Completed'].map(status => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                        statusFilter === status
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-gray-500">
                  Showing {filteredEnquiries.length} of {enquiries.length} total
                </div>
              </div>

              {/* Table Container */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-700">
                    <thead className="bg-grey-nav text-white text-xs font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Client Name & Email</th>
                        <th className="px-6 py-4">Phone</th>
                        <th className="px-6 py-4">Service</th>
                        <th className="px-6 py-4">Message</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredEnquiries.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                            No enquiries found for this filter.
                          </td>
                        </tr>
                      ) : (
                        filteredEnquiries.map((enq) => (
                          <tr key={enq.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4">
                              <div className="font-bold text-black">{enq.name}</div>
                              <a href={`mailto:${enq.email}`} className="text-xs text-gray-500 hover:underline">{enq.email}</a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <a href={`tel:${enq.phone}`} className="text-xs font-semibold text-black hover:underline">{enq.phone}</a>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-block px-2.5 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                                {enq.service}
                              </span>
                            </td>
                            <td className="px-6 py-4 max-w-xs">
                              <p className="text-xs text-gray-600 line-clamp-3">{enq.message}</p>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                              {new Date(enq.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <select
                                value={enq.status}
                                onChange={(e) => handleUpdateStatus(enq.id, e.target.value)}
                                className={`text-xs font-bold px-2.5 py-1 rounded border focus:outline-none cursor-pointer ${
                                  enq.status === 'New' ? 'bg-amber-100 text-amber-900 border-amber-300' :
                                  enq.status === 'Contacted' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                                  enq.status === 'In Progress' ? 'bg-purple-100 text-purple-900 border-purple-300' :
                                  'bg-emerald-100 text-emerald-900 border-emerald-300'
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <button
                                onClick={() => handleDeleteEnquiry(enq.id)}
                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                title="Delete enquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Gallery Management */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-xl text-black">Dynamic Gallery Media</h3>
                  <p className="text-xs text-gray-500">Add or remove portfolio visual items displayed on the public Gallery page.</p>
                </div>

                <button
                  onClick={() => setShowAddGalleryModal(true)}
                  className="inline-flex items-center space-x-2 bg-grey-nav hover:bg-black text-white text-xs font-bold px-4 py-2.5 rounded-lg transition shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Gallery Item</span>
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {galleryItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
                    <div className="relative h-44 bg-gray-900">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-heading font-bold text-sm text-black">{item.title}</h4>
                        {item.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>}
                      </div>
                      <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                        <button
                          onClick={() => handleDeleteGalleryItem(item.id)}
                          className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </section>

      {/* Add Gallery Item Modal */}
      {showAddGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-8 border border-gray-200 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-xl text-black">Add New Gallery Media</h3>
              <button onClick={() => setShowAddGalleryModal(false)} className="text-gray-400 hover:text-black">✕</button>
            </div>

            <form onSubmit={handleAddGallerySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newGalleryItem.title}
                  onChange={e => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                  placeholder="e.g. Corporate Documentary Shoot"
                  className="w-full px-3.5 py-2.5 border rounded-lg text-sm text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Category *</label>
                <select
                  value={newGalleryItem.category}
                  onChange={e => setNewGalleryItem({ ...newGalleryItem, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 border rounded-lg text-sm text-black focus:outline-none focus:border-black bg-white"
                >
                  <option value="Brand Videos">Brand Videos</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Events">Events</option>
                  <option value="Product Shoots">Product Shoots</option>
                  <option value="Weddings & Celebrations">Weddings & Celebrations</option>
                  <option value="Behind The Scenes">Behind The Scenes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={newGalleryItem.imageUrl}
                  onChange={e => setNewGalleryItem({ ...newGalleryItem, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 border rounded-lg text-sm text-black focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Short Description</label>
                <textarea
                  rows="3"
                  value={newGalleryItem.description}
                  onChange={e => setNewGalleryItem({ ...newGalleryItem, description: e.target.value })}
                  placeholder="Short summary of project media..."
                  className="w-full px-3.5 py-2.5 border rounded-lg text-sm text-black focus:outline-none focus:border-black"
                ></textarea>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddGalleryModal(false)}
                  className="flex-1 py-3 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 py-3 text-xs font-bold text-white bg-grey-nav hover:bg-black rounded-lg transition"
                >
                  {actionLoading ? 'Saving...' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Admin;
