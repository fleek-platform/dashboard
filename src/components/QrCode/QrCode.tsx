import { toDataURL } from 'qrcode';
import { useEffect, useState } from 'react';

import { forwardStyledRef } from '@/theme';

import { QrCodeStyles as S } from './QrCode.styles';

export type QrCodeProps = Omit<
  React.ComponentProps<typeof S.Container>,
  'children'
> & {
  data?: string;
};

export const QrCode: React.FC<QrCodeProps> = forwardStyledRef<
  HTMLDivElement,
  QrCodeProps
>(S.Container, ({ data, ...props }, ref) => {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    setSrc(null);

    if (data) {
      toDataURL(data, {
        width: 1000,
      })
        .then(setSrc)
        .catch(console.error);
    }
  }, [data]);

  return (
    <S.Container ref={ref} {...props}>
      {src ? <S.Image src={src} alt={data} /> : <S.Skeleton />}
    </S.Container>
  );
});
