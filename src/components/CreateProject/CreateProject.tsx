import { createProjectSchema } from '@fleek-platform/utils-validation';
import { useClient } from 'urql';

import { constants } from '@/constants';
import { useCreateProjectMutation } from '@/generated/graphqlClient';
import { useToast } from '@/hooks/useToast';
import { useCookies } from '@/providers/CookiesProvider';
import { useProjectContext } from '@/providers/ProjectProvider';
import { Button, Dialog, Text } from '@/ui';

import { Form } from '../Form/Form';
import { LearnMoreMessage } from '../LearnMoreMessage/LearnMoreMessage';
import { Modal } from '../Modal/Modal';
import { ProjectField } from '../ProjectField/ProjectField';

export const CreateProject: React.FC = () => {
  const { isCreateProjectModalOpen: isModalOpen, setIsCreateProjectModalOpen } =
    useProjectContext();
  const toast = useToast();

  const cookies = useCookies();
  const client = useClient();

  const [, createProject] = useCreateProjectMutation();

  const createProjectForm = Form.useForm({
    values: {
      name: '',
    },
    schema: createProjectSchema.shape.data,
    extraValidations: {
      name: Form.createExtraValidation.projectName(client),
    },
    onSubmit: async (values) => {
      const createProjectHandler = async () => {
        try {
          const { data, error } = await createProject({
            data: { name: values.name },
          });

          if (error || !data?.createProject?.id) {
            throw (
              error || new Error('There was an error creating the new project')
            );
          }

          cookies.set('projectId', data.createProject.id);
          handleModalChange(false);
        } catch (error) {
          toast.error({
            error,
            log: `There was an error creating the new project ${values.name}`,
          });
        }
      };

      await createProjectHandler();
    },
  });

  const handleOnCancel = () => {
    handleModalChange(false);
  };

  const handleModalChange = (isOpen: boolean): void => {
    if (!isOpen) {
      createProjectForm.resetForm({ name: '' });
    }

    setIsCreateProjectModalOpen(isOpen);
  };

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={handleModalChange}>
      <Dialog.Overlay />
      <Modal.Content>
        <Modal.Heading> Create project</Modal.Heading>
        <Text>
          Create a new project to host sites and store files. You can customize
          your project and invite collaborators in &lsquo;Settings&rsquo;.
        </Text>

        <Form.Provider value={createProjectForm}>
          <ProjectField />
          <LearnMoreMessage href={constants.EXTERNAL_LINK.FLEEK_DOCS_PROJECTS}>
            projects
          </LearnMoreMessage>
          <FormButtons onCancelClick={handleOnCancel} />
        </Form.Provider>
      </Modal.Content>
    </Dialog.Root>
  );
};

type FormButtonsProps = {
  onCancelClick: () => void;
};

const FormButtons: React.FC<FormButtonsProps> = ({ onCancelClick }) => {
  const { isSubmitting, submit, shouldDisableSubmit } = Form.useContext();

  return (
    <Modal.CTARow>
      <Dialog.Close asChild disabled={isSubmitting} onClick={onCancelClick}>
        <Button intent="ghost" className="flex-1">
          Cancel
        </Button>
      </Dialog.Close>
      <Button
        disabled={shouldDisableSubmit}
        onClick={submit}
        loading={isSubmitting}
        className="flex-1"
      >
        Create
      </Button>
    </Modal.CTARow>
  );
};
