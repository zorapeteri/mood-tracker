import React from 'react';
import style from './Modal.module.scss';
import { IoClose } from 'react-icons/io5';
import Button from '../Button';

type ModalProps = {
  children: any;
  title: string;
  hideButton?: boolean;
  hideCloseButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  onClose?: () => void;
  className?: string;
  disableButton?: boolean;
  showOverlayShade?: boolean;
};

const Modal: React.FunctionComponent<ModalProps> = (props: ModalProps) => {
  const {
    children,
    title,
    hideButton,
    hideCloseButton,
    buttonText,
    onButtonClick,
    onClose,
    className,
    disableButton,
    showOverlayShade,
  } = props;

  return (
    <div className={`${style.modalOverlay} ${showOverlayShade && style.shade}`}>
      <div className={`${style.modal} ${className}`}>
        <h2>{title}</h2>
        <div className={style.body}>{children}</div>
        {!hideButton && (
          <Button
            className={style.button}
            color={disableButton ? 'disabled' : 'primary'}
            padding="10px 25px"
            fontSize="12px"
            onClick={() => onButtonClick && onButtonClick()}
          >
            {buttonText}
          </Button>
        )}
        {!hideCloseButton && (
          <button
            className={style.closeButton}
            title="close dialog"
            onClick={() => onClose && onClose()}
          >
            <IoClose />
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
