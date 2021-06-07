import React, { useState } from 'react';
import Home from './components/Home';
import MoodPicker from './components/MoodPicker';

const App: React.FunctionComponent = () => {
  const [appState, setAppState] = useState<string>('home');

  if (appState === 'picking') {
    return <MoodPicker close={() => setAppState('home')}  />;
  }

  return <Home saveMood={() => setAppState('picking')} />;
};

export default App;