import fs from 'fs';

export const extractHARContentAsJSON = (filepath: string) => {
  try {
    const harContent = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(harContent);
  } catch (err) {
    console.error('Failed to extract HAR content as JSON', err);
  }
}
