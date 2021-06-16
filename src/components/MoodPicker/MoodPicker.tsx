import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import { IoClose } from 'react-icons/io5';
import MoodOptionCard from '../MoodOptionCard';
import style from './MoodPicker.module.scss';

const MoodPicker: React.FunctionComponent = () => {
  const { saveMoodLog, setPickingMood, userPreferences } = useContext(Context);

  const close = () => setPickingMood(false);

  const onChoose = (mood: Mood) => {
    saveMoodLog(mood);
    close();
  };

  return (
    <div className={style.moodPicker}>
      <button
        className={style.closeButton}
        onClick={() => close()}
        title="close mood picking dialog"
      >
        <IoClose />
      </button>
      <h1>
        Hi {userPreferences?.name}!<br />
        How are you feeling?
      </h1>
      <ol>
        {([1, 2, 3, 4, 5] as Mood[]).map(mood => (
          <MoodOptionCard key={mood} mood={mood} onChoose={mood => onChoose(mood)} />
        ))}
      </ol>
    </div>
  );
};

export default MoodPicker;
