import React from 'react';
import style from './Button.module.scss';

type ButtonProps = {
  children?: any;
  color: string;
  fontSize: string;
  padding: string;
  ariaLabel?: string;
  circular?: boolean;
};

const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  const { children, color, fontSize, padding, ariaLabel, circular } = props;

  return (
    <button
      aria-label={ariaLabel}
      className={circular ? [style[color], style.circular].join(' ') : style[color]}
      style={{ fontSize, padding }}
    >
      {children}
    </button>
  );
};

export default Button;
