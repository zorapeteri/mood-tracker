import React from 'react';
import style from './Calendar.module.scss';
import {
  isThisYear,
  startOfWeek,
  endOfWeek,
  getDaysInMonth,
  isSameDay,
  addDays,
  lastDayOfMonth,
  isLastDayOfMonth,
  subDays,
  isToday,
  startOfMonth,
} from 'date-fns';

import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

type CalendarProps = {
  month: Date;
  date: Date;
  daysWithData: number[];
  startsOnSunday: boolean;
  onMonthViewChange: (direction: 1 | -1) => void;
  onChange: (date: Date) => void;
};

const getDaysNeededFromPreviousMonth = (date: Date, startsOnSunday: boolean) => {
  const daysNeeded: Date[] = [];
  const firstDayOfMonth = startOfMonth(date);
  const weekStart = startOfWeek(firstDayOfMonth, { weekStartsOn: startsOnSunday ? 0 : 1 });
  if (firstDayOfMonth === weekStart) return daysNeeded;
  let dayToAdd = weekStart;
  while (!isSameDay(firstDayOfMonth, dayToAdd)) {
    daysNeeded.push(dayToAdd);
    dayToAdd = addDays(dayToAdd, 1);
  }
  return daysNeeded;
};

const getDaysNeededFromNextMonth = (date: Date, startsOnSunday: boolean) => {
  const daysNeeded: Date[] = [];
  if (isLastDayOfMonth(date)) return daysNeeded;
  const weekEnd = endOfWeek(lastDayOfMonth(date), { weekStartsOn: startsOnSunday ? 0 : 1 });
  let dayToAdd = weekEnd;
  while (!isSameDay(lastDayOfMonth(date), dayToAdd)) {
    daysNeeded.unshift(dayToAdd);
    dayToAdd = subDays(dayToAdd, 1);
  }
  return daysNeeded;
};

const Calendar: React.FunctionComponent<CalendarProps> = (props: CalendarProps) => {
  const { month, date, daysWithData, startsOnSunday, onMonthViewChange, onChange } = props;

  const days = Array(getDaysInMonth(month))
    .fill(1)
    .map((x, y) => x + y)
    .map((day) => new Date(month.getFullYear(), month.getMonth(), day));

  const daysOfTheWeek = startsOnSunday ? ['S', 'M', 'T', 'W', 'T', 'F', 'S'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className={style.calendar}>
      <div className={style.monthPicker}>
        <button title="previous month" onClick={() => onMonthViewChange(-1)}>
          <IoChevronBack />
        </button>
        <span>{month.toLocaleString('en-en', { month: 'long', year: isThisYear(month) ? undefined : 'numeric' })}</span>
        <button title="next month" onClick={() => onMonthViewChange(1)}>
          <IoChevronForward />
        </button>
      </div>
      <div className={style.daysOfTheWeek}>
        {daysOfTheWeek.map((day) => (
          <span>{day}</span>
        ))}
      </div>
      <div className={style.days}>
        {getDaysNeededFromPreviousMonth(month, startsOnSunday).map((day) => (
          <button className={style.notThisMonth}>{day.getDate()}</button>
        ))}
        {days.map((day) => {
          const className = [
            daysWithData.includes(day.getDate()) ? undefined : style.unavailable,
            isSameDay(date, day) ? style.selected : undefined,
            isToday(day) ? style.today : undefined,
          ].join(' ');
          return (
            <button className={className} onClick={() => onChange(day)}>
              {day.getDate()}
            </button>
          );
        })}
        {getDaysNeededFromNextMonth(month, startsOnSunday).map((day) => (
          <button className={style.notThisMonth}>{day.getDate()}</button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;