import { useEffect } from 'react';

import { Home } from '@/fragments/Home/Home';
import { useSessionContext } from '@/providers/SessionProvider';
import { Page } from '@/types/App';

const HomePage: Page = () => {
  const { error, loading, auth: { accessToken, login } } = useSessionContext();

  const handleLogIn = () => {
    if (!error && !loading && !accessToken) {
      login('dynamic');
    }
  };

  useEffect(() => {
    handleLogIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <>
      <Home.Sections.Hero handleLogIn={handleLogIn} />
    </>
  );
};

HomePage.theme = 'dark';
HomePage.getLayout = (page) => <Home.Layout>{page}</Home.Layout>;

export default HomePage;
