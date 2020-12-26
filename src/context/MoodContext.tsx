import React, { useReducer, createContext } from 'react';

const daysInMonth = (month: number, year: number) =>
  new Date(year, month, 0).getDate();

const storageTag = (date: Date) =>
  `moodtracker_${date.getFullYear()}_${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}`;

const getMonthFromLocalStorage = (date: Date) => {
  const item = localStorage.getItem(storageTag(date));

  if (item) {
    return JSON.parse(item);
  }

  const unsetArray = new Array(
    daysInMonth(date.getMonth() + 1, date.getFullYear()),
  ).fill('none');
  localStorage.setItem(storageTag(date), JSON.stringify(unsetArray));
  return unsetArray;
};

const storeMoodForDay = (state: moodState, mood: string) => {
  const days = [...state.days];
  if (state.pickingDay !== null) {
    days[state.pickingDay] = mood;
  }
  localStorage.setItem(storageTag(state.date), JSON.stringify(days));
  return days;
};

/* eslint-disable no-unused-vars */

type moodState = {
  isPicking: boolean;
  date: Date;
  days: string[];
  pickingDay: number | null;
  nextMonth: () => void;
  previousMonth: () => void;
  pickDay: (day: number) => void;
  pickMood: (mood: string) => void;
  cancel: () => void;
};

/* eslint-disable no-unused-vars */

const initialState: moodState = {
  isPicking: false,
  date: new Date(),
  days: getMonthFromLocalStorage(new Date()),
  pickingDay: null,
  nextMonth: () => {},
  previousMonth: () => {},
  pickDay: () => {},
  pickMood: () => {},
  cancel: () => {},
};

export const MoodContext = createContext(initialState);

const moodReducer = (
  state: moodState,
  action: { type: string; payload?: any },
) => {
  if (action.type === 'NEXT_MONTH') {
    const date = new Date(state.date);
    date.setMonth(date.getMonth() + 1);
    return {
      ...state,
      date,
      days: getMonthFromLocalStorage(date),
      isPicking: false,
      pickingDay: null,
    };
  }

  if (action.type === 'PREVIOUS_MONTH') {
    const date = new Date(state.date);
    date.setMonth(date.getMonth() - 1);
    return {
      ...state,
      date,
      days: getMonthFromLocalStorage(date),
      isPicking: false,
      pickingDay: null,
    };
  }

  if (action.type === 'PICK_DAY') {
    return {
      ...state,
      isPicking: true,
      pickingDay: action.payload.day,
    };
  }

  if (action.type === 'PICK_MOOD') {
    const days = storeMoodForDay(state, action.payload.mood);
    return {
      ...state,
      days,
      isPicking: false,
      pickingDay: null,
    };
  }

  if (action.type === 'CANCEL') {
    return {
      ...state,
      isPicking: false,
      pickingDay: null,
    };
  }

  return state;
};

const MoodContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(moodReducer, initialState);

  const nextMonth = () => dispatch({ type: 'NEXT_MONTH' });
  const previousMonth = () => dispatch({ type: 'PREVIOUS_MONTH' });
  const pickDay = (day: number) =>
    dispatch({ type: 'PICK_DAY', payload: { day } });
  const pickMood = (mood: string) =>
    dispatch({ type: 'PICK_MOOD', payload: { mood } });
  const cancel = () => dispatch({ type: 'CANCEL' });

  return (
    <MoodContext.Provider
      value={{ ...state, nextMonth, previousMonth, pickDay, pickMood, cancel }}
    >
      {children}
    </MoodContext.Provider>
  );
};

export default MoodContextProvider;
