import React from 'react';
import { storiesOf } from '@storybook/react';

import '../../../index.scss';

import Modal from '../Modal';

const stories = storiesOf('Modal', module);

stories.add('Modal', () => {
  return (
    <div style={{ width: '90vw', height: '50vh', display: 'grid', placeItems: 'center' }}>
      <Modal title="Modal" buttonText="Okay" onButtonClick={() => alert('button clicked')}>
        <p>This is the content of the modal</p>
      </Modal>
    </div>
  );
});
