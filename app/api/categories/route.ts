import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Tüm kategorileri getir
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const includeProducts = searchParams.get("includeProducts") === "true";
    const parentId = searchParams.get("parentId");

    const where = parentId ? { parentId } : {};

    const categories = await prisma.category.findMany({
      where,
      include: {
        children: true,
        _count: {
          select: { products: true }
        },
        ...(includeProducts && {
          products: {
            where: { isActive: true },
            select: {
              id: true,
              name: true,
              slug: true,
              price: true,
              images: true
            }
          }
        })
      },
      orderBy: { name: "asc" }
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Kategoriler yüklenirken hata oluştu" },
      { status: 500 }
    );
  }
}

// POST - Yeni kategori oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, image, parentId } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Kategori adı gereklidir" },
        { status: 400 }
      );
    }

    // Slug oluştur
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

    // Slug benzersizliğini kontrol et
    const existingCategory = await prisma.category.findUnique({
      where: { slug }
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Bu kategori zaten mevcut" },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description: description || null,
        image: image || null,
        parentId: parentId || null
      },
      include: {
        parent: true,
        _count: {
          select: { products: true }
        }
      }
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { 
        error: "Kategori oluşturulurken hata oluştu",
        details: error.message || error.toString(),
        // Development'ta daha detaylı hata mesajı
        ...(process.env.NODE_ENV === "development" && { fullError: error })
      },
      { status: 500 }
    );
  }
}