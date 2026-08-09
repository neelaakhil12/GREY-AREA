import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFilePath = path.join(__dirname, 'database.json');

// Initial seed data for gallery items
const initialGalleryItems = [
  {
    id: "g1",
    title: "Brand Story: Elevate Tech Nigeria",
    category: "Brand Videos",
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
    description: "Cinematic commercial highlighting tech startup journey and digital transformation in Lagos.",
    createdAt: new Date().toISOString()
  },
  {
    id: "g2",
    title: "National Business Leadership Summit",
    category: "Corporate",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    description: "Comprehensive corporate event coverage with multicam video production and keynotes.",
    createdAt: new Date().toISOString()
  },
  {
    id: "g3",
    title: "Afro-Creative Fashion Showcase",
    category: "Events",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    description: "High-energy event recap featuring runway highlights and sound design.",
    createdAt: new Date().toISOString()
  },
  {
    id: "g4",
    title: "Luxury Watch Commercial Shoot",
    category: "Product Shoots",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    description: "Macro studio photography and slow-motion video highlight for luxury wristwear.",
    createdAt: new Date().toISOString()
  },
  {
    id: "g5",
    title: "Royal Lagos Wedding Story",
    category: "Weddings & Celebrations",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    description: "Emotional wedding highlight film capturing authentic moments and traditional splendor.",
    createdAt: new Date().toISOString()
  },
  {
    id: "g6",
    title: "Behind The Scenes: Commercial Film Crew",
    category: "Behind The Scenes",
    imageUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80",
    description: "Inside the production set with Grey Area cinema cameras, lighting, and sound direction.",
    createdAt: new Date().toISOString()
  },
  {
    id: "g7",
    title: "Corporate Identity Promo - FinTech",
    category: "Brand Videos",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    description: "Dynamic motion graphics and video campaign for mobile banking platform.",
    createdAt: new Date().toISOString()
  },
  {
    id: "g8",
    title: "Annual Energy Gala & Awards",
    category: "Events",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    description: "Live switching and highlight reel for corporate award presentation night.",
    createdAt: new Date().toISOString()
  }
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    if (!fs.existsSync(dbFilePath)) {
      const initialData = {
        enquiries: [
          {
            id: "enq_1",
            name: "Adesanya Ogunlesi",
            email: "adesanya@example.com",
            phone: "+2348012345678",
            service: "Brand Video Production",
            message: "We need a 2-minute brand story video for our fintech startup launch next month.",
            status: "New",
            created_at: new Date(Date.now() - 3600000 * 5).toISOString()
          },
          {
            id: "enq_2",
            name: "Ngozi Chukwu",
            email: "ngozi.events@example.com",
            phone: "+2348098765432",
            service: "Event Coverage",
            message: "Inquiring about full multi-cam event video and highlight reel for a 2-day conference in Abuja.",
            status: "Contacted",
            created_at: new Date(Date.now() - 3600000 * 24).toISOString()
          }
        ],
        gallery_items: initialGalleryItems
      };
      fs.writeFileSync(dbFilePath, JSON.stringify(initialData, null, 2), 'utf-8');
    }
  }

  read() {
    try {
      const raw = fs.readFileSync(dbFilePath, 'utf-8');
      return JSON.parse(raw);
    } catch (err) {
      console.error('Database read error:', err);
      return { enquiries: [], gallery_items: [] };
    }
  }

  write(data) {
    try {
      fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Database write error:', err);
    }
  }

  // Enquiry methods
  getEnquiries() {
    const data = this.read();
    return data.enquiries.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  addEnquiry(enquiry) {
    const data = this.read();
    const newEnquiry = {
      id: `enq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      ...enquiry,
      status: 'New',
      created_at: new Date().toISOString()
    };
    data.enquiries.unshift(newEnquiry);
    this.write(data);
    return newEnquiry;
  }

  updateEnquiryStatus(id, status) {
    const data = this.read();
    const index = data.enquiries.findIndex(e => e.id === id);
    if (index !== -1) {
      data.enquiries[index].status = status;
      this.write(data);
      return data.enquiries[index];
    }
    return null;
  }

  deleteEnquiry(id) {
    const data = this.read();
    const initialLength = data.enquiries.length;
    data.enquiries = data.enquiries.filter(e => e.id !== id);
    this.write(data);
    return data.enquiries.length < initialLength;
  }

  // Gallery methods
  getGalleryItems(category = 'All') {
    const data = this.read();
    if (!category || category === 'All') {
      return data.gallery_items;
    }
    return data.gallery_items.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  addGalleryItem(item) {
    const data = this.read();
    const newItem = {
      id: `g_${Date.now()}`,
      title: item.title,
      category: item.category,
      imageUrl: item.imageUrl,
      description: item.description || '',
      createdAt: new Date().toISOString()
    };
    data.gallery_items.unshift(newItem);
    this.write(data);
    return newItem;
  }

  deleteGalleryItem(id) {
    const data = this.read();
    const initialLength = data.gallery_items.length;
    data.gallery_items = data.gallery_items.filter(i => i.id !== id);
    this.write(data);
    return data.gallery_items.length < initialLength;
  }

  getStats() {
    const data = this.read();
    const totalEnquiries = data.enquiries.length;
    const newEnquiries = data.enquiries.filter(e => e.status === 'New').length;
    const galleryCount = data.gallery_items.length;
    return {
      totalEnquiries,
      newEnquiries,
      galleryCount,
      servicesCount: 3
    };
  }
}

export const db = new Database();
