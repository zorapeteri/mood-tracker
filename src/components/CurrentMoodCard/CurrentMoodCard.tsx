import React from 'react';
import style from './CurrentMoodCard.module.scss';
import moodNames from '../../moodNames';
import Button from '../Button';

type CurrentMoodCardProps = {
  currentMood: Mood;
  className?: string;
};

const CurrentMoodCard: React.FunctionComponent<CurrentMoodCardProps> = (props: CurrentMoodCardProps) => {
  const { currentMood, className } = props;

  return (
    <div className={`${style.currentMoodCard} ${className}`}>
      <span>Your mood is</span>
      <div className={style.mood}>
        <img src={`${process.env.PUBLIC_URL}/assets/moods/${currentMood}.png`} alt={`${moodNames[currentMood]} mood emoji icon`} />
        <span>{moodNames[currentMood]}</span>
      </div>
      <Button color="primary" fontSize="11px" padding="1em 2em">
        Change
      </Button>
    </div>
  );
};

export default CurrentMoodCard;
