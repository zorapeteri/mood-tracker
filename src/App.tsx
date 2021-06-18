import React, { useContext } from 'react';
import { Context } from './context/Context';
import Home from './components/Home';
import MoodPicker from './components/MoodPicker';
import NoteEdit from './components/NoteEdit';
import Welcome from './components/Welcome';
import EditName from './components/EditName';

const App: React.FunctionComponent = () => {
  const { pickingMood, editingNote, userPreferences } = useContext(Context);

  if (!userPreferences) {
    return <Welcome />;
  }

  if (!userPreferences.name) {
    return <EditName />;
  }

  if (pickingMood) {
    return <MoodPicker />;
  }

  return (
    <>
      {editingNote && <NoteEdit />}
      <Home />
    </>
  );
};

export default App;