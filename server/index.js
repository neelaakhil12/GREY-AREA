import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { db } from './db.js';
import cloudinary from './cloudinary.js';
import { supabase } from './supabase.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024 } // 200MB max file limit for high quality video files
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

// API Routes

// Cloudinary File Upload Endpoint (Images & Videos)
app.post('/api/upload', (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      console.error('Multer file upload error:', err);
      return res.status(400).json({ 
        success: false, 
        message: err.code === 'LIMIT_FILE_SIZE' 
          ? 'File size exceeds maximum upload limit. Please select a smaller media file.' 
          : (err.message || 'File upload error.') 
      });
    }
    next();
  });
}, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image or video file uploaded.' });
    }

    const isVideo = req.file.mimetype.startsWith('video/');
    const resourceType = isVideo ? 'video' : 'auto';

    console.log(`[Uploading File] Name: ${req.file.originalname} | Size: ${(req.file.size / 1024 / 1024).toFixed(2)} MB | Type: ${req.file.mimetype}`);

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'grey_area_agency',
        resource_type: resourceType,
        chunk_size: 6000000 // 6MB chunks for reliable video uploads
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary Upload Error:', error);
          return res.status(500).json({ 
            success: false, 
            message: error.message || 'Failed to upload media file to Cloudinary cloud storage.' 
          });
        }

        console.log(`[Cloudinary Upload Success] Type: ${result.resource_type} | URL: ${result.secure_url}`);

        res.json({
          success: true,
          message: 'File successfully uploaded to Cloudinary!',
          url: result.secure_url,
          format: result.format,
          resourceType: result.resource_type || (isVideo ? 'video' : 'image'),
          publicId: result.public_id
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error('File upload server error:', error);
    res.status(500).json({ success: false, message: 'An internal server error occurred while processing media upload.' });
  }
});

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

// Admin Login API
app.post('/api/admin/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const defaultAdminEmail = process.env.ADMIN_EMAIL || 'admin@greyarea.com';
    const defaultAdminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (email.trim().toLowerCase() === defaultAdminEmail.toLowerCase() && password === defaultAdminPassword) {
      const token = `ga_admin_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      return res.json({
        success: true,
        message: 'Admin authentication successful.',
        token,
        user: {
          name: 'Grey Area Administrator',
          email: defaultAdminEmail,
          role: 'Admin'
        }
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid admin email or password credentials.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error processing admin login.' });
  }
});

// Gallery API
app.get('/api/gallery', async (req, res) => {
  try {
    const { category } = req.query;

    // Supabase is the authoritative source for gallery items.
    // If Supabase has data, return ONLY those items — do NOT merge with db.json
    // which can contain stale/deleted items.
    try {
      const { data: supaItems, error } = await supabase.from('gallery_items').select('*').order('created_at', { ascending: false });
      if (!error && supaItems && supaItems.length > 0) {
        let formatted = supaItems.map(item => ({
          id: item.id,
          title: item.title,
          category: item.category || 'Photos',
          mediaType: item.media_type || 'image',
          imageUrl: item.image_url,
          videoUrl: item.video_url || '',
          description: item.description || '',
          createdAt: item.created_at
        }));
        if (category && category !== 'All') {
          formatted = formatted.filter(i => i.category.toLowerCase() === category.toLowerCase());
        }
        return res.json({ success: true, data: formatted });
      }
    } catch (e) {
      console.warn('Supabase gallery read note:', e);
    }

    // Fallback: local db.json (only Cloudinary items, not placeholder Unsplash ones)
    const localItems = db.getGalleryItems(category).filter(i =>
      i.imageUrl?.includes('cloudinary.com') || i.videoUrl?.includes('cloudinary.com')
    );
    res.json({ success: true, data: localItems });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching gallery items' });
  }
});


app.post('/api/gallery', async (req, res) => {
  try {
    const { id, title, category, mediaType, imageUrl, videoUrl, description } = req.body;

    if (!title || (!imageUrl && !videoUrl)) {
      return res.status(400).json({ success: false, message: 'Title and Media Cover/Image URL are required.' });
    }

    const newItem = db.addGalleryItem({ id, title, category: category || 'Photos', mediaType, imageUrl, videoUrl, description });

    try {
      await supabase.from('gallery_items').upsert({
        id: newItem.id,
        title: newItem.title,
        category: newItem.category,
        media_type: newItem.mediaType,
        image_url: newItem.imageUrl,
        video_url: newItem.videoUrl || '',
        description: newItem.description || ''
      }, { onConflict: 'id' });
    } catch (e) {
      console.warn('Supabase gallery upsert note:', e);
    }

    res.status(201).json({ success: true, message: 'Gallery item added successfully.', data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error adding gallery item' });
  }
});

app.put('/api/gallery/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, mediaType, imageUrl, videoUrl, description } = req.body;

    if (!title || !category || !imageUrl) {
      return res.status(400).json({ success: false, message: 'Title, Category, and Media Cover/Image URL are required.' });
    }

    const updatedItem = db.updateGalleryItem(id, { title, category, mediaType, imageUrl, videoUrl, description });
    if (!updatedItem) {
      return res.status(404).json({ success: false, message: 'Gallery item not found.' });
    }

    res.json({ success: true, message: 'Gallery item updated successfully.', data: updatedItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating gallery item' });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { publicId, imageUrl, videoUrl } = req.body || {};

    // 1. Delete from local db.json
    db.deleteGalleryItem(id);

    // 2. Delete from Supabase cloud database
    try {
      const { error: supaErr } = await supabase.from('gallery_items').delete().eq('id', id);
      if (supaErr) {
        console.error('[Supabase Delete Error]', supaErr);
      } else {
        console.log(`[Supabase Delete] Item ${id} deleted successfully.`);
      }
    } catch (e) {
      console.warn('Supabase gallery item delete error:', e);
    }

    // 3. Delete from Cloudinary if publicId provided or can be extracted from URL
    let cloudPublicId = publicId;
    if (!cloudPublicId && (imageUrl || videoUrl)) {
      const url = videoUrl || imageUrl || '';
      // Extract public ID from Cloudinary URL: .../upload/v.../folder/filename.ext
      const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
      if (match) cloudPublicId = match[1];
    }
    if (cloudPublicId) {
      try {
        const isVideo = (videoUrl || '').includes('cloudinary.com') || cloudPublicId.includes('/video/');
        const resourceType = isVideo ? 'video' : 'image';
        const result = await cloudinary.uploader.destroy(cloudPublicId, { resource_type: resourceType });
        console.log(`[Cloudinary Delete] publicId: ${cloudPublicId} | result: ${result.result}`);
      } catch (e) {
        console.warn('Cloudinary delete error:', e.message);
      }
    }

    res.json({ success: true, message: 'Gallery item removed permanently from all sources.' });
  } catch (error) {
    console.error('Gallery delete server error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting gallery item' });
  }
});

// Newsletter API
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email, name, source } = req.body;

    if (!email || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address.' 
      });
    }

    const { subscriber, alreadySubscribed } = db.addSubscriber({
      email,
      name: name || '',
      source: source || 'Website CTA'
    });

    // Write to Supabase table
    try {
      await supabase.from('newsletter_subscribers').upsert({
        id: subscriber.id,
        email: subscriber.email,
        name: subscriber.name || 'Valued Subscriber',
        source: subscriber.source || 'Website CTA',
        status: 'Active',
        subscribed_at: subscriber.subscribedAt
      }, { onConflict: 'email' });
    } catch (e) {
      console.warn('Supabase subscriber sync note:', e);
    }

    if (alreadySubscribed) {
      return res.status(200).json({
        success: true,
        alreadySubscribed: true,
        message: 'You are already subscribed to our newsletter! Thank you for staying connected.',
        data: subscriber
      });
    }

    console.log(`[Newsletter Subscribed] Email: ${subscriber.email} (Source: ${subscriber.source})`);

    res.status(201).json({
      success: true,
      alreadySubscribed: false,
      message: '🎉 Subscription successful! Thank you for subscribing to Grey Area Media newsletter.',
      data: subscriber
    });
  } catch (error) {
    console.error('Error handling newsletter subscription:', error);
    res.status(500).json({ success: false, message: 'An internal server error occurred. Please try again.' });
  }
});

app.get('/api/newsletter/subscribers', async (req, res) => {
  try {
    let subscribers = db.getSubscribers();

    // Query Supabase
    try {
      const { data: supaSubs } = await supabase.from('newsletter_subscribers').select('*');
      if (supaSubs && supaSubs.length > 0) {
        const formattedSupa = supaSubs.map(s => ({
          id: s.id,
          email: s.email,
          name: s.name,
          source: s.source,
          status: s.status || 'Active',
          subscribedAt: s.subscribed_at
        }));
        const subMap = new Map();
        [...formattedSupa, ...subscribers].forEach(s => {
          if (s && s.email && !subMap.has(s.email.toLowerCase())) {
            subMap.set(s.email.toLowerCase(), s);
          }
        });
        subscribers = Array.from(subMap.values());
      }
    } catch (e) {
      console.warn('Supabase subscribers read note:', e);
    }

    res.json({ success: true, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching subscribers' });
  }
});

app.delete('/api/newsletter/subscribers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    db.deleteSubscriber(id);

    // Delete from Supabase cloud database by id or email
    try {
      await supabase.from('newsletter_subscribers').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase subscriber delete note:', e);
    }

    res.json({ success: true, message: 'Subscriber removed permanently.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error deleting subscriber' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`================================================`);
  console.log(` Grey Area Media Agency API Server running on port ${PORT}`);
  console.log(` Database: Persistent database.json initialized`);
  console.log(`================================================`);
});
