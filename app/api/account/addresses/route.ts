import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const addressSchema = z.object({
  title: z.string().min(2),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().regex(/^[0-9]{10,11}$/),
  address: z.string().min(10),
  city: z.string().min(2),
  district: z.string().min(2),
  postalCode: z.string().regex(/^[0-9]{5}$/).optional(),
  isDefault: z.boolean().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Oturum açmanız gerekiyor' },
        { status: 401 }
      )
    }

    const addresses = await prisma.address.findMany({
      where: { userId: session.user.id },
      orderBy: [
        { isDefault: 'desc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json({
      success: true,
      addresses
    })
  } catch (error) {
    console.error('Addresses fetch error:', error)
    return NextResponse.json(
      { success: false, message: 'Adresler yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Oturum açmanız gerekiyor' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = addressSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        { success: false, message: 'Geçersiz form verisi' },
        { status: 400 }
      )
    }

    const { isDefault, ...addressData } = validatedData.data

    // If this is set as default, unset other defaults
    if (isDefault) {
      await prisma.address.updateMany({
        where: { 
          userId: session.user.id,
          isDefault: true 
        },
        data: { isDefault: false }
      })
    }

    const address = await prisma.address.create({
      data: {
        ...addressData,
        isDefault: isDefault || false,
        userId: session.user.id
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Adres başarıyla eklendi',
      address
    })
  } catch (error) {
    console.error('Address create error:', error)
    return NextResponse.json(
      { success: false, message: 'Adres eklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}