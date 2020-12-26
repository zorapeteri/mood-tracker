import React from 'react';
import './App.scss';
import Calendar from './components/Calendar/Calendar';
import MonthPicker from './components/MonthPicker/MonthPicker';
import MoodPicker from './components/MoodPicker/MoodPicker';
import MoodContextProvider from './context/MoodContext';

function App() {
  return (
    <div className="App">
      <MoodContextProvider>
        <header>Mood tracker</header>
        <MonthPicker />
        <Calendar />
        <MoodPicker />
      </MoodContextProvider>
    </div>
  );
}

export default App;
