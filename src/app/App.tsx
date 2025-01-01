import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components/macro";
import { Landing } from "./views/landing/Landing";

import { store } from "./redux/store";
import { THEME } from "theme/theme";
import { GlobalStyle } from "theme/GlobalStyle";
import { Sandbox } from "./views/sandbox/sandbox";
import { useAppConfigs } from "./hooks/useSetUpConfigs";
import { useInteractionNode } from "interaction/external/useInteractionNode";
import { GeometryPreprocess } from "./views/asset-editor/GeometryPreprocess";
import { ViewObject } from "./views/view-object/ViewObject";
import { WindowStateProvider } from "visual/compat/window-state/windowStateProvider";
import { ViewPiece } from "./views/digital-art/view-piece/ViewPiece";
import { DigitalArtGallery } from "./views/digital-art/digital-art-gallery/DigitalArtGallery";
import { ImageFilter } from "./views/image-filter/ImageFilter";
import { VideoFilter } from "./views/video-filter/VideoFilter";
import { ModelFilter } from "./views/model-filter/ModelFilter";

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
    <Switch>
      <Route exact path="/digital-art" component={DigitalArtGallery} />
      <Route exact path="/sandbox" component={Sandbox} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/view-object" component={ViewObject} />
      <Route exact path="/geometry-preprocess" component={GeometryPreprocess} />
      <Route path="/digital-art/:sceneid" component={ViewPiece} />
      <Route path="/image-filter" component={ImageFilter} />
      <Route path="/video-filter" component={VideoFilter} />
      <Route path="/model-filter" component={ModelFilter} />
    </Switch>
  );
};
