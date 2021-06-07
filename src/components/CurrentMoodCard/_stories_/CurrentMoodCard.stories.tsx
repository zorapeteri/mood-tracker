import React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../scss/index.scss';

import CurrentMoodCard from '../CurrentMoodCard';

const stories = storiesOf('CurrentMoodCard', module);

stories.add('CurrentMoodCard', () => {
  return <CurrentMoodCard currentMood={1} onChangeClick={() => {}} />;
});
