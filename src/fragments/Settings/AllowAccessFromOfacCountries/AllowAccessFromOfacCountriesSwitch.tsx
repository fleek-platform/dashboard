import { useEffect, useState } from 'react';

import { PermissionsTooltip, SettingsBox } from '@/components';
import { usePermissions } from '@/hooks/usePermissions';
import { LoadingProps } from '@/types/Props';
import { Switch } from '@/ui';

export type AllowAccessFromOfacCountriesSwitchProps = {
  value?: boolean | null;
  onChange: (enabled: boolean) => Promise<void>;
  text: string;
  title: string;
  permissions: string[];
};

export const AllowAccessFromOfacCountriesSwitch: React.FC<
  LoadingProps & AllowAccessFromOfacCountriesSwitchProps
> = ({ isLoading, value, onChange, text, title, permissions }) => {
  const hasEditPermission = usePermissions({ action: permissions });

  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    if (typeof value === 'boolean') {
      setAllowed(value);
    }
  }, [value]);

  const handleOnChange = (checked: boolean) => {
    if (checked !== value) {
      onChange(checked);
      setAllowed(checked);
    }
  };

  return (
    <SettingsBox.Container>
      <SettingsBox.ActionRow>
        <SettingsBox.Column>
          <SettingsBox.Title>{title}</SettingsBox.Title>
          <SettingsBox.Text>{text}</SettingsBox.Text>
        </SettingsBox.Column>
        <PermissionsTooltip hasAccess={hasEditPermission}>
          <Switch
            checked={allowed}
            onCheckedChange={handleOnChange}
            disabled={!hasEditPermission}
            loading={isLoading}
            intent={allowed ? 'success' : 'neutral'}
            labelOn="Yes"
            labelOff="No"
            className="w-[5rem]"
          />
        </PermissionsTooltip>
      </SettingsBox.ActionRow>
    </SettingsBox.Container>
  );
};
