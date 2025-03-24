// TODO: This page can be removed
// to favour redirection to website
// the user can login from website

import { App } from '../../fragments/App/App';
import { HomeStyles } from '../../fragments/Home/HomeStyles';
import { LayoutHead } from '@/components';
import { LandingPageProvider } from '@/providers/Providers';

import { Box } from '@/ui';
import { FleekLogo } from '@/components';
import {
  DynamicEmbeddedWidget,
  useDynamicContext,
} from '@dynamic-labs/sdk-react-core';

const HomePage = () => {
  const { sdkHasLoaded } = useDynamicContext();

  return (
    <LandingPageProvider>
      <LayoutHead title={LayoutHead.titles.home} />

      <HomeStyles.Background.Wrapper>
        <HomeStyles.Background.Image />
        <App.Content className="relative flex justify-center items-center flex-col max-w-[400px] w-full max-h-[300px] h-full">
          <Box
            className={`relative w-full ${
              sdkHasLoaded
                ? 'border-[1px] rounded-[10px] border-neutral-9 transition-[border-color] duration-500 ease-out'
                : ''
            }`}
          >
            <div className="absolute top-0 left-0 right-0 flex justify-center -translate-y-1/2 z-10">
              <FleekLogo
                showTypography
                className={`transition-opacity duration-250 pl-[10px] pr-[15px] bg-black ${
                  !sdkHasLoaded ? 'animate-pulse opacity-85' : ''
                }`}
              />
            </div>

            <Box
              className={`transition-all duration-500 overflow-hidden h-fit bg-black rounded-[10px] z-9 ${
                sdkHasLoaded
                  ? 'opacity-100 max-h-[1000px]'
                  : 'opacity-0 max-h-0'
              }`}
            >
              <DynamicEmbeddedWidget
                background="none"
                className="dynamic-widget-container"
              />
            </Box>
          </Box>
        </App.Content>
      </HomeStyles.Background.Wrapper>
      <App.Footer />
    </LandingPageProvider>
  );
};

HomePage.theme = 'dark';

export default HomePage;
