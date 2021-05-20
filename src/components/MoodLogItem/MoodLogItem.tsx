import React, { useState } from 'react';
import style from './MoodLogItem.module.scss';
import moodNames from '../../moodNames';
import useLongPress from '../../hooks/useLongPress';

import { IoClose, IoTrashOutline } from 'react-icons/io5';

type MoodLogItemProps = {
  mood: Mood;
  time: string;
  width?: string;
};

const MoodLogItem: React.FunctionComponent<MoodLogItemProps> = (props: MoodLogItemProps) => {
  const { mood, time, width } = props;

  const [isLongPressed, setLongPressed] = useState<boolean>(false);

  const longPress = { ...useLongPress(() => setLongPressed(true)), onBlur: () => setLongPressed(false) };

  return (
    <div className={`${style.moodLogItem} ${isLongPressed && style.longPressed}`} style={{ maxWidth: width }} tabIndex={0} {...longPress}>
      <img src={`${process.env.PUBLIC_URL}/assets/moods/${mood}.png`} alt={`${moodNames[mood]} mood emoji icon`} />
      <span>{time}</span>
      {isLongPressed && (
        <div className={style.handheldDeleteOverlay}>
          <div className={style.handheldDeleteOverlayBlock}></div>
          <button className={style.handheldDeleteButton} title="delete this mood log item">
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
