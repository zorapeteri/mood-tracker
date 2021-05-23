import React, { useState, useEffect } from 'react';
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
  const [month, setMonth] = useState<Date>(new Date());
  const [date, setDate] = useState<Date>(new Date());
  const [moodLog, setMoodLog] = useState<MoodLog[]>(getDataForDay(date).moodLog);
  const [notes, setNotes] = useState<Note[]>(getDataForDay(date).notes);

  useEffect(() => {
    setMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    setMoodLog(getDataForDay(date).moodLog);
    setNotes(getDataForDay(date).notes);
  }, [date]);

  useEffect(() => {
    if (activeView === 'today') setDate(new Date());
  }, [activeView]);

  return (
    <div className={style.app}>
      <button className={style.hamburgerMenu}>
        <IoMenu />
      </button>
      <h1 className={style.greeting}>Hi {name}!</h1>
      <ViewToggle activeToggle={activeView} onChange={(option) => setActiveView(option)} />
      {activeView === 'today' ? (
        currentMood ? (
          <CurrentMoodCard currentMood={currentMood} />
        ) : (
          <Button color="secondary" fontSize="1em" padding="1em 2em" className={style.recordYourMoodButton}>
            Record your mood
          </Button>
        )
      ) : (
        <Calendar
          month={month}
          date={date}
          startsOnSunday={startsOnSunday}
          daysWithData={getDaysAvailableInMonth(month)}
          onChange={(date) => setDate(date)}
          onMonthViewChange={(direction) => {
            setMonth(new Date(month.getFullYear(), month.getMonth() + direction, 1));
          }}
        />
      )}
      <section className={style.moodLog}>
        <h2>{activeView === 'today' ? "Today's mood log" : 'Mood log'}</h2>
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
          <h2>{activeView === 'today' ? 'Notes for today' : 'Notes'}</h2>
          <Button color="secondary" circular={true} fontSize="20px" padding="0">
            <IoAdd />
          </Button>
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
