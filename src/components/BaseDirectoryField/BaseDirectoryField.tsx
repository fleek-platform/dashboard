import { MouseEventHandler, useRef, useState } from 'react';

import { Form, SettingsModal } from '@/components';
import { ChildrenProps, LoadingProps } from '@/types/Props';
import {
  Box,
  Button,
  FormField,
  Icon,
  Input,
  RadioGroup,
  Skeleton,
  Text,
} from '@/ui';
import { cn } from '@/utils/cn';

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
          <Box className="flex-row gap-2.5">
            <Input.Root disabled={props.isDisabled}>
              <Input.Field
                readOnly
                value={field.value || './'}
                disabled={props.isDisabled}
              />
            </Input.Root>

            <Button
              intent="neutral"
              variant="outline"
              disabled={props.isDisabled}
              size="sm"
            >
              Select
            </Button>
          </Box>
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
    <Box className="gap-3">
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
            <RecursiveFoldersRow onClick={handleShowNested}>
              <Box
                className={cn('transition-all duration-75', {
                  'opacity-[0.1]': !hasNested,
                  'rotate-90': showNested && hasNested,
                })}
              >
                <Icon name="chevron-right" />
              </Box>
              <RadioGroup.Item value={folderPath} onClick={handleSelect} />
              <Text>{key}</Text>
            </RecursiveFoldersRow>

            {hasNested && showNested && (
              <Box className="py-3 pl-6">
                <RecursiveFolders folders={value} selected={selected} />
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export const RecursiveFoldersRow: React.FC<
  ChildrenProps<React.ComponentPropsWithRef<typeof Box>>
> = ({ children }) => (
  <Box className="flex-row gap-2.5 items-center cursor-pointer border-b-neutral-7 border-t-neutral-7 py-3 px-0">
    {children}
  </Box>
);

export const RecursiveFoldersSkeleton = () => {
  const Line = () => (
    <RecursiveFoldersRow>
      <Skeleton variant="avatar" />
      <Skeleton variant="text" />
    </RecursiveFoldersRow>
  );

  return (
    <Box className="gap-3">
      <Line />
      <Line />
      <Line />
      <Line />
    </Box>
  );
};
