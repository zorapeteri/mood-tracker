import React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../index.scss';

import Toggle from '../Toggle';

const stories = storiesOf('Toggle', module);

stories.add('Toggle', () => {
  return <Toggle defaultChecked={false} />;
});