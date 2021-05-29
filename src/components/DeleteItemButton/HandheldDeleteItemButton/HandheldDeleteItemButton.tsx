import React from 'react';
import style from './HandheldDeleteItemButton.module.scss';

import { IoClose } from 'react-icons/io5';

type HandheldDeleteItemButtonProps = {
  title: string;
  onDelete: () => void;
};

const HandheldDeleteItemButton: React.FunctionComponent<HandheldDeleteItemButtonProps> = (props: HandheldDeleteItemButtonProps) => {
  const { title, onDelete } = props;

  return (
    <div className={style.handheldDeleteOverlay}>
      <div className={style.handheldDeleteOverlayBlock}></div>
      <button className={style.handheldDeleteButton} title={title} onClick={() => onDelete()}>
        <IoClose />
      </button>
    </div>
  );
};

export default HandheldDeleteItemButton;
