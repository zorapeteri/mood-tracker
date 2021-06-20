import React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../scss/index.scss';

import CurrentMoodCard from '../CurrentMoodCard';
import { Context, initialState } from '../../../context/Context';

const stories = storiesOf('CurrentMoodCard', module);

stories.add('CurrentMoodCard', () => {
  return (
    <Context.Provider value={{ ...initialState, currentMood: 1 }}>
      <div style={{ width: '350px' }}>
        <CurrentMoodCard />
      </div>
    </Context.Provider>
  );
});
