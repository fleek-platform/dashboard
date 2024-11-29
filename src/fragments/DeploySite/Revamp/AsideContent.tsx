import { useMemo } from 'react';

import { Form } from '@/components';
import { useSiteFrameworks } from '@/hooks/useSiteFrameworks';
import { Box, Icon, type IconName, Image, Stepper, Text } from '@/ui';

import {
  sourceProviderIcon,
  sourceProviderLabel,
} from './DeploySite.constants';
import { useDeploySiteContext } from './DeploySite.context';
import { DeploySiteStyles as S } from './DeploySite.styles';

type StatusItemProps = React.PropsWithChildren<{
  title: string;
  icon?: IconName;
  image?: string;
  fullSize?: boolean;
}> &
  React.ComponentPropsWithoutRef<typeof S.StatusBox.Item>;

const StatusItem: React.FC<StatusItemProps> = ({
  title,
  icon = 'gear',
  image,
  children = 'Pending...',
  fullSize = false,
}) => (
  <S.StatusBox.Item fullSize={fullSize}>
    <Text as="h3" size="xs">
      {title}
    </Text>
    <Box>
      <Image src={image} alt={title}>
        <Icon name={icon} />
      </Image>

      {children}
    </Box>
  </S.StatusBox.Item>
);

const StatusSeparator: React.FC = () => (
  <S.StatusBox.Separator name="arrow-right" />
);

const StatusBox: React.FC = () => {
  const { sourceProvider, mode, providerState } = useDeploySiteContext();
  const siteFrameworks = useSiteFrameworks();
  const field = Form.useField<string>('frameworkId');

  const typeStatus = useMemo(() => {
    if (mode === 'self') {
      return {
        icon: sourceProviderIcon.self,
        text: sourceProviderLabel.self,
      };
    }

    const providerAuthenticated =
      !providerState?.requirements?.shouldAuthenticate &&
      sourceProvider !== undefined;

    return {
      icon: providerAuthenticated
        ? sourceProviderIcon[sourceProvider]
        : undefined,
      text: providerAuthenticated
        ? sourceProviderLabel[sourceProvider]
        : undefined,
    };
  }, [providerState?.requirements?.shouldAuthenticate, sourceProvider, mode]);

  const framework = useMemo(
    () =>
      siteFrameworks.data?.find((framework) => framework.id === field.value),
    [siteFrameworks, field.value],
  );

  return (
    <S.StatusBox.Container wrapped={mode === 'template'}>
      <StatusItem title="Type" icon={typeStatus.icon}>
        {typeStatus.text}
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
