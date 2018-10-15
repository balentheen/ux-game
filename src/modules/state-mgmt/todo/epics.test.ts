import { ActionsObservable } from 'redux-observable';

import { IEpicDependencies } from '../rootState';
import { userGetEpicGetUsers } from './epics';
import { getDeps } from '../../../test/epicDependencies';
import { getUserListResponse } from '../../../test/entities';
import { coreState } from '../core';
import { ActionType, actions } from './actions';

describe('user epics', () => {
  let deps: IEpicDependencies;
  let error;
  beforeEach(() => {
    error = new Error('scary error');
    deps = getDeps();
  });

  describe('userGetEpicGetUsers', () => {

    const idList = ['userId', 'userId', 'userId'];

    it('should get epic for get user list', done => {
      const emitedActions = [];
      userGetEpicGetUsers(ActionsObservable.of(actions.setListStart(idList)), {} as any, deps).subscribe(output => {
        emitedActions.push(output);
        if (output.type === ActionType.SET_LIST_SUCCESS) {
          expect(deps.apiService.getUserList).toBeCalledWith(idList);
          expect(emitedActions[0]).toEqual(actions.setListSuccess(getUserListResponse().docs));
          done();
        }
      });
    });

    it('should catch errors and dispatch them to the user error handler', done => {
      const emitedActions = [];
      deps.apiService.getUserList = () => { throw error; };
      userGetEpicGetUsers(ActionsObservable.of(actions.setListStart(idList)), {} as any, deps).subscribe(output => {
        emitedActions.push(output);
        expect(emitedActions[0]).toEqual(coreState.actions.epicError(error));
        done();
      });
    });

  });
});
