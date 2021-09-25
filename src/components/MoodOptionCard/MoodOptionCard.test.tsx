import React from 'react';
import { render, screen } from '@testing-library/react';
import MoodOptionCard from './';
import moodNames from '../../moodNames';
import userEvent from '@testing-library/user-event';

const props = {
  mood: 1,
  onChoose: jest.fn(),
};

describe('MoodOptionCard', () => {
  it('should render the MoodOptionCard component', () => {
    render(<MoodOptionCard {...props} />);
    screen.getByText(moodNames[props.mood]);
  });

  it('should call onChoose prop', () => {
    render(<MoodOptionCard {...props} />);
    userEvent.click(screen.getByRole('button'));
    expect(props.onChoose).toHaveBeenCalledWith(props.mood);
  });
});
