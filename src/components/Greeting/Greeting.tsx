import React from 'react';
import { getUserPreferences } from '../../helpers';

const Greeting: React.FunctionComponent = () => {
  return <h1>Hi {getUserPreferences().name}!</h1>;
};

export default Greeting;
