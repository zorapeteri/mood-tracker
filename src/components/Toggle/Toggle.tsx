import React from 'react';
import Toggle from 'react-toggle';
import './Toggle.scss';

type ToggleProps = {
  defaultChecked: boolean;
  onChange: (checked: boolean) => void;
};

const ToggleComponent: React.FunctionComponent<ToggleProps> = (props: ToggleProps) => {
  return (
    <Toggle
      defaultChecked={props.defaultChecked}
      onChange={e => props.onChange(e.target.checked)}
    />
  );
};

export default ToggleComponent;
