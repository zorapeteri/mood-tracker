import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Modal from './Modal';

const childText = 'I am a child';
const closeButtonTitle = 'close dialog';

const props = {
  title: 'test title',
  buttonText: 'test button text',
  onButtonClick: jest.fn(),
  onClose: jest.fn(),
  children: (<h1>{childText}</h1>),
}


describe('Modal', () => {
  it('should render the Modal component', () => {
    render(<Modal {...props} />);

    screen.getByText(childText);
    screen.getByText(props.title);
    screen.getByText(props.buttonText);
    expect(screen.getAllByRole('button').length).toBe(2);
  });

  it('should call the passed in functions', () => {
    render(<Modal {...props} />);

    fireEvent.click(screen.getByText(props.buttonText));
    expect(props.onButtonClick).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTitle(closeButtonTitle));
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('should disable button', () => {
    render(<Modal {...props} disableButton={true} />);

    fireEvent.click(screen.getByText(props.buttonText));
    expect(props.onButtonClick).toHaveBeenCalledTimes(0);
  });

  it('should hide button', () => {
    render(<Modal {...props} hideButton={true} />);

    expect(screen.queryByText(props.buttonText)).toBeFalsy();
  });

  it('should hide close button', () => {
    render(<Modal {...props} hideCloseButton={true} />);

    expect(screen.queryByTitle(closeButtonTitle)).toBeFalsy();
  });
});
