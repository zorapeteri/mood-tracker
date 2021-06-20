import React, { useContext } from 'react';
import { Context } from '../../../context/Context';
import { IoArrowBack, IoBuild, IoCalendarOutline, IoPerson } from 'react-icons/io5';
import ToggleComponent from '../../Toggle';
import style from './HandheldSettings.module.scss';

type HandheldSettingsProps = {
  editName: () => void;
  openResetConfirm: () => void;
};

const HandheldSettings: React.FunctionComponent<HandheldSettingsProps> = (
  props: HandheldSettingsProps,
) => {
  const { userPreferences, setUserPreferences, setSettingsOpen } = useContext(Context);

  return (
    <div className={style.handheldSettingsContainer}>
      <div className={style.handheldSettings}>
        <button
          className={style.closeButton}
          onClick={() => setSettingsOpen(false)}
          title="close settings"
        >
          <IoArrowBack />
        </button>
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
    </div>
  );
};

export default HandheldSettings;
