import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

// Containers
import { Provider } from "react-redux";
import styled, { ThemeProvider } from "styled-components/macro";
import { DigitalArt } from "./views/digital-art/DigitalArt";
import { Landing } from "./views/landing/Landing";
// Components
import { Navigation } from "./components/navigation/Navigation";

// Redux
import { store } from "./redux/store";

import { THEME } from "./theme/theme";
import { GlobalStyle } from "./theme/GlobalStyle";
import { Sandbox } from "./views/sandbox/sandbox";
import { AppendContainer } from "./components/AppendContainer";
import { useVisualInputNode } from "grpc/visual-input-node/useVisualInputNode";

export const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;

export function App() {
  // When a nav item is clicked this is where the actions take place
  useVisualInputNode();
  return (
    <ThemeProvider theme={THEME}>
      <GlobalStyle />
      <BrowserRouter>
        <Provider store={store}>
          <AppContainer>
            <Navigation />
            <Switch>
              <Route exact path="/digital-art" component={DigitalArt} />
              <Route exact path="/sandbox" component={Sandbox} />
              <Route exact path="/" component={Landing} />
            </Switch>
            <AppendContainer />
          </AppContainer>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
