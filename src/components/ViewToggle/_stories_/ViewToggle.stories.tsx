import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import '../../../scss/index.scss';

import ViewToggle from '../ViewToggle';

const stories = storiesOf('ViewToggle', module);

stories.add('ViewToggle', () => {

  const [activeView, setActiveView] = useState<'today' | 'calendar'>('today');

  return (
    <div style={{ width: '350px' }}>
      <ViewToggle activeToggle={activeView} onChange={option => setActiveView(option)}/>
    </div>
  );
});
