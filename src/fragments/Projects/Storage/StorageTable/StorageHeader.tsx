import { Box, Button, Combobox, Icon } from '@/ui';

import { useStorageContext } from '../Storage.context';

export const StorageHeader: React.FC = () => {
  const { storageProviders, setSelectedStorage, selectedStorage } = useStorageContext();

  return (
    <Box className="border border-neutral-6 bg-neutral-2 rounded">
      {/* TODO refactor combobox and move to styles */}
      <Combobox
        items={storageProviders}
        selected={[selectedStorage, setSelectedStorage]}
        queryKey="label"
        css={{ width: '14rem' }}
        isDisabled
      >
        {({ Field, Options }) => (
          <>
            <Field
              // TODO refactor combobox and move to styles
              css={{
                width: '11.875rem',
                backgroundColor: '$button-slate-secondary',
                borderColor: '$transparent',
                [`${Icon}`]: { color: '$icon-slate' },
              }}
            >
              {(selected) => selected.label}
            </Field>

            <Options disableSearch>{(item) => item.label}</Options>
          </>
        )}
      </Combobox>
      <Box>
        <Button iconLeft="menu" color="ghost" disabled>
          Actions
        </Button>
        <Button iconLeft="download" color="ghost" disabled>
          Export CSV
        </Button>
      </Box>
    </Box>
  );
};
