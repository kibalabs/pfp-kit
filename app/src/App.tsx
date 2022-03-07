import React from 'react';

import { IRoute, Router, useInitialization } from '@kibalabs/core-react';
import { EveryviewTracker } from '@kibalabs/everyview-tracker';
import { Head, KibaApp } from '@kibalabs/ui-react';
import 'react-toastify/dist/ReactToastify.css';

import { AccountControlProvider } from './AccountContext';
import { GlobalsProvider, IGlobals } from './globalsContext';
import { HomePage } from './pages/HomePage';
import { buildAppTheme } from './theme';

const theme = buildAppTheme();
const tracker = new EveryviewTracker('da82fef72d614762b253d0bfe0503226', true);

const globals: IGlobals = {
};

export const App = (): React.ReactElement => {
  useInitialization((): void => {
    tracker.trackApplicationOpen();
  });

  const routes: IRoute[] = [
    { path: '/', page: HomePage },
  ];

  return (
    <KibaApp theme={theme} background={{ linearGradient: 'rgb(0, 0, 0), rgb(25, 24, 37)' }}>
      <Head headId='app'>
        <title>PFP Kit</title>
      </Head>
      <AccountControlProvider>
        <GlobalsProvider globals={globals}>
          <Router routes={routes} />
        </GlobalsProvider>
      </AccountControlProvider>
    </KibaApp>
  );
};
