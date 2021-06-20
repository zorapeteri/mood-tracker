import React from 'react';
import { StringMappingType } from 'typescript';
import Button from '../Button';
import style from './Confirm.module.scss';

type ConfirmProps = {
  primaryText: string;
  secondaryText?: string;
  yesButtonText: string;
  noButtonText: string;
  onNo: () => void;
  onYes: () => void;
};

const Confirm: React.FunctionComponent<ConfirmProps> = (props: ConfirmProps) => {
  const { primaryText, secondaryText, yesButtonText, noButtonText, onNo, onYes } = props;

  return (
    <div className={style.confirmContainer}>
      <div className={style.confirm}>
        <h1>{primaryText}</h1>
        {secondaryText && <p>{secondaryText}</p>}
        <div className={style.buttons}>
          <Button color="secondary" fontSize="0.9rem" padding="0.7rem 1rem" onClick={() => onNo()}>
            {noButtonText}
          </Button>
          <Button color="primary" fontSize="0.9rem" padding="0.7rem 1rem" onClick={() => onYes()}>
            {yesButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
