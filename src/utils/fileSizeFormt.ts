// util to convert bytes to human readable size
export const bytesToSize = (bytes: number) => {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const decimals = 2;
  const k = 1024;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const sizeIndex = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Number.parseFloat((bytes / k ** sizeIndex).toFixed(decimals))} ${sizes[sizeIndex]}`;
};
