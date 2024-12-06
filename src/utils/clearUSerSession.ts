export const clearUserSession = () => {
  localStorage.clear();
  sessionStorage.clear();
  document.cookie.split(';').forEach((cookie) => {
    document.cookie =
      cookie.trim() + '; expires=Thu Jan 01 1970 00:00:00 GMT';
  });
}
