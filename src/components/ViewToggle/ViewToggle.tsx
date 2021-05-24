import React from 'react';
import style from './ViewToggle.module.scss';

export type ViewToggleOption = 'today' | 'calendar';

type ViewToggleProps = {
  activeToggle: ViewToggleOption;
  onChange: (option: ViewToggleOption) => void;
  className?: string;
};

const ViewToggle: React.FunctionComponent<ViewToggleProps> = (props: ViewToggleProps) => {
  const { activeToggle, onChange, className } = props;

  const toggleOptions: ViewToggleOption[] = ['today', 'calendar'];

  return (
    <div className={`${style.viewToggle} ${className}`}>
      {toggleOptions.map((option) => [
        <button
          key={option}
          onClick={(e) => onChange(option)}
          className={activeToggle === option ? style.activeToggle : undefined}
          disabled={option === activeToggle}
        >
          {option}
        </button>,
      ])}
    </div>
  );
};

export default ViewToggle;
