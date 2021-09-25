import React from 'react';
import { render, screen } from '@testing-library/react';
import MoodPicker from './';
import { getMockContext } from '../../utils';
import userEvent from '@testing-library/user-event';
import moodNames from '../../moodNames';

const extendMockContext = {
  setPickingMood: jest.fn(),
  saveMoodLog: jest.fn(),
};

const MockContext = getMockContext(extendMockContext);

describe('MoodPicker', () => {
  it('should render the component', () => {
    render(
      <MockContext>
        <MoodPicker />
      </MockContext>
    );

    screen.getByText(/how are you feeling/i);
  });

  it('should be closeable', () => {
    render(
      <MockContext>
        <MoodPicker />
      </MockContext>
    );
    userEvent.click(screen.getByTitle(/close/));
    expect(extendMockContext.setPickingMood).toHaveBeenCalledWith(false);
  });

  it('should save chosen mood', () => {
    render(
      <MockContext>
        <MoodPicker />
      </MockContext>
    );

    userEvent.click(screen.getByText(new RegExp(moodNames[1], 'gmi')));
    expect(extendMockContext.saveMoodLog).toHaveBeenCalledWith(1);
  });
});
