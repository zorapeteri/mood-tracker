import React, { useContext } from 'react';
import { MoodContext } from '../../context/MoodContext';
import moods from '../../moods';
import './MoodPicker.scss';

const MoodPicker: React.FC = () => {
  const { isPicking, pickMood } = useContext(MoodContext);

  return (
    <section className={['mood-picker', isPicking ? 'picking' : ''].join(' ')}>
      {Object.keys(moods).map(
        (mood) =>
          (mood !== 'none' || isPicking) && (
            <button
              type="button"
              className="mood"
              key={mood}
              onClick={() => {
                pickMood(mood);
              }}
            >
              <div
                className="mood-color"
                style={{
                  backgroundColor: (moods as any)[mood],
                  border: mood === 'none' ? '1.5px solid black' : '',
                }}
              >
                {' '}
              </div>
              <span className="mood-name">{mood}</span>
            </button>
          ),
      )}
    </section>
  );
};

export default MoodPicker;
