// import { faExternalLink } from "@fortawesome/pro-light-svg-icons/faExternalLink";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { TIcon } from "app/components/icon";
import React, { useMemo } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { SideBarIcon, SideBarLinkTitle } from "./NavigationBar.styles";
import { SideBarLink } from "./SideBarItem.styles";

export interface ISideBarItem {
  key: string;
  title: string;
  accessControls?: string[];
  isExternal?: boolean;
  isDisabled?: boolean;
  link?: string;
}

const SideBarItemContainer = ({
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
      <SideBarLink
        as="a"
        target="_blank"
        rel="noreferrer"
        {...sharedProps}
        href={link}
      >
        {children}
      </SideBarLink>
    );
  }

  if (link) {
    return (
      <SideBarLink as={Link} to={link} {...sharedProps}>
        {children}
      </SideBarLink>
    );
  }

  return (
    <SideBarLink as="span" {...sharedProps}>
      {children}
    </SideBarLink>
  );
};

const SideBarItem = (props: ISideBarItem) => {
  const { isExternal, title } = props;

  return (
    <SideBarItemContainer {...props}>
      <SideBarLinkTitle>{title}</SideBarLinkTitle>
      {isExternal && <SideBarIcon $isExternal={isExternal}></SideBarIcon>}
    </SideBarItemContainer>
  );
};

function useIsActive(
  isExternal: boolean | undefined,
  link: string | undefined
) {
  const { pathname } = useLocation();
  if (isExternal) return false;
  const currentPathRoot = pathname.split("/").filter(Boolean)[0];
  const linkRoot = link?.split("/").filter(Boolean)[0];
  return currentPathRoot === linkRoot;
}

export default SideBarItem;
