import { useState } from 'react';

import { IconTooltip } from '@/components';
import { Box, Text } from '@/ui';

import { StorageTableStyles as S } from './StorageTable.styles';

type SortingHeaderProps = {
  name: string;
  onClick: () => void;
};

const SortingHeader: React.FC<SortingHeaderProps> = ({ name, onClick }) => {
  const [sort, setSort] = useState(false); // TODO remove when context is added

  const handleClick = () => {
    // TODO add sorting once the query supports it

    onClick();
    setSort(!sort);
  };

  return (
    <S.Sort onClick={handleClick}>
      <Text>{name}</Text>
      {/* <S.Icon name="arrow-down" active={sort} /> */}
    </S.Sort>
  );
};

export const StorageSubheader: React.FC = () => {
  return (
    <S.Table.Row>
      {/* <S.Table.HeaderCell>
        <Checkbox disabled />
      </S.Table.HeaderCell> */}

      <S.Table.HeaderCell>
        <Text>Name</Text>
      </S.Table.HeaderCell>

      <S.Table.HeaderCell>
        <SortingHeader name="Size" onClick={() => {}} />
      </S.Table.HeaderCell>

      <S.Table.HeaderCell>
        <SortingHeader name="Uploaded" onClick={() => {}} />
      </S.Table.HeaderCell>

      <S.Table.HeaderCell>
        <Text>Hash</Text>
      </S.Table.HeaderCell>

      <S.Table.HeaderCell>
        <Box css={{ flexDirection: 'row', gap: '$2xs' }}>
          <Text>Storage</Text>
          <IconTooltip side="bottom">
            Adjust your storage settings in project settings
          </IconTooltip>
        </Box>
      </S.Table.HeaderCell>

      <S.Table.HeaderCell></S.Table.HeaderCell>
    </S.Table.Row>
  );
};
