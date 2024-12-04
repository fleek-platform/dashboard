export const getFilename = (name: string) => {
  const splitFilename = name.split('.');

  const extension = splitFilename.pop() || '';

  const filename = splitFilename.join('.');

  return { filename, extension };
};
