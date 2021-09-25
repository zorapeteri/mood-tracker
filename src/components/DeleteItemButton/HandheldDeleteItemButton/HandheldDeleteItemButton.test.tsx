import React from 'react';
import { render, screen } from '@testing-library/react';
import HandheldDeleteButton from './';
import userEvent from '@testing-library/user-event';

const props = {
  title: 'test',
  onDelete: jest.fn(),
};

describe('HandheldDeleteButton', () => {
  it('should render the component', () => {
    render(<HandheldDeleteButton {...props} />);
    screen.getByTitle(props.title);
  });

  it('should call onDelete prop', () => {
    render(<HandheldDeleteButton {...props} />);
    userEvent.click(screen.getByRole('button'));
    expect(props.onDelete).toHaveBeenCalled();
  });
});
