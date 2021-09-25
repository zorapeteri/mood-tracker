import React from 'react';
import { render, screen } from '@testing-library/react';
import Toggle from './';
import userEvent from '@testing-library/user-event';

const props = {
  defaultChecked: false,
  onChange: jest.fn(),
};

describe('Toggle', () => {
  it('should render the Toggle component', () => {
    render(<Toggle {...props} />);
    screen.getByRole('checkbox');
  });

  it('should call onChange prop', () => {
    render(<Toggle {...props} />);
    userEvent.click(screen.getByRole('checkbox'));
    expect(props.onChange).toHaveBeenCalled();
  });
});
