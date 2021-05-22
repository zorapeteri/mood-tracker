import React, { useState } from 'react';
import { IoAdd, IoMenu } from 'react-icons/io5';
import style from './App.module.scss';
import Button from './components/Button';
import CurrentMoodCard from './components/CurrentMoodCard';
import MoodLogItem from './components/MoodLogItem';
import NoteCard from './components/NoteCard';
import ViewToggle from './components/ViewToggle';
import { deleteMoodLog, deleteNote, getDataForDay, getLatestMood, getUserPreferences } from './helpers';

function App() {

  const { name, startsOnSunday } = getUserPreferences();

  const [activeToggle, setActiveToggle] = useState<'today' | 'calendar'>('today');
  const [currentMood, setCurrentMood] = useState<Mood | null>(getLatestMood());
  const [date, setDate] = useState<Date>(new Date());
  const [moodLog, setMoodLog] = useState<MoodLog[]>(getDataForDay(date).moodLog);
  const [notes, setNotes] = useState<Note[]>(getDataForDay(date).notes);

  return (
    <div className={style.app}>
      <button className={style.hamburgerMenu}>
        <IoMenu />
      </button>
      <h1 className={style.greeting}>Hi {name}!</h1>
      <ViewToggle activeToggle={activeToggle} onChange={(option) => setActiveToggle(option)} />
      {currentMood ? (
        <CurrentMoodCard currentMood={currentMood} />
      ) : (
        <Button color="secondary" fontSize="1em" padding="1em 2em">
          Record your mood
        </Button>
      )}
      <section className={style.moodLog}>
        <h2>Today's mood log</h2>
        <div className={style.listContainer}>
          {moodLog.length ? (
            moodLog.map((log: MoodLog) => (
              <MoodLogItem
                {...log}
                key={log.id}
                onDelete={(id) => {
                  deleteMoodLog(date, id);
                  setMoodLog(getDataForDay(date).moodLog);
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
          <h2>Notes for today</h2>
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
                  console.log(getDataForDay(date));
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
