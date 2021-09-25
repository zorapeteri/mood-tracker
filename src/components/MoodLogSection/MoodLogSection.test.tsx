import React from 'react';
import { render, screen } from '@testing-library/react';
import MoodLogSection from './';
import { getMockContext } from '../../utils';
import userEvent from '@testing-library/user-event';

import * as dateFns from 'date-fns';

jest.mock('date-fns', () => ({
  ...(jest.requireActual('date-fns') as {}),
  isToday: jest.fn(),
}));

type JestFunction = {
  mockImplementation: (arg: () => any) => void;
};

const extendMockContext = {
  moodLog: [
    {
      id: 'test',
      time: new Date(),
      mood: 1,
    },
  ],
  deleteMoodLog: jest.fn(),
};

const MockContext = getMockContext(extendMockContext);

describe('MoodLogSection', () => {
  it('should render the mood log', () => {
    render(
      <MockContext>
        <MoodLogSection />
      </MockContext>
    );

    screen.getByAltText(/great/);
  });

  it('should call delete function', () => {
    render(
      <MockContext>
        <MoodLogSection />
      </MockContext>
    );

    userEvent.click(screen.getByRole('button'));
    expect(extendMockContext.deleteMoodLog).toHaveBeenCalled();
  });

  it('should work with empty log', () => {
    const MockContextWithEmptyLog = getMockContext({});

    render(
      <MockContextWithEmptyLog>
        <MoodLogSection />
      </MockContextWithEmptyLog>
    );

    expect(screen.queryByRole('button')).toBeFalsy();
  });

  it('should change header text if date is today', () => {
    ((dateFns.isToday as unknown) as JestFunction).mockImplementation(
      () => true
    );

    render(
      <MockContext>
        <MoodLogSection />
      </MockContext>
    );

    screen.getByText("Today's mood log");
  });
});
