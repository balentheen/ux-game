import { createStackNavigator } from 'react-navigation';

import GameContainer from './views/game';
import LoginContainer from './views/login';

export default createStackNavigator(
  {
    Login: LoginContainer,
    Game: GameContainer
  },
  { initialRouteName: 'Login' }
);
