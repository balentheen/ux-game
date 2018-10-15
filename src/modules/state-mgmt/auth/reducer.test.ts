import { reducer } from './reducer';
import { initialState } from './state';
import { actions } from './actions';
import { getLoginResponse } from '../../../test/entities';

describe('auth reducer', () => {
  it('should return state without mutations when no switch case matches', () => {
    expect(reducer(initialState, { type: null, payload: null })).toBe(initialState);
  });

  it('should return a new state ActionType.SUCCESS', () => {
    const res = getLoginResponse();
    expect(reducer(undefined, actions.success(res._id, res.notificationChannel, res.defaultChannelId))).toEqual({
      ...initialState,
      currentUserId: res._id,
      notificationChannel: res.notificationChannel,
      defaultChannelId: res.defaultChannelId,
      hasError: false
    });
  });

  it('should return a new state ActionType.SET_LOADING as true', () => {
    expect(reducer(undefined, actions.setLoading(true))).toEqual({ ...initialState, isLoading: true });
  });

  it('should return a new state ActionType.SET_LOADING as false', () => {
    expect(reducer(undefined, actions.setLoading(false))).toEqual({ ...initialState, isLoading: false });
  });

  it('should return a new state ActionType.FAIL because it throw an error', () => {
    expect(reducer(undefined, actions.fail())).toEqual({ ...initialState, hasError: true });
  });

  it('should return a new state ActionType.SET_SESSION_CHECKED', () => {
    expect(reducer(undefined, actions.setSessionChecked(true))).toEqual({ ...initialState, isSessionChecked: true });
  });
});
