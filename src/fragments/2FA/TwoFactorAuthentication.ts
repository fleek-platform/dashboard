import { Create } from './Create';
import { EmptyManage, Manage } from './Manage';
import { TwoFactorModalProvider, useTwoFactorModal } from './ModalProvider';
import { Settings } from './Settings';
import { useMutationWith2FA } from './useMutationWith2FA';

export const TwoFactorAuthentication = {
  Sections: {
    Create,
    Manage,
    EmptyManage,
    Settings,
  },
  Provider: TwoFactorModalProvider,
  useMutation: useMutationWith2FA,
  useTwoFactorModal: useTwoFactorModal,
};
