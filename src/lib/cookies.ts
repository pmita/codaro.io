import Cookies from 'js-cookie';

export function saveSessionCookieClientSide(token: string): string | undefined {
  return Cookies.set('__session', token, {
    expires: 5, // 5 days
    secure: true,
    path: '/',
    http: true,
    sameSite: 'none',
  });
}

export function removeSessionCookieClientSide(): void {
  return Cookies.remove('__session');
}

export function getSessionCookieClientSide(): string | undefined {
  return Cookies.get('__session');
}

