import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'hmvqehoa',
  api_key: process.env.CLOUDINARY_API_KEY || '463479375749644',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'nqoT_hSxeR0RgC2b5U5kHyvq_XQ',
  secure: true
});

export default cloudinary;
