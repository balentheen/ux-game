import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import MenuItem, { IMenuItemProps } from './MenuItem';

describe('MenuItem', () => {
  let props: IMenuItemProps;
  beforeEach(() => {
    props = {
      icon: 1,
      title: 'title',
      description: 'desc',
      onPress: jest.fn()
    };
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(<MenuItem {...props} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
