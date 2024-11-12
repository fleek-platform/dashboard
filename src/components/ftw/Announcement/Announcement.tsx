import React, { useEffect, useState } from 'react';

import { ExternalLink } from '@/components/ExternalLink/ExternalLink';
import { constants } from '@/constants';
import { Box, Icon, Text } from '@/ui';

export const Announcement: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(true);

  useEffect(() => {
    const storedDismissedId = localStorage.getItem(constants.ANNOUNCEMENT_BANNER.LOCAL_STORAGE_KEY);
    setIsDismissed(storedDismissedId === constants.ANNOUNCEMENT_BANNER.ID);
  }, []);

  const onDismissAnnouncementClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.setItem(constants.ANNOUNCEMENT_BANNER.LOCAL_STORAGE_KEY, constants.ANNOUNCEMENT_BANNER.ID);
    setIsDismissed(true);
  };

  if (isDismissed || !constants.ANNOUNCEMENT_BANNER.MESSAGE) {
    return null;
  }

  return (
    <ExternalLink
      href={constants.ANNOUNCEMENT_BANNER.HREF}
      className="flex gap-1 flex-col border border-neutral-6 py-2.5 px-3 rounded-xl bg-neutral-2 hover:bg-neutral-3 transition-colors"
    >
      <Box className="flex-row justify-between">
        <Text className="text-accent-9 text-[0.625rem]">✨ NEW</Text>
        <Box className="p-[1.5px]" onClick={onDismissAnnouncementClick}>
          <Icon name="close" className="text-neutral-11 text-[0.625rem] cursor-pointer hover:text-neutral-12" />
        </Box>
      </Box>
      <Text variant="primary" className="text-[0.8125rem] leading-tight">
        {constants.ANNOUNCEMENT_BANNER.MESSAGE}
      </Text>
    </ExternalLink>
  );
};
