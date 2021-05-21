import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import '../../../index.scss';

import Calendar from '../Calendar';

const stories = storiesOf('Calendar', module);

stories.add('Calendar', () => {
  const [date, setDate] = useState<Date>(new Date(new Date().setDate(4)));
  const [month, setMonth] = useState<Date>(new Date());

  return (
    <Calendar
      month={month}
      date={date}
      daysWithData={[1, 4, 21, 22, 6, 13]}
      startsOnSunday={false}
      onMonthViewChange={(direction) => {
        setMonth(new Date(month.getFullYear(), month.getMonth() + direction, 1));
      }}
      onChange={(day) => {
        setDate(day);
        if (day.getMonth() !== month.getMonth()) setMonth(day);
      }}
    />
  );
});
