import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';

import { Icon } from '../Icon/Icon';
import { IconLibrary, type IconName } from '../Icon/IconLibrary';
import { Combobox } from './Combobox';

const meta: Meta = {
  title: 'Library/Atoms/Combobox',
  component: Combobox,
};

export default meta;

type Item = { id: number; label: string; icon: IconName };

const icons = Object.keys(IconLibrary) as IconName[];
const Items: Item[] = new Array(30).fill(null).map((_, index) => ({
  id: index,
  label: `Option ${index}`,
  icon: icons[Math.floor(Math.random() * icons.length)],
}));

export const Default: StoryFn = () => {
  const ElementWithState = (): JSX.Element => {
    const [selected, setSelected] = useState<Item>();

    return (
      <Combobox
        items={Items}
        selected={[selected, setSelected]}
        queryKey="label"
      >
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select an option">
              {(selected: Item) => selected.label}
            </Field>

            <Options>{(item: Item) => item.label}</Options>
          </>
        )}
      </Combobox>
    );
  };

  return <ElementWithState />;
};

export const WithLoading: StoryFn = () => {
  const ElementWithState = (): JSX.Element => {
    const [selected, setSelected] = useState<Item>();

    return (
      <Combobox
        items={Items}
        selected={[selected, setSelected]}
        queryKey="label"
        isLoading
      >
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select an option">
              {(selected: Item) => selected.label}
            </Field>

            <Options>{(item: Item) => item.label}</Options>
          </>
        )}
      </Combobox>
    );
  };

  return <ElementWithState />;
};

export const WithSearching: StoryFn = () => {
  const ElementWithState = (): JSX.Element => {
    const [selected, setSelected] = useState<Item>();

    return (
      <Combobox
        items={Items}
        selected={[selected, setSelected]}
        queryKey="label"
        isSearching
      >
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select an option">
              {(selected: Item) => selected.label}
            </Field>

            <Options>{(item: Item) => item.label}</Options>
          </>
        )}
      </Combobox>
    );
  };

  return <ElementWithState />;
};

export const WithIcon: StoryFn = () => {
  const ElementWithState = (): JSX.Element => {
    const [selected, setSelected] = useState<Item>();

    return (
      <Combobox
        items={Items}
        selected={[selected, setSelected]}
        queryKey="label"
      >
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select an option">
              {(selected: Item) => (
                <>
                  <Icon name={selected.icon} /> {selected.label}
                </>
              )}
            </Field>

            <Options>
              {(item: Item) => (
                <>
                  <Icon name={item.icon} /> {item.label}
                </>
              )}
            </Options>
          </>
        )}
      </Combobox>
    );
  };

  return <ElementWithState />;
};

export const WithoutSearch: StoryFn = () => {
  const ElementWithState = (): JSX.Element => {
    const [selected, setSelected] = useState<Item>();

    return (
      <Combobox
        items={Items}
        selected={[selected, setSelected]}
        queryKey="label"
      >
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select an option">
              {(selected: Item) => selected.label}
            </Field>

            <Options disableSearch>{(item: Item) => item.label}</Options>
          </>
        )}
      </Combobox>
    );
  };

  return <ElementWithState />;
};

export const WithDisable: StoryFn = () => {
  const ElementWithState = (): JSX.Element => {
    const [selected, setSelected] = useState<Item>();

    return (
      <Combobox
        items={Items}
        selected={[selected, setSelected]}
        queryKey="label"
        isDisabled={true}
      >
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select an option">
              {(selected: Item) => selected.label}
            </Field>

            <Options disableSearch>{(item: Item) => item.label}</Options>
          </>
        )}
      </Combobox>
    );
  };

  return <ElementWithState />;
};

export const WithSize: StoryFn = () => {
  const ElementWithState = (): JSX.Element => {
    const [selected, setSelected] = useState<Item>();

    return (
      <Combobox
        items={Items}
        selected={[selected, setSelected]}
        queryKey="label"
        css={{ fontSize: '10px' }}
      >
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select an option">
              {(selected: Item) => selected.label}
            </Field>

            <Options>{(item: Item) => item.label}</Options>
          </>
        )}
      </Combobox>
    );
  };

  return <ElementWithState />;
};

export const WithCompoundOptions: StoryFn = () => {
  const ElementWithState = (): JSX.Element => {
    const [selected, setSelected] = useState<Item>();

    return (
      <Combobox
        items={Items}
        selected={[selected, setSelected]}
        queryKey="label"
      >
        {({ Field, Options, CompoundOption }) => (
          <>
            <Field placeholder="Select an option">
              {(selected: Item) => selected.label}
            </Field>

            <Options>
              {(item: Item) => (
                <CompoundOption
                  header={item.label}
                  content="Description for compound option"
                />
              )}
            </Options>
          </>
        )}
      </Combobox>
    );
  };

  return <ElementWithState />;
};
