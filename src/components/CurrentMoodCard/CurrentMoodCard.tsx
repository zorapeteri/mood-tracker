import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import style from './CurrentMoodCard.module.scss';
import moodNames from '../../moodNames';
import Button from '../Button';

type CurrentMoodCardProps = {
  className?: string;
};

const CurrentMoodCard: React.FunctionComponent<CurrentMoodCardProps> = (props: CurrentMoodCardProps) => {
  const { className } = props;

  const { currentMood, setPickingMood } = useContext(Context);

  return (
    <div className={`${style.currentMoodCard} ${className}`}>
      <span>Your mood is</span>
      <div className={style.mood}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/moods/${currentMood}.png`}
          alt={`${moodNames[currentMood as Mood]} mood emoji icon`}
        />
        <span>{moodNames[currentMood as Mood]}</span>
      </div>
      <Button
        color="primary"
        fontSize="11px"
        padding="1em 2em"
        onClick={() => setPickingMood(true)}
      >
        Change
      </Button>
    </div>
  );
};

export default CurrentMoodCard;
