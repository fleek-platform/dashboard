import { CodeSnippet } from '@/components';
import { constants } from '@/constants';
import { Text } from '@/ui';

import { SectionsStyles as S } from './Sections.styles';

export const LocalDevelopment: React.FC = () => {
  return (
    <S.Local.GridArea>
      <Text as="h2" size="xl" weight={500}>
        Local development
      </Text>

      <S.Local.Container variant="container">
        <Text variant="primary" size="lg" weight={700}>
          Set up Fleek CLI
        </Text>
        <Text>
          Fleek CLI provides a command line interface to all Fleek services. Use
          the CLI to store files, manage records, and more.
        </Text>

        <CodeSnippet
          code={constants.CLI_COMMANDS.INSTALL}
          title="Run Command"
        />

        <S.OutsideLink href={constants.EXTERNAL_LINK.FLEEK_DOCS_CLI}>
          Read the CLI docs
          <S.LinkArrow name="arrow-right" />
        </S.OutsideLink>
      </S.Local.Container>
    </S.Local.GridArea>
  );
};
