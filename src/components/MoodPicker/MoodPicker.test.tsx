import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MoodContext } from '../../context/MoodContext';
import moods from '../../moods';

import MoodPicker from './MoodPicker';

describe('mood picker', () => {
  it('renders buttons', () => {
    const { getByLabelText } = render(<MoodPicker />);

    expect(getByLabelText('mood picker').childElementCount).toBe(
      Object.keys(moods).length - 1,
    ); // not rendering "none" when not in picking mode
  });

  it('renders "none" button when picking', () => {
    const mockContext = {
      isPicking: true,
      date: new Date(),
      days: [],
      pickingDay: null,
      nextMonth: () => {},
      previousMonth: () => {},
      pickDay: () => {},
      pickMood: () => {},
      cancel: () => {},
    };

    const { getByLabelText } = render(
      <MoodContext.Provider value={mockContext}>
        <MoodPicker />
      </MoodContext.Provider>,
    );

    expect(getByLabelText('mood picker').childElementCount).toBe(
      Object.keys(moods).length,
    );
  });

  it('calls pickMood function', () => {
    const mockPickMood = jest.fn();

    const mockContext = {
      isPicking: false,
      date: new Date(),
      days: [],
      pickingDay: null,
      nextMonth: () => {},
      previousMonth: () => {},
      pickDay: () => {},
      pickMood: mockPickMood,
      cancel: () => {},
    };

    const { getByLabelText } = render(
      <MoodContext.Provider value={mockContext}>
        <MoodPicker />
      </MoodContext.Provider>,
    );

    const { firstChild } = getByLabelText('mood picker');

    if (firstChild) fireEvent.click(firstChild);

    expect(mockPickMood).toHaveBeenCalledTimes(1);
    expect(mockPickMood).toHaveBeenCalledWith(Object.keys(moods)[0]);
  });
});
