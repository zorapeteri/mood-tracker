import React from 'react';
import DesktopDeleteItemButton from './DesktopDeleteItemButton';
import HandheldDeleteItemButton from './HandheldDeleteItemButton';

type DeleteItemButtonProps = {
  isLongPressed: boolean;
  title: string;
  onDelete: () => void;
  side: 'left' | 'right';
  className: string;
};

const DeleteItemButton: React.FunctionComponent<DeleteItemButtonProps> = (props: DeleteItemButtonProps) => {
  const { isLongPressed, title, onDelete, side, className } = props;

  return (
    <>
      {isLongPressed && <HandheldDeleteItemButton title={title} onDelete={onDelete} />}
      <DesktopDeleteItemButton title={title} onDelete={onDelete} side={side} className={className} />
    </>
  );
};

export default DeleteItemButton;
