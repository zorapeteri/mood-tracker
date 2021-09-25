import React from 'react';
import { isToday } from 'date-fns';

type TodayTextProps = {
  today: string;
  notToday: string;
  date: Date;
};

const TodayText: React.FunctionComponent<TodayTextProps> = (
  props: TodayTextProps
) => {
  const { today, notToday, date } = props;

  return <span>{isToday(date) ? today : notToday}</span>;
};

export default TodayText;
