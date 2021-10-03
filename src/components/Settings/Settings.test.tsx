import React from 'react';
import { render, screen } from '@testing-library/react';
import Settings from './';
import { getMockContext } from '../../utils';
import userEvent from '@testing-library/user-event';

const extendMockContext = {
  setSettingsOpen: jest.fn(),
};

const MockContext = getMockContext(extendMockContext);

const props = {
  editName: jest.fn(),
};

jest.spyOn(window.localStorage.__proto__, 'clear');
window.localStorage.__proto__.clear = jest.fn();

describe('Settings', () => {
  it('should render the modal', () => {
    render(
      <MockContext>
        <Settings {...props} />
      </MockContext>
    );

    screen.getByText('Settings');
  });

  it('should trigger name edit', () => {
    render(
      <MockContext>
        <Settings {...props} />
      </MockContext>
    );

    userEvent.click(screen.getByText(/change your name/i));
    expect(props.editName).toHaveBeenCalled();
  });

  it('should be able to close', () => {
    render(
      <MockContext>
        <Settings {...props} />
      </MockContext>
    );

    userEvent.click(screen.getByTitle(/close/));

    expect(extendMockContext.setSettingsOpen).toHaveBeenCalledWith(false);
  });

  it('should ask for confirm on data reset', () => {
    render(
      <MockContext>
        <Settings {...props} />
      </MockContext>
    );

    userEvent.click(screen.getByText(/reset/i));
    expect(screen.queryByText(/are you sure/i)).toBeTruthy();
    userEvent.click(screen.getByText(/cancel/i));
    expect(screen.queryByText(/are you sure/i)).toBeFalsy();
    userEvent.click(screen.getByText(/reset/i));
    expect(screen.queryByText(/are you sure/i)).toBeTruthy();
    userEvent.click(screen.getByText(/yes/i));
    expect(localStorage.clear).toHaveBeenCalled();
  });

  it('should change calendar preference', () => {
    const userPreferences = { startsOnSunday: true };
    const setUserPreferences = jest.fn();
    const MockContextWithPreferences = getMockContext({
      userPreferences,
      setUserPreferences,
    });

    render(
      <MockContextWithPreferences>
        <Settings {...props} />
      </MockContextWithPreferences>
    );

    userEvent.click(screen.getByRole('checkbox'));
    expect(setUserPreferences).toHaveBeenCalled();
  });
});
