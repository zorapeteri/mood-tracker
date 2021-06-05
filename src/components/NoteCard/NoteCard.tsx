import React, { useState, useRef } from 'react';
import style from './NoteCard.module.scss';
import useLongPress from '../../hooks/useLongPress';

import ClampLines from 'react-clamp-lines';

import { format } from 'date-fns';
import DeleteItemButton from '../DeleteItemButton';

type NoteCardProps = {
  id: string;
  time: Date;
  text: string;
  onDelete: (id: string) => void;
  width?: string;
};

const NoteCard: React.FunctionComponent<NoteCardProps> = (props: NoteCardProps) => {
  const { id, time, text, onDelete, width } = props;

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
  }

  const longPress = {
    ...useLongPress(() => {
      setLongPressed(true);
      setupListener();
    }),
  };

  return (
    <li
      className={`${style.noteCard} ${isLongPressed && style.longPressed}`}
      style={{ maxWidth: width }}
      tabIndex={0}
      {...longPress}
      ref={ref}
    >
      <span className={style.time}>{format(time, 'hh:mm a')}</span>
      <ClampLines id="note" text={text} className={style.note} buttons={false} />
      <DeleteItemButton
        isLongPressed={isLongPressed}
        title="delete this note"
        onDelete={() => onDelete(id)}
        side="left"
        className={style.desktopDeleteButton}
      />
    </li>
  );
};

export default NoteCard;
