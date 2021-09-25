import React from 'react';
import { render, screen } from '@testing-library/react';
import Greeting from './';
import { getMockContext } from '../../utils';

const extendMockContext = {
  userPreferences: {
    name: 'test',
  },
};

const MockContext = getMockContext(extendMockContext);

describe('Greeting', () => {
  it('should render the component', () => {
    render(
      <MockContext>
        <Greeting />
      </MockContext>
    );

    screen.getByText(new RegExp(extendMockContext.userPreferences.name, 'gmi'));
  });
});
