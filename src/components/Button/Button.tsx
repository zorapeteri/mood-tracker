import React from 'react';
import style from './Button.module.scss';

type ButtonProps = {
  children?: any;
  color: string;
  fontSize: string;
  padding: string;
  ariaLabel?: string;
  circular?: boolean;
  className?: string;
  title?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

const Button: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  const {
    children,
    color,
    fontSize,
    padding,
    ariaLabel,
    circular,
    className,
    title,
    onClick,
  } = props;

  return (
    <button
      aria-label={ariaLabel}
      className={`${style[color]} ${circular && style.circular} ${className}`}
      style={{ fontSize, padding }}
      onClick={onClick}
      title={title}
      disabled={color === 'disabled'}
    >
      {children}
    </button>
  );
};

export default Button;
