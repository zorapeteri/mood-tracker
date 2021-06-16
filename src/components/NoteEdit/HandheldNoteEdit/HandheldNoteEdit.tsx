import React, { useState, useRef } from 'react';
import { IoArrowBack, IoCheckmark } from 'react-icons/io5';
import Button from '../../Button';
import style from './HandheldNoteEdit.module.scss';

type HandheldNoteEditProps = {
  note: Note;
  close: () => void;
  saveNote: (note: Note) => void;
};

const HandheldNoteEdit: React.FunctionComponent<HandheldNoteEditProps> = (
  props: HandheldNoteEditProps,
) => {
  const { close, note, saveNote } = props;

  const [showAlert, setShowAlert] = useState<boolean>(false);

  let ref = useRef<HTMLTextAreaElement | null>(null);

  return (
    <>
        {showAlert && <NoEmptyNoteAlert close={() => setShowAlert(false)} />}
        <div className={style.handheldNoteEdit}>
          <nav className={style.nav}>
            <button title="close note editing" onClick={() => close()}>
              <IoArrowBack />
            </button>
            <h1>Note</h1>
            <button
              title="save note"
              onClick={() => {
                if (!ref?.current?.value) {
                  setShowAlert(true);
                  return;
                }
                saveNote({ ...note, text: ref?.current?.value });
                close();
              }}
            >
              <IoCheckmark />
            </button>
          </nav>
          <textarea
            placeholder="Start typing your note..."
            maxLength={10000}
            ref={ref}
            defaultValue={note.text}
            autoFocus
            spellCheck={false}
          />
        </div>
    </>
  );
};

const NoEmptyNoteAlert = (props: { close: () => void }) => {
  return (
    <div className={style.noEmptyNoteOverlay}>
      <div className={style.noEmptyNote}>
        <p>You cannot save an empty note.</p>
        <Button color="primary" fontSize="1em" padding="10px" onClick={() => props.close()}>OK</Button>
      </div>
    </div>
  );
};

export default HandheldNoteEdit;
