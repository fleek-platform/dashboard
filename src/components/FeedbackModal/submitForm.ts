import { constants } from '@/constants';
import { Log } from '@/utils/log';

export type FormValuesType = {
  email: string;
  comment: string;
  firstName?: string;
  userId: string;
  userName: string;
};

type UploadFileArgs = {
  file: File;
};

export const uploadFile = async ({ file }: UploadFileArgs): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${constants.ZENDESK.PROXY_BASE}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new FileUploadError('File upload failed');
  }

  const data = await response.json();

  return data.token;
};

const addSignature = (comment: string, email: string, userId: string) => {
  const metadata = [
    '-------------------',
    `Submitted from: ${window.location.href}`,
    `Email: ${email}`,
    `Fleek UserId: ${userId}`,
    '-------------------',
  ];

  return `${comment}\n\n${metadata.join('\n')}`;
};

export const submitForm = async (
  formValuesObject: FormValuesType,
  resetFn: () => void,
  selectedTab: string,
  uploadTokens: string[],
) => {
  const { email, comment, firstName, userId, userName } = formValuesObject;

  const requestBody = {
    email,
    comment: addSignature(comment, email, userId),
    name: firstName || userName,
    userId,
    uploadTokens,
    tags: [selectedTab.toLowerCase()], // Normalize
  };

  try {
    const response = await fetch(`${constants.ZENDESK.PROXY_BASE}/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      Log.error(`Error: ${response.status} - ${errorText}`);

      if (response.status === 400) {
        throw new SubmitSupportFormError(errorText, response.status);
      }

      throw new SubmitSupportFormError(
        'Network response was not ok',
        response.status,
      );
    }

    resetFn();
  } catch (error) {
    Log.error('Error submitting form:', error);
    throw error;
  }
};

// Error Classes
export class FileUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileUploadError';
  }
}
export class SubmitSupportFormError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = 'SubmitSupportFormError';
  }
}
