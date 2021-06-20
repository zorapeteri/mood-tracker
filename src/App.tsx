import React, { useState, useContext } from 'react';
import { Context } from './context/Context';
import Home from './components/Home';
import MoodPicker from './components/MoodPicker';
import NoteEdit from './components/NoteEdit';
import Welcome from './components/Welcome';
import EditName from './components/EditName';
import Settings from './components/Settings';

const App: React.FunctionComponent = () => {
  const {
    pickingMood,
    editingNote,
    userPreferences,
    setUserPreferences,
    settingsOpen,
  } = useContext(Context);

  const [editingName, setEditingName] = useState(false);

  if (!userPreferences) {
    return (
      <Welcome
        goToNext={() => {
          setUserPreferences({ startsOnSunday: false, name: '' });
          setEditingName(true);
        }}
      />
    );
  }

  if (editingName) {
    return <EditName close={() => setEditingName(false)} />;
  }

  if (pickingMood) {
    return <MoodPicker />;
  }

  return (
    <>
      {settingsOpen && <Settings editName={() => setEditingName(true)} />}
      {editingNote && <NoteEdit />}
      <Home />
    </>
  );
};

export default App;