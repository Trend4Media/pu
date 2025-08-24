import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request: NextRequest) {
  // Only apply middleware to API routes and protected pages
  if (request.nextUrl.pathname.startsWith('/api/protected') || 
      request.nextUrl.pathname.startsWith('/game')) {
    
    const token = request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Add user info to headers for API routes
    const response = NextResponse.next();
    response.headers.set('x-user-id', payload.userId);
    response.headers.set('x-player-id', payload.playerId || '');
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/protected/:path*', '/game/:path*']
};