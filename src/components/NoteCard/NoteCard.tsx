import React, { useState } from 'react';
import style from './NoteCard.module.scss';
import useLongPress from '../../hooks/useLongPress';

import ClampLines from 'react-clamp-lines';

import { IoClose, IoTrashOutline } from 'react-icons/io5';

type NoteCardProps = {
  time: string;
  note: string;
  width?: string;
};

const NoteCard: React.FunctionComponent<NoteCardProps> = (props: NoteCardProps) => {
  const { time, note, width } = props;

  const [isLongPressed, setLongPressed] = useState<boolean>(false);

  const longPress = { ...useLongPress(() => setLongPressed(true)), onBlur: () => setLongPressed(false) };

  return (
    <div className={`${style.noteCard} ${isLongPressed && style.longPressed}`} style={{ maxWidth: width }} tabIndex={0} {...longPress}>
      <span className={style.time}>{time}</span>
      <ClampLines id="note" text={note} className={style.note} buttons={false} />
      {isLongPressed && (
        <div className={style.handheldDeleteOverlay}>
          <div className={style.handheldDeleteOverlayBlock}></div>
          <button className={style.handheldDeleteButton} title="delete this note">
            <IoClose />
          </button>
        </div>
      )}
      <div className={style.desktopDeleteContainer}>
        <button className={style.desktopDeleteButton}>
          <IoTrashOutline />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
