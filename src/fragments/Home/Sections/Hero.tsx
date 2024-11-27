import { Button, Text } from '@/ui';

import { HomeStyles as S } from '../HomeStyles';

type HeroProps = {
  handleLogIn: () => void;
};

export const Hero: React.FC<HeroProps> = ({ handleLogIn }) => (
  <S.Hero.Container>
    <Text as="h1" variant="primary" weight={500} className="text-[4rem] mb-4">
      Welcome to Fleek
    </Text>

    <Text size="xl" weight={500}>
      Craft, build, and deploy applications unlocking the full potential of
      decentralized technologies.
    </Text>

    <S.Hero.ButtonContainer>
      <Button onClick={handleLogIn}>Create a free account</Button>
    </S.Hero.ButtonContainer>
  </S.Hero.Container>
);
