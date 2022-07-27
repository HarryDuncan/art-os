import React, { useMemo } from 'react';
import SideBar from './side-bar/SideBar';

export function Navigation() {
  const navItems = useMemo(
    () => [
      {
        key: 'digital-art',
        title: 'Gallery',
        link: 'digital-art',
      },
      {
        key: 'sandbox',
        title: 'Sandbox',
        link: 'sandbox',
      },
    ],
    [],
  );

  return <SideBar navItems={navItems} />;
}
