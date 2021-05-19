import React from 'react';
import style from './CurrentMoodCard.module.scss';
import moodNames from '../../moodNames';
import Button from '../Button';

type CurrentMoodCardProps = {
  currentMood: Mood;
  width?: string;
};

const CurrentMoodCard: React.FunctionComponent<CurrentMoodCardProps> = (props: CurrentMoodCardProps) => {
  const { currentMood, width } = props;

  return (
    <div className={style.currentMoodCard} style={{ maxWidth: width }}>
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
