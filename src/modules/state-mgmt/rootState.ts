import { IAuthState, authState } from './auth';
import { IUserState, userState } from './user';
import { ITodoState, todoState } from './todo';
import { coreState } from './core';
import { ApiService } from '../services/ApiService';
import { NavigationService } from '../services/NavigationService';
import { HelperService } from '../services/HelperService';
import { Logger } from '../services/Logger';
import { AsyncStorageService } from '../services/AsyncStorageService';

export interface IAction {
  type: string;
  payload: any;
}

export interface IRootState {
  auth: IAuthState;
  user: IUserState;
  todo: ITodoState;
}

export interface IEpicDependencies {
  apiService: ApiService;
  asyncStorageService: AsyncStorageService;
  navigationService: NavigationService;
  helperService: typeof HelperService;
  logger: typeof Logger;
}

export { authState, coreState, userState, todoState };
