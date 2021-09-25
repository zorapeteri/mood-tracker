import React from 'react';
import { render, screen } from '@testing-library/react';
import NotesSection from './';
import { getMockContext } from '../../utils';
import userEvent from '@testing-library/user-event';

const extendMockContext = {
  setEditingNote: jest.fn(),
};

const MockContext = getMockContext(extendMockContext);

describe('NotesSection', () => {
  it('should render the component', () => {
    render(
      <MockContext>
        <NotesSection />
      </MockContext>
    );

    screen.getByText(/notes/i);
  });

  it('should open note edit when creating new note', () => {
    render(
      <MockContext>
        <NotesSection />
      </MockContext>
    );

    userEvent.click(screen.getByTitle(/create/));
    expect(extendMockContext.setEditingNote).toHaveBeenCalled();
  });
});
