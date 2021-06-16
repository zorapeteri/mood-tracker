import React from 'react';
import style from './DesktopDeleteItemButton.module.scss';
import { IoTrashOutline } from 'react-icons/io5';

type DesktopDeleteItemButtonProps = {
  title: string;
  onDelete: () => void;
  side: 'left' | 'right';
  className: string;
};

const DesktopDeleteItemButton: React.FunctionComponent<DesktopDeleteItemButtonProps> = (props: DesktopDeleteItemButtonProps) => {
  const { title, onDelete, side, className } = props;

  return (
    <div className={`${style.desktopDeleteButtonContainer} ${className} ${style[side]}`}>
      <button
        className={style.desktopDeleteButton}
        title={title}
        onClick={e => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <IoTrashOutline />
      </button>
    </div>
  );
};

export default DesktopDeleteItemButton;
