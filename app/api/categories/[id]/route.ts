import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Tek kategori getir
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        parent: true,
        children: true,
        products: {
          where: { isActive: true },
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            discountPrice: true,
            images: true,
            stock: true
          }
        },
        _count: {
          select: { products: true }
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { error: "Kategori bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Kategori yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// PUT - Kategori güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, description, image, parentId } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Kategori adı gereklidir" },
        { status: 400 }
      );
    }

    // Mevcut kategoriyi kontrol et
    const existingCategory = await prisma.category.findUnique({
      where: { id: params.id }
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Kategori bulunamadı" },
        { status: 404 }
      );
    }

    // Slug güncelle
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

    // Slug benzersizliğini kontrol et (kendisi hariç)
    const duplicateCategory = await prisma.category.findFirst({
      where: {
        slug,
        NOT: { id: params.id }
      }
    });

    if (duplicateCategory) {
      return NextResponse.json(
        { error: "Bu kategori adı zaten kullanılıyor" },
        { status: 400 }
      );
    }

    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        description,
        image,
        parentId
      },
      include: {
        parent: true,
        children: true,
        _count: {
          select: { products: true }
        }
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Kategori güncellenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE - Kategori sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Alt kategorileri ve ürünleri kontrol et
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            children: true,
            products: true
          }
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { error: "Kategori bulunamadı" },
        { status: 404 }
      );
    }

    if (category._count.children > 0) {
      return NextResponse.json(
        { error: "Alt kategorileri olan kategori silinemez" },
        { status: 400 }
      );
    }

    if (category._count.products > 0) {
      return NextResponse.json(
        { error: "Ürünleri olan kategori silinemez" },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id: params.id }
    });

    return NextResponse.json(
      { message: "Kategori başarıyla silindi" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Kategori silinirken hata oluştu" },
      { status: 500 }
    );
  }
}