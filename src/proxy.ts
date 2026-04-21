import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_SECRET = process.env.API_SECRET || 'premium_secret_123';
const SESSION_COOKIE = 'auth_session';

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const email = url.searchParams.get('email');
  const token = url.searchParams.get('token');

  // 1. Handling URL-based Authentication
  if (email && token) {
    // Validate token (for demo purposes, we accept any token)
    console.log(`Authenticating user: ${email}`);
    
    // Create the response object
    const response = NextResponse.redirect(new URL('/', request.url));
    
    // Set the session cookie
    response.cookies.set(SESSION_COOKIE, JSON.stringify({ email, token }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  }

  // 2. Protecting the Dashboard (Root path)
  if (url.pathname === '/') {
    const session = request.cookies.get(SESSION_COOKIE);
    if (!session) {
      return NextResponse.redirect(new URL('/session-expired', request.url));
    }
  }

  // 3. Authorizing API routes
  if (url.pathname.startsWith('/api')) {
    // Skip auth for error logging
    if (url.pathname === '/api/log-error') {
      return NextResponse.next();
    }

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || authHeader !== `Bearer ${API_SECRET}`) {
      console.warn('Unauthorized API access attempt:', {
        url: request.url,
        ip: request.headers.get('x-forwarded-for') || '127.0.0.1',
      });

      return NextResponse.json(
        { success: false, error: 'Unauthorized: Missing or invalid token' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/api/:path*'],
};
