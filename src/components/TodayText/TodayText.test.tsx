import React from 'react';
import { render, screen } from '@testing-library/react';
import * as dateFns from 'date-fns';
import TodayText from './';

jest.mock('date-fns', () => ({
  ...(jest.requireActual('date-fns') as {}),
  isToday: jest.fn(),
}));

type JestFunction = {
  mockImplementation: (arg: () => any) => void;
};

describe('TodayText', () => {
  it('should render the correct text', () => {
    render(<TodayText notToday="test1" today="test2" date={new Date()} />);
    screen.getByText(/test1/);

    ((dateFns.isToday as unknown) as JestFunction).mockImplementation(
      () => true
    );

    render(<TodayText notToday="test1" today="test2" date={new Date()} />);
    screen.getByText(/test2/);
  });
});
