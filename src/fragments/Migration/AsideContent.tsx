import { useEffect, useState } from 'react';

import { Stepper, Text } from '@/ui';

import { useMigrationContext } from './Migration.context';
import { MigrationStyles as S } from './Migration.styles';

export const AsideContent: React.FC = () => {
  const { asideTitle } = useMigrationContext();

  return (
    <>
      <Stepper.Indicator />
      <Text as="h1" size="3xl" weight={500} className="max-w-[26.5rem]">
        {asideTitle}
      </Text>
      <FunFact />
    </>
  );
};

const FunFacts = [
  'Did you know Fleek is in Vitalik’s Web3 tech stack? 🐐🐐',
  'Fleek is building a decentralized edge network, Fleek Network.',
  'The first site deployed on Fleek was over 4 years ago.',
  'Over 150,000 sites have been deployed on Fleek.',
];

const FunFact = () => {
  const [funFact, setFunFact] = useState('');

  useEffect(() => {
    setFunFact(FunFacts[Math.floor(Math.random() * FunFacts.length)]);
  }, []);

  return (
    <S.Aside.FunFacts.Container>
      <Text size="xs" weight={700}>
        Fun Fact
      </Text>
      <Text variant="primary" size="xs" weight={500}>
        {funFact}
      </Text>
    </S.Aside.FunFacts.Container>
  );
};
