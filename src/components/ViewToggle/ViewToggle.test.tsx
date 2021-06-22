import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import ViewToggle from './ViewToggle';

const props = {
  activeToggle: 'today' as ('today' | 'calendar'),
  onChange: jest.fn(),
}

describe('ViewToggle', () => {
  it('should render the ViewToggle component', () => {
    render(<ViewToggle {...props} />);

    screen.getByText('today');
    screen.getByText('calendar');
  });

  it('should not call onChange when clicking on already selected', () => {
    render(<ViewToggle {...props} />);

    fireEvent.click(screen.getByText('today'));
    expect(props.onChange).toHaveBeenCalledTimes(0);
  })

  it('should call the onChange prop when clicking on other view', () => {
    render(<ViewToggle {...props} />);

    fireEvent.click(screen.getByText('calendar'));
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveBeenCalledWith('calendar');
  });
});
