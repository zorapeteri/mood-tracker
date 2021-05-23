import React, { useState } from 'react';
import style from './MoodLogItem.module.scss';
import moodNames from '../../moodNames';
import useLongPress from '../../hooks/useLongPress';

import { IoClose, IoTrashOutline } from 'react-icons/io5';
import { format } from 'date-fns';

type MoodLogItemProps = {
  id: string;
  mood: Mood;
  time: Date;
  onDelete: (id: string) => void;
  className?: string;
};

const MoodLogItem: React.FunctionComponent<MoodLogItemProps> = (props: MoodLogItemProps) => {
  const { id, mood, time, onDelete, className } = props;

  const [isLongPressed, setLongPressed] = useState<boolean>(false);

  const setupListener = () => {
    const listener = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).matches(`.${style.handheldDeleteOverlay} *`)) {
        setLongPressed(false);
        document.removeEventListener('click', listener);
      }
    };
    document.addEventListener('click', listener);
  }

  const longPress = { ...useLongPress(() => { setLongPressed(true); setupListener(); }) };

  return (
    <div className={`${style.moodLogItem} ${isLongPressed && style.longPressed} ${className}`} {...longPress}>
      <img src={`${process.env.PUBLIC_URL}/assets/moods/${mood}.png`} alt={`${moodNames[mood]} mood emoji icon`} />
      <span>{format(time, 'hh:mm a')}</span>
      {isLongPressed && (
        <div className={style.handheldDeleteOverlay}>
          <div className={style.handheldDeleteOverlayBlock}></div>
          <button className={style.handheldDeleteButton} title="delete this mood log item" onClick={() => onDelete(id)}>
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

export default MoodLogItem;
