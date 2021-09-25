import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import { isToday } from 'date-fns';
import MoodLogItem from '../MoodLogItem';
import NothingHere from '../NothingHere';

type MoodLogSectionProps = {
  className?: string;
};

const MoodLogSection: React.FunctionComponent<MoodLogSectionProps> = (props: MoodLogSectionProps) => {
  const { className } = props;

  const { date, moodLog, deleteMoodLog } = useContext(Context);

  const onDelete = (id: string) => {
    deleteMoodLog(date, id);
  };

  return (
    <section className={className}>
      <h2>{isToday(date) ? "Today's mood log" : 'Mood log'}</h2>
      <ol>
        {moodLog.length ? (
          moodLog.map((log: MoodLog) => (
            <MoodLogItem {...log} key={log.id} onDelete={id => onDelete(log.id)} />
          ))
        ) : (
          <li>
            <NothingHere />
          </li>
        )}
      </ol>
    </section>
  );
};

export default MoodLogSection;
