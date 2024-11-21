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

    // TODO: Investigate why inferred type fails
    // using any temporaly
    return (
      <Combobox
        items={Items}
        selected={[selected, setSelected]}
        queryKey="label"
      >
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select an option">
              {(selected: any) => selected.label}
            </Field>

            <Options>{(item: any) => item.label}</Options>
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

    // TODO: Investigage why the inferred type
    // fail. Using `any` temporary
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
              {(selected: any) => selected.label}
            </Field>

            <Options>{(item: any) => item.label}</Options>
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
    // TODO: Investigage why the inferred type
    // fail. Using `any` temporary
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
              {(selected: any) => selected.label}
            </Field>

            <Options>{(item: any) => item.label}</Options>
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

    // TODO: Investigage why the inferred type
    // fail. Using `any` temporary
    return (
      <Combobox
        items={Items}
        selected={[selected, setSelected]}
        queryKey="label"
      >
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select an option">
              {(selected: any) => (
                <>
                  <Icon name={selected.icon} /> {selected.label}
                </>
              )}
            </Field>

            <Options>
              {(item: any) => (
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

    // TODO: Investigage why the inferred type
    // fail. Using `any` temporary
    return (
      <Combobox
        items={Items}
        selected={[selected, setSelected]}
        queryKey="label"
      >
        {({ Field, Options }) => (
          <>
            <Field placeholder="Select an option">
              {(selected: any) => selected.label}
            </Field>

            <Options disableSearch>{(item: any) => item.label}</Options>
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

    // TODO: Investigage why the inferred type
    // fail. Using `any` temporary
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
              {(selected: any) => selected.label}
            </Field>

            <Options disableSearch>{(item: any) => item.label}</Options>
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

    // TODO: Investigage why the inferred type
    // fail. Using `any` temporary
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
              {(selected: any) => selected.label}
            </Field>

            <Options>{(item: any) => item.label}</Options>
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

    // TODO: Investigage why the inferred type
    // fail. Using `any` temporary
    return (
      <Combobox
        items={Items}
        selected={[selected, setSelected]}
        queryKey="label"
      >
        {({ Field, Options, CompoundOption }) => (
          <>
            <Field placeholder="Select an option">
              {(selected: any) => selected.label}
            </Field>

            <Options>
              {(item: any) => (
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
