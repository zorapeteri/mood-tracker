import React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../scss/index.scss';

import ViewToggle from '../ViewToggle';

const stories = storiesOf('ViewToggle', module);

stories.add('ViewToggle', () => {
  return (
    <div style={{ width: '350px' }}>
      <ViewToggle activeToggle="today" onChange={() => {}} />
    </div>
  );
});
