import { Box, Icon, Menu } from '@/ui';

import { PrimaryDomainMenuItemStyles as S } from './PrimaryDomainMenuItem.styles';

type PrimaryDomainMenuItemProps = {
  title: string;
  subtitle: string;
  isPrimaryDomain?: boolean;
  showSeparator?: boolean;
  onClick?: () => void;
};

export const PrimaryDomainMenuItem: React.FC<PrimaryDomainMenuItemProps> = ({
  title,
  subtitle,
  showSeparator = false,
  isPrimaryDomain = false,
  onClick,
}) => {
  return (
    <>
      {showSeparator && <Menu.Separator />}
      <S.MenuItem isPrimaryDomain={isPrimaryDomain} onClick={onClick}>
        <Box>
          {isPrimaryDomain ? (
            <S.PrimaryTitle>{title}</S.PrimaryTitle>
          ) : (
            <>{title}</>
          )}
          <S.Subtitle>{subtitle}</S.Subtitle>
        </Box>
        <Icon name="check" />
      </S.MenuItem>
    </>
  );
};
