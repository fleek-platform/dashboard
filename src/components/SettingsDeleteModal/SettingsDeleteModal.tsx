import { useEffect, useState } from 'react';

import { ChildrenProps, LoadingProps } from '@/types/Props';
import { Button, Checkbox, Dialog, Skeleton, Text } from '@/ui';

import { AlertBox } from '../AlertBox/AlertBox';
import { Heading } from '../SettingsModal/SettingsModal';
import { SettingsDeleteModalStyles as S } from './SettingsDeleteModal.styles';

export const SettingsDeleteModal = ({
  trigger,
  children,
  ...props
}: SettingsDeleteModal.Props) => {
  return (
    <Dialog.Root {...props}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Overlay />

      <S.Modal.Content>{children}</S.Modal.Content>
    </Dialog.Root>
  );
};

SettingsDeleteModal.Table = (({
  title,
  headers,
  rows,
  isLoading,
  onValidationChange,
}) => {
  const [values, setValues] = useState(rows.map(() => false));

  const handleChange = (index: number, checked: boolean) => {
    setValues((prev) => {
      const next = [...prev];
      next[index] = checked;

      return next;
    });
  };

  useEffect(() => {
    onValidationChange(values.every((value) => value));
  }, [values, onValidationChange]);

  useEffect(() => {
    setValues(rows.map(() => false));
  }, [rows, onValidationChange]);

  return (
    <S.Table.Container>
      {title && (
        <Text as="h3" variant="primary" weight={500}>
          {title}
        </Text>
      )}
      <S.Table.Root>
        <colgroup>
          {headers.map((header, index) => (
            <col key={index} span={1} style={{ width: header.size }} />
          ))}
          <col span={1} style={{ width: '4rem' }} />
        </colgroup>

        <S.Table.Header>
          <S.Table.Row>
            {headers.map((header, index) => (
              <S.Table.HeaderCell key={index}>
                {header.children}
              </S.Table.HeaderCell>
            ))}
            <S.Table.HeaderCell /> {/* empty cell for checkbox */}
          </S.Table.Row>
        </S.Table.Header>

        <S.Table.Body>
          {rows.map((row, rowIndex) => (
            <S.Table.Row
              key={rowIndex}
              onClick={() => handleChange(rowIndex, !values[rowIndex])}
            >
              {row.map((cell, columnIndex) => (
                <S.Table.Cell key={columnIndex}>{cell}</S.Table.Cell>
              ))}

              <S.Table.Cell>
                <Checkbox checked={values[rowIndex]} />
              </S.Table.Cell>
            </S.Table.Row>
          ))}

          {isLoading && (
            <S.Table.Row>
              {headers.map((_, columnIndex) => (
                <S.Table.Cell key={columnIndex}>
                  <Skeleton />
                </S.Table.Cell>
              ))}

              <S.Table.Cell>
                <Skeleton />
              </S.Table.Cell>
            </S.Table.Row>
          )}

          {!isLoading && rows.length === 0 && (
            <S.Table.Row empty>
              <S.Table.Cell colSpan={headers.length + 1} empty>
                No records found
              </S.Table.Cell>
            </S.Table.Row>
          )}
        </S.Table.Body>
      </S.Table.Root>
    </S.Table.Container>
  );
}) as React.FC<SettingsDeleteModal.TableProps>; // explicite cast for rules of hooks

SettingsDeleteModal.Footer = S.Modal.CTARow;

SettingsDeleteModal.Heading = Heading;

SettingsDeleteModal.Warning = ({
  children = 'Warning: This action is irreversible.',
}: SettingsDeleteModal.WarningProps) => (
  <AlertBox variant="danger" size="sm">
    {children}
  </AlertBox>
);

SettingsDeleteModal.CancelButton = () => (
  <Dialog.Close asChild>
    <Button intent="ghost" className="flex-1">
      Cancel
    </Button>
  </Dialog.Close>
);

SettingsDeleteModal.ConfirmButton = Button;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SettingsDeleteModal {
  // eslint-disable-next-line fleek-custom/valid-argument-types
  export type Props = {
    trigger?: React.ReactNode;
  } & React.ComponentProps<typeof Dialog.Root>;

  export type TableHeader = ChildrenProps<{
    size: string;
  }>;

  export type TableRow = ChildrenProps['children'][];

  export type TableProps = {
    headers: TableHeader[];
    rows: TableRow[];
    onValidationChange: (value: boolean) => void;
    title?: string;
  } & LoadingProps;

  export type WarningProps = ChildrenProps;
}
