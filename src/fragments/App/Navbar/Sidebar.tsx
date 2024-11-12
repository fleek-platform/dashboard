import { useEffect, useRef, useState } from 'react';

import { Navbar } from './Navbar';
import { NavbarStyles as S } from './Navbar.styles';
import { Navigation } from './Navigation';

type SidebarProps = {
  withNavigation?: boolean;
};

type HandleClickOutsideProps = MouseEvent;

export const Sidebar: React.FC<SidebarProps> = ({ withNavigation = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleToggle = (): void => setIsOpen(!isOpen);

  const handleNavigationClick = (): void => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const { current } = sidebarRef;

    if (!current) {
      return;
    }

    const handleClickOutside = (event: HandleClickOutsideProps): void => {
      if (current && !current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, sidebarRef]);

  return (
    <>
      <S.Sidebar.MenuIcon name="menu" onClick={handleToggle} />

      <S.Sidebar.Backdrop open={isOpen} />

      <S.Sidebar.Content open={isOpen} ref={sidebarRef}>
        <Navbar.Search />
        {withNavigation && (
          <Navigation stacked onClick={handleNavigationClick} />
        )}
      </S.Sidebar.Content>
    </>
  );
};
