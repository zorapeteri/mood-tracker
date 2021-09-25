import React from 'react';
import { render, screen } from '@testing-library/react';
import Welcome from './';
import userEvent from '@testing-library/user-event';

const props = {
  goToNext: jest.fn(),
};

describe('Welcome', () => {
  it('should render the Welcome component', () => {
    render(<Welcome {...props} />);
    screen.getByText(/Welcome/);
  });

  it('should call the goToNext prop', () => {
    render(<Welcome {...props} />);
    userEvent.click(screen.getByRole('button'));
    expect(props.goToNext).toHaveBeenCalled();
  });
});
