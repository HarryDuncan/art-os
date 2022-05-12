import { PropsWithChildren } from "react";
import React from "react";
import { IWithStoreState, WithStore } from "./WithStore";
import { WithRouter } from "./WithRouter";

type WithAppProps = PropsWithChildren<{
  state?: IWithStoreState;
  path?: string;
}>;

export const WithApp = ({ children, state, path = "/" }: WithAppProps) => {
  return (
    <WithRouter>
      <WithStore state={state}>{children}</WithStore>
    </WithRouter>
  );
};
