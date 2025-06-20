import { NextRequest, NextResponse } from 'next/server'
import { forgotPasswordSchema } from '@/lib/auth/types'
import { authService } from '@/lib/auth/services/auth.service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = forgotPasswordSchema.safeParse(body)
    
    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Geçerli bir e-posta adresi giriniz'
        },
        { status: 400 }
      )
    }
    
    // Request password reset
    const result = await authService.requestPasswordReset(validatedData.data.email)
    
    return NextResponse.json(result, {
      status: result.success ? 200 : 400
    })
  } catch (error) {
    console.error('Forgot password API error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Sunucu hatası'
      },
      { status: 500 }
    )
  }
}