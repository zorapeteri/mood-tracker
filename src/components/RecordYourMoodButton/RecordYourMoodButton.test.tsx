import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordYourMoodButton from './';
import userEvent from '@testing-library/user-event';

const props = {
  setPickingMood: jest.fn(),
};

describe('RecordYourMoodButton', () => {
  it('should render the RecordYourMoodButton component', () => {
    render(<RecordYourMoodButton {...props} />);
    screen.getByText(/Record your mood/);
  });

  it('should call the setPickingMood prop', () => {
    render(<RecordYourMoodButton {...props} />);
    userEvent.click(screen.getByRole('button'));
    expect(props.setPickingMood).toHaveBeenCalledTimes(1);
    expect(props.setPickingMood).toHaveBeenCalledWith(true);
  });
});
