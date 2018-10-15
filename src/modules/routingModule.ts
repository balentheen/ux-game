import { createStackNavigator } from 'react-navigation';

import TodoListContainer from './views/todo-list';
import LoginContainer from './views/login';

export default createStackNavigator(
  {
    Login: LoginContainer,
    TodoList: TodoListContainer
  },
  { initialRouteName: 'Login' }
);
