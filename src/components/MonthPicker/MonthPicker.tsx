import React, { useContext } from 'react';
import { MoodContext } from '../../context/MoodContext';
import './MonthPicker.scss';

const monthAndYear = (date: Date) =>
  `${date.toLocaleString(undefined, {
    month: 'long',
  })} ${date.getFullYear()}`;

const MonthPicker: React.FC = () => {
  const { date, nextMonth, previousMonth } = useContext(MoodContext);

  return (
    <section className="month-picker">
      <button
        data-testid="previousMonth"
        type="button"
        title="Previous month"
        aria-label="Previous month"
        onClick={() => previousMonth()}
      >
        ◀
      </button>
      <span data-testid="date">{monthAndYear(date)}</span>
      <button
        data-testid="nextMonth"
        type="button"
        title="Next month"
        aria-label="Next month"
        onClick={() => nextMonth()}
      >
        ▶
      </button>
    </section>
  );
};

export default MonthPicker;
