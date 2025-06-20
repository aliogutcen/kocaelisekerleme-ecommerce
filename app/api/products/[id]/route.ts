import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Tek ürün getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        variants: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                surname: true
              }
            }
          },
          orderBy: { createdAt: "desc" }
        },
        _count: {
          select: {
            reviews: true,
            favorites: true,
            orderItems: true
          }
        }
      }
    });

    if (!product) {
      return NextResponse.json(
        { error: "Ürün bulunamadı" },
        { status: 404 }
      );
    }

    // Ortalama rating hesapla
    const avgRating = await prisma.review.aggregate({
      where: { productId: product.id },
      _avg: { rating: true }
    });

    return NextResponse.json({
      ...product,
      avgRating: avgRating._avg.rating || 0
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Ürün yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// PUT - Ürün güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      story,
      nutritionInfo,
      price,
      discountPrice,
      sku,
      stock,
      images,
      categoryId,
      isActive,
      metaTitle,
      metaDescription,
      metaKeywords,
      ogTitle,
      ogDescription,
      ogImage
    } = body;

    // Mevcut ürünü kontrol et
    const existingProduct = await prisma.product.findUnique({
      where: { id: params.id }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Ürün bulunamadı" },
        { status: 404 }
      );
    }

    // SKU benzersizliğini kontrol et (kendisi hariç)
    if (sku && sku !== existingProduct.sku) {
      const duplicateSku = await prisma.product.findFirst({
        where: {
          sku,
          NOT: { id: params.id }
        }
      });

      if (duplicateSku) {
        return NextResponse.json(
          { error: "Bu SKU zaten kullanılıyor" },
          { status: 400 }
        );
      }
    }

    // Kategori varlığını kontrol et
    if (categoryId && categoryId !== existingProduct.categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId }
      });

      if (!category) {
        return NextResponse.json(
          { error: "Geçersiz kategori" },
          { status: 400 }
        );
      }
    }

    // Slug güncelle
    let finalSlug = existingProduct.slug;
    if (name && name !== existingProduct.name) {
      const slug = name
        .toLowerCase()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      // Slug benzersizliğini sağla
      finalSlug = slug;
      let counter = 1;
      while (
        await prisma.product.findFirst({
          where: {
            slug: finalSlug,
            NOT: { id: params.id }
          }
        })
      ) {
        finalSlug = `${slug}-${counter}`;
        counter++;
      }
    }

    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        name,
        slug: finalSlug,
        description,
        story,
        nutritionInfo,
        price,
        discountPrice,
        sku,
        stock,
        images,
        categoryId,
        isActive,
        metaTitle,
        metaDescription,
        metaKeywords,
        ogTitle,
        ogDescription,
        ogImage
      },
      include: {
        category: true,
        variants: true
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Ürün güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE - Ürün sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Siparişlerde kullanılıp kullanılmadığını kontrol et
    const orderItems = await prisma.orderItem.count({
      where: { productId: params.id }
    });

    if (orderItems > 0) {
      // Soft delete - sadece deaktif et
      await prisma.product.update({
        where: { id: params.id },
        data: { isActive: false }
      });

      return NextResponse.json(
        { message: "Ürün deaktif edildi (siparişlerde kullanılmış)" },
        { status: 200 }
      );
    }

    // Hard delete
    await prisma.product.delete({
      where: { id: params.id }
    });

    return NextResponse.json(
      { message: "Ürün başarıyla silindi" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Ürün silinirken hata oluştu" },
      { status: 500 }
    );
  }
}