import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import { NavLink } from "./NavItem.styles";
import {
  SideBarIcon,
  SideBarLinkTitle,
} from "app/components/draw-components/side-bar/SideBar.styles";

export interface ISideBarItem {
  key: string;
  title: string;
  accessControls?: string[];
  isExternal?: boolean;
  isDisabled?: boolean;
  link?: string;
}

const NavLinkContainer = ({
  link,
  isExternal,
  children,
  isDisabled,
}: React.PropsWithChildren<ISideBarItem>) => {
  const isActive = useIsActive(isExternal, link);
  const sharedProps = useMemo(
    () => ({
      $isActive: isActive,
      $isDisabled: isDisabled,
    }),
    [isActive, isDisabled]
  );

  if (isExternal) {
    return (
      <NavLink
        as="a"
        target="_blank"
        rel="noreferrer"
        {...sharedProps}
        href={link}
      >
        {children}
      </NavLink>
    );
  }

  if (link) {
    return (
      <NavLink as={Link} to={link} {...sharedProps}>
        {children}
      </NavLink>
    );
  }

  return (
    <NavLink as="span" {...sharedProps}>
      {children}
    </NavLink>
  );
};

export const NavItem = (props: ISideBarItem) => {
  const { isExternal, title } = props;

  return (
    <NavLinkContainer {...props}>
      <SideBarLinkTitle>{title}</SideBarLinkTitle>
      {isExternal && <SideBarIcon $isExternal={isExternal} />}
    </NavLinkContainer>
  );
};

const useIsActive = (
  isExternal: boolean | undefined,
  link: string | undefined
) => {
  const { pathname } = useLocation();
  if (isExternal) return false;
  const currentPathRoot = pathname.split("/").filter(Boolean)[0];
  const linkRoot = link?.split("/").filter(Boolean)[0];
  return currentPathRoot === linkRoot;
};
