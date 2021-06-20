import React, { createContext, useState, useEffect } from 'react';
import {
  getLatestMood,
  getUserPreferences,
  setUserPreferences as saveUserPreferencesToLS,
  deleteMoodLog as deleteMoodLogFromLS,
  saveMoodLog as saveMoodLogToLS,
  saveNote as saveNoteToLS,
  deleteNote as deleteNoteFromLS,
  getDataForDay,
} from '../helpers';

type ContextType = {
  date: Date;
  currentMood: Mood | null;
  editingNote: Note | null;
  setEditingNote: (note: Note | null) => void;
  saveNote: (note: Note) => void;
  deleteNote: (note: Note) => void;
  moodLog: MoodLog[];
  pickingMood: boolean;
  setPickingMood: (arg: boolean) => void;
  notes: Note[];
  userPreferences: UserPreferences | null;
  setUserPreferences: (arg: UserPreferences | null) => void;
  setDate: (date: Date) => void;
  resetCurrentMood: () => void;
  deleteMoodLog: (date: Date, id: string) => void;
  saveMoodLog: (mood: Mood) => void;
  settingsOpen: boolean;
  setSettingsOpen: (arg: boolean) => void;
};

const initialState: ContextType = {
  date: new Date(),
  currentMood: null,
  editingNote: null,
  setEditingNote: (note: Note | null) => {},
  saveNote: (note: Note) => {},
  deleteNote: (note: Note) => {},
  notes: [],
  moodLog: [],
  pickingMood: false,
  setPickingMood: (arg: boolean) => {},
  userPreferences: null,
  setUserPreferences: (arg: UserPreferences | null) => {},
  setDate: (date: Date) => {},
  resetCurrentMood: () => {},
  deleteMoodLog: (date: Date, id: string) => {},
  saveMoodLog: (mood: Mood) => {},
  settingsOpen: false,
  setSettingsOpen: (arg: boolean) => {},
};

export const Context = createContext<ContextType>(initialState);

const ContextProvider = (props: { children: any }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [currentMood, setCurrentMood] = useState<Mood | null>(getLatestMood());
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [moodLog, setMoodLog] = useState<MoodLog[]>([]);
  const [pickingMood, setPickingMood] = useState<boolean>(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(
    getUserPreferences(),
  );

  useEffect(() => {
    setMoodLog(getDataForDay(date).moodLog);
    setNotes(getDataForDay(date).notes);
  }, [date]);

  useEffect(() => {
    if (userPreferences) saveUserPreferencesToLS(userPreferences);
  }, [userPreferences]);

  const resetCurrentMood = () => setCurrentMood(null);

  const saveMoodLog = (mood: Mood) => {
    saveMoodLogToLS(mood);
    setMoodLog(getDataForDay().moodLog);
    setCurrentMood(mood);
  };

  const deleteMoodLog = (date: Date, id: string) => {
    const isLatest = deleteMoodLogFromLS(date, id);
    setMoodLog(getDataForDay(date).moodLog);
    if (isLatest) resetCurrentMood();
  };

  const saveNote = (note: Note) => {
    saveNoteToLS(note);
    setNotes(getDataForDay(date).notes);
  };

  const deleteNote = (note: Note) => {
    deleteNoteFromLS(note.date, note.id);
    setNotes(getDataForDay(date).notes);
  };

  return (
    <Context.Provider
      value={{
        date,
        setDate,
        currentMood,
        resetCurrentMood,
        deleteMoodLog,
        editingNote,
        saveNote,
        deleteNote,
        setEditingNote,
        moodLog,
        pickingMood,
        setPickingMood,
        saveMoodLog,
        notes,
        settingsOpen,
        setSettingsOpen,
        userPreferences,
        setUserPreferences,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
