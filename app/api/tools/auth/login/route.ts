import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.warn('JWT_SECRET is not defined in environment variables');
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const supabase = await createClient();

    const { data: user, error } = await supabase
      .from('tools_user')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
       return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET || 'fallback_for_dev_only',
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, username: user.username, nickname: user.nickname }
    });

    response.cookies.set('tools_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
