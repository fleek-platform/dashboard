import { HeroStyles as S } from './Hero.styles';

export const Hero: React.FC = () => {
  return (
    <S.HeadingWrapper>
      <S.Heading>Pricing You Can Get Pumped About</S.Heading>

      <S.SubHeading>
        Try for free and upgrade when needed. Transparent, simple and flexible.
      </S.SubHeading>
    </S.HeadingWrapper>
  );
};
