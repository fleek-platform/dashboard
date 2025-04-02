import { getDefined } from '@/defined';

import { isServerSide } from './isServerSide';

export const getMaintenanceMode = (): boolean => {
  updateMaintenanceMode();

  return getEnv();
};

const updateMaintenanceMode = async (): Promise<void> => {
  const maintenanceMode = await checkMaintenanceMode();

  if (maintenanceMode !== getEnv()) {
    setEnv(maintenanceMode);

    if (!isServerSide()) {
      window.location.reload();
    }
  }
};

const checkMaintenanceMode = async (): Promise<boolean> => {
  try {
    const response = await fetch(
      getDefined('NEXT_PUBLIC_SDK__AUTHENTICATION_URL')+ '/ping',
    );

    return response.status !== 200;
  } catch (error) {
    return true;
  }
};

const key = 'MAINTENANCE_MODE';

const getEnv = (): boolean => {
  // eslint-disable-next-line no-process-env
  return process.env[key] === 'true';
};

const setEnv = (value: boolean): void => {
  // eslint-disable-next-line no-process-env
  process.env[key] = value.toString();
};
