import React from 'react';
import { render, screen } from '@testing-library/react';
import NotesSection from './';
import { getMockContext } from '../../utils';
import userEvent from '@testing-library/user-event';

const extendMockContext = {
  setEditingNote: jest.fn(),
  deleteNote: jest.fn(),
  notes: [
    {
      id: '',
      date: new Date(),
      time: new Date(),
      text: 'test',
    },
  ],
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

  it('should set editing note on click', () => {
    render(
      <MockContext>
        <NotesSection />
      </MockContext>
    );

    userEvent.click(screen.getByText(/test/));
    expect(extendMockContext.setEditingNote).toHaveBeenCalled();
  });

  it('should call deleteNote', () => {
    render(
      <MockContext>
        <NotesSection />
      </MockContext>
    );

    userEvent.click(screen.getByTitle(/delete/));
    expect(extendMockContext.deleteNote).toHaveBeenCalled();
  });

  it('should work with empty note list', () => {
    const MockContextWithEmptyNoteList = getMockContext({});

    render(
      <MockContextWithEmptyNoteList>
        <NotesSection />
      </MockContextWithEmptyNoteList>
    );

    expect(screen.queryByTestId('NoteCard')).toBeFalsy();
  });
});
