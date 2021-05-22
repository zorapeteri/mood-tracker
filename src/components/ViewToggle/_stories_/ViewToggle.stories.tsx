import React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../scss/index.scss';

import ViewToggle from '../ViewToggle';

const stories = storiesOf('ViewToggle', module);

stories.add('ViewToggle', () => {
  return <ViewToggle activeToggle="today" onChange={() => {}} width="300px" />;
});
