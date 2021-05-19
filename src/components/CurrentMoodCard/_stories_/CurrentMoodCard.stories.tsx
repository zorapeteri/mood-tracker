import React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../index.scss';

import CurrentMoodCard from '../CurrentMoodCard';

const stories = storiesOf('CurrentMoodCard', module);

stories.add('CurrentMoodCard', () => {
  return <CurrentMoodCard currentMood={1} width="300px" />;
});
