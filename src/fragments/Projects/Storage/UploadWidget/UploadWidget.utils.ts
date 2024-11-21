/* eslint-disable fleek-custom/no-generic-util-files */

// util to convert bytes to human readable size
export const bytesToSize = (bytes: number) => {
  const decimals = 2;
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const sizeIndex = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Number.parseFloat((bytes / k ** sizeIndex).toFixed(dm))} ${sizes[sizeIndex]}`;
};
