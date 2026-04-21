import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Example secret key - in a real app, this would be in .env
const API_SECRET = process.env.API_SECRET || 'premium_secret_123';

export function proxy(request: NextRequest) {
  // Only authorize API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Skip auth for error logging endpoint to avoid loops
    if (request.nextUrl.pathname === '/api/log-error') {
      return NextResponse.next();
    }

    const authHeader = request.headers.get('Authorization');

    if (!authHeader || authHeader !== `Bearer ${API_SECRET}`) {
      // Log unauthorized attempt (Edge compatible)
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
  matcher: '/api/:path*',
};
