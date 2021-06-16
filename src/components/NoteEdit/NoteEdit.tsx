import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import useBreakpoint from 'use-breakpoint';
import BREAKPOINTS from '../../breakpoints';
import DesktopNoteEdit from './DesktopNoteEdit';
import HandheldNoteEdit from './HandheldNoteEdit';

const NoteEdit: React.FunctionComponent = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const { editingNote, setEditingNote, saveNote } = useContext(Context);

  if (breakpoint === 'large') {
    return (
      <DesktopNoteEdit
        note={editingNote as Note}
        close={() => setEditingNote(null)}
        saveNote={(note: Note) => saveNote(note)}
      />
    );
  }

  return (
    <HandheldNoteEdit
      note={editingNote as Note}
      close={() => setEditingNote(null)}
      saveNote={(note: Note) => saveNote(note)}
    />
  );
};

export default NoteEdit;
