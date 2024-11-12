import { LogoUpload } from '@/components';
import { styled } from '@/theme';
import { FormField } from '@/ui';

export const BannerFieldStyles = {
  Container: styled(LogoUpload, {
    width: '$full',
    height: 'auto',
    aspectRatio: '16 / 9',
  }),
  FormFieldUnderline: styled(FormField.Hint, {
    textSize: 'calc(0.90 * $xs)',
  }),
};
