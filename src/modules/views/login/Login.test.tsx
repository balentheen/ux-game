import React from 'react';
import Login from './Login';
import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';

describe('Login', () => {
  let props;
  beforeEach(() => {
    props = {
      isLoading: false,
      isSessionChecked: true,
      hasError: false,
      login: jest.fn(),
      setNavigation: jest.fn(),
      navigation: jest.fn(),
      checkForUpdates: jest.fn(),
      recoverSession: jest.fn()
    };
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(<Login {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('renders without crashing on Android', () => {
    Login.isAndroid = true;
    const rendered = renderer.create(<Login {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
    Login.isAndroid = false;
  });

  it('renders without checking session', () => {
    props.isSessionChecked = false;
    const rendered = renderer.create(<Login {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('renders showing errors', () => {
    const rendered = renderer.create(<Login {...{ ...props, hasError: true }} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should call initial functions when session is NOT checked mounted', () => {
    props.isSessionChecked = false;
    const wrapper = shallow(<Login {...props} />);
    wrapper.update();
    expect(props.setNavigation).toBeCalledWith(props.navigation);
    expect(props.checkForUpdates).toBeCalled();
    expect(props.recoverSession).toBeCalled();
  });

  it('should trigger a login', () => {
    const email = 'email';
    const password = 'password';
    const wrapper = shallow(<Login {...props} />);
    wrapper.setState({ email, password });
    (wrapper.find('Button').first().prop('onPress') as any)(); /** @todo research how to do this */
    expect(props.login).toBeCalledWith(email, password);
  });

  it('should handleOnChange', () => {
    const email = 'email';
    const password = 'password';
    const wrapper = shallow(<Login {...props} />);
    (wrapper.find('TextInput').first().prop('onChangeText') as any)(email); /** @todo research how to do this */
    (wrapper.find('TextInput').last().prop('onChangeText') as any)(password); /** @todo research how to do this */
    const prevState = JSON.parse(JSON.stringify(wrapper.instance().state));
    expect(wrapper.instance().state).toEqual({ ...prevState, email, password });
  });
});
