import { Projects } from '@/fragments';
import { Functions as F } from '@/fragments';
import { ChildrenProps } from '@/types/Props';

export const Layout: React.FC<ChildrenProps> = ({ children }) => {
  return <Projects.Layout nav={<F.Elements.CreateBtn />}>{children}</Projects.Layout>;
};
