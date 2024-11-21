import { AlertBox, CodeSnippet } from '@/components';
import { constants } from '@/constants';
import { Ipfs } from '@/fragments/Site/Ipfs/Ipfs';
import { usePinQuery } from '@/generated/graphqlClient';
import { useIpfsContent } from '@/hooks/useIpfsContent';
import { useProjectContext } from '@/providers/ProjectProvider';
import { useSessionContext } from '@/providers/SessionProvider';
import { Box, Skeleton, Text } from '@/ui';

import { Instructions } from '../Instructions';
import { SiteBadge } from '../List/SiteBadge';
import {
  type FunctionDetailContext,
  useFunctionDetailContext,
} from './Context';
import { Description } from './Description';

const { FUNCTIONS_MAX_DISPLAY_BYTES } = constants;

export const FnDetail: React.FC = () => {
  const ctxt = useFunctionDetailContext(true);

  return ctxt ? <FnDetailContent {...ctxt} /> : <FnDetailSkeleton />;
};

const FnDetailSkeleton = () => (
  <Box className="gap-6">
    <Box variant="container" className="bg-neutral-2">
      <Box>
        <Skeleton variant="text" className="w-1/4 h-7" />
      </Box>
      <Box>
        <AlertBox size="sm" variant="tertiary" className="flex-1">
          <Skeleton variant="text" className="h-5" />
        </AlertBox>
      </Box>
      <Box className="grid grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Box key={idx} className="child:w-full child:h-4">
            <Skeleton />
          </Box>
        ))}
        {Array.from({ length: 4 }).map((_, idx) => (
          <Box key={idx} className="child:w-full child:h-4">
            <Skeleton />
          </Box>
        ))}
      </Box>
    </Box>
    <Box variant="container" className="bg-neutral-2">
      <Skeleton variant="text" className="w-1/6 h-5" />
      <Skeleton variant="text" className="w-1/5" />
      <Skeleton variant="text" className="w-1/3" />
    </Box>
    <Box variant="container" className="bg-neutral-2">
      <Skeleton variant="text" className="w-1/4 h-5" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Box>
  </Box>
);

type FnDetailContentProps = NonNullable<FunctionDetailContext>;

const FnDetailContent = ({
  name: functionName,
  site,
  currentDeployment,
}: FnDetailContentProps) => {
  const cid = currentDeployment?.cid;
  const session = useSessionContext();
  const project = useProjectContext();

  const [pinQuery] = usePinQuery({
    variables: { where: { cid } },
    pause: !cid,
  });
  // skip fetching the content until size is known and less than X bytes
  const [ipfsContent] = useIpfsContent(
    (pinQuery.data?.pin.size || Number.POSITIVE_INFINITY) >
      FUNCTIONS_MAX_DISPLAY_BYTES
      ? undefined
      : cid,
  );

  if (pinQuery.fetching || session.loading || !functionName) {
    return <FnDetailSkeleton />;
  }

  const pin = pinQuery.data?.pin;

  return (
    <>
      {pinQuery.error && (
        <AlertBox variant="warning">{pinQuery.error.message}</AlertBox>
      )}

      <Box variant="container" className="bg-neutral-2">
        <Box className="flex-row justify-between items-center">
          <Text as="h2" variant="primary" size="2xl" weight={700}>
            {functionName}
          </Text>
          {site && (
            <SiteBadge projectId={project.project.id} siteId={site.id}>
              {site.name}
            </SiteBadge>
          )}
        </Box>
        <Box>
          <AlertBox size="sm" variant="tertiary" className="flex-1">
            Functions are an experimental feature powered by Fleek Network.
          </AlertBox>
        </Box>
        <Description pin={pin} />
      </Box>
      {currentDeployment ? (
        <>
          <Ipfs cid={currentDeployment.cid} isFn active />
          <CodeSnippet
            title="Deployed code"
            code={ipfsContent.data}
            isLoading={ipfsContent.fetching}
          />
        </>
      ) : (
        <Instructions functionName={functionName} />
      )}
    </>
  );
};
