import React, { useMemo } from "react";
import SideBar from "./side-bar/SideBar";

export function Navigation() {
  const navItems = useMemo(
    () => [
      {
        key: "digital-art",
        title: "Scenes",
        link: "digital-art",
      },
      {
        key: "geometry-preprocess",
        title: "Geometry Preprocess",
        link: "geometry-preprocess",
      },
      {
        key: "texture-preprocess",
        title: "Texture Preprocess",
        link: "geometry-preprocess",
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
}
