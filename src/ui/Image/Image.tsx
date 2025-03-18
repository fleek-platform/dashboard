import { useEffect, useState } from 'react';
import { forwardStyledRef } from '@/theme';
import { Icon } from '../Icon/Icon';
import { Skeleton } from '../Skeleton/Skeleton';
import { ImageStyles as S } from './Image.styles';

export type ImageProps = React.ComponentProps<typeof S.Image> & {
  children?: React.ReactNode | React.ReactNode[];
};

export const Image = forwardStyledRef<HTMLImageElement, ImageProps>(
  S.Image,
  ({ src, children, ...props }, ref) => {
    const [loading, setLoading] = useState(() => {
      if (!src) return false;
      
      const img = document.createElement('img');
      img.src = src;
      return !img.complete;
    });

    const [error, setError] = useState(!src);

    useEffect(() => {
      if (!src) {
        setError(true);
        return;
      }

      const img = document.createElement('img');
      img.src = src;

      if (img.complete) {
        setLoading(false);
        setError(false);
        return;
      }

      setLoading(true);

      img.onload = () => {
        setLoading(false);
        setError(false);
      };

      img.onerror = () => {
        setError(true);
        setLoading(false);
      };

      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }, [src]);

    if (error) {
      return (
        <Error ref={ref} {...props}>
          {children}
        </Error>
      );
    }

    if (loading) {
      return <Skeleton ref={ref} {...props} />;
    }

    return <S.Image ref={ref} {...props} src={src} />;
  },
);

type ErrorProps = React.ComponentProps<typeof S.Error>;

const Error = forwardStyledRef<HTMLImageElement, ErrorProps>(
  S.Error,
  ({ children, ...props }, ref) => (
    <S.Error
      {...props}
      ref={ref}
      className={`${Image.selector?.slice(1) || ''} ${props.className || ''}`}
    >
      {children || <Icon name="image" />}
    </S.Error>
  ),
);
