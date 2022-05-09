import { PropsWithChildren } from 'react';
import { MapProvider } from 'react-map-gl';
import { Provider as MapContextProvider, State } from 'app/context/map';

type IProps = PropsWithChildren<{
  defaultState?: State;
}>;

export const WithMapbox = ({ children, defaultState }: IProps) => {
  return (
    <MapContextProvider defaultState={defaultState}>
      <MapProvider>{children}</MapProvider>
    </MapContextProvider>
  );
};
