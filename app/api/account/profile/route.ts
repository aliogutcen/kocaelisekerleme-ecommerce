import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const profileSchema = z.object({
  name: z.string().min(2).optional(),
  surname: z.string().min(2).optional(),
  phone: z.string().regex(/^[0-9]{10,11}$/).optional().or(z.literal("")),
})

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Oturum açmanız gerekiyor' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = profileSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        { success: false, message: 'Geçersiz form verisi' },
        { status: 400 }
      )
    }

    const { name, surname, phone } = validatedData.data

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name || null,
        surname: surname || null,
        phone: phone || null,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Profil başarıyla güncellendi'
    })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { success: false, message: 'Profil güncellenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}