import { ChildrenProps } from '@/types/Props';
import { Box, Button, ButtonProps, Icon, IconName, Text } from '@/ui';

import { PlansTableStyles as S } from './PlansTable.styles';

type Section = {
  name: string;
  icon: IconName;
  rows: string[];
};

type Plan = {
  name: string;
  values: string[][];
  color: {
    scheme: ButtonProps['intent'];
  };
  onSelect?: React.EventHandler<React.MouseEvent>;
  isActive?: boolean;
  buttonText: string;
};

export type PlansTableProps = {
  plans: Plan[];
  sections: Section[];
};

export const PlansTable: React.FC<PlansTableProps> = ({ plans, sections }) => {
  return (
    <S.Container>
      <S.Root>
        <colgroup>
          <col span={1} style={{ width: '25%' }} />
          {plans.map((_, index) => (
            <col span={1} style={{ width: `${75 / plans.length}%` }} key={index} />
          ))}
        </colgroup>

        <Header plans={plans} />

        {sections.map((section, sectionIndex) => (
          <Section key={section.name} section={section} planValues={plans.map((plan) => plan.values[sectionIndex])} />
        ))}
      </S.Root>
    </S.Container>
  );
};

const Header: React.FC<Pick<PlansTableProps, 'plans'>> = ({ plans }) => {
  return (
    <S.Head>
      <S.Row>
        <HeaderCell>
          Plan Breakdown
          <Text>Explore the different plans we have and how they compare.</Text>
        </HeaderCell>

        {plans.map((plan) => (
          <HeaderCell key={plan.name}>
            {plan.name}
            <Button intent={plan.color.scheme} onClick={plan.onSelect}>
              {plan.isActive ? (
                <>
                  <Icon name="check-circled" />
                  Active plan
                </>
              ) : (
                plan.buttonText
              )}
            </Button>
          </HeaderCell>
        ))}
      </S.Row>
    </S.Head>
  );
};

const HeaderCell: React.FC<ChildrenProps> = ({ children }) => {
  return (
    <S.VerticalHeader>
      <Box>{children}</Box>
    </S.VerticalHeader>
  );
};

type SectionProps = {
  section: Section;
  planValues: string[][];
};

const Section: React.FC<SectionProps> = ({ section, planValues }) => {
  return (
    <>
      <SectionHeader icon={section.icon}>{section.name}</SectionHeader>

      <S.Body>
        {section.rows.map((title, rowIndex) => (
          <S.Row key={rowIndex}>
            <S.Cell as="th">{title}</S.Cell>

            {planValues.map((plan, planIndex) => (
              <S.Cell key={planIndex}>{plan[rowIndex]}</S.Cell>
            ))}
          </S.Row>
        ))}
      </S.Body>
    </>
  );
};

type SectionHeaderProps = ChildrenProps<{
  icon: IconName;
}>;

const SectionHeader: React.FC<SectionHeaderProps> = ({ children, icon }) => {
  return (
    <S.Head>
      <S.Row>
        <S.SectionHeader colSpan={999}>
          <Box>
            <Icon name={icon} />
            {children}
          </Box>
        </S.SectionHeader>
      </S.Row>
    </S.Head>
  );
};
