import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import Modal from '../Modal';
import TextField from '../TextField';

type EditNameProps = {
  close: () => void;
};

const EditName: React.FunctionComponent<EditNameProps> = (
  props: EditNameProps
) => {
  const { userPreferences, setUserPreferences } = useContext(Context);

  const [name, setName] = useState<string>(
    (userPreferences as UserPreferences).name || ''
  );

  const onChange = (text: string) => {
    setName(text);
    return text ? false : 'You have to enter your name';
  };

  const save = (name: string) => {
    setUserPreferences({ ...(userPreferences as UserPreferences), name });
    props.close();
  };

  return (
    <Modal
      title="What would you like to be called?"
      buttonText="Save"
      onButtonClick={() => save(name)}
      disableButton={!name}
      hideCloseButton={true}
    >
      <TextField
        placeholder="Your name"
        rows={1}
        defaultValue={(userPreferences as UserPreferences).name || ''}
        onChange={onChange}
      />
    </Modal>
  );
};

export default EditName;
