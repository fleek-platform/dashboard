import { ChangeEventHandler, useRef, useState } from 'react';

import { constants } from '@/constants';
import { useToast } from '@/hooks/useToast';
import { forwardStyledRef } from '@/theme';
import { HandleLogoUploadProps } from '@/types/Logo';
import { DisabledProps } from '@/types/Props';
import { Icon, Input } from '@/ui';
import { AvatarMarble } from '@/ui/AvatarMarble/AvatarMarble';

import { LogoUploadStyles as S } from './LogoUpload.styles';

export type LogoUploadProps = DisabledProps<
  Omit<React.ComponentPropsWithRef<typeof S.Container>, 'onSubmit'> & {
    initialImage?: string;
    withAvatar?: boolean;
    avatarTitle?: string;
    onSubmit: ({ image }: HandleLogoUploadProps) => Promise<void>;
  }
>;

export const LogoUpload: React.FC<LogoUploadProps> = forwardStyledRef<
  HTMLDivElement,
  LogoUploadProps
>(
  S.Container,
  (
    {
      onSubmit,
      isDisabled,
      initialImage,
      withAvatar = false,
      avatarTitle = '',
      ...props
    },
    ref,
  ) => {
    const [image, setImage] = useState(initialImage);
    const [isUploading, setIsUploading] = useState(false);
    const toast = useToast();
    const refLogo = useRef<HTMLInputElement>(null);

    const handleLogoUpload = async ({ image }: HandleLogoUploadProps) => {
      if (image) {
        setIsUploading(true);
        await onSubmit({ image });
        setIsUploading(false);
      }
    };

    const handleImageSelect: ChangeEventHandler<HTMLInputElement> = (event) => {
      const selectedFile = event.target.files![0];

      if (!selectedFile) {
        return;
      }

      if (!selectedFile.type.match('image.*')) {
        toast.error({ message: 'File should be an image' });

        return;
      }

      // max size file 5MB
      if (selectedFile.size > constants.MAX_LOGO_SIZE) {
        toast.error({ message: 'File size should be smaller than 5MB' });

        return;
      }

      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setImage(loadEvent.target?.result?.toString());
        handleLogoUpload({ image: selectedFile });
      };

      reader.readAsDataURL(selectedFile);
    };

    const handleClick = () => {
      refLogo.current?.click();
    };

    return (
      <S.Container {...props} ref={ref} disabled={isDisabled}>
        <Input.Field
          hidden
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          ref={refLogo}
        />
        {withAvatar && !initialImage ? (
          <AvatarMarble name={avatarTitle} />
        ) : (
          <S.Logo src={image} />
        )}
        {isUploading && (
          <S.SpinnerContainer>
            <Icon name="spinner" />
          </S.SpinnerContainer>
        )}
        {!isDisabled && (
          <S.HoverContainer onClick={handleClick}>
            <Icon name="cloud-upload" />
          </S.HoverContainer>
        )}
      </S.Container>
    );
  },
);
