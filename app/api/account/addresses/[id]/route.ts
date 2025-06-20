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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Check if address belongs to user
    const existingAddress = await prisma.address.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })

    if (!existingAddress) {
      return NextResponse.json(
        { success: false, message: 'Adres bulunamadı' },
        { status: 404 }
      )
    }

    const { isDefault, ...addressData } = validatedData.data

    // If this is set as default, unset other defaults
    if (isDefault && !existingAddress.isDefault) {
      await prisma.address.updateMany({
        where: { 
          userId: session.user.id,
          isDefault: true,
          NOT: { id: params.id }
        },
        data: { isDefault: false }
      })
    }

    const address = await prisma.address.update({
      where: { id: params.id },
      data: {
        ...addressData,
        isDefault: isDefault || false
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Adres başarıyla güncellendi',
      address
    })
  } catch (error) {
    console.error('Address update error:', error)
    return NextResponse.json(
      { success: false, message: 'Adres güncellenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Oturum açmanız gerekiyor' },
        { status: 401 }
      )
    }

    // Check if address belongs to user
    const address = await prisma.address.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })

    if (!address) {
      return NextResponse.json(
        { success: false, message: 'Adres bulunamadı' },
        { status: 404 }
      )
    }

    await prisma.address.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Adres başarıyla silindi'
    })
  } catch (error) {
    console.error('Address delete error:', error)
    return NextResponse.json(
      { success: false, message: 'Adres silinirken bir hata oluştu' },
      { status: 500 }
    )
  }
}