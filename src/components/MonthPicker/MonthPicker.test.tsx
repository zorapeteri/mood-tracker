import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MoodContextProvider, { MoodContext } from '../../context/MoodContext';

import MonthPicker from './MonthPicker';

const monthAndYear = (date: Date) =>
  `${date.toLocaleString(undefined, {
    month: 'long',
  })} ${date.getFullYear()}`;

describe('Month Picker', () => {
  it('renders all elements', () => {
    const { getByTestId } = render(<MonthPicker />);

    expect(getByTestId('previousMonth')).toBeTruthy();
    expect(getByTestId('date')).toBeTruthy();
    expect(getByTestId('nextMonth')).toBeTruthy();
  });

  it('calls previous month function', () => {
    const mockPreviousMonth = jest.fn();

    const mockContext = {
      isPicking: false,
      date: new Date(),
      days: [],
      pickingDay: null,
      nextMonth: () => {},
      previousMonth: mockPreviousMonth,
      pickDay: () => {},
      pickMood: () => {},
      cancel: () => {},
    };

    const { getByTestId } = render(
      <MoodContext.Provider value={mockContext}>
        <MonthPicker />
      </MoodContext.Provider>,
    );

    expect(getByTestId('previousMonth')).toBeTruthy();

    fireEvent.click(getByTestId('previousMonth'));

    expect(mockPreviousMonth).toHaveBeenCalledTimes(1);
  });

  it('calls next month function', () => {
    const mockNextMonth = jest.fn();

    const mockContext = {
      isPicking: false,
      date: new Date(),
      days: [],
      pickingDay: null,
      nextMonth: mockNextMonth,
      previousMonth: () => {},
      pickDay: () => {},
      pickMood: () => {},
      cancel: () => {},
    };

    const { getByTestId } = render(
      <MoodContext.Provider value={mockContext}>
        <MonthPicker />
      </MoodContext.Provider>,
    );

    expect(getByTestId('nextMonth')).toBeTruthy();

    fireEvent.click(getByTestId('nextMonth'));

    expect(mockNextMonth).toHaveBeenCalledTimes(1);
  });

  it('changes the month displayed', () => {
    const { getByTestId } = render(
      <MoodContextProvider>
        <MonthPicker />
      </MoodContextProvider>,
    );

    expect(getByTestId('date').textContent).toBe(monthAndYear(new Date()));

    fireEvent.click(getByTestId('previousMonth'));

    expect(getByTestId('date').textContent).not.toBe(monthAndYear(new Date()));

    fireEvent.click(getByTestId('nextMonth'));

    expect(getByTestId('date').textContent).toBe(monthAndYear(new Date()));
  });
});
