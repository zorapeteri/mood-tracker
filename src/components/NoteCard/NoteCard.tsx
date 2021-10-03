import React, { useState, useRef } from 'react';
import style from './NoteCard.module.scss';
import { useLongPress } from 'use-long-press';

import ClampLines from 'react-clamp-lines';

import { format, isSameDay } from 'date-fns';
import DeleteItemButton from '../DeleteItemButton';

type NoteCardProps = {
  note: Note;
  onDelete: (id: string) => void;
  width?: string;
  onClick: () => void;
};

const NoteCard: React.FunctionComponent<NoteCardProps> = (
  props: NoteCardProps
) => {
  const { note, onDelete, width, onClick } = props;

  const [isLongPressed, setLongPressed] = useState<boolean>(false);

  let ref = useRef<HTMLLIElement | null>(null);

  const setupListener = () => {
    const listener = (e: MouseEvent) => {
      if (!e.composedPath().includes(ref.current as HTMLLIElement)) {
        setLongPressed(false);
        document.removeEventListener('click', listener);
      }
    };
    document.addEventListener('click', listener);
  };

  const longPress = useLongPress(() => {
    setLongPressed(true);
    setupListener();
  });

  return (
    <li
      className={`${style.noteCard} ${isLongPressed && style.longPressed}`}
      style={{ maxWidth: width }}
      tabIndex={0}
      {...longPress}
      ref={ref}
      onClick={() => {
        if (!isLongPressed) {
          onClick();
        }
      }}
      data-testid="NoteCard"
    >
      {isSameDay(note.date, note.time) && (
        <span className={style.time}>{format(note.time, 'hh:mm a')}</span>
      )}
      <ClampLines
        id="note"
        text={note.text}
        className={style.note}
        buttons={false}
      />
      <DeleteItemButton
        isLongPressed={isLongPressed}
        title="delete this note"
        onDelete={() => onDelete(note.id)}
        side="left"
        className={style.desktopDeleteButton}
      />
    </li>
  );
};

export default NoteCard;
