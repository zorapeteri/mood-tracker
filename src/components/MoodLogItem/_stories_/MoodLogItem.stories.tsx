import React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../scss/index.scss';

import MoodLogItem from '../MoodLogItem';

const stories = storiesOf('MoodLogItem', module);

stories.add('MoodLogItem', () => {
  return (
    <div style={{ width: '300px' }}>
      <MoodLogItem id={'1'} mood={1} time={new Date()} onDelete={() => {}} />
    </div>
  );
});
