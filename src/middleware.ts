import { NextResponse, NextRequest } from 'next/server';
import { PropsStorageAuth } from './hooks/context/useAuth/useauth.types';

export const routesRequiredEmployee = ["/stock"];

export function middleware(request: NextRequest) {
  const cookieAuth = request.cookies.get('cookie_auth');
  const urlCurrent = request.nextUrl.clone().pathname;

  if (!cookieAuth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (routesRequiredEmployee.some((route) => urlCurrent.startsWith(route))) {
    const storage = JSON.parse(cookieAuth.value).state as PropsStorageAuth;
    const state = storage.state;

    if (!state.user || state.user.role !== "employee") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/buy/:path*", "/stock/:path*"] };
