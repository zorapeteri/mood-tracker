import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../context/Context';
import { isToday } from 'date-fns';
import { IoMenu } from 'react-icons/io5';
import style from './Home.module.scss';
import Calendar from '../Calendar';
import CurrentMoodCard from '../CurrentMoodCard';
import ViewToggle from '../ViewToggle';
import NotesSection from '../NotesSection';
import MoodLogSection from '../MoodLogSection';
import RecordYourMoodButton from '../RecordYourMoodButton';
import Greeting from '../Greeting';
import useBreakpoint from 'use-breakpoint';
import BREAKPOINTS from '../../breakpoints';

const Home: React.FunctionComponent = () => {
  const { date, setDate, currentMood, setSettingsOpen } = useContext(Context);

  const [activeView, setActiveView] = useState<'today' | 'calendar'>('today');

  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  useEffect(() => {
    if (breakpoint !== 'large' && activeView === 'today' && !isToday(date)) setDate(new Date());
  }, [activeView, date, setDate, breakpoint]);

  return (
    <div className={`${style.home} ${style[`${activeView}View`]}`}>
      <button
        className={style.hamburgerMenu}
        title="open settings"
        onClick={() => setSettingsOpen(true)}
      >
        <IoMenu />
      </button>
      <Greeting />
      <ViewToggle
        activeToggle={activeView}
        onChange={option => setActiveView(option)}
        className={style.viewToggle}
      />
      {currentMood ? (
        <CurrentMoodCard className={style.currentMoodCard} />
      ) : (
        <RecordYourMoodButton className={style.recordYourMoodButton} />
      )}
      <Calendar className={style.calendar} />
      <MoodLogSection className={style.moodLog} />
      <NotesSection className={style.notes} />
    </div>
  );
};

export default Home;
