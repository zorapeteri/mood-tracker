import React, { useContext } from 'react';
import { MoodContext } from '../../context/MoodContext';
import moods from '../../moods';
import './Calendar.scss';

const Calendar: React.FC = () => {
  const { isPicking, days, date, pickDay } = useContext(MoodContext);

  const isToday = (index: number) =>
    date.getMonth() === new Date().getMonth() && date.getDate() === index + 1;

  return (
    <section className={['calendar', isPicking ? 'picking' : ''].join(' ')}>
      {days.map((mood, index) => (
        <button
          key={index}
          type="button"
          className={['day', isToday(index) ? 'today' : ''].join(' ')}
          onClick={() => pickDay(index)}
          style={{ backgroundColor: (moods as any)[mood] }}
        >
          {index + 1}
        </button>
      ))}
      <span className="pick-a-mood">Pick a mood</span>
    </section>
  );
};

export default Calendar;
