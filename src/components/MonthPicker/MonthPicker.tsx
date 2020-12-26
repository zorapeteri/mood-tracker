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
        type="button"
        title="Previous month"
        onClick={() => previousMonth()}
      >
        ◀
      </button>
      <span>{monthAndYear(date)}</span>
      <button type="button" title="Next month" onClick={() => nextMonth()}>
        ▶
      </button>
    </section>
  );
};

export default MonthPicker;
