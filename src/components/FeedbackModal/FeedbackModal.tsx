import { routes } from '@fleek-platform/utils-routes';
import { email } from '@fleek-platform/utils-validation';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as zod from 'zod';

import { Form, Link } from '@/components';
import { useMeQuery } from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { TAB, useFeedbackModal } from '@/providers/FeedbackModalProvider';
import { Box, Button, Dialog, Divider, Icon, Input, Text } from '@/ui';
import { cn } from '@/utils/cn';

import { useFormField } from '../Form/FormProvider';
import FileBadge from './FileBadge';
import {
  FileUploadError,
  submitForm,
  SubmitSupportFormError,
  uploadFile,
} from './submitForm';
import { useAuthContext } from '@/providers/AuthProvider';

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const formSchema = zod.object({
  email: email,
});

export const FeedbackModal: React.FC = () => {
  const auth = useAuthContext();
  const feedbackModal = useFeedbackModal();
  const [inputValue, setInputValue] = useState('');
  const [view, setView] = useState<'FORM' | 'SUBMITTED'>('FORM');

  const [files, setFiles] = useState<File[]>([]);
  const toast = useToast();
  const [meQuery] = useMeQuery({ variables: {}, pause: !auth.token });
  const user = meQuery.data?.user;
  const isAuthed = !!user;

  useEffect(() => {
    if (!feedbackModal.isOpen) {
      resetForm();
    }
  }, [feedbackModal.isOpen]);

  const handleFormSubmit = useCallback(
    async (email: string) => {
      if (!user?.id || !user?.username) {
        toast.error({
          message: 'User not found. Please ensure you are logged in.',
          duration: 5000,
          withCloseButton: true,
        });

        return;
      }

      try {
        // Upload files and get upload tokens
        const uploadTokens = await Promise.all(
          files.map((file) => uploadFile({ file })),
        );

        const feedbackData = {
          email,
          firstName: user?.firstName ?? undefined,
          comment: inputValue,
          userId: user.id,
          userName: user.username,
        };

        await submitForm(
          feedbackData,
          resetForm,
          feedbackModal.selectedTab,
          uploadTokens,
        );
        setView('SUBMITTED');
      } catch (error) {
        let errorMessage = 'Failed to send message. ';

        if (error instanceof SubmitSupportFormError) {
          errorMessage += `(${error.status}) ${error.message}`;
        } else if (error instanceof FileUploadError) {
          errorMessage += error.message;
        } else if (error instanceof Error) {
          errorMessage += error.message;
        } else {
          errorMessage += 'An unexpected error occurred.';
        }

        toast.error({
          message: errorMessage,
          duration: 7000,
          withCloseButton: true,
        });
      }
    },
    [
      user?.id,
      user?.firstName,
      user?.username,
      user?.email,
      email,
      inputValue,
      toast,
      feedbackModal.selectedTab,
      files,
    ],
  );

  const form = Form.useForm({
    options: { partial: false, validateNotDirty: true },
    values: {
      email: user?.email ?? '',
    },
    schema: formSchema,
    onSubmit: async ({ email }) => await handleFormSubmit(email),
  });

  const resetForm = useCallback(() => {
    form.resetForm();
    setView('FORM');
    setInputValue('');
    feedbackModal.setSelectedTab('PROBLEM');
    setFiles([]);
  }, []);

  // Needs to pass email validation from the form, and custom validation for the textarea
  const canSubmit = useMemo(() => {
    return !!(
      form.isValid &&
      inputValue.length > 3 &&
      inputValue.length < 5000
    );
  }, [form.isValid, inputValue, form.fields.email.value]);

  if (!isAuthed) {
    return null;
  }

  return (
    <>
      <Dialog.Root
        open={feedbackModal.isOpen}
        onOpenChange={feedbackModal.toggleModal}
      >
        <Dialog.Overlay />

        <Dialog.Portal>
          <Dialog.Content
            css={{ maxWidth: '40rem', width: '$full', padding: '$none' }}
          >
            {view === 'FORM' ? (
              <Form.Provider value={form}>
                <InnerForm
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  canSubmit={canSubmit}
                  files={files}
                  setFiles={setFiles}
                  selectedTab={feedbackModal.selectedTab}
                  setSelectedTab={feedbackModal.setSelectedTab}
                />
              </Form.Provider>
            ) : (
              <Box className="p-6 flex flex-col gap-6">
                <Text as="h1" variant="primary" size="xl" weight={700}>
                  Thank you!
                </Text>
                <Text>
                  Your ticket has been submitted successfully. You will receive
                  an email to follow up on your submission.
                </Text>
                <Box className="flex flex-row flex-1 w-full gap-4 items-end">
                  <Button intent="neutral" onClick={feedbackModal.toggleModal}>
                    Close
                  </Button>
                </Box>
              </Box>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

type InnerFormProps = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  canSubmit: boolean;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  selectedTab: TAB;
  setSelectedTab: React.Dispatch<React.SetStateAction<TAB>>;
};

export const InnerForm: React.FC<InnerFormProps> = ({
  inputValue,
  setInputValue,
  canSubmit,
  files,
  setFiles,
  selectedTab,
  setSelectedTab,
}) => {
  const toast = useToast();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAttachFileClick = () => {
    fileInputRef.current?.click();
  };

  const tabData: Record<TAB, { text: string; placeholder: string }> = {
    PROBLEM: {
      text: "What's the issue? If you've found a bug, which steps can we take to reproduce it?",
      placeholder: 'Something seems wrong...',
    },
    QUESTION: {
      text: 'How can we help? Please share any relevant information we may need to answer your question.',
      placeholder: 'How do I...',
    },
    FEEDBACK: {
      text: 'How can we improve Fleek? If you have a feature request, can you explain how it would benefit you?',
      placeholder: 'What if...',
    },
  };

  const getTabText = () => tabData[selectedTab]?.text || '';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const totalSize = newFiles.reduce((acc, file) => acc + file.size, 0);

      if (totalSize > MAX_FILE_SIZE_BYTES) {
        toast.error({
          message: `The file is too large! Please ensure your files are smaller than ${MAX_FILE_SIZE_MB} MB.`,
          duration: 5000,
          withCloseButton: true,
        });

        return;
      }

      setFiles([...files, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const form = Form.useContext();
  const emailField = useFormField<string>('email');

  // If email field is pre-filled, need to set it as touched to pass form validation
  useEffect(() => {
    if (emailField.value) {
      emailField.setTouched(true);
    }
  }, [emailField]);

  const handleFormSubmit = async () => {
    await form.submit();
  };

  const [meQuery] = useMeQuery();
  const user = meQuery.data?.user;

  return (
    <>
      <Box className="flex flex-col px-6 gap-2 pt-6">
        <Text as="h1" variant="primary" size="xl" weight={700}>
          Contact us
        </Text>
        {!user?.email && (
          <>
            <Box className="flex flex-col items-start gap-2 mt-3">
              <span className="text-xs">Email</span>
              <Form.InputField
                name="email"
                placeholder="Enter your email"
                disableValidMessage
                className="focus:outline-none"
                formFieldRootClassName="w-full"
              />
              <Box className="flex-row items-center gap-2 pt-1">
                <Icon name="info" className="text-neutral-11 text-xs" />
                <Text className="flex">
                  Save your email for next time by entering it on
                  <Link
                    href={routes.profile.settings.loginConnections()}
                    target="_blank"
                    className="flex self-end gap-2 items-center pl-1 text-neutral-12 underline underline-offset-2 hover:no-underline"
                  >
                    Account Settings
                  </Link>
                  .
                </Text>
              </Box>
            </Box>
          </>
        )}
      </Box>
      <Divider />

      <Box className="flex flex-row justify-start gap-3 px-6">
        <Button
          variant="outline"
          intent={selectedTab === 'PROBLEM' ? 'accent' : 'ghost'}
          onClick={() => setSelectedTab('PROBLEM')}
          size="sm"
          className={cn(
            'p-2 rounded-sm',
            selectedTab === 'PROBLEM' && 'shadow-lg',
          )}
        >
          <Icon name="exclamation-triangle" animated={true} />
          Problem
        </Button>
        <Button
          variant="outline"
          intent={selectedTab === 'QUESTION' ? 'accent' : 'ghost'}
          onClick={() => setSelectedTab('QUESTION')}
          size="sm"
          className={cn(
            'p-2 rounded-sm',
            selectedTab === 'QUESTION' && 'shadow-lg',
          )}
        >
          <Icon name="question-circle" />
          Question
        </Button>
        <Button
          variant="outline"
          intent={selectedTab === 'FEEDBACK' ? 'accent' : 'ghost'}
          onClick={() => setSelectedTab('FEEDBACK')}
          size="sm"
          className={cn(
            'p-2 rounded-sm',
            selectedTab === 'FEEDBACK' && 'shadow-lg',
          )}
        >
          <Icon name="chat-bubble" />
          Feedback
        </Button>
      </Box>

      <Box className="flex flex-col gap-2 items-start px-6">
        <Box className="flex flex-col w-full">
          <Input.Root variant="ghost" size="md">
            <Input.Textarea
              placeholder={getTabText()}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
          </Input.Root>
        </Box>

        <Input.Field
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          hidden
        />

        {!!files.length && (
          <Box className="flex flex-row flex-wrap gap-2">
            {files.map((file, index) => (
              <FileBadge
                key={index}
                file={file}
                onRemove={() => handleRemoveFile(index)}
              />
            ))}
          </Box>
        )}

        <Box
          onClick={handleAttachFileClick}
          className="flex flex-row gap-2 mt-3 items-center hover:cursor-pointer hover:opacity-100 opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:opacity-100 "
          as="button"
          role="button"
          tabIndex={0}
          aria-label="Attach images, files or videos"
        >
          <Icon name="secondaryLink" />
          <Text>Attach images, files or videos</Text>
        </Box>
      </Box>
      <Divider />
      <Box className="flex flex-row gap-4 items-end pb-6 px-6">
        <Dialog.Close asChild>
          <Button
            intent="ghost"
            variant="primary"
            disabled={form.isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
        </Dialog.Close>
        <Button
          onClick={handleFormSubmit}
          loading={form.isSubmitting}
          disabled={!canSubmit || form.isSubmitting}
          className="flex-1"
        >
          {form.isSubmitting ? 'Sending...' : 'Send message'}
        </Button>
      </Box>
    </>
  );
};
