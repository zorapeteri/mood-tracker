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
  const [disabled, setDisabled] = useState<boolean>(false);

  const onChange = (text: string) => {
    if (!text) {
      setDisabled(true);
      return 'You cannot save an empty note';
    }
    setDisabled(false);
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
      disableButton={disabled}
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
