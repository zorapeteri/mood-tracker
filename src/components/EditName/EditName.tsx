import React, { useContext } from 'react';
import { Context } from '../../context/Context';
import useBreakpoint from 'use-breakpoint';
import BREAKPOINTS from '../../breakpoints';
import HandheldEditName from './HandheldEditName';
import DesktopEditName from './DesktopEditName';

type EditNameProps = {
  close: () => void;
};

const EditName: React.FunctionComponent<EditNameProps> = (props: EditNameProps) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const { userPreferences, setUserPreferences } = useContext(Context);

  const save = (name: string) => {
    setUserPreferences({ ...(userPreferences as UserPreferences), name });
    props.close();
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
