import React from 'react';
import Game, { IGameProps } from './Game';
import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';

describe('Game', () => {
  let props: IGameProps;
  beforeEach(() => {
    props = {
      isLoading: false,
      hasError: false,
      login: jest.fn(),
      setNavigation: jest.fn(),
      navigation: jest.fn() as any,
      checkForUpdates: jest.fn()
    };
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(<Game {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
