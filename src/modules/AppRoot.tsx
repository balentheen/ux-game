import * as React from 'react';
import { Provider } from 'react-redux';
import { Font } from 'expo';

import { store } from './state-mgmt';
import RootStackNavigator from './routingModule';

export default class App extends React.Component<{}, {}> {

  public state = {
    fontLoaded: false
  };

  public async componentDidMount() {
    await Font.loadAsync({
      'montserrat-alternates-semibold': require('../assets/fonts/MontserratAlternates-SemiBold.otf'),
      'montserrat-alternates-medium': require('../assets/fonts/MontserratAlternates-Medium.otf'),
      'montserrat-alternates-bold': require('../assets/fonts/MontserratAlternates-Bold.otf'),
      'montserrat-semibold-italic': require('../assets/fonts/Montserrat-SemiBoldItalic.otf'),
      'montserrat-semibold': require('../assets/fonts/Montserrat-SemiBold.otf'),
      'montserrat-bold': require('../assets/fonts/Montserrat-Bold.otf'),
      'montserrat-extra-bold': require('../assets/fonts/Montserrat-ExtraBold.otf'),
      'montserrat-medium': require('../assets/fonts/Montserrat-Medium.otf'),
      'montserrat-medium-italic': require('../assets/fonts/Montserrat-MediumItalic.otf'),
      'montserrat-regular': require('../assets/fonts/Montserrat-Regular.otf'),
    });

    this.setState({ fontLoaded: true });
  }

  public render() {
    if (this.state.fontLoaded) {
      return (
        <Provider store={store}>
          <RootStackNavigator />
        </Provider>
      );
    } else {
      return null;
    }
  }
}
