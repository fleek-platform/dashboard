import { CID } from 'ipfs-http-client';
import zod from 'zod';

import { Form } from '@/components';
import { SubmitButton } from '@/components/Form/SubmitButton/SubmitButton';
import { useRouter } from '@/hooks/useRouter';
import { Box, Icon } from '@/ui';

import { useIpfsPropagationContext } from '../../Context';

const validateCID = (value: string) => {
  try {
    CID.parse(value.trim());

    return true;
  } catch {
    return false;
  }
};

export const SearchForm: React.FC = () => {
  const { setShouldRefresh, setTestingHash } = useIpfsPropagationContext();
  const router = useRouter();
  const testingHash = router.query.hash as string;

  const form = Form.useForm({
    options: {
      validateNotDirty: false,
      validationDebounce: 0,
    },
    values: {
      hash: testingHash,
    },
    schema: zod.object({
      hash: zod.string().refine((value) => value.trim() === '' || validateCID(value), { message: 'Invalid CID' }),
    }),
    onSubmit: async () => await handleFormSubmit(),
  });

  const handleFormSubmit = () => {
    setTestingHash(form.values.hash);
    setShouldRefresh(true);
  };

  return (
    <Form.Provider value={form}>
      <Box className="relative flex flex-row gap-2 font-size-1 flex-1 w-full my-2 py-2">
        <Form.InputField
          name="hash"
          beforeContent={<Icon name="magnify" />}
          placeholder="Enter IPFS hash"
          disableValidMessage
          className="flex-1"
        />
        <SubmitButton variant="primary" size="sm">
          Check status
        </SubmitButton>
      </Box>
    </Form.Provider>
  );
};
