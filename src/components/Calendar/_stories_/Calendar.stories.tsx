import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import '../../../scss/index.scss';

import Calendar from '../Calendar';

const stories = storiesOf('Calendar', module);

stories.add('Calendar', () => {
  const [date, setDate] = useState<Date>(new Date(new Date().setDate(4)));
  return <Calendar date={date} onChange={(day) => setDate(day)} />;
});
