import type React from 'react';
import { useMemo } from 'react';

import { BadgeText } from '@/components';
import { Icon } from '@/ui';
import { shortStringFormat } from '@/utils/stringFormat';

type FileBadgeProps = {
  file: File;
  onRemove: () => void;
};

const FileBadge: React.FC<FileBadgeProps> = ({ file, onRemove }) => {
  const truncatedFileName = useMemo(() => {
    if (file.name.length <= 20) {
      return file.name;
    }

    return shortStringFormat({ str: file.name, index: 5 });
  }, [file.name]);

  return (
    <BadgeText colorScheme="slate">
      {truncatedFileName}
      <Icon
        name="close-circle"
        className="hover:cursor-pointer hover:opacity-80"
        onClick={onRemove}
      />
    </BadgeText>
  );
};

export default FileBadge;
