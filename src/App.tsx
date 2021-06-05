import React, { useState, useEffect } from 'react';
import { isToday } from 'date-fns';
import { IoMenu } from 'react-icons/io5';
import style from './App.module.scss';
import Calendar from './components/Calendar';
import CurrentMoodCard from './components/CurrentMoodCard';
import ViewToggle from './components/ViewToggle';
import { getLatestMood } from './helpers';
import NotesSection from './components/NotesSection';
import MoodLogSection from './components/MoodLogSection';
import RecordYourMoodButton from './components/RecordYourMoodButton';
import Greeting from './components/Greeting';
import useBreakpoint from 'use-breakpoint';
import BREAKPOINTS from './breakpoints';


function App() {
  const [activeView, setActiveView] = useState<'today' | 'calendar'>('today');
  const [currentMood, setCurrentMood] = useState<Mood | null>(getLatestMood());
  const [date, setDate] = useState<Date>(new Date());

  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  useEffect(() => {
    if (breakpoint !== 'large' && activeView === 'today' && !isToday(date)) setDate(new Date());
  }, [activeView, date, breakpoint]);

  return (
    <div className={`${style.app} ${style[`${activeView}View`]}`}>
      <button className={style.hamburgerMenu}>
        <IoMenu />
      </button>
      <Greeting />
      <ViewToggle activeToggle={activeView} onChange={(option) => setActiveView(option)} className={style.viewToggle} />
      {currentMood ? (
        <CurrentMoodCard currentMood={currentMood} className={style.currentMoodCard} />
      ) : (
        <RecordYourMoodButton className={style.recordYourMoodButton} />
      )}
      <Calendar date={date} onChange={(date) => setDate(date)} className={style.calendar} />
      <MoodLogSection className={style.moodLog} date={date} resetCurrentMood={() => setCurrentMood(null)} />
      <NotesSection className={style.notes} date={date} />
    </div>
  );
}

export default App;
