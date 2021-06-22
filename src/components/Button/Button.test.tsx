import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Button from './Button';

const testButtonContent = 'Test';
const onClick = jest.fn();

describe('Button', () => {
  it('should render the Button component', () => {
    render(
      <Button color="primary" fontSize="1em" padding="1em" onClick={onClick}>
        {testButtonContent}
      </Button>,
    );

    screen.getByText(testButtonContent);
    screen.getByRole('button');
  });

  it('should not be clickable when disabled', () => {
    render(
      <Button color="disabled" fontSize="1em" padding="1em" onClick={onClick}>
        {testButtonContent}
      </Button>,
    );
    fireEvent.click(screen.getByText(testButtonContent));
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('should call the onClick prop when clicked', () => {
    render(
      <Button color="primary" fontSize="1em" padding="1em" onClick={onClick}>
        {testButtonContent}
      </Button>,
    );
    fireEvent.click(screen.getByText(testButtonContent));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should have the correct class', () => {
    render(
      <Button color="primary" fontSize="1em" padding="1em" onClick={onClick}>
        {testButtonContent}
      </Button>,
    );

    expect(screen.getByText(testButtonContent)).toHaveClass('primary');
  });
});
