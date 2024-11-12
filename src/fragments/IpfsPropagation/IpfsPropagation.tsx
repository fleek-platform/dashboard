import { IpfsPropagationProvider, useIpfsPropagationContext } from './Context';
import { IpfsPropagationLayout } from './Layout';
import { CreateGatewayButton } from './Sections/CreateGatewayButton';
import { GatewaysTable } from './Sections/GatewaysTable/GatewaysTable';
import { Hero } from './Sections/Hero/Hero';

export const IpfsPropagation = {
  Layout: IpfsPropagationLayout,

  GatewaysTable,
  Hero,
  CreateGatewayButton,

  Provider: IpfsPropagationProvider,
  useContext: useIpfsPropagationContext,
};
