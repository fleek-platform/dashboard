import type { HandleLogoUploadProps } from '@/types/Logo';
import { FormField } from '@/ui';

import { Form } from '../Form/Form';
import { BannerFieldStyles as S } from './BannerFieldStyles';

export type BannerFieldProps = {
  initialImage?: string;
  name: string;
};

export const BannerField: React.FC<BannerFieldProps> = ({
  initialImage,
  name,
}) => {
  const field = Form.useField<File>(name);

  const handleUpload: (args: HandleLogoUploadProps) => Promise<void> = async ({
    image,
  }) => {
    field.setValue(image, true);
  };

  return (
    <FormField.Root>
      <FormField.Label>Banner</FormField.Label>
      <S.Container onSubmit={handleUpload} initialImage={initialImage} />
      <S.FormFieldUnderline>
        Recommended image size of 1920x1080px. Maximum file size of 5MB.
      </S.FormFieldUnderline>
    </FormField.Root>
  );
};
