import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NoteEdit from './';
import { getMockContext } from '../../utils';

const extendMockContext = {
  editingNote: {
    id: '',
    date: new Date(),
    time: new Date(),
    text: 'test',
  },
  setEditingNote: jest.fn(),
  saveNote: jest.fn(),
};

const MockContext = getMockContext(extendMockContext);

describe('NoteEdit', () => {
  it('should render the component', () => {
    render(
      <MockContext>
        <NoteEdit />
      </MockContext>
    );

    screen.getByDisplayValue(extendMockContext.editingNote.text);
  });

  it('should be able to change the text', () => {
    render(
      <MockContext>
        <NoteEdit />
      </MockContext>
    );

    const textbox = screen.getByRole('textbox');

    userEvent.clear(textbox);
    userEvent.type(textbox, 'new text');

    expect(textbox).toHaveValue('new text');
  });

  it('should be able to save', () => {
    render(
      <MockContext>
        <NoteEdit />
      </MockContext>
    );

    userEvent.click(screen.getByText('Save'));

    expect(extendMockContext.saveNote).toHaveBeenCalledWith(
      extendMockContext.editingNote
    );
  });

  it('should be able to close', () => {
    render(
      <MockContext>
        <NoteEdit />
      </MockContext>
    );

    userEvent.click(screen.getByTitle(/close/));

    expect(extendMockContext.setEditingNote).toHaveBeenCalledWith(null);
  });
});
