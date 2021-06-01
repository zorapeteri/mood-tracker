import React, { useState, useEffect } from 'react';
import { isToday } from 'date-fns';
import { IoAdd, IoMenu } from 'react-icons/io5';
import style from './App.module.scss';
import Button from './components/Button';
import Calendar from './components/Calendar';
import CurrentMoodCard from './components/CurrentMoodCard';
import MoodLogItem from './components/MoodLogItem';
import NoteCard from './components/NoteCard';
import ViewToggle from './components/ViewToggle';
import { deleteMoodLog, deleteNote, getDataForDay, getDaysAvailableInMonth, getLatestMood, getUserPreferences } from './helpers';


function App() {
  const { name, startsOnSunday } = getUserPreferences();

  const [activeView, setActiveView] = useState<'today' | 'calendar'>('today');
  const [currentMood, setCurrentMood] = useState<Mood | null>(getLatestMood());
  const [date, setDate] = useState<Date>(new Date());

  const [moodLog, setMoodLog] = useState<MoodLog[]>(getDataForDay(date).moodLog);
  const [notes, setNotes] = useState<Note[]>(getDataForDay(date).notes);

  useEffect(() => {
    const dataForDay = getDataForDay(date);
    setMoodLog(dataForDay.moodLog);
    setNotes(dataForDay.notes);
  }, [date]);

  useEffect(() => {
    if (activeView === 'today' && !isToday(date)) setDate(new Date());
  }, [activeView, date]);

  return (
    <div className={`${style.app} ${style[`${activeView}View`]}`}>
      <button className={style.hamburgerMenu}>
        <IoMenu />
      </button>
      <h1 className={style.greeting}>Hi {name}!</h1>
      <ViewToggle activeToggle={activeView} onChange={(option) => setActiveView(option)} className={style.viewToggle} />
      {currentMood ? (
        <CurrentMoodCard currentMood={currentMood} className={style.currentMoodCard} />
      ) : (
        <Button color="secondary" fontSize="1em" padding="1em 2em" className={style.recordYourMoodButton}>
          Record your mood
        </Button>
      )}
      <Calendar
        date={date}
        startsOnSunday={startsOnSunday}
        onChange={(date) => setDate(date)}
        className={style.calendar}
      />
      <section className={style.moodLog}>
        <h2 className={style.moodLogHeader}>{isToday(date) ? "Today's mood log" : 'Mood log'}</h2>
        <div className={style.listContainer}>
          {moodLog.length ? (
            moodLog.map((log: MoodLog) => (
              <MoodLogItem
                {...log}
                key={log.id}
                onDelete={(id) => {
                  const isLatest = deleteMoodLog(date, id);
                  setMoodLog(getDataForDay(date).moodLog);
                  if (isLatest) setCurrentMood(null);
                }}
              />
            ))
          ) : (
            <p className={style.listIsEmpty}>There's nothing here so far...</p>
          )}
        </div>
      </section>
      <section className={style.notes}>
        <div className={style.notesHeaderContainer}>
          <h2>
            {isToday(date) ? 'Notes for today' : 'Notes'}
            <Button color="secondary" circular={true} fontSize="20px" padding="0">
              <IoAdd />
            </Button>
          </h2>
        </div>
        <div className={style.listContainer}>
          {notes.length ? (
            notes.map((note: Note) => (
              <NoteCard
                key={note.id}
                {...note}
                onDelete={(id) => {
                  deleteNote(date, id);
                  setNotes(getDataForDay(date).notes);
                }}
              />
            ))
          ) : (
            <p className={style.listIsEmpty}>There's nothing here so far...</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
