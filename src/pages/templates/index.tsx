import { useState } from 'react';

import { Template } from '@/fragments';
import { Page } from '@/types/App';

const TemplatesPage: Page = () => {
  const [frameworkId, setFrameworkId] = useState<string | null>();
  const [categoryId, setCategoryId] = useState<string | null>();

  return (
    <>
      <Template.List.Elements.Hero />
      <Template.List.Elements.Filter
        setCategoryId={setCategoryId}
        categoryId={categoryId}
        setFrameworkId={setFrameworkId}
        frameworkId={frameworkId}
      />
      <Template.List.Elements.Explorer
        frameworkId={frameworkId}
        categoryId={categoryId}
      />
    </>
  );
};

TemplatesPage.getLayout = (page) => (
  <Template.List.Layout>{page}</Template.List.Layout>
);

export default TemplatesPage;
