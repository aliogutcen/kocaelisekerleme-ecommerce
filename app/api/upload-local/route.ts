import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string || "products";
    
    if (!file) {
      return NextResponse.json(
        { error: "Dosya bulunamadı" },
        { status: 400 }
      );
    }

    // Dosya tipini kontrol et
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Sadece görsel dosyaları yüklenebilir" },
        { status: 400 }
      );
    }

    // Dosya boyutunu kontrol et (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Dosya boyutu 5MB'dan büyük olamaz" },
        { status: 400 }
      );
    }

    // Dosya uzantısını al
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Upload dizinini oluştur
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      // Dizin zaten varsa hata verme
    }

    // Dosyayı kaydet
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, fileName);
    
    await writeFile(filePath, buffer);

    // URL'leri oluştur
    const baseUrl = `/uploads/${folder}/${fileName}`;
    
    return NextResponse.json({
      success: true,
      urls: {
        original: baseUrl,
        thumbnail: baseUrl, // Gerçek projede bunlar için image processing yapılabilir
        medium: baseUrl,
        large: baseUrl
      },
      fileName,
      size: file.size,
      type: file.type
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { 
        error: "Görsel yüklenirken hata oluştu",
        details: error.message
      },
      { status: 500 }
    );
  }
}