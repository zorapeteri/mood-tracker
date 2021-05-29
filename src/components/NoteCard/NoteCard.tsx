import React, { useState } from 'react';
import style from './NoteCard.module.scss';
import useLongPress from '../../hooks/useLongPress';

import ClampLines from 'react-clamp-lines';

import { IoClose, IoTrashOutline } from 'react-icons/io5';
import { format } from 'date-fns';

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

  const setupListener = () => {
    const listener = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).matches(`.${style.handheldDeleteOverlay} *`)) {
        setLongPressed(false);
        document.removeEventListener('click', listener);
      }
    };
    document.addEventListener('click', listener);
  };

  const longPress = {
    ...useLongPress(() => {
      setLongPressed(true);
      setupListener();
    }),
  };

  return (
    <div className={`${style.noteCard} ${isLongPressed && style.longPressed}`} style={{ maxWidth: width }} tabIndex={0} {...longPress}>
      <span className={style.time}>{format(time, 'hh:mm a')}</span>
      <ClampLines id="note" text={text} className={style.note} buttons={false} />
      {isLongPressed && (
        <div className={style.handheldDeleteOverlay}>
          <div className={style.handheldDeleteOverlayBlock}></div>
          <button className={style.handheldDeleteButton} title="delete this note" onClick={() => onDelete(id)}>
            <IoClose />
          </button>
        </div>
      )}
      <div className={style.desktopDeleteContainer}>
        <button className={style.desktopDeleteButton} title="delete this note" onClick={() => onDelete(id)}>
          <IoTrashOutline />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
