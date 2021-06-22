import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Confirm from './Confirm';

const props = {
  primaryText: 'test text 1',
  secondaryText: 'test text 2',
  yesButtonText: 'Yes',
  noButtonText: 'No',
  onNo: jest.fn(),
  onYes: jest.fn(),
}

describe('Confirm', () => {
  it('should render the Confirm component', () => {
    render(<Confirm {...props} />);

    expect(screen.getAllByRole('button').length).toBe(2);
    screen.getByText(props.primaryText);
    screen.getByText(props.secondaryText);
    screen.getByText(props.yesButtonText);
    screen.getByText(props.noButtonText);
  });

  it('should call the passed in functions', () => {
    render(<Confirm {...props} />);
  
    fireEvent.click(screen.getByText(props.yesButtonText));
    expect(props.onYes).toHaveBeenCalledTimes(1);
    
    fireEvent.click(screen.getByText(props.noButtonText));
    expect(props.onNo).toHaveBeenCalledTimes(1);
  });
});
