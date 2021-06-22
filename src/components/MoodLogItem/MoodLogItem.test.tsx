import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import MoodLogItem from './MoodLogItem';
import { format } from 'date-fns';
import moodNames from '../../moodNames';

const props = {
  id: '',
  mood: 1 as Mood,
  time: new Date(),
  onDelete: jest.fn(),
};

const timeText = format(props.time, 'hh:mm a');

describe('MoodLogItem', () => {
  it('should render the MoodLogItem component', () => {
    render(<MoodLogItem {...props} />);
    
    screen.getByAltText(`${moodNames[props.mood]} mood emoji icon`);
    screen.getByText(timeText);
  });

  it('should call onDelete prop', async () => {
    render(<MoodLogItem {...props} />);

    fireEvent.mouseOver(screen.getByText(timeText));
    await waitFor(() => screen.getByRole('button'));
    fireEvent.click(screen.getByRole('button'));
    expect(props.onDelete).toHaveBeenCalledTimes(1);
  })
});
