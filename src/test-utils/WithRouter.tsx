import { Route, Router } from 'react-router';
import history from 'core/routing/History';
import { PropsWithChildren, useEffect } from 'react';

type IProps = PropsWithChildren<{ path?: string }>;

export const WithRouter = ({ path = '/', children }: IProps) => {
  useEffect(() => {
    history.push(path);
  }, [path]);
  return (
    <Router history={history}>
      <Route path={path}>{children}</Route>
    </Router>
  );
};
