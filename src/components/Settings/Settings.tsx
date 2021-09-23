import React, { useContext, useState } from 'react';
import { IoBuild, IoCalendarOutline, IoPerson } from 'react-icons/io5';
import { Context } from '../../context/Context';
import Confirm from '../Confirm';
import Modal from '../Modal';
import Toggle from '../Toggle';
import style from './Settings.module.scss';

type SettingsProps = {
  editName: () => void;
};

const Settings: React.FunctionComponent<SettingsProps> = (
  props: SettingsProps
) => {
  const { userPreferences, setUserPreferences, setSettingsOpen } = useContext(
    Context
  );

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
      <Modal
        title="Settings"
        hideButton={true}
        showOverlayShade={true}
        onClose={() => setSettingsOpen(false)}
      >
        <div className={style.settings}>
          <button onClick={() => props.editName()}>
            <span className={style.icon}>
              <IoPerson />
            </span>
            <span>Change your name</span>
          </button>
          <button className={style.sundayButton}>
            <span className={style.icon}>
              <IoCalendarOutline />
            </span>
            <span>Week starts on Sunday</span>
          </button>
          <button onClick={() => setConfirm(true)}>
            <span className={style.icon}>
              <IoBuild />
            </span>
            <span>Reset all data</span>
          </button>
          <div className={style.toggleContainer}>
            <Toggle
              defaultChecked={
                userPreferences !== null && userPreferences.startsOnSunday
              }
              onChange={(checked) =>
                setUserPreferences({
                  ...(userPreferences as UserPreferences),
                  startsOnSunday: checked,
                })
              }
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Settings;
