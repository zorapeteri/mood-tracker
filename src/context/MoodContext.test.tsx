import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import MoodContextProvider, { MoodContext } from './MoodContext';

const monthAndYear = (date: Date) =>
  `${date.toLocaleString(undefined, {
    month: 'long',
  })} ${date.getFullYear()}`;

describe('MoodContext', () => {
  it('.nextMonth()', () => {
    const { getByTestId } = render(
      <MoodContextProvider>
        <MoodContext.Consumer>
          {(context) => (
            <>
              <span data-testid="date">{monthAndYear(context.date)}</span>
              <button
                data-testid="nextMonth"
                type="button"
                onClick={context.nextMonth}
              >
                next month
              </button>
            </>
          )}
        </MoodContext.Consumer>
      </MoodContextProvider>,
    );

    expect(getByTestId('date').textContent).toBe(monthAndYear(new Date()));
    fireEvent.click(getByTestId('nextMonth'));
    expect(getByTestId('date').textContent).toBe(
      monthAndYear(new Date(new Date().setMonth(new Date().getMonth() + 1))),
    );
  });

  it('.previousMonth()', () => {
    const { getByTestId } = render(
      <MoodContextProvider>
        <MoodContext.Consumer>
          {(context) => (
            <>
              <span data-testid="date">{monthAndYear(context.date)}</span>
              <button
                data-testid="previousMonth"
                type="button"
                onClick={context.previousMonth}
              >
                previous month
              </button>
            </>
          )}
        </MoodContext.Consumer>
      </MoodContextProvider>,
    );

    expect(getByTestId('date').textContent).toBe(monthAndYear(new Date()));
    fireEvent.click(getByTestId('previousMonth'));
    expect(getByTestId('date').textContent).toBe(
      monthAndYear(new Date(new Date().setMonth(new Date().getMonth() - 1))),
    );
  });

  it('.pickDay()', () => {
    const dayToPick = Math.floor(Math.random() * 27) + 1;

    const { getByTestId } = render(
      <MoodContextProvider>
        <MoodContext.Consumer>
          {(context) => (
            <>
              <span data-testid="isPicking">
                {context.isPicking.toString()}
              </span>
              <span data-testid="pickingDay">
                {context.pickingDay ? context.pickingDay.toString() : ''}
              </span>
              <button
                data-testid="pickDay"
                type="button"
                onClick={() => context.pickDay(dayToPick)}
              >
                pick day
              </button>
            </>
          )}
        </MoodContext.Consumer>
      </MoodContextProvider>,
    );

    expect(getByTestId('isPicking').textContent).toBe('false');
    expect(getByTestId('pickingDay').textContent).toBe('');

    fireEvent.click(getByTestId('pickDay'));

    expect(getByTestId('isPicking').textContent).toBe('true');
    expect(getByTestId('pickingDay').textContent).toBe(dayToPick.toString());
  });

  it('.pickMood()', () => {
    const dayToPick = Math.floor(Math.random() * 27) + 1;
    const moodToPick = 'test';

    const { getByTestId } = render(
      <MoodContextProvider>
        <MoodContext.Consumer>
          {(context) => (
            <>
              <span data-testid="isPicking">
                {context.isPicking.toString()}
              </span>
              <span data-testid="days">{JSON.stringify(context.days)}</span>
              <span data-testid="pickingDay">
                {context.pickingDay ? context.pickingDay.toString() : ''}
              </span>
              <button
                data-testid="pickDay"
                type="button"
                onClick={() => context.pickDay(dayToPick)}
              >
                pick day
              </button>
              <button
                data-testid="pickMood"
                type="button"
                onClick={() => context.pickMood(moodToPick)}
              >
                pick mood
              </button>
            </>
          )}
        </MoodContext.Consumer>
      </MoodContextProvider>,
    );

    fireEvent.click(getByTestId('pickDay'));

    expect(getByTestId('isPicking').textContent).toBe('true');
    expect(getByTestId('pickingDay').textContent).toBe(dayToPick.toString());

    fireEvent.click(getByTestId('pickMood'));

    expect(getByTestId('isPicking').textContent).toBe('false');

    const days = JSON.parse(
      (getByTestId('days') && getByTestId('days').textContent) || '[]',
    );

    expect(days[dayToPick]).toBe(moodToPick);
    expect(getByTestId('pickingDay').textContent).toBe('');
  });

  it('.cancel()', () => {
    const dayToPick = Math.floor(Math.random() * 27) + 1;

    const { getByTestId } = render(
      <MoodContextProvider>
        <MoodContext.Consumer>
          {(context) => (
            <>
              <span data-testid="isPicking">
                {context.isPicking.toString()}
              </span>
              <span data-testid="pickingDay">
                {context.pickingDay ? context.pickingDay : ''}
              </span>
              <button
                data-testid="pickDay"
                type="button"
                onClick={() => context.pickDay(dayToPick)}
              >
                pick day
              </button>
              <button
                data-testid="cancel"
                type="button"
                onClick={context.cancel}
              >
                cancel
              </button>
            </>
          )}
        </MoodContext.Consumer>
      </MoodContextProvider>,
    );

    expect(getByTestId('isPicking').textContent).toBe('false');
    expect(getByTestId('pickingDay').textContent).toBe('');

    fireEvent.click(getByTestId('pickDay'));

    expect(getByTestId('isPicking').textContent).toBe('true');
    expect(getByTestId('pickingDay').textContent).toBe(dayToPick.toString());

    fireEvent.click(getByTestId('cancel'));

    expect(getByTestId('isPicking').textContent).toBe('false');
    expect(getByTestId('pickingDay').textContent).toBe('');
  });
});
