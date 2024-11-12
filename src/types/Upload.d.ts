export type UploadStatus =
  | 'uploading'
  | 'error'
  | 'success'
  | 'canceled'
  | 'duplicate';

export type Upload = {
  id: string; // needed to update the status of the upload
  name: string;
  type: 'file' | 'folder';
  file?: File; // if type it's file then file is required
  files?: File[]; // if type it's folder then files is required
  status: UploadStatus;
  size: number;
  thumbnail?: string; // for when type it's file but we're not having this for now
  errorMessage?: string; // for when file is bigger than 1GB
  remainingTime?: number; // in milliseconds
};

export type UploadProgress = {
  loadedSize: number;
  totalSize?: number;
};
