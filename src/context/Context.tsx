import React, { createContext, useState, useEffect } from 'react';
import {
  getLatestMood,
  getUserPreferences,
  deleteMoodLog as deleteMoodLogFromLS,
  getDataForDay,
} from '../helpers';

type UserPreferencesType = {
  name: string;
  startsOnSunday: boolean;
};

type ContextType = {
  date: Date;
  month: Date;
  currentMood: Mood | null;
  editingNote: Note | null;
  moodLog: Mood[];
  notes: Note[];
  userPreferences: UserPreferencesType | null;
  setDate: (date: Date) => void;
  resetCurrentMood: () => void;
  deleteMoodLog: (date: Date, id: string) => void;
};

const initialState: ContextType = {
  date: new Date(),
  month: new Date(),
  currentMood: null,
  editingNote: null,
  notes: [],
  moodLog: [],
  userPreferences: {
    name: '',
    startsOnSunday: false,
  },
  setDate: (date: Date) => {},
  resetCurrentMood: () => {},
  deleteMoodLog: (date: Date, id: string) => {},
};

export const Context = createContext<ContextType>(initialState);

const ContextProvider = (props: { children: any }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  const [currentMood, setCurrentMood] = useState<Mood | null>(getLatestMood());
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [moodLog, setMoodLog] = useState<Mood[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferencesType | null>(
    getUserPreferences(),
  );

  useEffect(() => {
    setMoodLog(getDataForDay(date).moodLog);
  }, [date]);

  const resetCurrentMood = () => setCurrentMood(null);

  const deleteMoodLog = (date: Date, id: string) => {
    const isLatest = deleteMoodLogFromLS(date, id);
    setMoodLog(getDataForDay(date).moodLog);
    if (isLatest) resetCurrentMood();
  };

  return (
    <Context.Provider
      value={{
        date,
        setDate,
        month,
        currentMood,
        resetCurrentMood,
        deleteMoodLog,
        editingNote,
        moodLog,
        notes,
        userPreferences,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
