import { routes } from '@fleek-platform/utils-routes';
import type { NextRequest as MiddlewareArgs } from 'next/server';
import { NextResponse } from 'next/server';

import { constants } from './constants';
import { matchesPathname } from './utils/matchesPathname';

export const middleware = async (request: MiddlewareArgs) => {
  const hasAuthentication = Boolean(
    request.cookies.get('authProviderToken')?.value,
  );

  if (hasAuthentication && request.nextUrl.pathname === routes.home()) {
    // use projectId from cookies (previous login) or default
    const projectId =
      request.cookies.get('projectId')?.value || constants.DEFAULT_PROJECT_ID;

    request.nextUrl.pathname = routes.project.home({ projectId });

    return NextResponse.redirect(request.nextUrl);
  }

  const isPublicRoute = Boolean(
    constants.PUBLIC_ROUTES.find((route) =>
      matchesPathname(route, request.nextUrl.pathname),
    ),
  );

  if (!hasAuthentication && !isPublicRoute) {
    return NextResponse.redirect(new URL(routes.home(), request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)',
  // Allow package(s) to bypass Edge runtime checks
  unstable_allowDynamic: [
    '**/node_modules/.pnpm/jscrypto*/node_modules/jscrypto/**',
  ],
};
