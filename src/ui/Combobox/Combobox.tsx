import React, { Fragment, useCallback, useMemo, useState } from 'react';

import { CustomTooltip, CustomTooltipProps } from '@/components';
import { useDebounce } from '@/hooks/useDebounce';
import { sizes } from '@/theme/foundations';
import { Box, Icon, Input as InputComponent, InputFieldProps as InputProps, Text } from '@/ui';
import { createContext } from '@/utils/createContext';

import { Divider } from '../Divider/Divider';
import { IconName } from '../Icon/IconLibrary';
import { ComboboxStyles as S } from './Combobox.styles';

const [Provider, useContext] = createContext<Combobox.Context<unknown>>({
  name: 'ComboboxContext',
  hookName: 'useComboboxContext',
  providerName: 'ComboboxProvider',
});

const Input = (props: InputProps): JSX.Element => {
  const {
    query: [, setQuery],
  } = useContext() as Combobox.Context<unknown>;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);

    if (props.onChange) {
      props.onChange(event);
    }
  };

  return <InputComponent.Field {...props} onChange={onChange} />;
};

const Options = <T,>({
  disableSearch,
  children,
  isEmpty = 'No items found',
  isSearching = 'Searching...',
  horizontalDividers = false,
  viewportHeight = '$xs', // use null to disable and use the full viewport
  ...props
}: Combobox.OptionsProps<T>): JSX.Element => {
  const {
    query: [query],
    searching,
    selected: [selected, setSelected],
    items,
    queryFilter,
    open: [, setOpen],
    extraItems,
  } = useContext() as Combobox.Context<T>;

  const filteredItems = useMemo(() => items.filter((item) => queryFilter(query, item)), [items, query, queryFilter]);

  const handleSelect = useCallback(
    (item: T) => {
      setSelected(item);
      setOpen(false);
    },
    [setSelected, setOpen]
  );

  const handleExtraItemClick = useCallback(
    (item: Combobox.ExtraItem) => {
      item.onClick();
      setOpen(false);
    },
    [setOpen]
  );

  return (
    <S.Options {...props}>
      {!disableSearch && (
        <Box className="border-b border-neutral-6 px-3">
          <InputComponent.Root variant="ghost">
            <InputComponent.Icon name="magnify" />
            <Input placeholder="Search..." />
          </InputComponent.Root>
        </Box>
      )}

      <S.Scrollable.Root type="auto">
        <S.Scrollable.Bar />
        <S.Scrollable.Viewport data-attribute={disableSearch ? '' : 'search'} css={{ maxHeight: viewportHeight?.concat(' !important') }}>
          <S.Scrollable.Content>
            {filteredItems.map((item, index) => (
              <Fragment key={JSON.stringify(item)}>
                <S.Option data-state={selected === item ? 'selected' : ''} onClick={() => handleSelect(item)}>
                  <S.ContentWrapper>{children(item, selected === item)}</S.ContentWrapper>
                  {selected === item && <S.Icon name="check" />}
                </S.Option>
                {horizontalDividers && index < filteredItems.length - 1 && <Divider />}
              </Fragment>
            ))}
          </S.Scrollable.Content>
        </S.Scrollable.Viewport>
      </S.Scrollable.Root>

      {!searching && filteredItems.length === 0 && <S.Message>{isEmpty}</S.Message>}

      {searching && <S.Message>{isSearching}</S.Message>}
      {extraItems && (
        <>
          <Divider />
          {extraItems.map((item, index) => {
            const Item = (
              <S.ExtraOption
                key={`${item.label}-${index}`}
                onClick={() => {
                  if (!item?.disabled) {
                    return handleExtraItemClick(item);
                  }
                }}
                disabled={item?.disabled ?? false}
              >
                {item.iconName && <Icon name={item.iconName} />}
                {item.label}
              </S.ExtraOption>
            );

            return item.tooltip ? <CustomTooltip {...item.tooltip}>{Item}</CustomTooltip> : Item;
          })}
        </>
      )}
    </S.Options>
  );
};

const Field = <T,>({ children, disableChevron, placeholder, ...props }: Combobox.FieldProps<T>): JSX.Element => {
  const {
    selected: [selected],
    open: [open],
    loading: isLoading,
    disabled,
  } = useContext() as Combobox.Context<T>;

  const hasSelected = typeof selected !== 'undefined';

  return (
    <S.Field {...props} isLoading={isLoading} disabled={disabled || isLoading}>
      <InputComponent.Root>
        {!isLoading && <S.ContentWrapper placeholder={!hasSelected}>{hasSelected ? children(selected) : placeholder}</S.ContentWrapper>}
        {!isLoading && !disableChevron && <S.Icon name="chevron-down" rotate={open} />}
      </InputComponent.Root>
    </S.Field>
  );
};

const CompoundOption = ({ header, content }: Combobox.CompoundOptionProps) => (
  <Box className="items-start gap-1">
    <Box className="flex-row gap-2 items-center">{header}</Box>
    <Text>{content}</Text>
  </Box>
);

export const Combobox = <T,>({
  children,
  selected,
  isLoading: loading = false,
  isSearching: searching = false,
  isDisabled: disabled = false,
  items,
  queryKey,
  css,
  unattached,
  onQueryChange,
  extraItems,
  ...props
}: Combobox.RootProps<T>): JSX.Element => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const queryFilter = useCallback(
    (query: string, item: T): boolean => {
      if (typeof queryKey === 'undefined') {
        return `${item}`.includes(query.toLowerCase());
      }

      const keys = Array.isArray(queryKey) ? queryKey : [queryKey];

      const searchString = keys
        .reduce((acc, key) => {
          const value = item[key];

          return `${acc} ${value}`;
        }, '')
        .toLowerCase();

      return searchString.includes(query.toLowerCase());
    },
    [queryKey]
  );

  const refetch = useDebounce((query: string) => {
    if (onQueryChange) {
      onQueryChange(query);
    }
  }, 300);

  const handleOpenChange = (newState: boolean) => {
    if (disabled || loading) {
      return;
    }

    if (newState) {
      setQuery('');
    }

    setOpen(newState);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
    refetch(newQuery);
  };

  const TypedProvider = Provider as React.Provider<Combobox.Context<T>>;

  return (
    <S.Root open={open} onOpenChange={handleOpenChange} {...props}>
      {unattached && <S.Anchor />}

      <TypedProvider
        value={{
          selected,
          query: [query, handleQueryChange],
          loading,
          searching,
          disabled,
          open: [open, handleOpenChange],
          items,
          queryFilter,
          extraItems,
        }}
      >
        <S.Wrapper css={css}>
          {children({
            CompoundOption: CompoundOption,
            Options: Options<T>,
            Field: Field<T>,
          })}
        </S.Wrapper>
      </TypedProvider>
    </S.Root>
  );
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Combobox {
  export type Context<T> = {
    items: T[];
    selected: [T | undefined, (newState: T | undefined) => void];
    open: [boolean, (newState: boolean) => void];
    query: [string, (newState: string) => void];
    loading: boolean;
    searching: boolean;
    disabled: boolean;
    onQueryChange?: (query: string) => Promise<void>;
    queryFilter: (query: string, item: T) => boolean;
    extraItems?: ExtraItem[];
  };

  export type OptionsProps<T> = Omit<S.OptionsProps, 'children'> & {
    disableSearch?: boolean;
    isEmpty?: React.ReactNode;
    isSearching?: React.ReactNode;
    viewportHeight?: `$${keyof typeof sizes}` | (string & {}) | null;
    horizontalDividers?: boolean;
    children: (item: T, selected: boolean) => React.ReactNode;
  };

  export type FieldProps<T> = Omit<S.FieldProps, 'children' | 'placeholder'> & {
    children: (item: T) => React.ReactElement | React.ReactNode;
    placeholder?: React.ReactElement | React.ReactNode;
    disableChevron?: boolean;
    isLoading?: boolean;
  };

  export type CompoundOptionProps = {
    header: React.ReactElement | React.ReactNode;
    content: React.ReactElement | React.ReactNode;
  };

  export type Elements<T> = {
    CompoundOption: React.FC<CompoundOptionProps>;
    Options: React.FC<OptionsProps<T>>;
    Field: React.FC<FieldProps<T>>;
  };

  export type ExtraItem = {
    iconName?: IconName;
    label: string;
    onClick: () => void;
    disabled?: boolean;
    tooltip?: CustomTooltipProps;
  };

  export type CompoundOption = {
    header: string;
    content: string;
  };

  export type RootProps<T> = Omit<S.RootProps, 'open' | 'onOpenChange' | 'children'> &
    Pick<S.WrapperProps, 'css'> &
    Pick<Context<T>, 'selected' | 'items' | 'onQueryChange'> & {
      isLoading?: boolean;
      isDisabled?: boolean;
      isSearching?: boolean;
      children: (elements: Elements<T>) => React.ReactNode;
    } & (T extends object ? { queryKey: keyof T | (keyof T)[] } : { queryKey?: undefined }) & {
      unattached?: boolean;
    } & { extraItems?: ExtraItem[] };
}
