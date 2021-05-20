import React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../index.scss';

import MoodLogItem from '../MoodLogItem';

const stories = storiesOf('MoodLogItem', module);

stories.add('MoodLogItem', () => {
  return <MoodLogItem mood={1} time="09:00 AM" width="200px" />;
});
