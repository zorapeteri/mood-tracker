import React from 'react';
import Toggle from 'react-toggle';
import './Toggle.scss';

type ToggleProps = {
  defaultChecked: boolean;
};

const ToggleComponent: React.FunctionComponent<ToggleProps> = (props: ToggleProps) => {
  return <Toggle {...props} onChange={(e) => console.log(e.target.checked)} />;
};

export default ToggleComponent;
