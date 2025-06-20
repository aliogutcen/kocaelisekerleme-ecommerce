import { v2 as cloudinary } from 'cloudinary';

// Cloudinary yapılandırması
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export default cloudinary;

// Upload preset ayarları
export const uploadPresets = {
  products: 'ecommerce_products',
  categories: 'ecommerce_categories',
  users: 'ecommerce_users'
};

// Görsel optimizasyon ayarları
export const imageTransformations = {
  productThumbnail: {
    width: 300,
    height: 300,
    crop: 'fill',
    quality: 'auto',
    format: 'auto'
  },
  productMain: {
    width: 800,
    height: 800,
    crop: 'fill',
    quality: 'auto:best',
    format: 'auto'
  },
  productLarge: {
    width: 1200,
    height: 1200,
    crop: 'fill',
    quality: 'auto:best',
    format: 'auto'
  },
  categoryImage: {
    width: 400,
    height: 400,
    crop: 'fill',
    quality: 'auto',
    format: 'auto'
  }
};