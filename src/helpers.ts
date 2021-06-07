import { format as formatDate, startOfMonth, isSameMonth, addDays } from 'date-fns';
import { v4 as uuid } from 'uuid';
import dateParser from './dateParser';

const format = (date: Date) => formatDate(date, 'yyyy/MM/dd');

const ls = {
  get: localStorage.getItem.bind(localStorage),
  set: localStorage.setItem.bind(localStorage),
  remove: localStorage.removeItem.bind(localStorage),
  clear: localStorage.clear.bind(localStorage),
};

export const isMood = (value: any): value is Mood => {
  return [1, 2, 3, 4, 5].includes(value);
};

export const getUserPreferences = () => {
  return JSON.parse(ls.get('preferences') || '{}');
};

export const setUserPreferences = (preferences: UserPreferences) => {
  ls.set(
    'preferences',
    JSON.stringify({
      ...getUserPreferences(),
      ...preferences,
    }),
  );
};

export const getDaysAvailableInMonth = (month: Date) => {
  const daysAvailable = [];
  for (let i = startOfMonth(month); isSameMonth(i, month); i = addDays(i, 1)) {
    if (ls.get(format(i))) daysAvailable.push(i.getDate());
  }
  return daysAvailable;
};

export const getDataForDay = (day: Date = new Date()) => {
  const stored = ls.get(format(day));
  if (stored) return JSON.parse(stored, dateParser);
  return { moodLog: [], notes: [] };
};

export const saveMoodLog = (mood: Mood) => {
  const today = getDataForDay();
  const id = uuid();
  ls.set(
    format(new Date()),
    JSON.stringify({
      ...today,
      moodLog: [
        {
          id,
          time: new Date(),
          mood,
        },
        ...today.moodLog,
      ],
    }),
  );
  ls.set('latestMood', mood.toString());
  ls.set('latestMood_id', id);
};

export const deleteMoodLog = (date: Date, id: string) => {
  const day = getDataForDay(date);
  ls.set(
    format(date),
    JSON.stringify({
      ...day,
      moodLog: day.moodLog.filter((log: MoodLog) => log.id !== id),
    }),
  );
  if (id === ls.get('latestMood_id')) {
    ls.remove('latestMood');
    return true;
  }
  return false;
};

export const getLatestMood = () => {
  const latestMood = ls.get('latestMood');
  if (latestMood === null) return latestMood;
  const parsed = parseInt(latestMood);
  if (isMood(parsed)) return parsed;
  return null;
};

export const saveNote = (note: Note) => {
  const day = getDataForDay(note.time);
  ls.set(
    format(note.time),
    JSON.stringify({
      ...day,
      notes: note.id ? day.notes.map((n: Note) => (n.id === note.id ? note : n)) : [...day.notes, { ...note, id: uuid() }],
    }),
  );
};

export const deleteNote = (date: Date, id: string) => {
  const day = getDataForDay(date);
  ls.set(
    format(date),
    JSON.stringify({
      ...day,
      notes: day.notes.filter((note: Note) => note.id !== id),
    }),
  );
};

export const resetAllData = ls.clear;
