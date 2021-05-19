import React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../index.scss';

import Button from '../';

const stories = storiesOf('Button', module);

stories.add('Primary', () => {
  return (
    <Button color="primary" fontSize="1em" padding="10px 20px">
      Primary
    </Button>
  );
});

stories.add('Secondary', () => {
  return (
    <Button color="secondary" fontSize="1em" padding="10px 20px">
      Secondary
    </Button>
  );
});

stories.add('Disabled', () => {
  return (
    <Button color="disabled" fontSize="1em" padding="10px 20px">
      Disabled
    </Button>
  );
});

stories.add('Circular', () => {
  // TODO add icon
  return <Button color="secondary" fontSize="1em" padding="0" circular />;
});
