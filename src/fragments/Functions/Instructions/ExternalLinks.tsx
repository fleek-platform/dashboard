import { ActionBox } from '@/components';
import { constants } from '@/constants';

import { InstructionsStyles as S } from './Instructions.styles';

export const ExternalLinks = () => (
  <S.OutsideLinks.Container>
    <ActionBox
      icon="bookmark"
      href={constants.EXTERNAL_LINK.FLEEK_DOCS_FUNCTIONS_LEARN_MORE}
      title="Fleek Functions guide"
      description="Learn more about functions in the docs."
    />
    <ActionBox
      icon="bulb"
      href={constants.EXTERNAL_LINK.FLEEK_DOCS_FUNCTIONS_FUTURE}
      title="Future of Functions"
      description="Read the post about expanding compute."
    />
  </S.OutsideLinks.Container>
);
