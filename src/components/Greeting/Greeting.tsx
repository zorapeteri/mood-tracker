import React, { useContext } from 'react';
import { Context } from '../../context/Context';

const Greeting: React.FunctionComponent = () => {

  const { userPreferences } = useContext(Context);

  return <h1>Hi {userPreferences?.name}!</h1>;
};

export default Greeting;
