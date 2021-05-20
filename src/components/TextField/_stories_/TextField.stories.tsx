import React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../index.scss';

import TextField from '../TextField';

const stories = storiesOf('TextField', module);

stories.add('Small', () => {
  return (
    <div style={{ width: '500px' }}>
      <TextField placeholder="Start typing..." rows={1} onChange={() => 'validation error'} />
    </div>
  );
});

stories.add('Large', () => {
  return (
    <div style={{ width: '500px' }}>
      <TextField placeholder="Start typing..." rows={5} onChange={() => 'validation error'} />
    </div>
  );
});
