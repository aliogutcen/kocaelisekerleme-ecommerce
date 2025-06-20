import { NextRequest, NextResponse } from 'next/server'
import { authService } from '@/lib/auth/services/auth.service'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const token = searchParams.get('token')
    
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Token gerekli'
        },
        { status: 400 }
      )
    }
    
    const result = await authService.verifyEmail(token)
    
    return NextResponse.json(result, {
      status: result.success ? 200 : 400
    })
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Doğrulama sırasında bir hata oluştu'
      },
      { status: 500 }
    )
  }
}