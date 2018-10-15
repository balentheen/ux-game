import { mapStateToProps, mapDispatchToProps } from './LoginContainer';
import { IRootState, authState } from '../../state-mgmt/rootState';

describe('LoginContainer', () => {
  it('should mapStateToProps, ', () => {
    const state = { auth: { hasError: false, isLoading: false, isSessionChecked: false } };
    expect(mapStateToProps(state as IRootState)).toEqual({ hasError: false, isLoading: false, isSessionChecked: false });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      setNavigation: expect.any(Function),
      login: expect.any(Function),
      checkForUpdates: expect.any(Function),
      recoverSession: expect.any(Function)
    });
  });

  it('should dispatch login start action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    const username = 'email';
    const password = 'password';
    props.login(username, password);
    expect(dispatch).toBeCalledWith(authState.actions.start(username, password));
  });

  it('should dispatch recover session action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.recoverSession();
    expect(dispatch).toBeCalledWith(authState.actions.recoverSession());
  });
});
