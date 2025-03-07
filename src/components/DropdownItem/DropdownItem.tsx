import { Icon, IconName, Menu } from '@/ui';

import { ExternalLink } from '../ftw/ExternalLink/ExternalLink';
import { Link } from '../ftw/Link/Link';

type DropdownItemProps = React.ComponentProps<typeof Menu.Item> & {
  isBillingRestricted?: boolean;
  openRestrictionModal?: () => void;
  text: string;
  icon: IconName;
  href: string;
  isExternalLink?: boolean;
};

export const DropdownItem: React.FC<DropdownItemProps> = (props) => {
  const { isBillingRestricted = false, openRestrictionModal, text, icon, ...menuItemProps } = props;

  return (
    <DropdownItemWrapper {...props}>
      <Menu.Item {...menuItemProps} onSelect={isBillingRestricted ? openRestrictionModal : undefined}>
        {text}
        <Icon name={icon} />
      </Menu.Item>
    </DropdownItemWrapper>
  );
};

type DropdownItemWrapperProps = DropdownItemProps;

const DropdownItemWrapper = ({
  isBillingRestricted = false,
  href,
  isExternalLink,
  openRestrictionModal,
  children,
}: DropdownItemWrapperProps) => {
  if (isBillingRestricted && openRestrictionModal) {
    return <>{children}</>;
  }

  if (isExternalLink) {
    return <ExternalLink href={href}>{children}</ExternalLink>;
  }

  return <Link href={href}>{children}</Link>;
};
