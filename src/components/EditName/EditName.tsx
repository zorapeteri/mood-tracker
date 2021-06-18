import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import useBreakpoint from 'use-breakpoint';
import BREAKPOINTS from '../../breakpoints';
import HandheldEditName from './HandheldEditName';
import DesktopEditName from './DesktopEditName';

const EditName: React.FunctionComponent = () => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const { userPreferences, setUserPreferences } = useContext(Context);

  const save = (name: string) => {
    setUserPreferences({ ...(userPreferences as UserPreferences), name });
  };

  if (breakpoint === 'large') {
    return (
      <DesktopEditName
        name={(userPreferences as UserPreferences).name || ''}
        save={text => save(text)}
      />
    );
  }

  return (
    <HandheldEditName
      name={(userPreferences as UserPreferences).name || ''}
      save={text => save(text)}
    />
  );
};

export default EditName;
