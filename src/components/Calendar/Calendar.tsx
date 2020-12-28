import React, { useEffect, useContext } from 'react';
import { MoodContext } from '../../context/MoodContext';
import moods from '../../moods';
import './Calendar.scss';

const Calendar: React.FC = () => {
  const { isPicking, days, date, pickDay, cancel } = useContext(MoodContext);

  const isToday = (index: number) =>
    date.getMonth() === new Date().getMonth() && date.getDate() === index + 1;

  useEffect(() => {
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') cancel();
    });
  }, []);

  return (
    <section
      aria-label="Calendar. Use the buttons inside to select the day you wanna record your mood for."
      className={['calendar', isPicking ? 'picking' : ''].join(' ')}
    >
      <ol className="days" data-testid="days">
        {days.map((mood, index) => {
          const dayTitle = new Date(
            date.getFullYear(),
            date.getMonth(),
            index + 1,
          ).toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });

          return (
            <button
              key={index}
              type="button"
              aria-label={dayTitle}
              title={dayTitle}
              className={['day', isToday(index) ? 'today' : ''].join(' ')}
              onClick={() => pickDay(index)}
              style={{ backgroundColor: (moods as any)[mood] }}
            >
              {index + 1}
            </button>
          );
        })}
      </ol>
      <span className="pick-a-mood">Pick a mood</span>
    </section>
  );
};

export default Calendar;
