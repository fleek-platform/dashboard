import type { PropsWithChildren } from 'react';

import type { PinQuery } from '@/generated/graphqlClient';
import { bytesToSize } from '@/utils/fileSizeFormat';

import { DeployTime } from '../List/DeployTime';
import { InvokeLink } from '../List/InvokeLink';
import { StatusBadge } from '../List/StatusBadge';
import { useFunctionDetailContext } from './Context';

type DatumProps = PropsWithChildren<{ label: string }>;
const Datum = ({ label, children }: DatumProps) => {
  return (
    <>
      <dt className="inline-flex basis-1/4 text-neutral-11 text-sm">{label}</dt>
      <dd className="inline-flex basis-3/4 justify-end text-right text-sm">
        {children}
      </dd>
    </>
  );
};

const Pending = () => <span className="text-neutral-6">Pending</span>;

type DescriptionProps = {
  pin?: PinQuery['pin'];
};

export const Description = ({ pin }: DescriptionProps) => {
  const ctxt = useFunctionDetailContext(true);

  if (!ctxt) {
    return null;
  }

  const { status, invokeUrl, currentDeployment } = ctxt;

  return (
    <section className="flex flex-wrap *:flex *:flex-wrap *:content-start gap-y-3 md:gap-x-6 *:gap-y-3">
      <dl className="md:pr-6 md:border-r border-neutral-6 w-full md:w-1/2">
        <Datum label="Status">
          <StatusBadge status={currentDeployment && status} />
        </Datum>
        <Datum label="Runtime">Javascript</Datum>
        <Datum label="Region">Global</Datum>
        <Datum label="Domain">
          <InvokeLink href={invokeUrl} />
        </Datum>
      </dl>
      <dl className="flex-1">
        <Datum label="Updated">
          {currentDeployment ? (
            <DeployTime at={currentDeployment.createdAt} />
          ) : (
            <Pending />
          )}
        </Datum>
        <Datum label="Size">
          {pin?.size ? bytesToSize(pin.size) : <Pending />}
        </Datum>
        <Datum label="Function Access">
          {currentDeployment ? 'Public' : <Pending />}
        </Datum>
      </dl>
    </section>
  );
};
