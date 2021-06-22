import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TextField from './TextField';

const props = {
  placeholder: 'test placeholder',
  rows: 1,
  defaultValue: 'test default value',
  onChange: () => 'test validation error',
};

describe('TextField', () => {
  it('should render the TextField component', () => {
    render(<TextField {...props} />);

    screen.getByRole('textbox');
    screen.getByPlaceholderText(props.placeholder);
    screen.getByDisplayValue(props.defaultValue);
  });

  it('should display validation error', () => {
    render(<TextField {...props} />);

    userEvent.type(screen.getByRole('textbox'), 'hi');
    screen.getByText('test validation error');
  });
});
