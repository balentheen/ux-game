import { ActionsObservable } from 'redux-observable';
import { throwError, of } from 'rxjs';

import { ENV } from '../../../constants';
import { IEpicDependencies, coreState } from '../rootState';
import { authGetEpicAuthStart, authGetEpicRecoverSession, authGetEpicResetSession } from './epics';
import { ActionType, actions } from './actions';
import { getDeps } from '../../../test/epicDependencies';
import { getLoginResponse } from '../../../test/entities';

describe('auth epics', () => {
  let deps: IEpicDependencies;
  let error;
  beforeEach(() => {
    error = new Error('scary error');
    deps = getDeps();
  });

  describe('authGetEpicAuthStart', () => {
    const email = 'email';
    const password = 'password';

    it('should get epic for auth start', done => {
      const emitedActions = [];
      const loginResponse = getLoginResponse();
      authGetEpicAuthStart(ActionsObservable.of(actions.start(email, password)), {} as any, deps).subscribe(output => {
        emitedActions.push(output);
        if (output.type === ActionType.SET_LOADING && output.payload.isLoading === false) {
          expect(deps.apiService.login).toBeCalledWith({ email, password });
          expect(deps.asyncStorageService.setItem).toBeCalledWith(ENV.STORAGE_KEY.AUTH, {
            userId: loginResponse._id,
            notificationChannel: loginResponse.notificationChannel,
            accessToken: loginResponse.access_token,
            defaultChannelId: loginResponse.defaultChannelId
          });
          expect(emitedActions[0]).toEqual(actions.setLoading(true));
          expect(emitedActions[1]).toEqual(actions.success(loginResponse._id, loginResponse.notificationChannel, loginResponse.defaultChannelId));
          expect(emitedActions[2]).toEqual(coreState.actions.bootstrap(loginResponse.access_token));
          expect(emitedActions[3]).toEqual(actions.setLoading(false));
          done();
        }
      });
    });

    it('should catch errors and dispatch them to the auth error handler', done => {
      const emitedActions = [];
      deps.apiService.login = () => { throw error; };
      authGetEpicAuthStart(ActionsObservable.of(actions.start(email, password)), {} as any, deps).subscribe(output => {
        emitedActions.push(output);
        if (output.type === ActionType.SET_LOADING && output.payload.isLoading === false) {
          expect(emitedActions[0]).toEqual(actions.setLoading(true));
          expect(emitedActions[1]).toEqual(actions.fail());
          expect(emitedActions[2]).toEqual(actions.setLoading(false));
          done();
        }
      });
    });
  });

  describe('authGetEpicRecoverSession', () => {
    it('should recover session data and bootstrap the app', done => {
      const emitedActions = [];
      authGetEpicRecoverSession(ActionsObservable.of(actions.recoverSession()), {} as any, deps).subscribe(output => {
        emitedActions.push(output);
        if (output.type === coreState.ActionType.BOOTSTRAP) {
          expect(deps.asyncStorageService.getItem).toBeCalledWith(ENV.STORAGE_KEY.AUTH);
          expect(emitedActions[0]).toEqual(actions.success(undefined, undefined, undefined)); // cause of the mocks
          expect(emitedActions[1]).toEqual(coreState.actions.bootstrap(undefined));
          done();
        }
      });
    });

    it('should only emit session was checked action when there is no auth data on storage', done => {
      const emitedActions = [];
      deps.asyncStorageService.getItem = () => of(null);
      authGetEpicRecoverSession(ActionsObservable.of(actions.recoverSession()), {} as any, deps).subscribe(output => {
        emitedActions.push(output);
        expect(emitedActions[0]).toEqual(actions.setSessionChecked(true));
        done();
      });
    });

    it('should catch errors and dispatch them to the auth error handler', done => {
      const emitedActions = [];
      deps.asyncStorageService.getItem = () => throwError(error);
      authGetEpicRecoverSession(ActionsObservable.of(actions.recoverSession()), {} as any, deps).subscribe(output => {
        emitedActions.push(output);
        if (output.type === coreState.ActionType.EPIC_ERROR) {
          expect(emitedActions[0]).toEqual(actions.setSessionChecked(true));
          expect(emitedActions[1]).toEqual(coreState.actions.epicError(error));
          done();
        }
      });
    });
  });

  describe('authGetEpicResetSession', () => {
    it('should reset session and redirect to the login', done => {
      const emitedActions = [];
      authGetEpicResetSession(ActionsObservable.of(actions.resetSession()), {} as any, deps).subscribe(output => {
        emitedActions.push(output);
      });
      setTimeout(() => {
        expect(deps.apiService.setToken).toBeCalledWith(null);
        expect(deps.pubNubService.closeConnection).toBeCalled();
        expect(deps.navigationService.navigation.dispatch).toBeCalled();
        expect(deps.asyncStorageService.removeItem).toBeCalledWith(ENV.STORAGE_KEY.AUTH);
        expect(emitedActions[0]).toEqual(actions.success(null, null, null));
        done();
      }, 50);
    });

    it('should catch errors and dispatch them to the auth error handler', done => {
      const emitedActions = [];
      deps.apiService.setToken = () => { throw error; };
      authGetEpicResetSession(ActionsObservable.of(actions.resetSession()), {} as any, deps).subscribe(output => {
        emitedActions.push(output);
        expect(emitedActions[0]).toEqual(coreState.actions.epicError(error));
        done();
      });
    });
  });
});
