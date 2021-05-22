import React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../scss/index.scss';

import MoodOptionCard from '../MoodOptionCard';

const stories = storiesOf('MoodOptionCard', module);

stories.add('MoodOptionCard', () => {
  return <MoodOptionCard mood={1} />;
});
