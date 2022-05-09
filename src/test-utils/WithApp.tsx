import { PropsWithChildren } from "react";

import { WithRouter } from "./WithRouter";
import { IWithStoreState, WithStore } from "./WithStore";

type WithAppProps = PropsWithChildren<{
  state?: IWithStoreState;
  path?: string;
}>;

export const WithApp = ({ children, state, path = "/" }: WithAppProps) => {
  return <WithStore state={state}>{children}</WithStore>;
};
