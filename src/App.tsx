import React, { useContext } from 'react';
import { Context } from './context/Context';
import Home from './components/Home';
import MoodPicker from './components/MoodPicker';

const App: React.FunctionComponent = () => {
  const { pickingMood } = useContext(Context);

  return (
    <>
      {pickingMood && <MoodPicker />}
      <Home />
    </>
  );
};

export default App;