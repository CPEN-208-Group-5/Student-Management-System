import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, first_name, last_name, department, position, employee_id } = body;

    // Basic validation
    if (!email || !password || !first_name || !last_name || !department || !position || !employee_id) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database registration
    // For now, we'll use a simple mock registration
    console.log('Staff registration data:', {
      email,
      first_name,
      last_name,
      department,
      position,
      employee_id,
      password: '***' // Don't log actual password
    });

    return NextResponse.json(
      { 
        message: 'Registration successful',
        user: {
          id: Math.floor(Math.random() * 1000),
          email,
          first_name,
          last_name,
          department,
          position,
          employee_id,
          role: 'staff'
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Staff registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 