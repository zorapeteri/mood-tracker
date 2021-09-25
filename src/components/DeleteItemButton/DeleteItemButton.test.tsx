import React from 'react';
import { render, screen } from '@testing-library/react';
import DeleteItemButton from './';

const props = {
  isLongPressed: false,
  title: 'test',
  onDelete: () => {},
  side: 'left' as 'left' | 'right',
};

describe('DeleteItemButton', () => {
  it('should render desktop version by default', () => {
    render(<DeleteItemButton {...props} />);
    screen.getByTestId('desktop-delete');
  });

  it('should render handheld version when long pressed', () => {
    render(<DeleteItemButton {...props} isLongPressed />);
    screen.getByTestId('handheld-delete');
  });
});
