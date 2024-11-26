import { filesize } from "filesize";

// Dictionary of IEC/JEDEC symbols to replace for localization, 
const standard = "jedec";

// For more check the docs in:
// https://github.com/avoidwork/filesize.js
export const bytesToSize = (bytes: number) => {
  return filesize(bytes, { standard });
};
