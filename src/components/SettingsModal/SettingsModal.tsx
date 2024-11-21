import type React from 'react';
import { useEffect, useState } from 'react';

import type { ChildrenProps, LoadingProps } from '@/types/Props';
import { Button, Checkbox, Dialog, Skeleton, Text } from '@/ui';
import { withProps } from '@/utils/withProps';

import { SettingsModalStyles as S } from './SettingsModal.styles';

export const SettingsModal = ({
  trigger,
  children,
  ...props
}: SettingsModal.Props) => {
  return (
    <Dialog.Root {...props}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay />
        <S.Modal.Content>{children}</S.Modal.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

SettingsModal.Table = (({ headers, rows, isLoading, onSelected }) => {
  const [values, setValues] = useState(rows.map(() => false));

  const handleChange = (index: number, checked: boolean) => {
    onSelected(checked ? index : undefined);

    setValues((prev) => {
      const next = prev.fill(false);
      next[index] = checked;

      return next;
    });
  };

  useEffect(() => {
    setValues(rows.map(() => false));
    onSelected(undefined);
  }, [rows, onSelected]);

  return (
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
          <S.Table.Row>
            <S.Table.Cell colSpan={headers.length + 1} empty>
              No records found
            </S.Table.Cell>
          </S.Table.Row>
        )}
      </S.Table.Body>
    </S.Table.Root>
  );
}) as React.FC<SettingsModal.TableProps>; // explicite cast for rules of hooks

SettingsModal.Footer = S.Modal.CTARow;

export const Heading = withProps(Text, {
  as: 'h1',
  variant: 'primary',
  size: 'xl',
  weight: 700,
});
SettingsModal.Heading = Heading;

SettingsModal.ConfirmButton = Button;

SettingsModal.Close = Dialog.Close;

export namespace SettingsModal {
  // eslint-disable-next-line fleek-custom/valid-argument-types
  export type Props = {
    trigger: React.ReactNode;
  } & React.ComponentProps<typeof Dialog.Root>;

  export type TableHeader = ChildrenProps<{
    size: string;
  }>;

  export type TableRow = ChildrenProps['children'][];

  export type TableProps = {
    headers: TableHeader[];
    rows: TableRow[];
    onSelected: (index: number | undefined) => void;
  } & LoadingProps;

  export type WarningProps = ChildrenProps;
}
