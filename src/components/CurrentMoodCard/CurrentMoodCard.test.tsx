import React from 'react';
import { render, screen } from '@testing-library/react';
import CurrentMoodCard from './';
import { getMockContext } from '../../utils';
import moodNames from '../../moodNames';
import userEvent from '@testing-library/user-event';

const extendMockContext = {
  currentMood: 3,
  setPickingMood: jest.fn(),
};

const MockContext = getMockContext(extendMockContext);

describe('CurrentMoodCard', () => {
  it('should render the CurrentMoodCard component', () => {
    render(
      <MockContext>
        <CurrentMoodCard />
      </MockContext>
    );
    screen.getByText(moodNames[extendMockContext.currentMood]);
  });

  it('should call setPickingMood from context', () => {
    render(
      <MockContext>
        <CurrentMoodCard />
      </MockContext>
    );
    userEvent.click(screen.getByText(/Change/));
    expect(extendMockContext.setPickingMood).toHaveBeenCalledWith(true);
  });
});
