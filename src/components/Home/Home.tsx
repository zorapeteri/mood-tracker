import React, { useState, useEffect } from 'react';
import { isToday } from 'date-fns';
import { IoMenu } from 'react-icons/io5';
import style from './Home.module.scss';
import Calendar from '../Calendar';
import CurrentMoodCard from '../CurrentMoodCard';
import ViewToggle from '../ViewToggle';
import { getLatestMood, saveMoodLog } from '../../helpers';
import NotesSection from '../NotesSection';
import MoodLogSection from '../MoodLogSection';
import RecordYourMoodButton from '../RecordYourMoodButton';
import Greeting from '../Greeting';
import useBreakpoint from 'use-breakpoint';
import BREAKPOINTS from '../../breakpoints';

type HomeProps = {
  saveMood: () => void;
};

const Home: React.FunctionComponent<HomeProps> = (props: HomeProps) => {
  const { saveMood } = props;

  const [activeView, setActiveView] = useState<'today' | 'calendar'>('today');
  const [currentMood, setCurrentMood] = useState<Mood | null>(getLatestMood());
  const [date, setDate] = useState<Date>(new Date());

  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  useEffect(() => {
    if (breakpoint !== 'large' && activeView === 'today' && !isToday(date)) setDate(new Date());
  }, [activeView, date, breakpoint]);

  return (
    <div className={`${style.home} ${style[`${activeView}View`]}`}>
      <button className={style.hamburgerMenu}>
        <IoMenu />
      </button>
      <Greeting />
      <ViewToggle activeToggle={activeView} onChange={(option) => setActiveView(option)} className={style.viewToggle} />
      {currentMood ? (
        <CurrentMoodCard currentMood={currentMood} className={style.currentMoodCard} onChangeClick={() => saveMood()} />
      ) : (
        <RecordYourMoodButton className={style.recordYourMoodButton} onClick={() => saveMood()} />
      )}
      <Calendar date={date} onChange={(date) => setDate(date)} className={style.calendar} />
      <MoodLogSection className={style.moodLog} date={date} resetCurrentMood={() => setCurrentMood(null)} />
      <NotesSection className={style.notes} date={date} />
    </div>
  );
};

export default Home;
