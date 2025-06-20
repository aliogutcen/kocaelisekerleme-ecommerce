import { NextRequest, NextResponse } from 'next/server'
import { resetPasswordSchema } from '@/lib/auth/types'
import { authService } from '@/lib/auth/services/auth.service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = resetPasswordSchema.safeParse(body)
    
    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Geçersiz form verisi',
          errors: validatedData.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }
    
    // Reset password
    const result = await authService.resetPassword(
      validatedData.data.token,
      validatedData.data.password
    )
    
    return NextResponse.json(result, {
      status: result.success ? 200 : 400
    })
  } catch (error) {
    console.error('Reset password API error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Sunucu hatası'
      },
      { status: 500 }
    )
  }
}