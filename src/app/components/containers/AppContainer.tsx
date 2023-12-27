import { Navigation } from "app/views/navigation/Navigation";
import { StyledAppContainer } from "./Container.styles";
import { ReactNode } from "react";

interface AppContainerProps {
  children: ReactNode;
}
export const AppContainer = ({ children }: AppContainerProps) => (
  <StyledAppContainer>
    <Navigation />
    {children}
  </StyledAppContainer>
);
