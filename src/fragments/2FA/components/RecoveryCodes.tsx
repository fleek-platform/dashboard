import { Button, Text } from '@/ui';
import { SkeletonElement } from '@/ui/Skeleton/Skeleton.styles';

import { Styles as S } from '../2FAStyles.styles';

export type RecoveryCodesProps = {
  isLoading?: boolean;
  codes?: string[];
  handleDownloadCodes: () => void;
};

export const RecoveryCodes: React.FC<RecoveryCodesProps> = ({
  codes,
  handleDownloadCodes,
  isLoading,
}) => {
  const file = new Blob(
    codes?.map((code) => `${code}\n`),
    { type: 'text/plain', endings: 'native' },
  );

  return (
    <S.RecoveryCodes.Container>
      <S.RecoveryCodes.Header>
        Recovery Codes
        <S.RecoveryCodes.DownloadLink
          download="fleek-recovery-codes.txt"
          target="_blank"
          rel="noreferrer"
          href={URL.createObjectURL(file)}
        >
          <Button disabled={isLoading || !codes} onClick={handleDownloadCodes}>
            Download
          </Button>
        </S.RecoveryCodes.DownloadLink>
      </S.RecoveryCodes.Header>
      <S.RecoveryCodes.Content>
        {isLoading || !codes
          ? Array.from({ length: 12 }).map((_, i) => (
              <SkeletonElement variant="text" key={i} />
            ))
          : codes.map((code, i) => (
              <Text key={`recovery-code-${i}`}>{code}</Text>
            ))}
      </S.RecoveryCodes.Content>
    </S.RecoveryCodes.Container>
  );
};
