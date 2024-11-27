import { DateTime } from 'luxon';

type GetDiffInMothsArgs = {
  expirationDate: string; //string as 'MM/yy'
};

export const getDiffInMoths = ({ expirationDate }: GetDiffInMothsArgs) => {
  return Math.floor(
    DateTime.fromFormat(expirationDate, 'MM/yy')
      .endOf('month')
      .diffNow('months')
      .as('months'),
  );
};
