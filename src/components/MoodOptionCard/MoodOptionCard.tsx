import React from 'react';
import Button from '../Button';
import moodNames from '../../moodNames';

import style from './MoodOptionCard.module.scss';

type MoodOptionCardProps = {
  mood: Mood;
  onChoose?: (mood: Mood) => void;
};

const MoodOptionCard: React.FunctionComponent<MoodOptionCardProps> = (props: MoodOptionCardProps) => {
  const { mood, onChoose } = props;

  return (
    <Button
      className={style.moodOptionCard}
      color="secondary"
      fontSize="20px"
      padding="13px 90px"
      onClick={() => onChoose && onChoose(mood)}
    >
      <img src={`${process.env.PUBLIC_URL}/assets/moods/${mood}.png`} alt={`${moodNames[mood]} mood emoji icon`} />
      <span>{moodNames[mood]}</span>
    </Button>
  );
};

export default MoodOptionCard;
