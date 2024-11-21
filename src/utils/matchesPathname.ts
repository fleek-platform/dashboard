export const removeTrailingSlash = (val: string) =>
  val.endsWith('/') ? val.substring(0, val.length - 1) : val;

export const matchesPathname = (pathname: string, asPath: string): boolean => {
  const normalizedPathname = removeTrailingSlash(pathname);
  const normalizedAsPath = removeTrailingSlash(asPath.split('?')[0]);

  const pathnameSegments = normalizedPathname.split('/').filter(Boolean);
  const asPathSegments = normalizedAsPath.split('/').filter(Boolean);

  let catchAllEncountered = false;

  for (let i = 0; i < pathnameSegments.length; i++) {
    const patternSeg = pathnameSegments[i];
    const pathSeg = asPathSegments[i] || 'MISSING';

    if (patternSeg.startsWith('[[') && patternSeg.endsWith(']]')) {
      catchAllEncountered = true;
      break;
    }
    if (patternSeg.startsWith('[...') && patternSeg.endsWith(']')) {
      catchAllEncountered = true;

      if (pathSeg === 'MISSING') {
        return false;
      }

      break;
    }
    if (patternSeg.startsWith('[') && patternSeg.endsWith(']')) {
      if (pathSeg === 'MISSING') {
        return false;
      }
    } else if (patternSeg !== pathSeg) {
      return false;
    }
  }

  if (!catchAllEncountered && pathnameSegments.length < asPathSegments.length) {
    return false;
  }

  return true;
};
