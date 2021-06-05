import React, { useEffect, useState } from 'react';
import { isToday } from 'date-fns';
import MoodLogItem from '../MoodLogItem';
import { getDataForDay, deleteMoodLog } from '../../helpers';
import NothingHere from '../NothingHere';

type MoodLogSectionProps = {
  date: Date;
  className: string;
  resetCurrentMood: () => void;
};

const MoodLogSection: React.FunctionComponent<MoodLogSectionProps> = (props: MoodLogSectionProps) => {
  const { date, className, resetCurrentMood } = props;

  const [moodLog, setMoodLog] = useState<MoodLog[]>(getDataForDay().moodLog);

  useEffect(() => {
    setMoodLog(getDataForDay(date).moodLog);
  }, [date]);

  const onDelete = (id: string) => {
    const isLatest = deleteMoodLog(date, id);
    setMoodLog(getDataForDay(date).moodLog);
    if (isLatest) resetCurrentMood();
  };

  return (
    <section className={className}>
      <h2>{isToday(date) ? "Today's mood log" : 'Mood log'}</h2>
      <ol>
        {moodLog.length ? (
          moodLog.map((log: MoodLog) => <MoodLogItem {...log} key={log.id} onDelete={(id) => onDelete(id)} />)
        ) : (
          <NothingHere />
        )}
      </ol>
    </section>
  );
};

export default MoodLogSection;
