import React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../index.scss';

import NoteCard from '../NoteCard';

const stories = storiesOf('NoteCard', module);

const shortNote = 'Today was nice.';

const longNote =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

stories.add('Short note', () => {
  return (
    <div style={{ paddingLeft: '50px' }}>
      <NoteCard note={shortNote} time="04:20 AM" width="250px" />
    </div>
  );
});

stories.add('Long note', () => {
  return (
    <div style={{ paddingLeft: '50px' }}>
      <NoteCard note={longNote} time="04:20 AM" width="250px" />
    </div>
  );
});
