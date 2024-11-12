type FileToBase64Args = {
  file: File;
};

export const fileToBase64 = ({ file }: FileToBase64Args): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = reject;
  });
