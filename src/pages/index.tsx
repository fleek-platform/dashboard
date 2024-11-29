import { useEffect } from 'react';

import { Home } from '@/fragments/Home/Home';
import { useSessionContext } from '@/providers/SessionProvider';
import type { Page } from '@/types/App';

const HomePage: Page = () => {
  const session = useSessionContext();

  const handleLogIn = () => {
    if (!session.error && !session.loading && !session.auth.token) {
      session.auth.login('dynamic');
    }
  };

  useEffect(() => {
    handleLogIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.loading]);

  return (
    <>
      <Home.Sections.Hero handleLogIn={handleLogIn} />
    </>
  );
};

HomePage.theme = 'dark';
HomePage.getLayout = (page) => <Home.Layout>{page}</Home.Layout>;

export default HomePage;
