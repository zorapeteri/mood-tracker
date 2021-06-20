import React, { useState } from 'react';
import Modal from '../../Modal';
import TextField from '../../TextField';

type DesktopEditNameProps = {
  name: string;
  save: (name: string) => void;
};

const DesktopEditName: React.FunctionComponent<DesktopEditNameProps> = (
  props: DesktopEditNameProps,
) => {
  const [name, setName] = useState<string>(props.name);

  const onChange = (text: string) => {
    setName(text);
    return text ? false : 'You have to enter your name';
  };

  return (
    <Modal
      title="What would you like to be called?"
      buttonText="Save"
      onButtonClick={() => {
        props.save(name);
      }}
      disableButton={!name}
      hideCloseButton={true}
    >
      <TextField placeholder="Your name" rows={1} defaultValue={props.name} onChange={onChange} />
    </Modal>
  );
};

export default DesktopEditName;
