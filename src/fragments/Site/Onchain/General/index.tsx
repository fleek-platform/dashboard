import { IpfsBox, SettingsBox } from '@/components';
import { useSiteQuery } from '@/generated/graphqlClient';
import { useRouter } from '@/hooks/useRouter';
import { getSiteCurrentDeployment } from '@/utils/getSiteCurrentDeployment';

export const General: React.FC = () => {
  const router = useRouter();
  const siteId = router.query.siteId!;

  const [siteQuery] = useSiteQuery({
    variables: { where: { id: siteId } },
    requestPolicy: 'cache-and-network',
  });

  const site = siteQuery.data?.site;
  const ipnsRecords = site?.ipnsRecords || [];
  const ipnsName = ipnsRecords[ipnsRecords.length - 1]?.name;

  const currentDeployment = getSiteCurrentDeployment(site);

  return (
    <>
      <SettingsBox.Container className="bg-transparent">
        <SettingsBox.Title>Onchain features</SettingsBox.Title>
        <SettingsBox.Text>
          Fleek enhances hosting by using IPFS and Filecoin. IPFS decentralizes
          content storage across multiple nodes, ensuring faster load times,
          reduced downtime, and continuous access. Filecoin provides scalable,
          decentralized storage, offering virtually unlimited capacity. This
          combination ensures efficient, resilient, and scalable hosting
          services.
        </SettingsBox.Text>
      </SettingsBox.Container>

      <IpfsBox
        isLoading={siteQuery.fetching}
        cid={currentDeployment?.cid}
        ipns={ipnsName}
      />
    </>
  );
};
