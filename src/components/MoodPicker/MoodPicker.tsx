import React from 'react';
import { IoClose } from 'react-icons/io5';
import { getUserPreferences, saveMoodLog } from '../../helpers';
import MoodOptionCard from '../MoodOptionCard';
import style from './MoodPicker.module.scss';

type MoodPickerProps = {
  close: () => void;
};

const MoodPicker: React.FunctionComponent<MoodPickerProps> = (props: MoodPickerProps) => {
  const { close } = props;

  const onChoose = (mood: Mood) => {
    saveMoodLog(mood);
    close();
  };

  return (
    <div className={style.moodPicker}>
      <button className={style.closeButton} onClick={() => close()} title="close mood picking dialog">
        <IoClose />
      </button>
      <h1>
        Hi {getUserPreferences().name}!<br />
        How are you feeling?
      </h1>
      <ol>
        {([1, 2, 3, 4, 5] as Mood[]).map((mood) => (
          <MoodOptionCard key={mood} mood={mood} onChoose={(mood) => onChoose(mood)} />
        ))}
      </ol>
    </div>
  );
};

export default MoodPicker;
