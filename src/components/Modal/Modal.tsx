import React from 'react';
import style from './Modal.module.scss';
import { IoClose } from 'react-icons/io5';
import Button from '../Button';

type ModalProps = {
  children: any;
  title: string;
  hideCloseButton?: boolean;
  buttonText: string;
  onButtonClick: () => void;
  className?: string;
};

const Modal: React.FunctionComponent<ModalProps> = (props: ModalProps) => {
  const { children, title, hideCloseButton, buttonText, onButtonClick, className } = props;

  return (
    <div className={`${style.modal} ${className}`}>
      <h2>{title}</h2>
      <div className={style.body}>{children}</div>

      <Button className={style.button} color="primary" padding="10px 25px" fontSize="12px" onClick={() => onButtonClick()}>
        {buttonText}
      </Button>
      {!hideCloseButton && (
        <button className={style.closeButton} title="close dialog">
          <IoClose />
        </button>
      )}
    </div>
  );
};

export default Modal;
