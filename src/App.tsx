import React, { useContext } from 'react';
import { Context } from './context/Context';
import Home from './components/Home';
import MoodPicker from './components/MoodPicker';
import NoteEdit from './components/NoteEdit';

const App: React.FunctionComponent = () => {
  const { pickingMood, editingNote } = useContext(Context);

  return (
    <>
      {pickingMood && <MoodPicker />}
      {editingNote && <NoteEdit />}
      <Home />
    </>
  );
};

export default App;