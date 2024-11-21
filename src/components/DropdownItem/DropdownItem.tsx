import { Icon, type IconName, Menu } from '@/ui';

import { Link } from '../Link/Link';

type DropdownItemProps = React.ComponentProps<typeof Menu.Item> & {
  isBillingRestricted?: boolean;
  openRestrictionModal?: () => void;
  text: string;
  icon: IconName;
  href: string;
};

export const DropdownItem: React.FC<DropdownItemProps> = ({
  isBillingRestricted = false,
  openRestrictionModal,
  text,
  icon,
  href,
  ...props
}) => {
  if (isBillingRestricted && openRestrictionModal) {
    return (
      <Menu.Item {...props} onSelect={openRestrictionModal}>
        {text}
        <Icon name={icon} />
      </Menu.Item>
    );
  }

  return (
    <Link href={href}>
      <Menu.Item {...props}>
        {text}
        <Icon name={icon} />
      </Menu.Item>
    </Link>
  );
};
