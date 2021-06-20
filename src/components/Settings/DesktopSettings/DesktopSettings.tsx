import React, { useContext } from 'react';
import { Context } from '../../../context/Context';
import { IoBuild, IoCalendarOutline, IoPerson } from 'react-icons/io5';
import Modal from '../../Modal';
import ToggleComponent from '../../Toggle';
import style from './DesktopSettings.module.scss';

type DesktopSettingsProps = {
  editName: () => void;
  openResetConfirm: () => void;
};

const DesktopSettings: React.FunctionComponent<DesktopSettingsProps> = (
  props: DesktopSettingsProps,
) => {
  const { userPreferences, setUserPreferences, setSettingsOpen } = useContext(Context);

  return (
    <Modal
      title="Settings"
      hideButton={true}
      showOverlayShade={true}
      onClose={() => setSettingsOpen(false)}
    >
      <div className={style.desktopSettings}>
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
        <button onClick={() => props.openResetConfirm()}>
          <span className={style.icon}>
            <IoBuild />
          </span>
          <span>Reset all data</span>
        </button>
        <div className={style.toggleContainer}>
          <ToggleComponent
            defaultChecked={userPreferences !== null && userPreferences.startsOnSunday}
            onChange={checked =>
              setUserPreferences({
                ...(userPreferences as UserPreferences),
                startsOnSunday: checked,
              })
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default DesktopSettings;
