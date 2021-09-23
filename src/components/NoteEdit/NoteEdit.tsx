import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import Modal from '../Modal';
import TextField from '../TextField';

const NoteEdit: React.FunctionComponent = () => {

  const { editingNote, setEditingNote, saveNote } = useContext(Context);

  const [note, setNote] = useState<Note>(editingNote as Note);
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

  const close = () => setEditingNote(null);

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
      showOverlayShade={true}
    >
      <TextField
        defaultValue={note.text}
        placeholder="Start typing your note..."
        rows={4}
        onChange={text => onChange(text)}
        tall
      />
    </Modal>
  );
};

export default NoteEdit;
