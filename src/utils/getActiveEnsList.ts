import { EnsRecordStatus } from '@/generated/graphqlClient';
import type { Site } from '@/types/Site';

type GetActiveEnsListArgs = {
  site: Site;
};

export const getActiveEnsList = ({ site }: GetActiveEnsListArgs) => {
  const ensList = site?.ipnsRecords.flatMap((ipns) => ipns.ensRecords) || [];

  return ensList.filter((ens) => ens.status === EnsRecordStatus.ACTIVE);
};
