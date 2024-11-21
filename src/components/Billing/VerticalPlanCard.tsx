import { BadgeText } from '@/components';
import { Button, type ButtonProps, Icon } from '@/ui';

import { BenefitsList, type BenefitsListProps } from './BenefitsList';
import { BillingStyles as S } from './Billing.styles';
import { PriceTag } from './PriceTag';

export type VerticalPlanCardProps = {
  title: string;
  description: string;
  price: string;
  colorScheme: ButtonProps['intent'];
  buttonText: string;
  isActive?: boolean;
  onSelect?: React.MouseEventHandler<HTMLButtonElement>;
} & Pick<BenefitsListProps, 'benefits'>;

export const VerticalPlanCard: React.FC<VerticalPlanCardProps> = ({
  title,
  description,
  price,
  benefits,
  colorScheme,
  buttonText,
  isActive,
  onSelect,
}) => {
  return (
    <S.Container>
      <S.Title>
        {title}

        {isActive && <BadgeText colorScheme="green">Active</BadgeText>}
      </S.Title>
      <S.Description>{description}</S.Description>

      <PriceTag>{price}</PriceTag>
      <S.PriceOverline>+ Overage</S.PriceOverline>

      <S.Divider />

      <BenefitsList benefits={benefits} />

      <Button intent={colorScheme} onClick={onSelect}>
        {isActive ? (
          <>
            <Icon name="check-circled" />
            Active plan
          </>
        ) : (
          buttonText
        )}
      </Button>
    </S.Container>
  );
};
