import React, { useMemo } from "react";
import SideBar from "./SideBar";

export const Navigation = () => {
  const navItems = useMemo(
    () => [
      {
        key: "digital-art",
        title: "Digital Art",
        link: "digital-art",
      },
      {
        key: "sandbox",
        title: "Sandbox",
        link: "sandbox",
      },
    ],
    []
  );

  return <SideBar navItems={navItems} />;
};
