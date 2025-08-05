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
    if (email === 'staff@example.com' && password === 'password123') {
      return NextResponse.json(
        { 
          message: 'Login successful',
          user: {
            id: 1,
            email: email,
            first_name: 'John',
            last_name: 'Doe',
            role: 'staff',
            department: 'Computer Engineering',
            position: 'Lecturer'
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
    console.error('Staff login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 