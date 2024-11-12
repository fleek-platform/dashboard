import { useEffect, useState } from 'react';

import { useMeQuery, useTemplateQuery } from '@/generated/graphqlClient';

type UseIsTemplateOwnerArgs = {
  templateId: string;
};

type UseIsTemplateOwner = {
  isLoading: boolean;
  isOwner: boolean;
};

export const useIsTemplateOwner = ({
  templateId,
}: UseIsTemplateOwnerArgs): UseIsTemplateOwner => {
  const [meQuery] = useMeQuery();
  const [templateQuery] = useTemplateQuery({
    variables: { where: { id: templateId } },
  });
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!meQuery.data || !templateQuery.data) {
      return;
    }

    if (templateQuery.data.template.creator?.id === meQuery.data.user.id) {
      setIsOwner(true);
      setIsLoading(false);

      return;
    }

    setIsOwner(false);
    setIsLoading(false);
  }, [meQuery.data, templateQuery.data, isLoading]);

  return { isLoading, isOwner };
};
