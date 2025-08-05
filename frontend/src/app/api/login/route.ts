import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database authentication
    // For now, we'll use a simple mock authentication
    if (email === 'student@example.com' && password === 'password123') {
      return NextResponse.json(
        { 
          message: 'Login successful',
          user: {
            id: 1,
            email: email,
            first_name: 'George',
            last_name: 'Gyamfi',
            role: 'student'
          }
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 