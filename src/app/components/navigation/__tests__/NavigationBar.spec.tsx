import React from 'react';
import { render, screen } from '@testing-library/react';
import { WithApp } from 'test-utils/WithApp';
import { IWithStoreState } from 'test-utils/WithStore';
import { Navigation } from '../Navigation';

describe('<NavigationBar />', () => {
  test('Renders default links', () => {
    render(<NavigationBarWithContext />);
    expect(screen.getByText('Digital Art')).toBeTruthy();
    expect(screen.getByText('Sandbox')).toBeTruthy();
  });
});

function NavigationBarWithContext({ state }: { state?: IWithStoreState }) {
  return (
    <WithApp state={{}}>
      <Navigation />
    </WithApp>
  );
}
