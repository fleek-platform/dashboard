import { type NextRequest as MiddlewareArgs, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)',
  ],
  unstable_allowDynamic: [
    '**/node_modules/.pnpm/jscrypto*/node_modules/jscrypto/**'
  ],
};

export const middleware = (_request: MiddlewareArgs) => {
  return NextResponse.next();
}
