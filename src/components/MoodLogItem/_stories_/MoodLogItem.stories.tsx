import React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../index.scss';

import MoodLogItem from '../MoodLogItem';

const stories = storiesOf('MoodLogItem', module);

stories.add('MoodLogItem', () => {
  return <MoodLogItem id={'1'} mood={1} time={new Date()} onDelete={() => {}} width="200px" />;
});
