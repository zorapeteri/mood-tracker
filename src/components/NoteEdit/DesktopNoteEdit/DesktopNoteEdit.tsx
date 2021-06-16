import React, { useState } from 'react';
import Modal from '../../Modal';
import TextField from '../../TextField';

type DesktopNoteEditProps = {
  note: Note;
  close: () => void;
  saveNote: (note: Note) => void;
};

const DesktopNoteEdit: React.FunctionComponent<DesktopNoteEditProps> = (
  props: DesktopNoteEditProps,
) => {
  const { close, saveNote } = props;

  const [note, setNote] = useState<Note>(props.note);

  const onChange = (text: string) => {
    if (!text) return 'You cannot save an empty note';
    setNote({ ...note, time: new Date(), text });
    return true;
  };

  return (
    <Modal
      title="Note"
      buttonText="Save"
      onButtonClick={() => {
        saveNote(note);
        close();
      }}
      onClose={() => close()}
    >
      <TextField
        defaultValue={note.text}
        placeholder="Start typing your note..."
        rows={4}
        onChange={text => onChange(text)}
      />
    </Modal>
  );
};

export default DesktopNoteEdit;
