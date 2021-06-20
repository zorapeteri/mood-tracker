import React, { useState, useContext } from 'react';
import { Context } from '../../context/Context';
import useBreakpoint from 'use-breakpoint';
import BREAKPOINTS from '../../breakpoints';
import Confirm from '../Confirm';
import DesktopSettings from './DesktopSettings';
import HandheldSettings from './HandheldSettings';

type SettingsProps = {
  editName: () => void;
};

const Settings: React.FunctionComponent<SettingsProps> = (props: SettingsProps) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const [confirm, setConfirm] = useState<boolean>(false);

  const reset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      {confirm && (
        <Confirm
          primaryText="Are you sure you want to delete all your data?"
          secondaryText="This action will permanently remove all of your mood logs, notes and settings."
          yesButtonText="Yes"
          noButtonText="Cancel"
          onYes={() => reset()}
          onNo={() => setConfirm(false)}
        />
      )}
      {breakpoint === 'large' ? (
        <DesktopSettings {...props} openResetConfirm={() => setConfirm(true)} />
      ) : (
        <HandheldSettings {...props} openResetConfirm={() => setConfirm(true)} />
      )}
    </>
  );
};

export default Settings;
