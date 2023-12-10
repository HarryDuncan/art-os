import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

// Containers
import { Provider } from "react-redux";
import styled, { ThemeProvider } from "styled-components/macro";
import { DigitalArt } from "./views/digital-art/DigitalArt";
import { Landing } from "./views/landing/Landing";
// Components
import { Navigation } from "./views/navigation/Navigation";
// Redux
import { store } from "./redux/store";
import { THEME } from "theme/theme";
import { GlobalStyle } from "theme/GlobalStyle";
import { Sandbox } from "./views/sandbox/sandbox";
import { AppendContainer } from "./components/AppendContainer";
import { useAppConfigs } from "./hooks/useSetUpConfigs";
import { useInteractionNode } from "interaction/external/useInteractionNode";
import { GeometryPreprocess } from "./views/asset-editor/GeometryPreprocess";
import { ViewObject } from "./views/view-object/ViewObject";
import { WindowStateProvider } from "visual/compat/window-state/windowStateProvider";

export const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;

export function App() {
  return (
    <WindowStateProvider>
      <ThemeProvider theme={THEME}>
        <GlobalStyle />
        <BrowserRouter>
          <Provider store={store}>
            <AppContent />
          </Provider>
        </BrowserRouter>
      </ThemeProvider>
    </WindowStateProvider>
  );
}

export const AppContent = () => {
  useInteractionNode();
  useAppConfigs();
  return (
    <AppContainer>
      <Navigation />
      <Switch>
        <Route exact path="/digital-art" component={DigitalArt} />
        <Route exact path="/sandbox" component={Sandbox} />
        <Route exact path="/" component={Landing} />
        <Route exact path="/view-object" component={ViewObject} />
        <Route
          exact
          path="/geometry-preprocess"
          component={GeometryPreprocess}
        />
      </Switch>
      <AppendContainer />
    </AppContainer>
  );
};
