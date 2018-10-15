import { combineReducers, createStore, applyMiddleware, Store } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ApiService } from '../services/ApiService';
import { NavigationService } from '../services/NavigationService';
import { HelperService } from '../services/HelperService';
import { Logger } from '../services/Logger';
import { AsyncStorageService } from '../services/AsyncStorageService';
import {
  IRootState,
  IEpicDependencies,
  authState,
  coreState,
  userState,
  todoState
} from './rootState';

const rootEpic = combineEpics<any>(
  ...authState.epics,
  ...coreState.epics,
  ...userState.epics,
  ...todoState.epics
);

const epicMiddleware = createEpicMiddleware({
  dependencies: {
    apiService: new ApiService(),
    asyncStorageService: new AsyncStorageService(),
    navigationService: new NavigationService(),
    helperService: HelperService,
    logger: Logger
  } as IEpicDependencies
});

const withDevtools = composeWithDevTools({ maxAge: 20, shouldCatchErrors: true });

const store: Store = createStore<IRootState, any, any, any>(
  combineReducers({
    auth: authState.reducer,
    user: userState.reducer,
    todo: todoState.reducer
  }), withDevtools(applyMiddleware(epicMiddleware))
);

export { store };

epicMiddleware.run(rootEpic);
