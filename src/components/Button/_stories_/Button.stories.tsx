import React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../scss/index.scss';

import Button from '../';

import { IoAdd } from 'react-icons/io5';

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
  return (
    <Button color="secondary" fontSize="1em" padding="0" circular>
      <IoAdd />
    </Button>
  );
});
