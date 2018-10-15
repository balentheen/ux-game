import { ActionsObservable } from 'redux-observable';
import { throwError } from 'rxjs';
import { AjaxError } from 'rxjs/ajax';

import { ENV } from '../../../constants';
import { IEpicDependencies, userState, messageState, channelState, authState, therapyState, childState } from '../rootState';
import {
  coreGetEpicSetNavigation,
  coreGetEpicErrorHandler,
  coreGetEpicCheckForUpdates,
  coreGetEpicUnknownNotificationHandler,
  coreGetEpicBootstrap,
  coreGetEpicProcessNotification
} from './epics';
import { actions, ActionType } from './actions';
import { getDeps } from '../../../test/epicDependencies';
import { getMessageNotification, getInitialState, getUser_1, getChannel_1, getChildListResponse } from '../../../test/entities';
import { NotificationModel, MessageModel } from '../../models';

describe('Core epics', () => {
  let deps: IEpicDependencies;
  let error;
  let state$;
  beforeEach(() => {
    error = new Error('scary error');
    state$ = { value: getInitialState() };
    deps = getDeps();
  });

  describe('coreGetEpicSetNavigation', () => {
    const navigation = state$;

    it('should get epic for core set navigation', done => {
      coreGetEpicSetNavigation(ActionsObservable.of(actions.setNavigation(navigation)), state$, deps).subscribe(output => {
        expect(deps.navigationService.setNavigation).toBeCalledWith(navigation);
        expect(output).toEqual(actions.setNavigationSuccess());
        done();
      });

    });
    it('should catch errors and dispatch them to the general error handler', done => {
      deps.navigationService.setNavigation = () => { throw error; };
      coreGetEpicSetNavigation(ActionsObservable.of(actions.setNavigation(navigation)), state$, deps).subscribe(output => {
        expect(output).toEqual(actions.epicError(error));
        done();
      });
    });
  });

  describe('coreGetEpicErrorHandler', () => {
    it('should dispatch no actions', done => {
      coreGetEpicErrorHandler(ActionsObservable.of(actions.epicError(error)), state$, deps).subscribe(() => {
        expect(false).toBe(true);
        done();
      });
      setTimeout(() => {
        expect(deps.logger.error).toBeCalledWith(error);
        done();
      }, 10);
    });

    it('should dispatch resetSession action on 401 errors', done => {
      const ajaxError = new AjaxError('message', { status: 401 } as any, {} as any);
      coreGetEpicErrorHandler(ActionsObservable.of(actions.epicError(ajaxError)), state$, deps).subscribe(output => {
        expect(output).toEqual(authState.actions.resetSession());
        done();
      });
    });
  });

  describe('coreGetEpicCheckForUpdates', () => {
    it('should run the check for updates interval without emitting values', done => {
      coreGetEpicCheckForUpdates(ActionsObservable.of(actions.checkForUpdates()), state$, deps).subscribe(() => {
        expect(false).toBe(true); // this will never run because this observable doesn't emit values
      });
      setTimeout(() => {
        expect((deps.helperService.checkForUpdates as any).mock.calls).toHaveLength(2);
        done();
      }, ENV.CHECK_FOR_UPDATES_INTERVAL * 1.5);
    });
  });

  describe('coreGetEpicUnknownNotificationHandler', () => {
    it('should handle unknown notifications (channel type) by doing nothing.. for now', done => {
      const notification = getMessageNotification();
      coreGetEpicUnknownNotificationHandler(ActionsObservable.of(actions.handleUnknownNotification(notification)), state$, deps).subscribe(() => {
        expect(false).toBe(true); // this will never run because this observable doesn't emit values
      });
      setTimeout(() => {
        done();
      }, 50);
    });
  });

  describe('coreGetEpicBootstrap', () => {
    it('should bootstrap the app (connect to pubnub, rollbar, etc)', done => {
      const emitedActions = [];
      const token = 'token';
      deps.pubNubService.subscribe = (_, _2, cb) => setTimeout(() => cb(getMessageNotification()), 100) as any;
      state$.value.auth.currentUserId = getUser_1()._id;
      state$.value.auth.defaultChannelId = getChannel_1()._id;
      state$.value.user.userMap = { [getUser_1()._id]: getUser_1() };
      coreGetEpicBootstrap(ActionsObservable.of(actions.bootstrap(token)), state$, deps).subscribe(output => {
        emitedActions.push(output);
        if (output.type === ActionType.PROCESS_NOTIFICATION) {
          expect(deps.apiService.setToken).toBeCalledWith(token);
          expect(deps.navigationService.navigation.dispatch).toBeCalled();
          expect(deps.apiService.getChildList).toBeCalled();
          expect(deps.apiService.getCredentials).toBeCalled();
          expect(deps.eventTracker.init).toBeCalled();
          expect(deps.pubNubService.init).toBeCalled();
          expect(emitedActions[0]).toEqual(therapyState.actions.setListStart({ page: 1, limit: 20 }));
          expect(emitedActions[1]).toEqual(userState.actions.setSuccess(getUser_1()));
          // expect(emitedActions[2]).toEqual(channelState.actions.openChannel(getChannel_1()._id)); /** @todo modify when final flow is ready */
          expect(emitedActions[2]).toEqual(childState.actions.setListSuccess(getChildListResponse().docs));
          expect(emitedActions[3]).toEqual(authState.actions.setSessionChecked(true));
          expect(emitedActions[4]).toEqual(actions.processNotification(getMessageNotification()));
          done();
        }
      });
    });

    it('should catch errors and dispatch them to the general error handler', done => {
      deps.apiService.getUser = () => throwError(error);
      coreGetEpicBootstrap(ActionsObservable.of(actions.bootstrap('token')), state$, deps).subscribe(output => {
        if (output.type === ActionType.EPIC_ERROR) {
          expect(output).toEqual(actions.epicError(error));
          done();
        }
      });
    });
  });

  describe('coreGetEpicProcessNotification', () => {
    it('should process an unknown notification', done => {
      const notification = getMessageNotification();
      notification.subtype = NotificationModel.Type.SYSTEM;
      coreGetEpicProcessNotification(ActionsObservable.of(actions.processNotification(notification)), state$, deps).subscribe(output => {
        expect(output).toEqual(actions.handleUnknownNotification(notification));
        done();
      });
    });

    it('should process an unknown notification of subtype metadata', done => {
      const notification = getMessageNotification();
      notification.subtype = 'metadata';
      coreGetEpicProcessNotification(ActionsObservable.of(actions.processNotification(notification)), state$, deps).subscribe(output => {
        expect(output).toEqual(actions.handleUnknownNotification(notification));
        done();
      });
    });

    it('should process a channel notification', done => {
      const notification = getMessageNotification();
      notification.type = NotificationModel.Type.CHANNEL;
      coreGetEpicProcessNotification(ActionsObservable.of(actions.processNotification(notification)), state$, deps).subscribe(output => {
        expect(output).toEqual(actions.handleUnknownNotification(notification));
        done();
      });
    });

    it('should process a message notification', done => {
      const notification = getMessageNotification();
      coreGetEpicProcessNotification(ActionsObservable.of(actions.processNotification(notification)), state$, deps).subscribe(output => {
        expect(output).toEqual(messageState.actions.setSuccess(notification.body as any));
        done();
      });
    });

    it('should process an attachment notification', done => {
      const notification = getMessageNotification();
      notification.subtype = MessageModel.Type.ATTACHMENT;
      coreGetEpicProcessNotification(ActionsObservable.of(actions.processNotification(notification)), state$, deps).subscribe(output => {
        expect(output).toEqual(messageState.actions.setSuccess(notification.body as any));
        done();
      });
    });

    it('should process an update notification', done => {
      const notification = getMessageNotification();
      notification.subtype = 'update';
      coreGetEpicProcessNotification(ActionsObservable.of(actions.processNotification(notification)), state$, deps).subscribe(output => {
        expect(output).toEqual(messageState.actions.updateSuccess(notification.body as any));
        done();
      });
    });

    it('should process a delete notification', done => {
      const emitedActions = [];
      const notification = getMessageNotification();
      notification.subtype = 'metadata';
      notification.body.subtype = 'deleted';
      coreGetEpicProcessNotification(ActionsObservable.of(actions.processNotification(notification)), state$, deps).subscribe(output => {
        emitedActions.push(output);
        if (output.type === messageState.ActionType.SET_SUCCESS) {
          expect(emitedActions[0]).toEqual(messageState.actions.deleteSuccess(notification.body as any));
          expect(emitedActions[1]).toEqual(messageState.actions.setSuccess(notification.body as any));
          done();
        }
      });
    });

    it('should catch errors and dispatch them to the general error handler', done => {
      coreGetEpicProcessNotification(ActionsObservable.of(actions.processNotification(null)), state$, deps).subscribe(output => {
        expect(output.type).toEqual(ActionType.EPIC_ERROR);
        done();
      });
    });
  });

});
