import { NextRequest, NextResponse } from "next/server";

// Şimdilik mock cart API - İleride gerçek implementasyon yapılacak
export async function GET(request: NextRequest) {
  return NextResponse.json({
    items: [],
    totalItems: 0,
    subtotal: 0,
    total: 0
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  return NextResponse.json({
    success: true,
    message: "Ürün sepete eklendi",
    cart: {
      items: [],
      totalItems: 0,
      subtotal: 0,
      total: 0
    }
  });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  
  return NextResponse.json({
    success: true,
    message: "Sepet güncellendi",
    cart: {
      items: [],
      totalItems: 0,
      subtotal: 0,
      total: 0
    }
  });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: "Sepet temizlendi",
    cart: {
      items: [],
      totalItems: 0,
      subtotal: 0,
      total: 0
    }
  });
}