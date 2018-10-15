import * as React from 'react';
import { Provider } from 'react-redux';

import { store } from './state-mgmt';
import RootStackNavigator from './routingModule';

export default class App extends React.Component<{}, {}> {
  public render() {
    return (
      <Provider store={store}>
        <RootStackNavigator />
      </Provider>
    );
  }
}
