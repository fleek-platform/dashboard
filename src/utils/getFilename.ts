export const getFilename = (name: string) => {
  if (!name.includes('.')) {
    return {
      filename: name,
      extension: ''
    };
  }

  const splitFilename = name.split('.');

  const extension = splitFilename.pop() || '';

  const filename = splitFilename.join('.');

  return { filename, extension };
};
