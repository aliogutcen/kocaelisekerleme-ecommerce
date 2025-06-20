import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

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

    // Dosya boyutunu kontrol et (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Dosya boyutu 10MB'dan büyük olamaz" },
        { status: 400 }
      );
    }

    // File'ı Buffer'a çevir
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Cloudinary'ye yükle
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `ecommerce/${folder}`,
          resource_type: "image",
          transformation: [
            { quality: "auto:best" },
            { fetch_format: "auto" }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const uploadResult = response as any;

    // Farklı boyutlarda URL'ler oluştur
    const urls = {
      original: uploadResult.secure_url,
      thumbnail: cloudinary.url(uploadResult.public_id, {
        width: 300,
        height: 300,
        crop: "fill",
        quality: "auto",
        format: "auto"
      }),
      medium: cloudinary.url(uploadResult.public_id, {
        width: 600,
        height: 600,
        crop: "fill",
        quality: "auto",
        format: "auto"
      }),
      large: cloudinary.url(uploadResult.public_id, {
        width: 1200,
        height: 1200,
        crop: "fill",
        quality: "auto:best",
        format: "auto"
      })
    };

    return NextResponse.json({
      success: true,
      urls,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
      size: uploadResult.bytes
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { 
        error: "Görsel yüklenirken hata oluştu",
        details: error.message || error.toString(),
        // Development'ta daha detaylı hata mesajı
        ...(process.env.NODE_ENV === "development" && { fullError: error })
      },
      { status: 500 }
    );
  }
}

// Görsel silme endpoint'i
export async function DELETE(request: NextRequest) {
  try {
    const { publicId } = await request.json();
    
    if (!publicId) {
      return NextResponse.json(
        { error: "Public ID gerekli" },
        { status: 400 }
      );
    }

    await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({
      success: true,
      message: "Görsel başarıyla silindi"
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Görsel silinirken hata oluştu" },
      { status: 500 }
    );
  }
}