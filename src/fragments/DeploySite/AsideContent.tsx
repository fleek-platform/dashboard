import { useMemo } from 'react';

import { Form } from '@/components';
import { useSiteFrameworks } from '@/hooks/useSiteFrameworks';
import { Box, Icon, IconName, Image, Stepper, Text } from '@/ui';
import { cn } from '@/utils/cn';

import { sourceProviderIcon, sourceProviderLabel } from './DeploySite.constants';
import { useDeploySiteContext } from './DeploySite.context';

type StatusItemProps = React.PropsWithChildren<{
  title: string;
  icon?: IconName;
  image?: string;
  fullSize?: boolean;
}> &
  React.ComponentPropsWithoutRef<typeof Box>;

const StatusItem: React.FC<StatusItemProps> = ({ title, icon = 'gear', image, children = 'Pending...', fullSize = false }) => (
  <Box className="flex-1 gap-2 text-xs">
    <Text as="h3" size="xs">
      {title}
    </Text>
    <Box className="flex-row gap-2 items-center">
      <Image src={image} alt={title} className={cn('p-1 size-5 text-2xs bg-neutral-4 rounded-full text-neutral-11', { 'p-0': fullSize })}>
        <Icon name={icon} className="p-0" />
      </Image>

      {children}
    </Box>
  </Box>
);

const StatusSeparator: React.FC = () => <Icon name="arrow-right" className="text-neutral-11" />;

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

    const providerAuthenticated = !providerState?.requirements?.shouldAuthenticate && sourceProvider !== undefined;

    return {
      icon: providerAuthenticated ? sourceProviderIcon[sourceProvider] : undefined,
      text: providerAuthenticated ? sourceProviderLabel[sourceProvider] : undefined,
    };
  }, [providerState?.requirements?.shouldAuthenticate, sourceProvider, mode]);

  const framework = useMemo(() => siteFrameworks.data?.find((framework) => framework.id === field.value), [siteFrameworks, field.value]);

  return (
    <Box
      variant="container"
      className={cn('hidden md:flex flex-row flex-wrap justify-between rounded-xl', { 'w-[70%]': mode === 'template' })}
    >
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
    </Box>
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
