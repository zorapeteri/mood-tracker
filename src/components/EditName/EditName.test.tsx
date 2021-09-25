import React from 'react';
import { render, screen } from '@testing-library/react';
import EditName from './';
import { getMockContext } from '../../utils';
import userEvent from '@testing-library/user-event';

const props = {
  close: jest.fn(),
};

const extendMockContext = {
  userPreferences: {
    name: 'test',
  },
  setUserPreferences: jest.fn(),
};

const MockContext = getMockContext(extendMockContext);

describe('EditName', () => {
  it('should render the EditName component', () => {
    render(
      <MockContext>
        <EditName {...props} />
      </MockContext>
    );

    screen.getByDisplayValue(extendMockContext.userPreferences.name);
  });

  it('should save changed name', () => {
    render(
      <MockContext>
        <EditName {...props} />
      </MockContext>
    );

    userEvent.type(screen.getByRole('textbox'), '_changed');
    userEvent.click(screen.getByText(/Save/));
    expect(extendMockContext.setUserPreferences).toHaveBeenCalledWith({
      name: `${extendMockContext.userPreferences.name}_changed`,
    });
  });

  it('should display error message', () => {
    render(
      <MockContext>
        <EditName {...props} />
      </MockContext>
    );

    userEvent.clear(screen.getByRole('textbox'));
    screen.getByText(/enter your name/);
  });

  it('should work with empty name', () => {
    const MockContextWithEmptyName = getMockContext({ userPreferences: {} });

    render(
      <MockContextWithEmptyName>
        <EditName {...props} />
      </MockContextWithEmptyName>
    );

    screen.getByRole('textbox');
  });
});
