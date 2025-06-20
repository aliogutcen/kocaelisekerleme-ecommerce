import { NextRequest, NextResponse } from 'next/server'
import { registerSchema } from '@/lib/auth/types'
import { authService } from '@/lib/auth/services/auth.service'

export async function POST(request: NextRequest) {
  try {
    console.log('Register endpoint called')
    const body = await request.json()
    console.log('Request body:', body)
    
    // Validate input
    const validatedData = registerSchema.safeParse(body)
    
    if (!validatedData.success) {
      console.log('Validation failed:', validatedData.error.flatten())
      return NextResponse.json(
        {
          success: false,
          message: 'Geçersiz form verisi',
          errors: validatedData.error.flatten().fieldErrors
        },
        { status: 400 }
      )
    }
    
    console.log('Validation passed, calling authService.register')
    // Register user
    const result = await authService.register(validatedData.data)
    console.log('Register result:', result)
    
    return NextResponse.json(result, {
      status: result.success ? 201 : 400
    })
  } catch (error) {
    console.error('Register API error:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack')
    return NextResponse.json(
      {
        success: false,
        message: 'Sunucu hatası',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}