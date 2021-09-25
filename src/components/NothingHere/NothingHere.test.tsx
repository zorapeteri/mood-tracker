import React from 'react';
import { render, screen } from '@testing-library/react';
import NothingHere from './';

describe('NothingHere', () => {
  it('should render the component', () => {
    render(<NothingHere />);
    screen.getByText(/nothing/);
  });
});
