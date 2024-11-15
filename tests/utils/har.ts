import fs from 'fs';
import path from 'path';

const __project_root = path.resolve(__dirname, '../../');
const harBasePath = path.resolve(__project_root, 'tests/e2e/HAR');
export const harFilePaths = {
  page: {
    projects: {
      home: `${harBasePath}/projects_home.har`
    },
  },
};

export const extractHARContentAsJSON = (filepath: string) => {
  try {
    const harContent = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(harContent);
  } catch (err) {
    console.error('Failed to extract HAR content as JSON', err);
  }
}
