import React, { useState } from 'react';
import Button from '../../Button';
import style from './HandheldEditName.module.scss';

type HandheldEditNameProps = {
  name: string;
  save: (text: string) => void;
};

const HandheldEditName: React.FunctionComponent<HandheldEditNameProps> = (
  props: HandheldEditNameProps,
) => {
  const [name, setName] = useState<string>(props.name);

  return (
    <div className={style.handheldEditName}>
      <h1>What would you like to be called?</h1>
      <input type="text" value={name} onChange={e => setName(e.target.value)} autoFocus={true} />
      <Button
        color={name ? 'primary' : 'disabled'}
        fontSize="1rem"
        padding="1rem 4rem"
        onClick={() => props.save(name)}
      >
        Save
      </Button>
    </div>
  );
};

export default HandheldEditName;
