import React from "react";
import { THEME } from "theme";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components/macro";

export const WithTheme = ({
  children,
}: PropsWithChildren<Record<never, never>>) => (
  <ThemeProvider theme={THEME}>{children}</ThemeProvider>
);
