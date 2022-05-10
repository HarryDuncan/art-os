import { PropsWithChildren } from "react";
import React from "react";
import { IWithStoreState, WithStore } from "./WithStore";

type WithAppProps = PropsWithChildren<{
  state?: IWithStoreState;
  path?: string;
}>;

export const WithApp = ({ children, state, path = "/" }: WithAppProps) => {
  return <WithStore state={state}>{children}</WithStore>;
};
