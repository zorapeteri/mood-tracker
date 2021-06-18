import React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../scss/index.scss';

import Calendar from '../Calendar';

const stories = storiesOf('Calendar', module);

// TODO mock context

stories.add('Calendar', () => {
  return <Calendar />;
});
