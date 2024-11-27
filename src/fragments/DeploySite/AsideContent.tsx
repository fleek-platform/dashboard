import { useMemo } from 'react';

import { Form } from '@/components';
import { useSiteFrameworks } from '@/hooks/useSiteFrameworks';
import { Box, Icon, IconName, Image, Stepper, Text } from '@/ui';

import { sourceProviderIcon, sourceProviderLabel } from './DeploySite.constants';
import { useDeploySiteContext } from './DeploySite.context';
import { DeploySiteStyles as S } from './DeploySite.styles';

type StatusItemProps = React.PropsWithChildren<{
  title: string;
  icon?: IconName;
  image?: string;
  fullSize?: boolean;
}> &
  React.ComponentPropsWithoutRef<typeof S.StatusBox.Item>;

const StatusItem: React.FC<StatusItemProps> = ({ title, icon = 'gear', image, children = 'pending...', fullSize = false }) => (
  <S.StatusBox.Item fullSize={fullSize}>
    <Text as="h3" size="xs">
      {title}
    </Text>
    <Box>
      <Image src={image} alt={title}>
        <Icon name={icon} />
      </Image>
      <Text variant="primary" size="xs">
        {children}
      </Text>
    </Box>
  </S.StatusBox.Item>
);

const StatusSeparator: React.FC = () => <S.StatusBox.Separator name="arrow-right" />;

const StatusBox: React.FC = () => {
  const { sourceProvider, gitUser, mode } = useDeploySiteContext();
  const siteFrameworks = useSiteFrameworks();
  const field = Form.useField<string>('frameworkId');

  const typeIcon = sourceProvider && sourceProviderIcon[sourceProvider];
  const typeText = gitUser?.slug || (sourceProvider && sourceProviderLabel[sourceProvider]);
  const framework = useMemo(() => siteFrameworks.data?.find((framework) => framework.id === field.value), [siteFrameworks, field.value]);

  return (
    <S.StatusBox.Container wrapped={mode === 'template'}>
      <StatusItem title="Type" icon={typeIcon} image={gitUser?.avatar} fullSize={!!gitUser?.avatar}>
        {typeText}
      </StatusItem>

      <StatusSeparator />

      <StatusItem title="Code" image={framework?.avatar}>
        {framework?.name}
      </StatusItem>

      {mode !== 'template' && (
        <>
          <StatusSeparator />
          <StatusItem title="Details" />
        </>
      )}
    </S.StatusBox.Container>
  );
};

export const AsideContent: React.FC = () => {
  const { title } = useDeploySiteContext();

  return (
    <>
      <Stepper.Indicator />
      <Text as="h1" variant="primary" size="3xl" weight={500}>
        {title}
      </Text>
      <StatusBox />
    </>
  );
};
