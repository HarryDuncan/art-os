import React from "react";

import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";

// Containers
import { DigitalArt } from "./views/digital-art/DigitalArt";
import { Landing } from "./views/landing/Landing";
// Components
import { Navigation } from "./components/navigation/Navigation";

// Redux
import { store } from "./redux/store";
import { Provider } from "react-redux";

import styled, { ThemeProvider } from "styled-components";
import { THEME } from "./theme/theme";
import { GlobalStyle } from "./theme/GlobalStyle";
import { Sandbox } from "./views/sanbox/Sandbox";

interface AppProps {}

export const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
`;

export const App: React.FunctionComponent<AppProps> = ({}) => {
  const history = useHistory();

  // When a nav item is clicked this is where the actions take place

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
          </AppContainer>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
