import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MoodContextProvider, { MoodContext } from '../../context/MoodContext';

import Calendar from './Calendar';

describe('calendar', () => {
  it('renders all elements', () => {
    const { getByTestId, getByText } = render(<Calendar />);

    expect(getByTestId('days')).toBeTruthy();
    expect(getByText('Pick a mood')).toBeTruthy();
  });

  it('renders all buttons', () => {
    const numberOfDays = Math.ceil(Math.random() * 30);

    const mockContext = {
      isPicking: false,
      date: new Date(),
      days: new Array(numberOfDays).fill('test'),
      pickingDay: null,
      nextMonth: () => {},
      previousMonth: () => {},
      pickDay: () => {},
      pickMood: () => {},
      cancel: () => {},
    };

    const { getByTestId } = render(
      <MoodContext.Provider value={mockContext}>
        <Calendar />
      </MoodContext.Provider>,
    );

    expect(getByTestId('days').childElementCount).toBe(numberOfDays);
  });

  it('has a today button', () => {
    const { getByTestId } = render(
      <MoodContextProvider>
        <Calendar />
      </MoodContextProvider>,
    );

    expect(
      Array.from(getByTestId('days').childNodes).filter((button) =>
        (button as HTMLElement).classList.contains('today'),
      ).length,
    ).toBe(1);
  });

  it('has no today button when not needed', () => {
    const mockContext = {
      isPicking: false,
      date: new Date(2018, 10, 1),
      days: new Array(31).fill('test'),
      pickingDay: null,
      nextMonth: () => {},
      previousMonth: () => {},
      pickDay: () => {},
      pickMood: () => {},
      cancel: () => {},
    };

    const { getByTestId } = render(
      <MoodContext.Provider value={mockContext}>
        <Calendar />
      </MoodContext.Provider>,
    );

    expect(
      Array.from(getByTestId('days').childNodes).filter((button) =>
        (button as HTMLElement).classList.contains('today'),
      ).length,
    ).toBe(0);
  });

  it('calls the pickDay function', () => {
    const mockPickDay = jest.fn();

    const mockContext = {
      isPicking: false,
      date: new Date(),
      days: ['test'],
      pickingDay: null,
      nextMonth: () => {},
      previousMonth: () => {},
      pickDay: mockPickDay,
      pickMood: () => {},
      cancel: () => {},
    };

    const { getByTestId } = render(
      <MoodContext.Provider value={mockContext}>
        <Calendar />
      </MoodContext.Provider>,
    );

    const { firstChild } = getByTestId('days');

    if (firstChild) fireEvent.click(firstChild);

    expect(mockPickDay).toHaveBeenCalledTimes(1);
    expect(mockPickDay).toHaveBeenCalledWith(0);
  });
});
