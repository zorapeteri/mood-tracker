import React, { useState, useRef } from 'react';
import style from './MoodLogItem.module.scss';
import moodNames from '../../moodNames';
import useLongPress from '../../hooks/useLongPress';

import { format } from 'date-fns';
import DeleteItemButton from '../DeleteItemButton';

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

  const longPress = { ...useLongPress(() => { setLongPressed(true); setupListener(); }) };

  return (
    <li className={`${style.moodLogItem} ${isLongPressed && style.longPressed} ${className}`} {...longPress} ref={ref}>
      <img src={`${process.env.PUBLIC_URL}/assets/moods/${mood}.png`} alt={`${moodNames[mood]} mood emoji icon`} />
      <span>{format(time, 'hh:mm a')}</span>
      <DeleteItemButton
        isLongPressed={isLongPressed}
        title="delete this mood log item"
        onDelete={() => onDelete(id)}
        side="right"
        className={style.desktopDeleteButton}
      />
    </li>
  );
};

export default MoodLogItem;
