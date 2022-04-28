import { render, screen } from '@testing-library/react';
import { WithApp } from 'test-utils/WithApp';
import { IWithStoreState } from 'test-utils/WithStore';
import NavigationBar from '../NavigationBar';
import mockAccessControls from './mockAccessControls.json';

describe('<NavigationBar />', () => {
  test('Renders default links', () => {
    render(<NavigationBarWithContext />);
    expect(screen.getByText('shell.menu.overview').closest('a')).toHaveAttribute(
      'href',
      'http://localhost:61000/dashboard'
    );
    expect(screen.getByText('shell.menu.userSettings').closest('a')).toHaveAttribute('href', '/user/profile');
    expect(screen.getByText('shell.menu.support').closest('a')).toHaveAttribute(
      'href',
      'https://support.envirosuite.com'
    );
  });

  test('Renders links with access controls', () => {
    render(<NavigationBarWithContext state={stateWithAccessControls} />);
    expect(screen.getByText('shell.menu.overview').closest('a')).toHaveAttribute(
      'href',
      'http://localhost:61000/dashboard'
    );
    expect(screen.getByText('shell.menu.monitoring').closest('a')).toHaveAttribute('href', '/monitoring/real-time');
    expect(screen.getByText('shell.menu.modelling').closest('a')).toHaveAttribute('href', '/modelling');
    expect(screen.getByText('shell.menu.alerts').closest('a')).toHaveAttribute('href', 'http://localhost:61000/alerts');
    expect(screen.getByText('shell.menu.trajectories').closest('a')).toHaveAttribute('href', '/trajectories');
    expect(screen.getByText('shell.menu.blasting').closest('a')).toHaveAttribute('href', '/blasting/scenarios');
    expect(screen.getByText('shell.menu.incidentIntelligence').closest('a')).toHaveAttribute(
      'href',
      '/incident-intelligence'
    );
    expect(screen.getByText('shell.menu.reports').closest('a')).toHaveAttribute(
      'href',
      'http://localhost:61000/reporting'
    );
    expect(screen.getByText('shell.menu.siteConfig').closest('a')).toHaveAttribute('href', '/configuration');
    expect(screen.getByText('shell.menu.userSettings').closest('a')).toHaveAttribute('href', '/user/profile');
    expect(screen.getByText('shell.menu.support').closest('a')).toHaveAttribute(
      'href',
      'https://support.envirosuite.com'
    );
  });
});

const NavigationBarWithContext = ({ state }: { state?: IWithStoreState }) => {
  return (
    <WithApp state={state}>
      <NavigationBar />
    </WithApp>
  );
};

const stateWithAccessControls: IWithStoreState = {
  profile: {
    user: {
      accessControls: mockAccessControls,
    },
  },
};
