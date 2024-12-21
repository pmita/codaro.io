import Cookies from 'js-cookie';

export function getAuthCookie(): string | undefined {
  return Cookies.get('__session');
}

export function removeAuthCookie(): void {
  return Cookies.remove('__session');
}

export function setAuthCookie(token: string): string | undefined {
  return Cookies.set('__session', token, {
    expires: 5, // 5 days
    secure: true,
    path: '/',
    http: true,
    sameSite: 'none',
  });
}