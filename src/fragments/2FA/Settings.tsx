import { useState } from 'react';

import { LearnMoreMessage, SettingsBox } from '@/components';
import { constants } from '@/constants';
import { useDisableProtectedActionMutation, useEnableProtectedActionMutation, useProtectedActionsQuery } from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { Box, Button, Checkbox, Text } from '@/ui';

import { Styles as S } from './2FAStyles.styles';

type CheckboxChangeMap = Record<string, boolean>;

export const Settings = () => {
  const toast = useToast();
  const [protectedActionsQuery] = useProtectedActionsQuery();
  const [, enableProtectedAction] = useEnableProtectedActionMutation();
  const [, disableProtectedAction] = useDisableProtectedActionMutation();

  const protectedActions = protectedActionsQuery.data?.twoFactorProtectedActions.data || [];

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkboxChangeMap, setCheckboxChangeMap] = useState<CheckboxChangeMap>({});

  const handleButtonClick = async () => {
    if (!isEditing) {
      setCheckboxChangeMap({});
      setIsEditing(true);

      return;
    }

    setIsSubmitting(true);

    const mutationsArray = Object.entries(checkboxChangeMap).map(([id, value]) =>
      value ? enableProtectedAction({ where: { id } }) : disableProtectedAction({ where: { id } })
    );

    await Promise.allSettled(mutationsArray)
      .then((mutationResults) => {
        mutationResults.forEach((operation) => {
          if (operation.status === 'rejected' || operation.value.error) {
            toast.error({ message: 'Failed to save protected action changes' });
          }
        });
      })
      .catch(() => toast.error({ message: 'Unexpected error when saving protected actions changes' }));
    setIsSubmitting(false);
    setCheckboxChangeMap({});

    setIsEditing(false);
  };

  const handleCheckboxClick = (checked: boolean, originalValue: boolean, id: string) => {
    if (checked !== originalValue) {
      setCheckboxChangeMap({ ...checkboxChangeMap, [id]: checked });

      return;
    }

    const newChangeMap = { ...checkboxChangeMap };
    delete newChangeMap[id];
    setCheckboxChangeMap(newChangeMap);
  };

  return (
    <SettingsBox.Container>
      <S.TextSection>
        <SettingsBox.Title>Two-factor Settings</SettingsBox.Title>
        <SettingsBox.Text>Toggle which activity should prompt two-factor authentication.</SettingsBox.Text>
      </S.TextSection>
      {protectedActions.length === 0 ? (
        <SettingsBox.EmptyContent title="No Protected Actions" description="Currently there are no protected actions available" />
      ) : (
        <>
          <S.RowContainer>
            {protectedActions.map((protectedAction) => (
              <S.SettingsRow key={protectedAction.id}>
                <Box>
                  <Checkbox
                    checked={protectedAction.id in checkboxChangeMap ? checkboxChangeMap[protectedAction.id] : protectedAction.enabled}
                    disabled={!isEditing || isSubmitting}
                    onCheckedChange={(checked: boolean) => handleCheckboxClick(checked, protectedAction.enabled, protectedAction.id)}
                  />
                  <Text weight={700}>{protectedAction.name}</Text>
                </Box>
              </S.SettingsRow>
            ))}
          </S.RowContainer>
          <SettingsBox.ActionRow>
            <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_2FA_ACTIONS}>two-factor Settings</LearnMoreMessage>
            <Button onClick={handleButtonClick} intent={isEditing ? 'accent' : 'neutral'} loading={isSubmitting}>
              {isEditing ? 'Save settings' : 'Edit settings'}
            </Button>
          </SettingsBox.ActionRow>
        </>
      )}
    </SettingsBox.Container>
  );
};
