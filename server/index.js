import express from 'express';
import cors from 'cors';
import { db } from './db.js';

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes

// Get Dashboard Stats
app.get('/api/stats', (req, res) => {
  try {
    const stats = db.getStats();
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving stats' });
  }
});

// Enquiries API
app.get('/api/enquiries', (req, res) => {
  try {
    const enquiries = db.getEnquiries();
    res.json({ success: true, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving enquiries' });
  }
});

app.post('/api/enquiries', (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Full name is required.' });
    }
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Valid email address is required.' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'Phone number is required.' });
    }
    if (!service) {
      return res.status(400).json({ success: false, message: 'Please select a service of interest.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message cannot be empty.' });
    }

    const savedEnquiry = db.addEnquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      service,
      message: message.trim()
    });

    console.log(`[Enquiry Received] From: ${savedEnquiry.name} (${savedEnquiry.email}) - Service: ${savedEnquiry.service}`);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received successfully. Our team will contact you shortly.',
      data: savedEnquiry
    });
  } catch (error) {
    console.error('Error saving enquiry:', error);
    res.status(500).json({ success: false, message: 'An internal server error occurred. Please try again.' });
  }
});

app.patch('/api/enquiries/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['New', 'Contacted', 'In Progress', 'Completed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status provided.' });
    }

    const updated = db.updateEnquiryStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }

    res.json({ success: true, message: 'Status updated successfully.', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating status' });
  }
});

app.delete('/api/enquiries/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteEnquiry(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }
    res.json({ success: true, message: 'Enquiry deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error deleting enquiry' });
  }
});

// Gallery API
app.get('/api/gallery', (req, res) => {
  try {
    const { category } = req.query;
    const items = db.getGalleryItems(category);
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching gallery items' });
  }
});

app.post('/api/gallery', (req, res) => {
  try {
    const { title, category, imageUrl, description } = req.body;

    if (!title || !category || !imageUrl) {
      return res.status(400).json({ success: false, message: 'Title, Category, and Image URL are required.' });
    }

    const newItem = db.addGalleryItem({ title, category, imageUrl, description });
    res.status(201).json({ success: true, message: 'Gallery item added successfully.', data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error adding gallery item' });
  }
});

app.delete('/api/gallery/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteGalleryItem(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    }
    res.json({ success: true, message: 'Gallery item removed successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error deleting gallery item' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`================================================`);
  console.log(` Grey Area Media Agency API Server running on port ${PORT}`);
  console.log(` Database: Persistent database.json initialized`);
  console.log(`================================================`);
});
