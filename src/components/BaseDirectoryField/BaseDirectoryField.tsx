import { MouseEventHandler, useRef, useState } from 'react';

import { Form, SettingsModal } from '@/components';
import { LoadingProps } from '@/types/Props';
import { Box, Button, FormField, Icon, Input, RadioGroup, Text } from '@/ui';

import { BaseDirectoryFieldStyles as S } from './BaseDirectoryField.styles';
import {
  BaseDirectoryRadioGroup,
  BaseDirectoryRadioGroupProps,
} from './BaseDirectoryRadioGroup';

const PATH = Symbol('path');
const LABEL = 'Base Directory';

type BaseDirectoryFieldProps = {
  fieldName: string;
  isDisabled?: boolean;
} & BaseDirectoryRadioGroupProps;

export const BaseDirectoryField: React.FC<BaseDirectoryFieldProps> = (
  props,
) => {
  const field = Form.useField<string>(props.fieldName);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialValue = useRef<string>(field.value);
  const fieldValue = useRef<string>(field.value);

  const isLoading =
    !props.gitProviderId ||
    !props.sourceRepositoryOwner ||
    !props.sourceRepositoryName ||
    !props.sourceBranch;

  if (isLoading) {
    return (
      <Form.InputField
        name={props.fieldName}
        label={LABEL}
        placeholder="./"
        isLoading={isLoading}
        disableValidMessage
      />
    );
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (props.isDisabled) {
      return;
    }

    if (isOpen) {
      fieldValue.current = field.value;
      initialValue.current = field.value;
    }

    setIsModalOpen(isOpen);

    field.setValue(fieldValue.current, true);
  };

  const handleCancel = () => {
    fieldValue.current = initialValue.current;
  };

  const handleConfirm = () => {
    if (props.isDisabled || !isModalOpen) {
      return;
    }

    fieldValue.current = field.value;
  };

  const RadioGroup = (
    <BaseDirectoryRadioGroup
      gitProviderId={props.gitProviderId}
      sourceRepositoryName={props.sourceRepositoryName}
      sourceRepositoryOwner={props.sourceRepositoryOwner}
      sourceBranch={props.sourceBranch}
      fieldName={props.fieldName}
    />
  );

  return (
    <SettingsModal
      open={isModalOpen}
      onOpenChange={handleOpenChange}
      trigger={
        <FormField.Root>
          <FormField.Label>{LABEL}</FormField.Label>
          <S.Trigger.RowWrapper>
            <Input.Root disabled={props.isDisabled}>
              <Input.Field
                readOnly
                value={field.value || './'}
                disabled={props.isDisabled}
              />
            </Input.Root>

            <Button intent="neutral" disabled={props.isDisabled} size="sm">
              Select
            </Button>
          </S.Trigger.RowWrapper>
        </FormField.Root>
      }
    >
      <SettingsModal.Heading>Select the base directory</SettingsModal.Heading>

      <Text>Select the directory where your source code is located.</Text>

      {RadioGroup}

      <SettingsModal.Footer>
        <SettingsModal.Close asChild>
          <Button intent="neutral" onClick={handleCancel} className="flex-1">
            Cancel
          </Button>
        </SettingsModal.Close>

        <SettingsModal.Close asChild>
          <SettingsModal.ConfirmButton
            onClick={handleConfirm}
            className="flex-1"
          >
            Continue
          </SettingsModal.ConfirmButton>
        </SettingsModal.Close>
      </SettingsModal.Footer>
    </SettingsModal>
  );
};

type Folders = { [PATH]: string } | { [PATH]: string; [key: string]: Folders };

type RecursiveFoldersProps = LoadingProps<{
  folders: Folders;
  selected: string;
}>;

const RecursiveFolders: React.FC<RecursiveFoldersProps> = ({
  folders,
  selected,
  isLoading,
}) => {
  if (isLoading) {
    return <RecursiveFoldersSkeleton />;
  }

  return (
    <S.RecursiveFolders.Wrapper>
      {Object.entries(folders).map(([key, value]) => {
        const folderPath = value[PATH];

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [showNested, setShowNested] = useState(
          selected.startsWith(folderPath),
        );

        const hasNested = Object.keys(value).length > 0;

        const handleShowNested = () => {
          setShowNested((prev) => !prev);
        };

        const handleSelect: MouseEventHandler = (event) => {
          event.stopPropagation();
        };

        return (
          <Box key={key}>
            <S.RecursiveFolders.Row onClick={handleShowNested}>
              <S.RecursiveFolders.Indicator
                hasNested={hasNested}
                showNested={showNested && hasNested}
              >
                <Icon name="chevron-right" />
              </S.RecursiveFolders.Indicator>
              <RadioGroup.Item value={folderPath} onClick={handleSelect} />
              <Text>{key}</Text>
            </S.RecursiveFolders.Row>

            {hasNested && showNested && (
              <S.RecursiveFolders.Nested>
                <RecursiveFolders folders={value} selected={selected} />
              </S.RecursiveFolders.Nested>
            )}
          </Box>
        );
      })}
    </S.RecursiveFolders.Wrapper>
  );
};

const RecursiveFoldersSkeleton = () => {
  const Line = () => (
    <S.RecursiveFolders.Row>
      <S.RecursiveFolders.Skeleton variant="radio" />
      <S.RecursiveFolders.Skeleton variant="text" />
    </S.RecursiveFolders.Row>
  );

  return (
    <S.RecursiveFolders.Wrapper>
      <Line />
      <Line />
      <Line />
      <Line />
    </S.RecursiveFolders.Wrapper>
  );
};
