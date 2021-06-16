import React, { useRef } from 'react';
import { IoArrowBack, IoCheckmark } from 'react-icons/io5';
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

  let ref = useRef<HTMLTextAreaElement | null>(null);

  return (
    <div className={style.handheldNoteEdit}>
      <nav className={style.nav}>
        <button title="close note editing" onClick={() => close()}>
          <IoArrowBack />
        </button>
        <h1>Note</h1>
        <button
          title="save note"
          onClick={() => {
            saveNote({ ...note, text: ref?.current?.value || '' });
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
  );
};

export default HandheldNoteEdit;
