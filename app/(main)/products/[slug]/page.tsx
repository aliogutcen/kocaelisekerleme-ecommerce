import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import ProductDetailClient from "./product-detail-client"

interface ProductPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true }
  })

  return products.map((product) => ({
    slug: product.slug
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              surname: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (!product) {
    notFound()
  }

  // Get related products
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
      isActive: true
    },
    take: 4,
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Calculate average rating
  const avgRating = product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0

  // Format product data
  const formattedProduct = {
    ...product,
    price: product.price.toString(),
    discountPrice: product.discountPrice?.toString() || null,
    avgRating,
    reviewCount: product.reviews.length
  }

  return (
    <ProductDetailClient 
      product={formattedProduct} 
      relatedProducts={relatedProducts}
    />
  )
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    select: { name: true, description: true }
  })

  if (!product) {
    return {
      title: 'Ürün Bulunamadı - Kocaeli Şekerleme',
    }
  }

  return {
    title: `${product.name} - Kocaeli Şekerleme`,
    description: product.description || `${product.name} - Geleneksel lezzetler`,
  }
}