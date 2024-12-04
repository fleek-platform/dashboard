import { routes } from '@fleek-platform/utils-routes';
import React from 'react';

import { constants } from '@/constants';
import { useToast } from '@/hooks/useToast';
import { useTheme } from '@/providers/ThemeProvider';
import { LoadingProps } from '@/types/Props';
import { Box, Button, Icon, Input } from '@/ui';
import { cn } from '@/utils/cn';
import { copyToClipboard } from '@/utils/copyClipboard';

import { ExternalLink } from '../ftw/ExternalLink/ExternalLink';
import { LearnMoreMessage } from '../LearnMoreMessage/LearnMoreMessage';
import { SettingsBox } from '../SettingsBox/SettingsBox';

export type IpfsBoxProps = LoadingProps<{
  cid?: string | null;
  ipns?: string;
}>;

export const IpfsBox: React.FC<IpfsBoxProps> = ({ isLoading, cid, ipns }) => {
  return (
    <SettingsBox.Container>
      <SettingsBox.Title>IPFS</SettingsBox.Title>
      <SettingsBox.Text>
        The hash is a unique identifier for website content on IPFS. It ensures
        data integrity by verifying that the content hasn&apos;t been altered.
        Accessing a website via its hash guarantees you&apos;re viewing the
        original, unchanged content.
      </SettingsBox.Text>

      <Field label="IPFS Hash" value={cid} isLoading={isLoading} />

      <Field label="IPNS" value={ipns} isLoading={isLoading} />

      <SettingsBox.ActionRow>
        <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_IPFS}>
          IPFS
        </LearnMoreMessage>
        {isLoading ? (
          <SettingsBox.Skeleton variant="button" />
        ) : (
          <ExternalLink
            href={routes.ipfsPropagation.withHash({ hash: cid || '' })}
          >
            <Button disabled={!cid}>
              <Icon name="bolt" />
              View on IPFS
            </Button>
          </ExternalLink>
        )}
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};

type FieldProps = LoadingProps<{
  label: string;
  value?: string | null;
}>;

const Field: React.FC<FieldProps> = ({ label, value, isLoading }) => {
  const toast = useToast();

  const handleCopyValue = () => {
    if (value) {
      try {
        copyToClipboard(value);
        toast.success({ message: `Copied IPFS hash to clipboard` });
      } catch (error) {
        toast.error({ message: 'Failed to copy IPFS hash to clipboard' });
      }
    }
  };

  return (
    <Box className="gap-2">
      <Input.Label>{label}</Input.Label>
      <Input.Root disabled isLoading={isLoading} className="cursor-default">
        <IpfsIcon />
        <span className={cn('flex-1', { 'italic text-neutral-11': !value })}>
          {value || 'pending...'}
        </span>
        <span onClick={handleCopyValue}>
          <Input.Icon
            name="copy"
            className={cn('cursor-pointer', { 'cursor-not-allowed': !value })}
          />
        </span>
      </Input.Root>
    </Box>
  );
};

const IpfsIcon: React.FC = () => {
  const theme = useTheme();
  const isLightTheme = theme.resolvedTheme === 'light';

  return (
    <Box
      className={cn('w-auto h-auto rounded-full bg-white p-[0.20rem]', {
        'bg-black': isLightTheme,
      })}
    >
      <Input.Icon
        name="ipfs"
        className={cn('text-black size-3', { 'text-white': isLightTheme })}
      />
    </Box>
  );
};
