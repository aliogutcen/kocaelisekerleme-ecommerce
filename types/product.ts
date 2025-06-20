export interface ProductImage {
  original: string;
  thumbnail: string;
  medium: string;
  large: string;
  publicId: string | null;
  format: string;
  width: number | null;
  height: number | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  story: string | null;
  nutritionInfo: any;
  price: number;
  discountPrice: number | null;
  sku: string;
  stock: number;
  images: ProductImage[];
  isActive: boolean;
  categoryId: string;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  createdAt: Date;
  updatedAt: Date;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  _count?: {
    reviews: number;
    favorites: number;
  };
  avgRating?: number;
}